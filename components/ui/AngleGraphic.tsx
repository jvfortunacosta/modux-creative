/**
 * Sistema gráfico de linhas diagonais derivadas do ângulo do símbolo M
 * (--modux-angle, definido em globals.css). Usado como textura decorativa
 * sóbria, nunca como ilustração 3D ou clichê futurista.
 */
const LINE_CLASSES = {
  light: { strong: "bg-modux-graphite/15", soft: "bg-modux-graphite/10" },
  dark: { strong: "bg-modux-canvas/15", soft: "bg-modux-canvas/10" },
};

export default function AngleGraphic({
  className = "",
  theme = "light",
}: {
  className?: string;
  theme?: "light" | "dark";
}) {
  const lines = LINE_CLASSES[theme];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden overflow-hidden sm:block ${className}`}
    >
      <div
        className={`absolute right-[6%] top-0 h-[140%] w-px origin-top ${lines.strong}`}
        style={{ transform: "rotate(var(--modux-angle))" }}
      />
      <div
        className={`absolute right-[14%] top-0 h-[140%] w-px origin-top ${lines.soft}`}
        style={{ transform: "rotate(var(--modux-angle))" }}
      />
      <div
        className="absolute right-[10%] top-[8%] h-24 w-[3px] origin-top bg-modux-lime"
        style={{ transform: "rotate(var(--modux-angle))" }}
      />
    </div>
  );
}
