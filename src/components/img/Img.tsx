import { forwardRef } from "react";
import classnames from "classnames";
import { ImgProps } from "./types";

export const Img = forwardRef<HTMLImageElement, ImgProps>(
  (
    {
      children,
      className,
      fill,
      position,
      width,
      height,
      objectFit,
      rounded,
      ...rest
    },
    ref
  ) => {
    let imgClass = "";
    let positionClass;
    let objectFitClass;

    if (fill) {
      imgClass = "terkui-img-fill";
    }

    if (position) {
      positionClass = `terkui-${position}`;
    }

    if (objectFit) {
      objectFitClass = `terkui-img-${objectFit}`;
    }

    const classes = [
      imgClass,
      `terkui-rounded-${rounded}`,
      ...(positionClass ? [positionClass] : []),
      ...(objectFitClass ? [objectFitClass] : []),
    ];

    return (
      <img
        {...(width && { width })}
        {...(height && { height })}
        className={classnames(classes, "terkui-img", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </img>
    );
  }
);
