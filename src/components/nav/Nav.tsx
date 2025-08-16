import { ElementType, forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";
import { generatePaddingClasses, PaddingSpacing } from "../../utils/padding";

export interface NavProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement | HTMLOListElement> {
  className?: string;
  component?: "div" | "ul" | "nav" | ElementType;
  justify?: "start" | "center" | "end";
  direction?: "horizontal" | "vertical";
  padding?: PaddingSpacing;
  "data-testid"?: string;
}

export const Nav = forwardRef<
  HTMLDivElement | HTMLUListElement | HTMLOListElement,
  NavProps
>(
  (
    {
      children,
      className,
      component: Component = "ul",
      justify,
      direction,
      padding,
      ...rest
    },
    ref
  ) => {
    const paddingClasses = generatePaddingClasses(padding);
    const classes = [
      "terkui-nav",
      `terkui-nav-justify-${justify}`,
      `terkui-nav-direction-${direction}`,
      className,
      ...paddingClasses,
    ];

    return (
      <Component
        className={classnames(classes)}
        role="navigation"
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
