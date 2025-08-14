import { forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";
import { Container, ContainerBreakpoint } from "../container/Container";
import "./styles.css";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  container?: {
    className?: string;
    breakpoint: ContainerBreakpoint;
  };
  /**
   * Place header in non-static positions
   */
  position?: "fixed" | "sticky";
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, container, position, ...rest }, ref) => {
    const classes = ["terkui-header", `terkui-header-${position}`, className];

    return (
      <div className={classnames(classes)} {...rest} ref={ref}>
        {container?.breakpoint ? (
          <Container {...container}>{children}</Container>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  },
);
