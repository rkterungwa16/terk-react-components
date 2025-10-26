export type Spacing = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type PaddingSpacing = {
  p?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  px?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  py?: Spacing;
  [key: string]: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
};
