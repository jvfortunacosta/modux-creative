import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Vidro 3D fraturado do símbolo M da MODUX, sobreposto ao título do hero,
 * refratando o texto que está atrás dele. Motor em three.js puro (sem R3F):
 * o texto real do h1 é redesenhado num canvas 2D dentro da própria cena, e o
 * h1 do DOM fica transparente (mas presente, para SEO/leitura/seleção).
 */

type Vec2 = [number, number];

// ─── RNG determinístico ──────────────────────────────────────────────────────

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Easing ──────────────────────────────────────────────────────────────────

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const cubicOut = (t: number) => 1 - Math.pow(1 - t, 3);
const cubicInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

// ─── Geometria do M (medida de /logo-black.png, 1503x424, y para baixo) ─────

const RAW_STRIPS: Vec2[][] = [
  [
    [21, 262.4],
    [215, 107.2],
    [215, 249.6],
    [21, 404.8],
  ],
  [
    [218, 250.4],
    [404, 101.6],
    [404, 254.4],
    [218, 403.2],
  ],
  [
    [404, 101.6],
    [506, 20],
    [506, 322.4],
    [404, 404],
  ],
];
const NORM_CX = 263.5;
const NORM_CY = 212.4;
const NORM_S = 384.8;

function normalize([x, y]: Vec2): Vec2 {
  return [(x - NORM_CX) / NORM_S, -(y - NORM_CY) / NORM_S];
}

const STRIPS: Vec2[][] = RAW_STRIPS.map((strip) => strip.map(normalize));

// ─── Utilitários de polígono ──────────────────────────────────────────────────

function polygonArea(poly: Vec2[]): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a) / 2;
}

function polygonCentroid(poly: Vec2[]): Vec2 {
  let cx = 0;
  let cy = 0;
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    const cross = x1 * y2 - x2 * y1;
    area += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-9) {
    const n = poly.length || 1;
    const sx = poly.reduce((s, p) => s + p[0], 0) / n;
    const sy = poly.reduce((s, p) => s + p[1], 0) / n;
    return [sx, sy];
  }
  return [cx / (6 * area), cy / (6 * area)];
}

