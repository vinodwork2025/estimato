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
    "inline-flex items-center justify-center font-sans font-medium tracking-[0.022em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-gradient-to-b from-[#1b3568] to-[#0c1d42] text-white rounded-[2px] " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(12,29,66,0.3),0_2px_12px_rgba(12,29,66,0.18)] " +
      "hover:from-[#1f3d78] hover:to-[#0f2250] " +
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_2px_4px_rgba(12,29,66,0.35),0_6px_22px_rgba(12,29,66,0.24)] " +
      "active:from-[#0c1d42] active:to-[#0c1d42] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]",
    secondary:
      "bg-transparent text-navy rounded-[2px] border border-navy/20 " +
      "hover:border-navy/50 hover:bg-navy/[0.03]",
    ghost:
      "bg-transparent text-text-secondary hover:text-navy rounded-[2px] hover:bg-navy/[0.04]",
    danger:
      "bg-error text-white rounded-[2px] shadow-[0_1px_3px_rgba(200,0,0,0.18)] hover:opacity-90",
    gold:
      "bg-gradient-to-b from-[#d4a540] to-[#b07825] text-white rounded-[2px] " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(176,120,37,0.25),0_2px_10px_rgba(176,120,37,0.16)] " +
      "hover:from-[#dbb04a] hover:to-[#b8802d] " +
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(176,120,37,0.3),0_4px_16px_rgba(176,120,37,0.2)]",
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
