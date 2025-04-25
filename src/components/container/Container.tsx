import { forwardRef } from "react";
import classnames from "classnames";

import { IContainerProps } from "./types";
import "./style.css";

export const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, ...others }, ref) => {
    return (
      <div
        className={classnames(
          `terkui-container-${others.breakpoint}`,
          others.className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
