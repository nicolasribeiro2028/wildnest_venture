"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white rounded-[var(--radius-pill)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-px transition-[var(--btn-transition)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-[var(--radius-pill)] hover:bg-[var(--color-border)]/30 transition-[var(--btn-transition)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  outline:
    "bg-transparent text-[var(--color-foreground)] border border-[var(--color-border)] rounded-[var(--radius-pill)] hover:bg-[var(--color-secondary)] transition-[var(--btn-transition)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
};

const base =
  "inline-flex items-center justify-center font-[var(--btn-font-weight)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)]";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

export function Button(props: ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant = "primary", children, className = "", ...rest } = props;
  const combined = `${base} ${variantStyles[variant]} ${className}`.trim();
  return (
    <button type="button" className={combined} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
} & Partial<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">>;

export function ButtonLink(props: ButtonLinkProps) {
  const { variant = "primary", children, className = "", href, ...rest } = props;
  const combined = `${base} ${variantStyles[variant]} ${className}`.trim();
  return (
    <Link href={href} className={combined} {...rest}>
      {children}
    </Link>
  );
}
