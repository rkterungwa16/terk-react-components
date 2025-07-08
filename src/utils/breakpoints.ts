// export const breakpoints = {
//   xs: "320px",
//   sm: "640px",
//   md: "768px",
//   lg: "1024px",
//   xl: "1280px",
//   "2xl": "1536px",
// };

// Mobile Devices – 320px—480px
export const MOBILE = 480;

// iPads and Tablets – 481px—768px
export const TABLETS = 768;
// Laptops and small screen – 769px—1024px
export const LAPTOPS = 1024;
// Large screens and Desktops – 1025px—1200px
export const DESKTOPS = 1280;
// TV and Extra Large Screens – 1201px and more
export const LARGETV = 1536;

export const breakpoints = {
  sm: MOBILE,
  md: TABLETS,
  lg: LAPTOPS,
  xl: DESKTOPS,
  "2xl": LARGETV,
};

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type Devices = {
  [size: string]: string;
};
