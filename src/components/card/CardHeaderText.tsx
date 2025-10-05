import { forwardRef } from "react";
import classnames from "classnames";
import { CardHeaderTextProps } from "./types";

export const CardHeaderText = forwardRef<HTMLDivElement, CardHeaderTextProps>(
  ({ children, className, colors, component = "h5", ...rest }, ref) => {
    let text = colors?.text;
    const Component = component;

    if (!text) {
      text = {
        name: "black",
      };
    }

    const classes = [
      `terkui-text-${text.name}${text?.shade ? `-${text.shade}` : ""}`,
      `terkui-text-${component}`
    ];

    return (
      <Component
        className={classnames(classes, "terkui-card-header-text", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
