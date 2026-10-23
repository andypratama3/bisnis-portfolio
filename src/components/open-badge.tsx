"use client";

import { useEffect, useState } from "react";
import type { WeeklyHours } from "@/data/types";
import { siteConfig } from "@/data/site";
import { getOpenState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

const unknownState: OpenState = { status: "unknown", label: "Jam belum diumumkan" };

export function OpenBadge({ hours, className }: { hours: WeeklyHours | null; className?: string }) {
  const [state, setState] = useState<OpenState>(unknownState);

  useEffect(() => {
    if (!hours) return;

    const update = () => setState(getOpenState(hours, new Date(), siteConfig.timeZone));
    update();
    const timer = window.setInterval(update, 60_000);

    return () => window.clearInterval(timer);
  }, [hours]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink-soft",
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          state.status === "open" && "bg-emerald-600",
          state.status === "closed" && "bg-danger",
          state.status === "unknown" && "bg-ink-soft/50",
        )}
        aria-hidden="true"
      />
      {state.label}
    </span>
  );
}
