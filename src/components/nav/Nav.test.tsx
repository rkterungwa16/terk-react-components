import { render, screen } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import { Nav } from "./Nav";

describe("Nav Component", () => {
  test("renders correctly with default props", () => {
    render(<Nav>Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("applies custom className", () => {
    render(<Nav className="custom-nav-class">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("custom-nav-class");
    expect(navElement).toHaveClass("terkui-nav");
  });

  test("renders as div when component prop is set to div", () => {
    render(<Nav component="div">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("div");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("renders as nav element when component prop is set to nav", () => {
    render(<Nav component="nav">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("applies justify-start class when justify prop is set to start", () => {
    render(<Nav justify="start">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("terkui-nav-justify-start");
  });

  test("applies justify-center class when justify prop is set to center", () => {
    render(<Nav justify="center">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("terkui-nav-justify-center");
  });

  test("applies justify-end class when justify prop is set to end", () => {
    render(<Nav justify="end">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("terkui-nav-justify-end");
  });

  test("applies direction-horizontal class when direction prop is set to horizontal", () => {
    render(<Nav direction="horizontal">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("terkui-nav-direction-horizontal");
  });

  test("applies direction-vertical class when direction prop is set to vertical", () => {
    render(<Nav direction="vertical">Navigation Content</Nav>);

    const navElement = screen.getByText("Navigation Content").closest("ul");
    expect(navElement).toHaveClass("terkui-nav-direction-vertical");
  });

  test("forwards ref to the underlying element", () => {
    const ref = createRef<HTMLUListElement>();

    render(<Nav ref={ref}>Navigation with Ref</Nav>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("UL");
    expect(ref.current?.textContent).toBe("Navigation with Ref");
  });

  test("forwards ref to the div element when component is div", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Nav component="div" ref={ref}>
        Navigation with Div Ref
      </Nav>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current?.textContent).toBe("Navigation with Div Ref");
  });

  test("renders with custom component", () => {
    const CustomComponent = forwardRef<HTMLElement, any>((props, ref) => (
      <aside {...props} ref={ref} data-testid="custom-aside" />
    ));

    render(<Nav component={CustomComponent}>Custom Component</Nav>);

    const customElement = screen.getByTestId("custom-aside");
    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveClass("terkui-nav");
    expect(customElement).toHaveAttribute("role", "navigation");
    expect(customElement.textContent).toBe("Custom Component");
  });

  test("passes HTML attributes to root element", () => {
    render(
      <Nav
        data-testid="custom-nav"
        aria-label="Main Navigation"
        id="main-nav"
      >
        Navigation Content
      </Nav>
    );

    const navElement = screen.getByTestId("custom-nav");
    expect(navElement).toHaveAttribute("aria-label", "Main Navigation");
    expect(navElement).toHaveAttribute("id", "main-nav");
  });

  test("combines multiple props correctly", () => {
    render(
      <Nav
        component="nav"
        justify="center"
        direction="vertical"
        className="custom-class"
      >
        Navigation Content
      </Nav>
    );

    const navElement = screen.getByText("Navigation Content").closest("nav");
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveClass("terkui-nav-justify-center");
    expect(navElement).toHaveClass("terkui-nav-direction-vertical");
    expect(navElement).toHaveClass("custom-class");
  });
});
