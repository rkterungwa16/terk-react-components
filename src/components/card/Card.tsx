import { forwardRef } from "react";
import classnames from "classnames";
import { CardProps } from "./types";

import "./style.css";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, colors, rounded = 1, border, height, width, ...rest }, ref) => {
    let background = colors?.background;
    let text = colors?.text;
    let borderWidthClass;
    let borderStyleClass;
    let borderColorClass;
    let heightClass = "terkui-h-100";
    let widthClass = "terkui-w-100";

    if (!background) {
      background = {
        name: "white",
      };
    }

    if (!text) {
      text = {
        name: "black",
      };
    }

    if (height) {
      heightClass = `terkui-h-${height}`;
      widthClass = `terkui-w-${width}`;
    }

    if (border) {
      borderColorClass = `terkui-border-${border.color.name}${
        border.color?.shade ? `-${border.color.shade}` : ""
      }`;
      borderStyleClass = `terkui-border-${border.style}`;
      borderWidthClass = `terkui-border-w-${border.width}`;
    }

    const classes = [
      `terkui-bg-${background.name}${
        background?.shade ? `-${background.shade}` : ""
      }`,
      `terkui-text-${text.name}${text?.shade ? `-${text.shade}` : ""}`,
      `terkui-rounded-${rounded}`,
      heightClass,
      widthClass,
      ...(borderColorClass ? [borderColorClass] : []),
      ...(borderStyleClass ? [borderStyleClass] : []),
      ...(borderWidthClass ? [borderWidthClass] : []),
    ];

    return (
      <div
        className={classnames(classes, "terkui-card", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
