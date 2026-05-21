import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  as?: "button" | "a";
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  as: Tag = "button",
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-medium tracking-[0.018em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-navy text-text-inverse hover:bg-navy-light rounded-[3px] shadow-[0_1px_3px_rgba(13,31,60,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_2px_8px_rgba(13,31,60,0.22)]",
    secondary:
      "bg-transparent text-text-primary border border-border hover:border-border-strong rounded-[3px]",
    ghost:
      "bg-transparent text-text-tertiary hover:text-text-primary rounded-[3px]",
    danger:
      "bg-error text-white rounded-[3px] hover:opacity-90",
    gold:
      "bg-gold text-white rounded-[3px] hover:bg-gold-muted shadow-[0_1px_3px_rgba(184,149,78,0.25)] hover:shadow-[0_2px_8px_rgba(184,149,78,0.30)]",
  };

  const sizes = {
    sm: "h-9 px-5 text-[12px] gap-1.5",
    md: "h-11 px-6 text-[13px] gap-2",
    lg: "h-[52px] px-9 text-[14px] gap-2",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (Tag === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={classes}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
