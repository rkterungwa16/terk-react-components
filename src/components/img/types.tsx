import { ImgHTMLAttributes } from "react";
import { Rounded } from "../../types";

export interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  position?: "relative" | "fixed" | "absolute";
  className?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover";
  width?: number;
  height?: number;
  rounded?: Rounded;
}
