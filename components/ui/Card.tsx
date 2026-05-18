import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  as?: "div" | "button" | "article";
}

export function Card({
  children,
  className,
  selected,
  onClick,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "bg-white border rounded-card p-5 transition-all",
        onClick || Tag === "button"
          ? "cursor-pointer hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          : "",
        selected ? "border-accent ring-2 ring-accent/20" : "border-border",
        className
      )}
    >
      {children}
    </Tag>
  );
}
