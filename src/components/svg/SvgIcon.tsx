import { HTMLAttributes, forwardRef } from "react";
import classnames from "classnames";
import "./styles.css";
import { IconSize } from "../../types";

export interface SvgIconProps extends HTMLAttributes<SVGSVGElement> {
  className?: string;
  height?: number;
  size?: IconSize;
  viewBox?: string;
  width?: number;
}

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  ({ className, height, size, width, viewBox, children, ...rest }, ref) => {
    const classes = [...(size ? [`terkui-icon-${size}`] : []), className];

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

