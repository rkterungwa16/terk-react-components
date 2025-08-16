import { forwardRef } from "react";
import classnames from "classnames";
import { Nav, NavProps } from "../nav/Nav";
import { HeaderNavData } from "./header-nav.data";
import { NavItem, NavItemProps } from "../nav/NavItem";
import { PaddingSpacing, generatePaddingClasses } from "../../utils/padding";

export interface HeaderNavProps {
  className?: string;
  components: {
    nav: NavProps;
    navItem: NavItemProps;
  };
  data: HeaderNavData;
  /**
   * Apply padding to the header navigation
   */
  padding?: PaddingSpacing;
}

export const HeaderNav = forwardRef<
  HTMLDivElement | HTMLUListElement | HTMLOListElement,
  HeaderNavProps
>(({ className, components, data, padding }, ref) => {
  const classes = [
    className,
    "terkui-header-nav",
    ...generatePaddingClasses(padding),
  ];

  return (
    <Nav
      className={classnames(classes)}
      component={components?.nav?.component}
      role="navigation"
      direction="horizontal"
      justify="start"
      {...components?.nav}
      ref={ref}
    >
      {data.map((_data, index) => {
        if (_data.component === "nav-item") {
          return (
            <NavItem
              key={`nav-item-${_data.name}-${index}`}
              component={components?.navItem?.component}
              classes={{
                item: "terkui-header-nav-item",
                // link: "terkui-header-nav-item",
              }}
              {...{ ...(_data.href && { href: _data.href }) }}
            >
              {_data.name}
            </NavItem>
          );
        }
        if (_data.component === "nav-group") {
          const items = _data.group?.map((_groupItem, index) => (
            <NavItem
              key={`nav-item-${_groupItem.name}-${index}`}
              component={components?.navItem.component}
              classes={{
                item: "terkui-header-nav-item",
                // link: "terkui-header-nav-item",
              }}
              {...{ ...(_groupItem.href && { href: _groupItem.href }) }}
            >
              {_groupItem.name}
            </NavItem>
          ));
          return (
            <nav
              key={`nav-group-${_data.name}-${index}`}
              className="terkui-flex"
            >
              {items}
            </nav>
          );
        }
        // if (_data.component === "subtitle") {
        //   return (
        //     <h6
        //       key={`subtitle-${_data.name}-${index}`}
        //       className="terkui-text-gray terkui-uppercase terkui-nav-subtitle"
        //     >
        //       {_data.name}
        //     </h6>
        //   );
        // }
        return null;
      })}
    </Nav>
  );
});
