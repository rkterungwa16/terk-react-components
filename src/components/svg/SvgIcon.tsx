import { HTMLAttributes, forwardRef } from "react";
import classnames from "classnames";
import "./styles.css";

export interface SvgIconProps extends HTMLAttributes<SVGSVGElement> {
  className?: string;
  height?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  viewBox?: string;
  width?: number;
}

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  ({ className, height, size, width, viewBox, children, ...rest }, ref) => {
    const classes = [...(size ? [`terkui-icon-size-${size}`] : []), className];

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        className={classnames(classes)}
        {...(height && { height: height })}
        {...(width && { width: width })}
        role="img"
        aria-hidden="true"
        {...rest}
        ref={ref}
      >
        {children}
      </svg>
    );
  }
);

