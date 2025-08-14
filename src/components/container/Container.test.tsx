import { render, screen } from "@testing-library/react";
import { Container } from "./Container";
import { createRef } from "react";
import { jest } from "@jest/globals";

describe("Container Component", () => {
  test("renders correctly with default props", () => {
    render(<Container data-testid="container">Content</Container>);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass("terkui-container-undefined");
  });

  test("applies the correct breakpoint class", () => {
    const { rerender } = render(
      <Container data-testid="container" breakpoint="sm">
        Content
      </Container>,
    );
    let containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-sm");

    rerender(
      <Container data-testid="container" breakpoint="md">
        Content
      </Container>,
    );
    containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-md");

    rerender(
      <Container data-testid="container" breakpoint="lg">
        Content
      </Container>,
    );
    containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-lg");

    rerender(
      <Container data-testid="container" breakpoint="xl">
        Content
      </Container>,
    );
    containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-xl");

    rerender(
      <Container data-testid="container" breakpoint="2xl">
        Content
      </Container>,
    );
    containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-2xl");

    rerender(
      <Container data-testid="container" breakpoint="fluid">
        Content
      </Container>,
    );
    containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-fluid");
  });

  test("applies custom className", () => {
    render(
      <Container
        data-testid="container"
        breakpoint="md"
        className="custom-class"
      >
        Content
      </Container>,
    );

    const containerElement = screen.getByTestId("container");
    expect(containerElement).toHaveClass("terkui-container-md");
    expect(containerElement).toHaveClass("custom-class");
  });

  test("renders children correctly", () => {
    render(
      <Container>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Container>,
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  test("forwards ref to the underlying div element", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Container data-testid="container" ref={ref}>
        Content
      </Container>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current?.textContent).toBe("Content");
    expect(ref.current).toHaveClass("terkui-container-undefined");
  });

  test("can nest containers", () => {
    render(
      <Container data-testid="outer-container" breakpoint="fluid">
        <Container data-testid="inner-container" breakpoint="md">
          Nested Content
        </Container>
      </Container>,
    );

    const outerContainer = screen.getByTestId("outer-container");
    const innerContainer = screen.getByTestId("inner-container");

    expect(outerContainer).toHaveClass("terkui-container-fluid");
    expect(innerContainer).toHaveClass("terkui-container-md");
    expect(innerContainer.textContent).toBe("Nested Content");
    expect(outerContainer.contains(innerContainer)).toBe(true);
  });
});
