"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-ink/40 data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in",
        className,
      )}
      {...props}
    />
  );
}

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "left" | "right";
};

function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex h-dvh w-full max-w-md flex-col border-line bg-card shadow-xl",
          side === "right"
            ? "right-0 border-l data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in"
            : "left-0 border-r data-[state=closed]:animate-sheet-out-left data-[state=open]:animate-sheet-in-left",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-strong hover:text-ink"
          aria-label="Tutup"
        >
          <X className="size-5" aria-hidden="true" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 p-6 pr-16", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("font-display text-2xl font-semibold text-balance", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn("text-sm leading-relaxed text-ink-soft text-pretty", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto border-t border-line bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
};
