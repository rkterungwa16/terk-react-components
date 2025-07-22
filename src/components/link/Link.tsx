import { forwardRef } from "react";
import classNames from "classnames";
import { LinkProps } from "./types";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, active, className, disabled, onClick, ...rest }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    return (
      <a
        className={classNames(className, "terkui-link")}
        {...(active && { "aria-current": "page" })}
        {...(disabled && { "aria-disabled": true, tabIndex: -1 })}
        onClick={handleClick}
        {...rest}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);
