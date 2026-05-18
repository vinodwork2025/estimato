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
    "inline-flex items-center justify-center font-semibold rounded-full tracking-[-0.01em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.96] active:translate-y-[1px] select-none";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-light shadow-[0_2px_8px_rgba(14,33,70,0.20),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_4px_16px_rgba(14,33,70,0.28)]",
    secondary:
      "bg-white text-text-primary border border-border hover:border-navy/25 hover:bg-surface-low shadow-sm hover:shadow-md",
    ghost:
      "bg-transparent text-text-secondary hover:text-navy hover:bg-navy/4",
    danger:
      "bg-error text-white hover:opacity-90 shadow-sm",
    gold:
      "bg-gradient-to-br from-gold to-gold-light text-white font-semibold shadow-[0_4px_16px_rgba(197,160,89,0.30),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_8px_28px_rgba(197,160,89,0.40)] hover:opacity-97",
  };

  const sizes = {
    sm: "h-9 px-5 text-[13px] gap-1.5",
    md: "h-11 px-6 text-sm gap-2",
    lg: "h-[52px] px-8 text-[15px] gap-2",
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
            className="animate-spin h-4 w-4 opacity-70"
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
