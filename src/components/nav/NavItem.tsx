import { ElementType, forwardRef } from "react";
import classnames from "classnames";
import { Link, LinkProps } from "../link";

import "./styles.css";

export interface NavItemProps {
  classes?: {
    link?: string;
    item?: string;
  };
  component: "div" | "li" | ElementType;
}
export const NavItem = forwardRef<
  HTMLLIElement | HTMLDivElement,
  LinkProps & NavItemProps
>(({ children, component = "li", ...others }, ref) => {
  const classes = ["terkui-nav-item", others.classes?.item];
  const Component = component;
  if (others.href) {
    children = (
      <Link className={classnames(others.classes?.link)} {...others}>
        {children}
      </Link>
    );
  }
  return (
    <Component className={classnames(classes)} ref={ref}>
      {children}
    </Component>
  );
});
