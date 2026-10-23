import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-brand-soft text-brand-ink",
        neutral: "bg-paper-strong text-ink-soft",
        outline: "border border-line bg-surface/80 text-ink-soft",
        glass: "glass-subtle border border-line-soft text-ink-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
