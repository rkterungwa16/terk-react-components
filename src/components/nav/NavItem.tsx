import { forwardRef } from "react";
import classnames from "classnames";
import { Link, LinkProps } from "../link";

import "./styles.css";

export interface NavItemProps {
  classes?: {
    link?: string;
    item?: string;
  };
}
export const NavItem = forwardRef<HTMLLIElement, LinkProps & NavItemProps>(
  ({ children, ...others }, ref) => {
    const classes = ["terkui-nav-item", others.classes?.item];
    if (others.href) {
      children = (
        <Link className={classnames(others.classes?.link)} {...others}>
          {children}
        </Link>
      );
    }
    return (
      <li className={classnames(classes)} ref={ref}>
        {children}
      </li>
    );
  }
);
