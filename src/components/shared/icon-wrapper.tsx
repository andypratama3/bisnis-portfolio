import { type LucideIcon } from "lucide-react";
import { ICON_SIZES, type IconSize } from "@/lib/constants";
import { cn } from "@/lib/utils";

type IconWrapperProps = {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  "aria-hidden"?: boolean;
};

/**
 * Standardized icon wrapper to eliminate hardcoded icon sizes
 * Usage: <IconWrapper icon={Phone} size="md" />
 */
export function IconWrapper({
  icon: Icon,
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
}: IconWrapperProps) {
  return <Icon className={cn(ICON_SIZES[size], className)} aria-hidden={ariaHidden} />;
}
