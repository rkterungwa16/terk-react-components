import { Spacing } from "./spacing";

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

export const generatePaddingClasses = (padding?: PaddingSpacing) => {
  return padding
    ? Object.keys(padding)
        .map((_p) => {
          if (padding[_p]) {
            return `terkui-${_p}-${padding[_p]}`;
          }
          return null;
        })
        .filter((_class) => _class)
    : [];
};
