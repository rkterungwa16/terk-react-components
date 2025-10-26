import { forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";
import { Container, ContainerBreakpoint } from "../container/Container";
import {  generatePaddingClasses } from "../../utils/padding";
import { PaddingSpacing } from "../../types";
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
  /**
   * Apply padding to the header
   */
  padding?: PaddingSpacing;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, container, position, padding, ...rest }, ref) => {
    const classes = [
      "terkui-header",
      ...(position ? [`terkui-header-${position}`] : []),
      ...generatePaddingClasses(padding),
      className,
    ];

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
