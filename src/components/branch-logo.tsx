import Image from "next/image";
import type { Business } from "@/data/types";
import { cn } from "@/lib/utils";

export function BranchLogo({
  business,
  className,
}: {
  business: Business;
  className?: string;
}) {
  if (business.logo) {
    return (
      <span
        className={cn(
          "inline-flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-1.5",
          className,
        )}
      >
        <Image
          src={business.logo.src}
          alt={business.logo.alt}
          width={business.logo.width}
          height={business.logo.height}
          className="size-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex size-16 items-center justify-center rounded-2xl bg-brand-soft font-display text-xl font-bold text-brand-ink",
        className,
      )}
      aria-hidden="true"
    >
      SS
    </span>
  );
}
