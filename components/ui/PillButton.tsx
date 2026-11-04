import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "lime" | "inverse" | "outline-dark";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-modux-black text-modux-canvas hover:bg-modux-graphite",
  inverse: "bg-modux-canvas text-modux-black hover:brightness-95",
  secondary:
    "bg-transparent text-modux-black border border-modux-graphite/40 hover:border-modux-black",
  lime: "bg-modux-lime text-modux-black hover:brightness-95",
  "outline-dark":
    "bg-transparent text-modux-canvas border border-modux-canvas/40 hover:border-modux-canvas",
};

const BASE_CLASSES =
  "group inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ease-modux disabled:pointer-events-none disabled:opacity-60";

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 ease-modux group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M2 8h11.5M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function PillButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className = "", showArrow = true } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (typeof props.href === "string") {
    const externalProps = props.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={props.href} className={classes} {...externalProps}>
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
