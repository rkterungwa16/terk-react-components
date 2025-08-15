import { forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";
import { Nav, NavProps } from "../nav/Nav";
import { NavData } from "./navData";
import { NavItem, NavItemProps } from "../nav/NavItem";

export interface SidebarNavProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement | HTMLOListElement> {
  className?: string;
  components: {
    nav: NavProps["component"];
    navItem: NavItemProps["component"];
  };
  data: NavData;
}

export const SidebarNav = forwardRef<
  HTMLDivElement | HTMLUListElement | HTMLOListElement,
  SidebarNavProps
>(({ className, components, data, ...rest }, ref) => {
  const classes = [className];

  return (
    <Nav
      className={classnames(classes)}
      component={components?.nav}
      role="navigation"
      direction="vertical"
      justify="start"
      {...rest}
      ref={ref}
    >
      {data.map((_data, index) => {
        if (_data.component === "nav-item") {
          return (
            <NavItem
              key={`nav-item-${_data.name}-${index}`}
              component={components?.navItem}
              classes={{
                // link: "terkui-sidebar-nav-link",
                item: "terkui-sidebar-nav-item",
              }}
              {...{ ...(_data.href && { href: _data.href }) }}
            >
              {_data.name}
            </NavItem>
          );
        }
        if (_data.component === "subtitle") {
          return (
            <h6
              key={`subtitle-${_data.name}-${index}`}
              className="terkui-text-gray terkui-uppercase terkui-sidebar-nav-subtitle"
            >
              {_data.name}
            </h6>
          );
        }
        return null;
      })}
    </Nav>
  );
});
