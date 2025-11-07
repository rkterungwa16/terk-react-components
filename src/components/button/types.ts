import { HtmlHTMLAttributes } from "react";
import { Colors, ColorShades, PaddingSpacing } from "../../types";

export type ButtonColors =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | string;
export type ButtonVariants =
  | "contained"
  | "outline"
  | "ghost"
  | "link"
  | "icon"
  | string;
export type ButtonSizes = "sm" | "md" | "l";

export type ButtonShapes = "rounded" | "circle" | "pill" | "square" | string;

export interface ButtonProps extends HtmlHTMLAttributes<HTMLElement> {
  colors?: {
    background?: {
      name: Colors;
      shade?: ColorShades;
    };
    text?: {
      name: Colors;
      shade?: ColorShades;
    };
    border?: {
      name: Colors;
      shade?: ColorShades;
      width: 1 | 2;
      style: "solid" | "dash";
    };
  };
  color?: ButtonColors;
  shape?: ButtonShapes;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  padding?: PaddingSpacing;
  disabled?: boolean;
  href?: string;
  // active?: boolean;
}
