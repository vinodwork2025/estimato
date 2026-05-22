import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, hint, options, placeholder, className, id, ...props },
    ref
  ) {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-label="required">*</span>
            )}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-11 px-4 rounded-xl border text-text-primary text-sm bg-white appearance-none",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus:border-navy/30",
            "disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-150",
            error ? "border-error" : "border-border",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} role="alert" className="text-xs text-error font-mono">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="text-[11px] text-text-tertiary font-mono">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
