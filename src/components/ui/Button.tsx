"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "tertiary" | "white" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
}

const variants = {
  primary:   "bg-gradient-cta text-plum-on-primary hover:opacity-90 shadow-button focus:ring-plum-primary",
  secondary: "border border-[rgba(203,160,198,0.25)] text-plum-primary hover:bg-plum-surface-low focus:ring-plum-primary",
  tertiary:  "text-plum-primary hover:underline focus:ring-plum-primary",
  ghost:     "border border-white/30 text-white hover:bg-white/10 hover:border-white/60 focus:ring-white",
  white:     "bg-white text-plum-on-surface hover:bg-plum-surface-low shadow-card focus:ring-white",
  danger:    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, loading, className, children, disabled, ...props }, ref) => {
    const classes = clsx(
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "active:scale-95",
      variants[variant],
      sizes[size],
      (disabled || loading) && "opacity-60 cursor-not-allowed active:scale-100",
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
