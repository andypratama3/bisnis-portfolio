import { describe, expect, it } from "vitest";
import type { WeeklyHours } from "@/data/types";
import { getOpenState } from "./hours";

const weekdays = (opens: string, closes: string): WeeklyHours => ({
  sunday: { opens, closes },
  monday: { opens, closes },
  tuesday: { opens, closes },
  wednesday: { opens, closes },
  thursday: { opens, closes },
  friday: { opens, closes },
  saturday: { opens, closes },
});

describe("getOpenState", () => {
  it("returns unknown when hours are not published", () => {
    expect(getOpenState(null).status).toBe("unknown");
  });

  it("detects open and closed states in Asia/Makassar", () => {
    const hours = weekdays("08:00", "17:00");

    expect(getOpenState(hours, new Date("2026-01-01T00:00:00Z")).status).toBe("open");
    expect(getOpenState(hours, new Date("2026-01-01T09:00:00Z")).status).toBe("closed");
  });

  it("supports hours that cross midnight", () => {
    const hours = weekdays("20:00", "02:00");

    expect(getOpenState(hours, new Date("2026-01-01T15:00:00Z")).status).toBe("open");
    expect(getOpenState(hours, new Date("2026-01-01T10:00:00Z")).status).toBe("closed");
  });
});
