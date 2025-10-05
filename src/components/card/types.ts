import { HtmlHTMLAttributes } from "react";
import { Colors, ColorShades, IconSize, Rounded, TextComponent } from "../../types";

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  colors?: {
    background?: {
      name: Colors;
      shade?: ColorShades;
    };
    text?: {
      name: Colors;
      shade?: ColorShades;
    };
  };
  border?: {
    color: {
      name: Colors;
      shade?: ColorShades;
    };
    width: 1 | 2;
    style: "solid" | "dash";
  };
  rounded?: Rounded;
}

export interface CardHeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  colors?: {
    background?: {
      name: Colors;
      shade?: ColorShades;
    };
    text?: {
      name: Colors;
      shade?: ColorShades;
    };
  };
  borderBottom?: {
    color: {
      name: Colors;
      shade?: ColorShades;
    };
    width: 1 | 2;
    style: "solid" | "dash";
  };
}

export interface CardIconProps extends HtmlHTMLAttributes<HTMLDivElement> {
  border?: {
    color: {
      name: Colors;
      shade?: ColorShades;
    };
    width: 1 | 2;
    style: "solid" | "dash";
  };
  size?: IconSize;
}

export interface CardHeaderTextProps
  extends HtmlHTMLAttributes<
    HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
  > {
  colors?: {
    text?: {
      name: Colors;
      shade?: ColorShades;
    };
  };
  component?: TextComponent;
}
