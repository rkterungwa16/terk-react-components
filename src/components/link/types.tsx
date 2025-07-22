import { AllHTMLAttributes } from "react";

export interface LinkAttrProps extends AllHTMLAttributes<HTMLElement> {
  active?: boolean;
  className?: string;
}

export interface LinkProps
  extends LinkAttrProps,
    AllHTMLAttributes<HTMLElement> {}
