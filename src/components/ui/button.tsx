import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "light";
const styles: Record<Variant, string> = {
  primary: "bg-brand text-cream hover:bg-ink",
  secondary: "border border-brand/35 text-brand hover:bg-brand/5",
  light: "bg-yellow text-brand hover:bg-cream",
};
const classes = (variant: Variant, extra = "") => `button ${styles[variant]} ${extra}`;

export function Button({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={classes(variant, className)} {...props} />;
}

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={classes(variant, className)} {...props} />;
}
