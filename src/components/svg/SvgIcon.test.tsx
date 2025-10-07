import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { SvgIcon } from "./SvgIcon";
import { IconSize } from "../../types";

describe("SvgIcon Component", () => {
  test("renders correctly with default props", () => {
    render(
      <SvgIcon data-testid="default-icon">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("default-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe("svg");
    expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svgElement).toHaveAttribute("role", "img");
    expect(svgElement).toHaveAttribute("aria-hidden", "true");

    // Check child element is rendered
    const pathElement = svgElement.querySelector("path");
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute(
      "d",
      "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    );
  });

  test("applies size class when size prop is provided", () => {
    render(
      <SvgIcon data-testid="sized-icon" size="md">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("sized-icon");
    expect(svgElement).toHaveClass("terkui-icon-md");
  });

  test("applies different size classes correctly", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    const { rerender } = render(
      <SvgIcon data-testid="resizable-icon" size="xs">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    // Test each size
    for (const size of sizes) {
      rerender(
        <SvgIcon data-testid="resizable-icon" size={size as IconSize}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>,
      );

      const svgElement = screen.getByTestId("resizable-icon");
      expect(svgElement).toHaveClass(`terkui-icon-${size}`);
    }
  });

  test("applies custom width and height when provided", () => {
    render(
      <SvgIcon data-testid="custom-size-icon" width={42} height={24}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("custom-size-icon");
    expect(svgElement).toHaveAttribute("width", "42");
    expect(svgElement).toHaveAttribute("height", "24");
  });

  test("applies custom viewBox when provided", () => {
    render(
      <SvgIcon data-testid="viewbox-icon" viewBox="0 0 100 100">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("viewbox-icon");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 100 100");
  });

  test("applies custom className when provided", () => {
    render(
      <SvgIcon data-testid="custom-class-icon" className="custom-icon-class">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("custom-class-icon");
    expect(svgElement).toHaveClass("custom-icon-class");
  });

  test("forwards ref to the underlying SVG element", () => {
    const ref = createRef<SVGSVGElement>();

    render(
      <SvgIcon ref={ref} data-testid="ref-icon">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("svg");
    expect(ref.current).toHaveAttribute("data-testid", "ref-icon");
  });

  test("passes HTML attributes to root element", () => {
    render(
      <SvgIcon
        data-testid="attrs-icon"
        id="test-icon"
        style={{ color: "red" }}
        onClick={() => {}}
        data-custom="custom-value"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("attrs-icon");
    expect(svgElement).toHaveAttribute("id", "test-icon");
    expect(svgElement).toHaveAttribute("data-custom", "custom-value");
    expect(svgElement).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("combines size class with custom className", () => {
    render(
      <SvgIcon
        data-testid="combined-icon"
        size="l"
        className="custom-icon-class"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("combined-icon");
    expect(svgElement).toHaveClass(" terkui-icon-l custom-icon-class");
    expect(svgElement).toHaveClass("custom-icon-class");
  });

  test("prioritizes width/height props over size class", () => {
    render(
      <SvgIcon data-testid="priority-icon" size="md" width={50} height={50}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("priority-icon");
    expect(svgElement).toHaveClass("terkui-icon-md");
    expect(svgElement).toHaveAttribute("width", "50");
    expect(svgElement).toHaveAttribute("height", "50");
  });

  test("renders multiple children correctly", () => {
    render(
      <SvgIcon data-testid="multi-child-icon">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        <circle cx="12" cy="12" r="5" />
        <rect x="5" y="5" width="14" height="14" />
      </SvgIcon>,
    );

    const svgElement = screen.getByTestId("multi-child-icon");
    expect(svgElement.querySelectorAll("path")).toHaveLength(1);
    expect(svgElement.querySelectorAll("circle")).toHaveLength(1);
    expect(svgElement.querySelectorAll("rect")).toHaveLength(1);
  });

  test("renders without children", () => {
    render(<SvgIcon data-testid="empty-icon" />);

    const svgElement = screen.getByTestId("empty-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.children).toHaveLength(0);
  });
});
