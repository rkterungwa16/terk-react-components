import { forwardRef, ReactNode } from "react";
import classnames from "classnames";

import "./styles.css";

/**
 * sm - Set container 100% wide until small breakpoint.
 * md - Set container 100% wide until medium breakpoint.
 * lg - Set container 100% wide until large breakpoint.
 * xl - Set container 100% wide until X-large breakpoint.
 * 2xl - Set container 100% wide until 2X-large breakpoint.
 * fluid - Set container 100% wide, spanning the entire width of the viewport.
 */
export type ContainerBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "fluid";

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  breakpoint?: ContainerBreakpoint;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, breakpoint, className, ...rest }, ref) => {
    return (
      <div
        className={classnames(`terkui-container-${breakpoint}`, className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
