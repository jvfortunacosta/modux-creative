import { ReactNode } from "react";

export default function Eyebrow({
  children,
  theme = "light",
  className = "",
}: {
  children: ReactNode;
  theme?: "light" | "dark";
  className?: string;
}) {
  const textColor = theme === "dark" ? "text-modux-canvas" : "text-modux-graphite";

  return (
    <span
      className={`inline-flex items-center gap-3 text-eyebrow font-bold uppercase ${textColor} ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-modux-lime" />
      {children}
    </span>
  );
}
