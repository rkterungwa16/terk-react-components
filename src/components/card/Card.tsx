import { forwardRef } from "react";
import classnames from "classnames";
import { CardProps } from "./types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, colors, rounded = 1, ...rest }, ref) => {
    let background = colors?.background;
    let text = colors?.text;

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

    const classes = [
      `terkui-background-${background.name}${
        background?.shade ? `-${background.shade}` : ""
      }`,
      `terkui-text-${text.name}${text?.shade ? `-${text.shade}` : ""}`,
      `terkui-rounded-${rounded}`
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
