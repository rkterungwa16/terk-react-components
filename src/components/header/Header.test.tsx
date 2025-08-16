import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { createRef } from "react";

describe("Header Component", () => {
  test("renders correctly with default props", () => {
    render(<Header data-testid="header">Content</Header>);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("terkui-header");
    expect(headerElement.textContent).toBe("Content");
  });

  test("applies the correct position class", () => {
    const { rerender } = render(
      <Header data-testid="header" position="fixed">
        Content
      </Header>,
    );
    let headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-header-fixed");

    rerender(
      <Header data-testid="header" position="sticky">
        Content
      </Header>,
    );
    headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-header-sticky");
  });

  test("applies custom className", () => {
    render(
      <Header data-testid="header" className="custom-class">
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-header");
    expect(headerElement).toHaveClass("custom-class");
  });

  test("renders with container when breakpoint is provided", () => {
    render(
      <Header data-testid="header" container={{ breakpoint: "lg" }}>
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    const containerElement = headerElement.firstChild;
    expect(containerElement).toHaveClass("terkui-container-lg");
    expect(containerElement?.textContent).toBe("Content");
  });

  test("applies container className when provided", () => {
    render(
      <Header
        data-testid="header"
        container={{ breakpoint: "md", className: "container-custom-class" }}
      >
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    const containerElement = headerElement.firstChild;
    expect(containerElement).toHaveClass("terkui-container-md");
    expect(containerElement).toHaveClass("container-custom-class");
  });

  test("renders children directly when no container is specified", () => {
    render(
      <Header data-testid="header">
        <div data-testid="direct-child">Direct Child</div>
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    const directChild = screen.getByTestId("direct-child");
    expect(headerElement.firstChild).toBe(directChild);
  });

  test("forwards ref to the underlying div element", () => {
    const ref = createRef<HTMLDivElement>();

    render(<Header ref={ref}>Content</Header>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveClass("terkui-header");
  });

  test("passes HTML attributes to the root element", () => {
    render(
      <Header
        data-testid="header"
        id="custom-id"
        aria-label="Main header"
        data-custom="value"
      >
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveAttribute("id", "custom-id");
    expect(headerElement).toHaveAttribute("aria-label", "Main header");
    expect(headerElement).toHaveAttribute("data-custom", "value");
  });

  test("applies padding classes when padding prop is provided", () => {
    render(
      <Header data-testid="header" padding={{ p: "md" }}>
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-p-md");
  });

  test("applies multiple padding classes when multiple padding values are provided", () => {
    render(
      <Header
        data-testid="header"
        padding={{ pt: "lg", pb: "sm", pl: "xs", pr: "xl" }}
      >
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-pt-lg");
    expect(headerElement).toHaveClass("terkui-pb-sm");
    expect(headerElement).toHaveClass("terkui-pl-xs");
    expect(headerElement).toHaveClass("terkui-pr-xl");
  });

  test("applies horizontal and vertical padding classes", () => {
    render(
      <Header data-testid="header" padding={{ px: "2xl", py: "md" }}>
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-px-2xl");
    expect(headerElement).toHaveClass("terkui-py-md");
  });

  test("combines padding with other classes correctly", () => {
    render(
      <Header
        data-testid="header"
        className="custom-class"
        position="fixed"
        padding={{ p: "lg" }}
      >
        Content
      </Header>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("terkui-header");
    expect(headerElement).toHaveClass("terkui-header-fixed");
    expect(headerElement).toHaveClass("terkui-p-lg");
    expect(headerElement).toHaveClass("custom-class");
  });
});
