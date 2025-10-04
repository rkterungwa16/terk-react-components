import { HtmlHTMLAttributes } from "react";
import { Colors, ColorShades, Rounded } from "../../types";

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement>{
  colors?: {
    background?: {
      name: Colors;
      shade?: ColorShades;
    };
    text?: {
      name: Colors;
      shade?: ColorShades;
    }
  }
  rounded?: Rounded;
}

export interface CardHeaderProps extends HtmlHTMLAttributes<HTMLDivElement>{
  colors?: {
    background?: {
      name: Colors;
      shade?: ColorShades;
    };
    text?: {
      name: Colors;
      shade?: ColorShades;
    }
  }
  borderBottom?: {
    color: {
      name: Colors;
      shade?: ColorShades
    };
    width: 1 | 2;
    style: "solid" | "dash";
  }
}
