import { forwardRef } from "react";
import classnames from "classnames";
import { CardIconProps } from "./types";

export const CardIcon = forwardRef<HTMLDivElement, CardIconProps>(
  ({ children, className, border, size, ...rest }, ref) => {
    let borderWidthClass;
    let borderStyleClass;
    let borderColorClass;

     if (border) {
      borderColorClass = `terkui-border-${border.color.name}${
        border.color?.shade ? `-${border.color.shade}` : ""
      }`;
      borderStyleClass = `terkui-border-${border.style}`;
      borderWidthClass = `terkui-border-w-${border.width}`;
    }

    const classes = [
      ...(borderColorClass ? [borderColorClass] : []),
      ...(borderStyleClass ? [borderStyleClass] : []),
      ...(borderWidthClass ? [borderWidthClass] : []),
      ...(size ? [`terkui-icon-${size}`] : []),
    ];


    return (
      <div
        className={classnames(classes, "terkui-card-icon", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
