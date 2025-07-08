import { useState, useEffect, useCallback } from "react";
import { Breakpoint, breakpoints } from "../utils/breakpoints";

export const checkCurrentBreakpoint = (width: number): Breakpoint => {
  if (width < breakpoints.md) {
    return "sm";
  } else if (width >= breakpoints.md && width < breakpoints.lg) {
    return "md";
  } else if (width >= breakpoints.lg && width < breakpoints.xl) {
    return "lg";
  } else if (width >= breakpoints.xl && width < breakpoints["2xl"]) {
    return "xl";
  } else if (width >= breakpoints["2xl"]) {
    return "2xl";
  } else {
    return "lg";
  }
};

export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);
  const width = window.innerWidth;
  const handleScreenResize = useCallback(() => {
    const width = window.innerWidth;
    setBreakpoint(checkCurrentBreakpoint(width));
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleScreenResize);
      setBreakpoint(checkCurrentBreakpoint(width));
      return () => window.removeEventListener("resize", handleScreenResize);
    }
  }, [handleScreenResize, setBreakpoint, width]);
  return breakpoint;
}
