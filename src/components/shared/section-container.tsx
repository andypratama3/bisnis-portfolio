import { type ReactNode } from "react";
import { CONTAINER_WIDTHS, type ContainerWidth } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  as?: "section" | "div";
};

/**
 * Standardized section container with consistent max-width and padding
 * Usage: <SectionContainer width="default">...</SectionContainer>
 */
export function SectionContainer({
  children,
  width = "default",
  className,
  id,
  "aria-labelledby": ariaLabelledBy,
  as: Component = "section",
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("mx-auto px-4 sm:px-6", CONTAINER_WIDTHS[width], className)}
    >
      {children}
    </Component>
  );
}
