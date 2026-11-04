/**
 * Textura de fundo pontilhada, sóbria, derivada dos tokens de cor da marca
 * (ver .dot-grid / .dot-grid-dark em globals.css).
 */
export default function DotGrid({
  theme = "light",
  className = "",
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const gridClass = theme === "dark" ? "dot-grid-dark" : "dot-grid";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${gridClass} [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] ${className}`}
    />
  );
}
