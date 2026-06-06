"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "w-full max-w-[560px] rounded-card p-0 shadow-xl backdrop:bg-black/50",
        "m-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "max-h-[90vh] overflow-y-auto overscroll-contain",
        "max-sm:max-w-full max-sm:max-h-full max-sm:h-full max-sm:rounded-none max-sm:m-0 max-sm:inset-0 max-sm:translate-none",
        className
      )}
      aria-labelledby="modal-title"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-1 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="px-6 py-6">{children}</div>
    </dialog>
  );
}
