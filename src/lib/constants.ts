/**
 * Extended design system constants for comprehensive layout control
 */

// Icon sizes for consistent scaling
export const ICON_SIZES = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
  "2xl": "size-8",
} as const;

// Container max-widths for consistent layout boundaries
export const CONTAINER_WIDTHS = {
  narrow: "max-w-3xl",
  content: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

// Spacing values for consistent gaps and padding
export const SPACING = {
  section: "py-12 sm:py-16 lg:py-20",
  sectionTop: "mt-16 sm:mt-20 lg:mt-24",
  cardPadding: "p-5 sm:p-6 lg:p-8",
  cardGap: "gap-6 sm:gap-8 lg:gap-10",
  contentGap: "gap-10 sm:gap-12 lg:gap-16",
} as const;

// Touch target sizes for accessibility
export const TOUCH_TARGET = {
  min: "size-11", // 44px minimum
  comfortable: "h-11 min-w-11",
} as const;

// Border radius tokens for brand consistency
export const RADIUS = {
  card: "rounded-card", // 1.25rem (20px)
  panel: "rounded-panel", // 2rem (32px)
  full: "rounded-full",
} as const;

// Typography scale for consistent text sizing
export const TEXT = {
  display: {
    hero: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl",
    section: "text-3xl sm:text-4xl lg:text-5xl",
    card: "text-2xl sm:text-3xl",
  },
  heading: {
    h1: "text-4xl sm:text-5xl lg:text-6xl",
    h2: "text-2xl sm:text-3xl lg:text-4xl",
    h3: "text-xl sm:text-2xl",
    h4: "text-lg sm:text-xl",
  },
  body: {
    lg: "text-base sm:text-lg",
    md: "text-sm sm:text-base",
    sm: "text-xs sm:text-sm",
  },
} as const;

// Grid layouts for responsive design
export const GRID = {
  cards2: "grid grid-cols-1 sm:grid-cols-2",
  cards3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  cards4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  autoFit: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
} as const;

export type IconSize = keyof typeof ICON_SIZES;
export type ContainerWidth = keyof typeof CONTAINER_WIDTHS;
