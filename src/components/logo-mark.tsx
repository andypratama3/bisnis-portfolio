import { cn } from "@/lib/utils";

const colors = ["#E23D5A", "#E7B10A", "#2B8CE0", "#2F9E57"];

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid size-8 shrink-0 grid-cols-2 gap-0.5 rounded-lg bg-ink p-1", className)}
      aria-hidden="true"
    >
      {colors.map((color) => (
        <span key={color} className="rounded-[2px]" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}
