"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
  id?: string;
}

export function Toggle({ checked, onChange, label, hint, id }: ToggleProps) {
  const toggleId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={toggleId}
      className="flex items-center justify-between gap-4 cursor-pointer group py-3.5"
    >
      <div>
        <span className="font-medium text-text-primary text-sm">{label}</span>
        {hint && (
          <span className="block text-[11px] text-text-tertiary font-mono mt-0.5">{hint}</span>
        )}
      </div>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          role="switch"
          aria-checked={checked}
        />
        <div
          className={cn(
            "w-10 h-[22px] rounded-full transition-colors duration-200",
            checked ? "bg-navy" : "bg-border"
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              "w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 mt-[2px] ml-[2px]",
              checked ? "translate-x-[18px]" : "translate-x-0"
            )}
          />
        </div>
      </div>
    </label>
  );
}
