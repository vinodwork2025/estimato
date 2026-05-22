import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, className, id, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-label="required">*</span>
            )}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 px-4 rounded-xl border text-text-primary text-sm placeholder:text-text-tertiary bg-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus:border-navy/30",
            "disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-150",
            error ? "border-error" : "border-border",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
              ? `${inputId}-hint`
              : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-error font-mono">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[11px] text-text-tertiary font-mono">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
