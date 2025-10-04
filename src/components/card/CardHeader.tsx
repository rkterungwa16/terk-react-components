import { forwardRef } from "react";
import classnames from "classnames";
import { CardHeaderProps } from "./types";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, colors, borderBottom, ...rest }, ref) => {
    let background = colors?.background;
    let text = colors?.text;
    let borderBottomWidthClass;
    let borderBottomStyleClass;
    let borderBottomColorClass;

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

    if (borderBottom) {
      borderBottomColorClass = `terkui-border-bottom-${
        borderBottom.color.name
      }${borderBottom.color?.shade ? `-${borderBottom.color.shade}` : ""}`;
      borderBottomStyleClass = `terkui-border-bottom-${borderBottom.style}`;
      borderBottomWidthClass = `terkui-border-bottom-w-${borderBottom.width}`;
    }

    const classes = [
      `terkui-background-${background.name}${
        background?.shade ? `-${background.shade}` : ""
      }`,
      `terkui-text-${text.name}${text?.shade ? `-${text.shade}` : ""}`,
      ...(borderBottomColorClass ? [borderBottomColorClass] : []),
      ...(borderBottomStyleClass ? [borderBottomStyleClass] : []),
      ...(borderBottomWidthClass ? [borderBottomWidthClass] : []),
    ];

    return (
      <div
        className={classnames(classes, "terkui-card-header", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

