import { ElementType, forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";

export interface NavProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement | HTMLOListElement> {
  className?: string;
  component?: "div" | "ul" | "nav" | ElementType;
  justify?: "start" | "center" | "end";
  direction?: "horizontal" | "vertical";
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
      ...rest
    },
    ref
  ) => {
    const classes = [
      "terkui-nav",
      `terkui-nav-justify-${justify}`,
      `terkui-nav-direction-${direction}`,
      className,
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