function boundsOf(poly: Vec2[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of poly) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

function pointInConvexPolygon(p: Vec2, poly: Vec2[]): boolean {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const cross = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
    if (Math.abs(cross) < 1e-9) continue;
    const s = cross > 0 ? 1 : -1;
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

function clipHalfPlane(poly: Vec2[], a: Vec2, normal: Vec2): Vec2[] {
  const out: Vec2[] = [];
  const n = poly.length;
  const side = (p: Vec2) =>
    (p[0] - a[0]) * normal[0] + (p[1] - a[1]) * normal[1];
  for (let i = 0; i < n; i++) {
    const curr = poly[i];
    const next = poly[(i + 1) % n];
    const dCurr = side(curr);
    const dNext = side(next);
    if (dCurr <= 0) out.push(curr);
    if ((dCurr < 0 && dNext > 0) || (dCurr > 0 && dNext < 0)) {
      const t = dCurr / (dCurr - dNext);
      out.push([
        curr[0] + (next[0] - curr[0]) * t,
        curr[1] + (next[1] - curr[1]) * t,
      ]);
    }
  }
  return out;
}

function clipConvex(subject: Vec2[], clip: Vec2[]): Vec2[] {
  let output = subject;
  const ccx = clip.reduce((s, p) => s + p[0], 0) / clip.length;
  const ccy = clip.reduce((s, p) => s + p[1], 0) / clip.length;
  for (let i = 0; i < clip.length && output.length; i++) {
    const a = clip[i];
    const b = clip[(i + 1) % clip.length];
    const edge: Vec2 = [b[0] - a[0], b[1] - a[1]];
    let normal: Vec2 = [edge[1], -edge[0]];
    const centroidSide = (ccx - a[0]) * normal[0] + (ccy - a[1]) * normal[1];
    if (centroidSide > 0) normal = [-normal[0], -normal[1]];
    output = clipHalfPlane(output, a, normal);
  }
  return output;
}

function clipByBisector(poly: Vec2[], seed: Vec2, other: Vec2): Vec2[] {
  const mid: Vec2 = [(seed[0] + other[0]) / 2, (seed[1] + other[1]) / 2];
  const normal: Vec2 = [other[0] - seed[0], other[1] - seed[1]];
  return clipHalfPlane(poly, mid, normal);
}

function voronoiCell(seed: Vec2, others: Vec2[], bound: number): Vec2[] {
  let poly: Vec2[] = [
    [-bound, -bound],
    [bound, -bound],
    [bound, bound],
    [-bound, bound],
  ];
  for (const other of others) {
    if (other === seed) continue;
    poly = clipByBisector(poly, seed, other);
    if (poly.length === 0) break;
  }
  return poly;
}

// ─── Fratura em cacos ──────────────────────────────────────────────────────

const SEED_COUNT = 36;
const SHRINK = 0.0016;
const EXTRUDE_DEPTH = 0.17;
const RNG_SEED = 20260224;

interface ShardDef {
  mesh: THREE.Mesh;
  rest: THREE.Vector3;
  direction: THREE.Vector3;
  rotationTarget: THREE.Euler;
  random: number;
  delay: number;
}

function generateSeeds(rand: () => number): Vec2[] {
  const areas = STRIPS.map(polygonArea);
  const totalArea = areas.reduce((a, b) => a + b, 0);
  const seeds: Vec2[] = [];
  let guard = 0;
  while (seeds.length < SEED_COUNT && guard < SEED_COUNT * 300) {
    guard++;
    const r = rand() * totalArea;
    let acc = 0;
    let stripIndex = 0;
    for (let i = 0; i < areas.length; i++) {
      acc += areas[i];
      if (r <= acc) {
        stripIndex = i;
        break;
      }
    }
    const strip = STRIPS[stripIndex];
    const b = boundsOf(strip);
    const px = b.minX + rand() * (b.maxX - b.minX);
    const py = b.minY + rand() * (b.maxY - b.minY);
    if (pointInConvexPolygon([px, py], strip)) {
      seeds.push([px, py]);
    }
  }
  return seeds;
}

function buildShards(material: THREE.Material, rand: () => number): ShardDef[] {
  const seeds = generateSeeds(rand);
  const boundSize = 4;
  const shards: ShardDef[] = [];

  for (const seed of seeds) {
    const others = seeds.filter((s) => s !== seed);
    const cell = voronoiCell(seed, others, boundSize);
    if (cell.length < 3) continue;

    for (const strip of STRIPS) {
      const piece = clipConvex(cell, strip);
      if (piece.length < 3) continue;
      const area = polygonArea(piece);
      if (area <= 1e-4) continue;

      const centroid = polygonCentroid(piece);
      // Pontos encolhidos (fenda) E recentrados na origem: a geometria fica
      // local ao caco, porque mesh.position já carrega o centroide (rest).
      const shrunk: Vec2[] = piece.map(([x, y]) => {
        const dx = centroid[0] - x;
        const dy = centroid[1] - y;
        const len = Math.hypot(dx, dy) || 1;
        return [x - centroid[0] + (dx / len) * SHRINK, y - centroid[1] + (dy / len) * SHRINK];
      });

      const shape = new THREE.Shape();
      shrunk.forEach(([x, y], i) => {
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
      shape.closePath();

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: EXTRUDE_DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.014,
        bevelSize: 0.005,
        bevelSegments: 2,
        curveSegments: 1,
      });
      geometry.translate(0, 0, -EXTRUDE_DEPTH / 2);
      geometry.computeVertexNormals();

      const dirLen = Math.hypot(centroid[0], centroid[1]) || 1;
      const direction = new THREE.Vector3(
        (centroid[0] / dirLen) * (0.35 + rand() * 0.55),
        (centroid[1] / dirLen) * (0.35 + rand() * 0.55),
        0.25 + rand() * 0.9
      );

      const mesh = new THREE.Mesh(geometry, material);
      const rest = new THREE.Vector3(centroid[0], centroid[1], 0);
      mesh.position.copy(rest);

      shards.push({
        mesh,
        rest,
        direction,
        rotationTarget: new THREE.Euler(
          (rand() * 2 - 1) * 2.5,
          (rand() * 2 - 1) * 2.5,
          (rand() * 2 - 1) * 1.5
        ),
        random: rand(),
        delay: rand() * 0.55,
      });
    }
  }
  return shards;
}

// ─── Projeção câmera ↔ mundo ──────────────────────────────────────────────────

function visibleHeightAtDepth(camera: THREE.PerspectiveCamera, depth: number) {
  const distance = camera.position.z - depth;
  const vFov = (camera.fov * Math.PI) / 180;
  return 2 * Math.tan(vFov / 2) * distance;
}

function visibleWidthAtDepth(camera: THREE.PerspectiveCamera, depth: number) {
  return visibleHeightAtDepth(camera, depth) * camera.aspect;
}

function screenFracToWorld(
  camera: THREE.PerspectiveCamera,
  fracX: number,
  fracY: number,
  depth: number
): THREE.Vector2 {
  const w = visibleWidthAtDepth(camera, depth);
  const h = visibleHeightAtDepth(camera, depth);
  return new THREE.Vector2((fracX - 0.5) * w, (0.5 - fracY) * h);
}

// ─── Texto do título desenhado em canvas ──────────────────────────────────────

interface WordToken {
  node: Text;
  start: number;
  end: number;
  text: string;
  parent: HTMLElement;
  // Cor e sublinhado são lidos uma vez, antes do título ficar transparente.
  // Fonte e letterSpacing são responsivos (clamp com vw) e precisam ser
  // relidos a cada redesenho (ver drawBackground), senão o texto some de
  // posição no resize mas continua desenhado com o tamanho antigo.
  color: string;
  underline: { color: string; thickness: number; offset: number } | null;
}

function buildWordTokens(title: HTMLElement): WordToken[] {
  const tokens: WordToken[] = [];
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();
  while (node) {
    const textNode = node as Text;
    const value = textNode.nodeValue || "";
    const parent = textNode.parentElement;
    if (parent) {
      const cs = getComputedStyle(parent);
      const hasUnderline = cs.textDecorationLine.includes("underline");
      const underline = hasUnderline
        ? {
            color: cs.textDecorationColor,
            thickness: parseFloat(cs.textDecorationThickness) || 2,
            offset: parseFloat(cs.textUnderlineOffset) || 2,
          }
        : null;

      const regex = /\S+/g;
      let match: RegExpExecArray | null = regex.exec(value);
      while (match) {
        tokens.push({
          node: textNode,
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          parent,
          color: cs.color,
          underline,
        });
        match = regex.exec(value);
      }
    }
    node = walker.nextNode();
  }
  return tokens;
}

function hideTitleText(title: HTMLElement) {
  title.style.color = "transparent";
  title.querySelectorAll("*").forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (getComputedStyle(htmlEl).textDecorationLine.includes("underline")) {
      htmlEl.style.textDecorationColor = "transparent";
    }
  });
}

