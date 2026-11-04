import Image from "next/image";
import Link from "next/link";

type Variant = "full" | "symbol";
type Theme = "black" | "canvas";

const SOURCES: Record<Variant, Record<Theme, { src: string; width: number; height: number }>> = {
  full: {
    black: { src: "/logo-black.png", width: 1503, height: 424 },
    canvas: { src: "/logo-canvas.png", width: 1503, height: 424 },
  },
  symbol: {
    black: { src: "/symbol-black.png", width: 497, height: 404 },
    canvas: { src: "/symbol-canvas.png", width: 497, height: 404 },
  },
};

/**
 * Assinatura oficial da MODUX. Nunca recompor: sempre os arquivos
 * fornecidos, sem inclinar, distorcer ou aplicar efeitos.
 * `variant="full"` respeita a largura mínima de 180px; `variant="symbol"`
 * respeita o mínimo de 32px. Usar symbol apenas quando o espaço não
 * comportar a assinatura completa (ex.: header mobile).
 */
export default function Logo({
  variant = "full",
  theme = "black",
  priority = false,
  className,
}: {
  variant?: Variant;
  theme?: Theme;
  priority?: boolean;
  /** Classe(s) de LARGURA do wrapper; a altura acompanha a proporção original. */
  className?: string;
}) {
  const asset = SOURCES[variant][theme];
  const minWidthClass = variant === "full" ? "min-w-logo" : "min-w-symbol";
  const widthClass = className ?? (variant === "full" ? "w-[180px]" : "w-9");

  return (
    <Link
      href="/"
      aria-label="MODUX Creative, página inicial"
      className={`inline-block shrink-0 ${minWidthClass} ${widthClass}`}
    >
      <Image
        src={asset.src}
        alt="MODUX Creative"
        width={asset.width}
        height={asset.height}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
