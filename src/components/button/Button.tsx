import { forwardRef, Ref } from "react";
import classnames from "classnames";
import { ButtonProps } from "./types";
import { generatePaddingClasses } from "../../utils/padding";

export const CardIcon = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      variant,
      shape,
      color,
      colors,
      size,
      padding,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    let variantClass;
    let shapeClass;
    let colorClass;
    let sizeClass;
    let paddingClasses;
    let backgroundColorClass;
    let textColorClass;
    let borderWidthClass;
    let borderStyleClass;
    let borderColorClass;

    if (colors?.background) {
      backgroundColorClass = `terkui-bg-${colors.background.name}${
        colors.background?.shade ? `-${colors.background.shade}` : ""
      }`;
    }

    if (colors?.text) {
      textColorClass = `terkui-text-${colors.text.name}${
        colors.text?.shade ? `-${colors.text.shade}` : ""
      }`;
    }

    if (colors?.border) {
      borderColorClass = `terkui-border-${colors.border.name}${
        colors.border?.shade ? `-${colors.border.shade}` : ""
      }`;
      borderStyleClass = `terkui-border-${colors.border.style}`;
      borderWidthClass = `terkui-border-w-${colors.border.width}`;
    }

    if (variant) {
      variantClass = `terkui-btn-${variant}`;
    }

    if (shape) {
      shapeClass = `terkui-btn-${shape}`;
    }

    if (size) {
      sizeClass = `terkui-btn-${size}`;
    }

    if (color) {
      colorClass = `terkui-btn-${color}`;
    }

    if (padding) {
      paddingClasses = generatePaddingClasses(padding);
    }

    const classes = [
      ...(borderColorClass ? [borderColorClass] : []),
      ...(borderStyleClass ? [borderStyleClass] : []),
      ...(borderWidthClass ? [borderWidthClass] : []),
      ...(backgroundColorClass ? [backgroundColorClass] : []),
      ...(textColorClass ? [textColorClass] : []),
      ...(variantClass ? [variantClass] : []),
      ...(shapeClass ? [shapeClass] : []),
      ...(sizeClass ? [sizeClass] : []),
      ...(colorClass ? [colorClass] : []),
      ...(paddingClasses ? paddingClasses : []),
    ];

    if (href) {
      <a
        className={classnames(classes, "terkui-btn", className)}
        {...rest}
        ref={ref as Ref<HTMLAnchorElement> | undefined}
        href={href}
      >
        {children}
      </a>;
    }
    return (
      <button
        className={classnames(classes, "terkui-btn", className)}
        {...rest}
        ref={ref as Ref<HTMLButtonElement> | undefined}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
