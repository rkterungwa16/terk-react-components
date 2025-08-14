import { render, screen, act, cleanup } from "@testing-library/react";
import {
  useCurrentBreakpoint,
  checkCurrentBreakpoint,
} from "./useCurrentBreakpoint";
import { breakpoints } from "../utils/breakpoints";
import { useEffect } from "react";
import { jest } from "@jest/globals";

// Test component that displays the current breakpoint
function TestComponent() {
  const breakpoint = useCurrentBreakpoint();

  return (
    <div data-testid="breakpoint-display">
      {breakpoint === null ? "null" : breakpoint}
    </div>
  );
}

// Component that calls a callback when breakpoint changes
function BreakpointObserver({
  onChange,
}: {
  onChange: (bp: string | null) => void;
}) {
  const breakpoint = useCurrentBreakpoint();

  useEffect(() => {
    onChange(breakpoint);
  }, [breakpoint, onChange]);

  return null;
}

describe("useCurrentBreakpoint Hook", () => {
  // Save original innerWidth
  const originalInnerWidth = window.innerWidth;

  // Mock addEventListener and removeEventListener
  const addEventListenerSpy = jest.spyOn(window, "addEventListener");
  const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

  afterEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Reset innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: originalInnerWidth,
    });
  });

  afterAll(() => {
    // Restore original spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test("checkCurrentBreakpoint correctly identifies breakpoints", () => {
    expect(checkCurrentBreakpoint(breakpoints.sm - 1)).toBe("sm");
    expect(checkCurrentBreakpoint(breakpoints.md)).toBe("md");
    expect(checkCurrentBreakpoint(breakpoints.lg)).toBe("lg");
    expect(checkCurrentBreakpoint(breakpoints.xl)).toBe("xl");
    expect(checkCurrentBreakpoint(breakpoints["2xl"])).toBe("2xl");

    // Edge cases
    expect(checkCurrentBreakpoint(breakpoints.md - 1)).toBe("sm");
    expect(checkCurrentBreakpoint(breakpoints.lg - 1)).toBe("md");
    expect(checkCurrentBreakpoint(breakpoints.xl - 1)).toBe("lg");
    expect(checkCurrentBreakpoint(breakpoints["2xl"] - 1)).toBe("xl");
  });

  test("returns the current breakpoint based on window width", () => {
    // Set window width to mobile size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: breakpoints.sm,
    });

    render(<TestComponent />);
    expect(screen.getByTestId("breakpoint-display")).toHaveTextContent("sm");

    // Clean up
    cleanup();

    // Set window width to tablet size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: breakpoints.md,
    });

    render(<TestComponent />);
    expect(screen.getByTestId("breakpoint-display")).toHaveTextContent("md");

    // Clean up
    cleanup();

    // Set window width to desktop size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: breakpoints.lg,
    });

    render(<TestComponent />);
    expect(screen.getByTestId("breakpoint-display")).toHaveTextContent("lg");
  });

  test("adds and removes event listeners correctly", () => {
    const { unmount } = render(<TestComponent />);

    // Should add resize listener
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    // Unmount component
    unmount();

    // Should remove resize listener
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  test("updates breakpoint when window is resized", () => {
    // Mock initial width as mobile
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: breakpoints.sm,
    });

    const handleBreakpointChange = jest.fn();
    render(<BreakpointObserver onChange={handleBreakpointChange} />);

    // Initial call with sm breakpoint
    expect(handleBreakpointChange).toHaveBeenCalledWith("sm");

    // Reset mock to track next call
    handleBreakpointChange.mockClear();

    // Simulate resize to tablet size
    act(() => {
      // Change window width
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: breakpoints.md,
      });

      // Dispatch resize event
      window.dispatchEvent(new Event("resize"));
    });

    // Should detect new breakpoint
    expect(handleBreakpointChange).toHaveBeenCalledWith("md");
  });

  test("handles extremely large screens", () => {
    // Set window width to a very large size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 2500, // Very large screen
    });

    render(<TestComponent />);
    expect(screen.getByTestId("breakpoint-display")).toHaveTextContent("2xl");
  });
});
