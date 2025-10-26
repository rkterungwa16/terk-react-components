import { forwardRef } from "react";
import classnames from "classnames";
import { CardBodyProps } from "./types";
import { generatePaddingClasses } from "../../utils/padding";

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, colors, overflow, padding, ...rest }, ref) => {
    let background = colors?.background;
    let text = colors?.text;
    let overflowYClass;
    let paddingClasses;

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

    if (overflow?.y) {
      overflowYClass = `terkui-overflow-y-${overflow.y}`;
    }

    if (padding) {
      paddingClasses = generatePaddingClasses(padding)
    }

    const classes = [
      `terkui-background-${background.name}${
        background?.shade ? `-${background.shade}` : ""
      }`,
      `terkui-text-${text.name}${text?.shade ? `-${text.shade}` : ""}`,
      ...(overflowYClass ? [overflowYClass] : []),
      ...(paddingClasses ? paddingClasses : []),
    ];

    return (
      <div
        className={classnames(classes, "terkui-card-body", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

