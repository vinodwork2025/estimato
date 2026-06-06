"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Body scroll lock — saves position, restores on close
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Escape key + focus first element on open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // Move focus into dialog
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      "input, select, textarea, button, [tabindex]"
    );
    firstFocusable?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "relative bg-bg-primary w-full",
          // Desktop — max-width, standard rounding
          "sm:max-w-[560px] sm:rounded-card",
          // Mobile — full width, bottom-sheet style, rounded top only
          "rounded-t-xl",
          // Scroll
          "max-h-[92vh] overflow-y-auto overscroll-contain",
          "shadow-2xl",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header — always visible while scrolling the form */}
        <div className="sticky top-0 z-10 bg-bg-primary flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-border">
          <h2 id="modal-title" className="text-base sm:text-lg font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded flex items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 sm:px-6 py-5 sm:py-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
