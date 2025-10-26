import { PaddingSpacing } from "../types";

export const generatePaddingClasses = (padding?: PaddingSpacing) => {
  return padding
    ? Object.keys(padding)
        .map((_p) => {
          if (padding[_p]) {
            return `terkui-${_p}-${padding[_p]}`;
          }
          return null;
        })
        .filter((_class) => _class)
    : [];
};
