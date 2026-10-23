import type { DayKey, WeeklyHours } from "@/data/types";

export type OpenState = {
  status: "open" | "closed" | "unknown";
  label: string;
};

const weekdayToKey: Record<string, DayKey> = {
  Sun: "sunday",
  Mon: "monday",
  Tue: "tuesday",
  Wed: "wednesday",
  Thu: "thursday",
  Fri: "friday",
  Sat: "saturday",
};

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getLocalParts(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    day: weekdayToKey[weekday] ?? "sunday",
    minutes: hour * 60 + minute,
  };
}

export function getOpenState(
  hours: WeeklyHours | null,
  now: Date = new Date(),
  timeZone = "Asia/Makassar",
): OpenState {
  if (!hours) {
    return { status: "unknown", label: "Jam belum diumumkan" };
  }

  const { day, minutes } = getLocalParts(now, timeZone);
  const today = hours[day];

  if (!today) {
    return { status: "closed", label: "Tutup hari ini" };
  }

  const opens = toMinutes(today.opens);
  const closesRaw = toMinutes(today.closes);
  const closes = closesRaw <= opens ? closesRaw + 24 * 60 : closesRaw;
  const adjustedMinutes = minutes < opens && closesRaw <= opens ? minutes + 24 * 60 : minutes;

  if (adjustedMinutes >= opens && adjustedMinutes < closes) {
    return { status: "open", label: `Buka sampai ${today.closes}` };
  }

  return { status: "closed", label: `Buka ${today.opens}` };
}
