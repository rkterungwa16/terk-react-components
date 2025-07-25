import { forwardRef, HTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import { timeouts } from "../../utils/constants";

import "./styles.css";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
  timeout?: 150 | 200 | 250 | 300 | 350 | 400;
  animation?: "fadein" | "fadeout";
  children?: ReactNode;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    { className, visible, animation = "fadein", timeout, children, ...rest },
    ref
  ) => {
    const classes = [
      "terkui-overlay",
      ...(className ? [className] : []),
      `terkui-animation-${animation}-${timeouts[timeout || 150]}`,
      `terkui-opacity-${visible ? 1 : 0}`,
    ];

    return (
      <div className={classnames(classes)} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);