function restoreTitleText(title: HTMLElement) {
  title.style.color = "";
  title.querySelectorAll("*").forEach((el) => {
    (el as HTMLElement).style.textDecorationColor = "";
  });
}

// ─── API pública ───────────────────────────────────────────────────────────

export interface ModuxGlassOptions {
  container: HTMLElement;
  title: HTMLElement;
}

export interface ModuxGlassHandle {
  destroy: () => void;
  shatter: () => void;
}

export function createModuxGlass({
  container,
  title,
}: ModuxGlassOptions): ModuxGlassHandle {
  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl2") || probe.getContext("webgl");
  if (!gl) {
    return { destroy: () => {}, shatter: () => {} };
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }

  // ── Renderer / cena / câmera ────────────────────────────────────────────

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.zIndex = "0";
  renderer.domElement.style.pointerEvents = "none";
  container.insertBefore(renderer.domElement, container.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 10);

  // ── Ambiente (RoomEnvironment + reflexos lima) ──────────────────────────

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envScene = new RoomEnvironment();
  const limeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xc7ff00,
    emissiveIntensity: 6,
  });
  const limeBoxA = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 2, 0.1),
    limeMaterial
  );
  limeBoxA.position.set(-2.6, 1.1, -1.4);
  envScene.add(limeBoxA);
  const limeBoxB = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 2, 0.1),
    limeMaterial
  );
  limeBoxB.position.set(2.6, -1.1, 1.4);
  envScene.add(limeBoxB);
  const envRenderTarget = pmremGenerator.fromScene(envScene, 0.04);
  scene.environment = envRenderTarget.texture;
  pmremGenerator.dispose();

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
  dirLight.position.set(3, 4, 6);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0xc7ff00, 3, 0, 2);
  pointLight.position.set(-3.5, -2, 3);
  scene.add(pointLight);

  // ── Fundo (grid + título) desenhado em canvas 2D ────────────────────────

  const bgCanvas = document.createElement("canvas");
  const bgTexture = new THREE.CanvasTexture(bgCanvas);
  bgTexture.colorSpace = THREE.SRGBColorSpace;
  const bgMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: bgTexture, toneMapped: false })
  );
  bgMesh.position.z = 0;
  scene.add(bgMesh);

  const wordTokens = buildWordTokens(title);

  function drawBackground() {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    bgCanvas.width = Math.round(w * dpr);
    bgCanvas.height = Math.round(h * dpr);
    const ctx = bgCanvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#161716";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(243,240,232,0.07)";
    ctx.lineWidth = 1;
    const step = 80;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }

    const sectionRect = rect;
    for (const token of wordTokens) {
      const range = document.createRange();
      try {
        range.setStart(token.node, token.start);
        range.setEnd(token.node, token.end);
      } catch {
        continue;
      }
      const rects = range.getClientRects();
      if (!rects.length) continue;
      const r = rects[0];
      const left = r.left - sectionRect.left;
      const top = r.top - sectionRect.top;

      const cs = getComputedStyle(token.parent);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      (ctx as unknown as { letterSpacing: string }).letterSpacing =
        cs.letterSpacing;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";

      const metrics = ctx.measureText(token.text);
      const ascent =
        metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
      const descent =
        metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
      const baseline = top + (r.height - (ascent + descent)) / 2 + ascent;

      if (token.underline) {
        ctx.fillStyle = token.underline.color;
        ctx.fillRect(
          left,
          baseline + token.underline.offset,
          r.width,
          token.underline.thickness
        );
      }

      ctx.fillStyle = token.color;
      ctx.fillText(token.text, left, baseline);
    }

    bgTexture.dispose();
    bgTexture.needsUpdate = true;
  }

  // ── Material de vidro compartilhado ─────────────────────────────────────

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf6ffe0,
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 0.45,
    ior: 1.75,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 0.9,
    attenuationColor: new THREE.Color(0xf6ffe0),
    attenuationDistance: 2.5,
  });
  (glassMaterial as unknown as { dispersion: number }).dispersion = 5;

  // ── Cacos do M ───────────────────────────────────────────────────────────

  const rand = mulberry32(RNG_SEED);
  const shards = buildShards(glassMaterial, rand);

  const outerGroup = new THREE.Group();
  const innerGroup = new THREE.Group();
  outerGroup.add(innerGroup);
  outerGroup.position.z = 0.9;
  shards.forEach((s) => innerGroup.add(s.mesh));
  scene.add(outerGroup);

  const clipPlane = new THREE.Plane(
    new THREE.Vector3(0, 0, 1),
    -outerGroup.position.z
  );

  // ── Estado de interação ───────────────────────────────────────────────────

  const localMouse = new THREE.Vector3(999, 999, 0);
  let mouseNdcX = 0;
  let mouseNdcY = 0;
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hitPoint = new THREE.Vector3();

  function clientToLocal(clientX: number, clientY: number): THREE.Vector3 | null {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    mouseNdcX = ndc.x;
    mouseNdcY = ndc.y;
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.ray.intersectPlane(clipPlane, hitPoint);
    if (!hit) return null;
    return innerGroup.worldToLocal(hit.clone());
  }

  function withinClickableRect(local: THREE.Vector3 | null) {
    return !!local && Math.abs(local.x) < 0.66 && Math.abs(local.y) < 0.52;
  }

  type ShatterPhase = "idle" | "out" | "hold" | "in";
  let shatterPhase: ShatterPhase = "idle";
  let shatterStart = 0;
  let clickDisplacement = 0;

  function triggerShatter() {
    shatterPhase = "out";
    shatterStart = performance.now();
  }

  function updateShatter(now: number) {
    if (shatterPhase === "idle") return;
    const t = (now - shatterStart) / 1000;
    if (shatterPhase === "out") {
      const p = Math.min(t / 0.35, 1);
      clickDisplacement = expoOut(p);
      if (p >= 1) {
        shatterPhase = "hold";
        shatterStart = now;
      }
    } else if (shatterPhase === "hold") {
      clickDisplacement = 1;
      if (t >= 1.5) {
        shatterPhase = "in";
        shatterStart = now;
      }
    } else if (shatterPhase === "in") {
      const p = Math.min(t / 1.7, 1);
      clickDisplacement = 1 - cubicInOut(p);
      if (p >= 1) {
        shatterPhase = "idle";
        clickDisplacement = 0;
      }
    }
  }

  function onPointerMove(e: PointerEvent) {
    const local = clientToLocal(e.clientX, e.clientY);
    if (local) localMouse.copy(local);
    container.style.cursor = withinClickableRect(local) ? "pointer" : "";
  }

  function onPointerLeave() {
    localMouse.set(999, 999, 0);
    mouseNdcX = 0;
    mouseNdcY = 0;
    container.style.cursor = "";
  }

  function onClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (target && target.closest("a,button,input")) return;
    const local = clientToLocal(e.clientX, e.clientY);
    if (withinClickableRect(local)) triggerShatter();
  }

  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerleave", onPointerLeave);
  container.addEventListener("click", onClick);

  // ── Layout: escala e posição do grupo, tamanho do fundo ─────────────────

  function layout() {
    const containerRect = container.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    camera.aspect = containerRect.width / containerRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(containerRect.width, containerRect.height, false);

    const bgW = visibleWidthAtDepth(camera, 0);
    const bgH = visibleHeightAtDepth(camera, 0);
    bgMesh.scale.set(bgW, bgH, 1);

    const targetPx = Math.min(
      titleRect.height * 0.9,
      containerRect.height * 0.62,
      (containerRect.width * 0.6) / 1.26
    );
    const worldH = visibleHeightAtDepth(camera, outerGroup.position.z);
    const pxPerWorldUnit = containerRect.height / worldH;
    const scale = targetPx / pxPerWorldUnit;
    outerGroup.scale.setScalar(scale);

    const fracX = containerRect.width < 640 ? 0.5 : 0.56;
    const titleCenterY =
      titleRect.top - containerRect.top + titleRect.height / 2;
    const fracY = titleCenterY / containerRect.height;
    const worldPos = screenFracToWorld(
      camera,
      fracX,
      fracY,
      outerGroup.position.z
    );
    outerGroup.position.x = worldPos.x;
    outerGroup.position.y = worldPos.y;

    drawBackground();
  }

  let resizeRaf = 0;
  const resizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => layout());
  });
  resizeObserver.observe(container);
  resizeObserver.observe(title);

  document.fonts.ready.then(() => layout()).catch(() => {});

  // ── Visibilidade (pausa fora da viewport) ────────────────────────────────

  let isVisible = true;
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 }
  );
  intersectionObserver.observe(container);

  // ── Loop de animação ─────────────────────────────────────────────────────

  const startTime = performance.now();
  let lastTime = startTime;
  let rafId = 0;

  function getEntranceDisplacement(shard: ShardDef, now: number): number {
    if (reducedMotion) return 0;
    const elapsed = (now - startTime) / 1000 - shard.delay;
    if (elapsed <= 0) return 2.4;
    const t = clamp01(elapsed / 1.5);
    return (1 - cubicOut(t)) * 2.4;
  }

  function getHoverDisplacement(shard: ShardDef): number {
    const dist = Math.hypot(
      shard.rest.x - localMouse.x,
      shard.rest.y - localMouse.y
    );
    return smoothstep(0.42, 0.06, dist) * 0.22;
  }

  function getScrollProgress(): number {
    const rect = container.getBoundingClientRect();
    if (rect.height === 0) return 0;
    return clamp01(-rect.top / rect.height);
  }

  function animate(now: number) {
    rafId = requestAnimationFrame(animate);
    if (!isVisible) {
      lastTime = now;
      return;
    }
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    updateShatter(now);
    const scrollProgress = getScrollProgress();
    const scrollDisplacement = smoothstep(0.05, 0.85, scrollProgress) * 0.85;

    const targetRotX = -mouseNdcY * 0.22 + 0.12;
    const targetRotY = mouseNdcX * 0.35 - 0.28 + scrollProgress * 1.1;
    const smoothing = 1 - Math.exp(-dt * 3.5);
    innerGroup.rotation.x += (targetRotX - innerGroup.rotation.x) * smoothing;
    innerGroup.rotation.y += (targetRotY - innerGroup.rotation.y) * smoothing;

    if (!reducedMotion) {
      innerGroup.rotation.z = Math.sin(now * 0.0005) * 0.015;
      outerGroup.position.y += Math.sin(now * 0.0004) * 0.0006;
    }

    for (const shard of shards) {
      const dEntrance = getEntranceDisplacement(shard, now);
      const dHover = getHoverDisplacement(shard);
      const d = Math.max(dEntrance, dHover, clickDisplacement, scrollDisplacement);
      const posFactor = d * (0.55 + shard.random * 0.9);
      const rotFactor = d * (0.4 + shard.random * 0.6);

      shard.mesh.position.set(
        shard.rest.x + shard.direction.x * posFactor,
        shard.rest.y + shard.direction.y * posFactor,
        shard.rest.z + shard.direction.z * posFactor
      );
      shard.mesh.rotation.set(
        shard.rotationTarget.x * rotFactor,
        shard.rotationTarget.y * rotFactor,
        shard.rotationTarget.z * rotFactor
      );
    }

    renderer.render(scene, camera);
  }

  layout();
  hideTitleText(title);
  rafId = requestAnimationFrame(animate);

  // O título entra com uma animação do Framer Motion (fade + translateY) por
  // cima dele; getBoundingClientRect() no instante do mount captura a
  // posição AINDA no meio dessa transição, não a posição final. Remedindo
  // pouco depois (quando a entrada já assentou) corrige o texto desenhado
  // no canvas, que senão fica deslocado em relação ao título real.
  const settleTimeouts = [
    setTimeout(layout, 350),
    setTimeout(layout, 900),
  ];

  // ── Destroy ──────────────────────────────────────────────────────────────

  function destroy() {
    cancelAnimationFrame(rafId);
    cancelAnimationFrame(resizeRaf);
    settleTimeouts.forEach(clearTimeout);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerleave", onPointerLeave);
    container.removeEventListener("click", onClick);
    container.style.cursor = "";

    shards.forEach((s) => s.mesh.geometry.dispose());
    glassMaterial.dispose();
    bgMesh.geometry.dispose();
    (bgMesh.material as THREE.Material).dispose();
    bgTexture.dispose();
    envRenderTarget.texture.dispose();
    limeMaterial.dispose();
    limeBoxA.geometry.dispose();
    limeBoxB.geometry.dispose();
    renderer.dispose();

    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }

    restoreTitleText(title);
  }

  return { destroy, shatter: triggerShatter };
}
