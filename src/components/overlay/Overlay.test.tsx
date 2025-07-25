import { render, screen } from "@testing-library/react";
import { Overlay } from "./Overlay";
import { createRef } from "react";

describe("Overlay Component", () => {
  test("renders correctly with default props", () => {
    render(<Overlay data-testid="overlay">Content</Overlay>);

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveTextContent("Content");
    expect(overlay.className).toContain("terkui-overlay");
    expect(overlay.className).toContain("terkui-animation-fadein-xs");
    expect(overlay.className).toContain("terkui-opacity-0");
  });

  test("applies visible class when visible prop is true", () => {
    render(<Overlay data-testid="overlay" visible={true} />);

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toContain("terkui-opacity-1");
  });

  test("applies invisible class when visible prop is false", () => {
    render(<Overlay data-testid="overlay" visible={false} />);

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toContain("terkui-opacity-0");
  });

  test("applies custom className", () => {
    render(<Overlay data-testid="overlay" className="custom-class" />);

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toContain("custom-class");
    expect(overlay.className).toContain("terkui-overlay");
  });

  test.each([
    ["fadein", "fadein"],
    ["fadeout", "fadeout"],
  ])("applies animation %s correctly", (animationName, expectedClass) => {
    render(<Overlay data-testid="overlay" animation={animationName as "fadein" | "fadeout"} />);

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toContain(`terkui-animation-${expectedClass}-xs`);
  });

  test.each([
    [150, "xs"],
    [200, "sm"],
    [250, "md"],
    [300, "lg"],
    [350, "xl"],
    [400, "2xl"],
  ])("applies timeout %s correctly", (timeout, expectedSize) => {
    render(
      <Overlay
        data-testid="overlay"
        timeout={timeout as 150 | 200 | 250 | 300 | 350 | 400}
      />
    );

    const overlay = screen.getByTestId("overlay");
    expect(overlay.className).toContain(`terkui-animation-fadein-${expectedSize}`);
  });

  test("forwards ref to the div element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Overlay ref={ref} data-testid="overlay" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current?.className).toContain("terkui-overlay");
  });

  test("passes additional props to the div element", () => {
    render(
      <Overlay
        data-testid="overlay"
        aria-label="Overlay"
        role="dialog"
        tabIndex={0}
      />
    );

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveAttribute("aria-label", "Overlay");
    expect(overlay).toHaveAttribute("role", "dialog");
    expect(overlay).toHaveAttribute("tabindex", "0");
  });

  test("renders children correctly", () => {
    render(
      <Overlay data-testid="overlay">
        <div data-testid="child">Child Content</div>
      </Overlay>
    );

    const overlay = screen.getByTestId("overlay");
    const child = screen.getByTestId("child");

    expect(overlay).toContainElement(child);
    expect(child).toHaveTextContent("Child Content");
  });
});
