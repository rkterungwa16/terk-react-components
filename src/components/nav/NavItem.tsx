import { ElementType, forwardRef } from "react";
import classnames from "classnames";
import { Link, LinkProps } from "../link";

import "./styles.css";

export interface NavItemProps {
  classes?: {
    link?: string;
    item?: string;
  };
  component: "div" | "li" | "span" | ElementType;
  "data-testid"?: string;
}
export const NavItem = forwardRef<
  HTMLLIElement | HTMLDivElement,
  LinkProps & NavItemProps
>(({ children, component = "li", ...others }, ref) => {
  const classes = [
    "terkui-nav-item",
    "terkui-text-white",
    others.classes?.item,
  ];
  const Component = component;
  // Extract props that should not be passed to Link
  const {
    classes: classesProps,
    "data-testid": testId,
    ...linkProps
  } = others;

  if (linkProps.href) {
    children = (
      <Link className={classnames(classesProps?.link)} {...linkProps}>
        {children}
      </Link>
    );
  }
  return (
    <Component className={classnames(classes)} ref={ref} data-testid={testId}>
      {children}
    </Component>
  );
});
