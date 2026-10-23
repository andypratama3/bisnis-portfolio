"use client";

import { Toaster as Sonner } from "sonner";

function Toaster() {
  return (
    <Sonner
      position="top-center"
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border border-line bg-card text-ink shadow-lg",
          description: "text-ink-soft",
          actionButton: "bg-brand text-brand-contrast",
          cancelButton: "bg-paper-strong text-ink-soft",
        },
      }}
    />
  );
}

export { Toaster };
