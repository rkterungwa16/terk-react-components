import { render, screen } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import { Nav } from "./Nav";
import { jest } from "@jest/globals";

describe("Nav Component", () => {
  // Reset any mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("renders correctly with default props", () => {
    render(<Nav data-testid="default-nav">Navigation Content</Nav>);

    const navElement = screen.getByTestId("default-nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("applies custom className", () => {
    render(
      <Nav className="custom-nav-class" data-testid="custom-class-nav">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("custom-class-nav");
    expect(navElement).toHaveClass("custom-nav-class");
    expect(navElement).toHaveClass("terkui-nav");
  });

  test("renders as div when component prop is set to div", () => {
    render(
      <Nav component="div" data-testid="nav-div">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-div");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("renders as nav element when component prop is set to nav", () => {
    render(
      <Nav component="nav" data-testid="nav-element">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-element");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveAttribute("role", "navigation");
  });

  test("applies justify-start class when justify prop is set to start", () => {
    render(
      <Nav justify="start" data-testid="nav-justify-start">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-justify-start");
    expect(navElement).toHaveClass("terkui-nav-justify-start");
  });

  test("applies justify-center class when justify prop is set to center", () => {
    render(
      <Nav justify="center" data-testid="nav-justify-center">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-justify-center");
    expect(navElement).toHaveClass("terkui-nav-justify-center");
  });

  test("applies justify-end class when justify prop is set to end", () => {
    render(
      <Nav justify="end" data-testid="nav-justify-end">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-justify-end");
    expect(navElement).toHaveClass("terkui-nav-justify-end");
  });

  test("applies direction-horizontal class when direction prop is set to horizontal", () => {
    render(
      <Nav direction="horizontal" data-testid="nav-horizontal">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-horizontal");
    expect(navElement).toHaveClass("terkui-nav-direction-horizontal");
  });

  test("applies direction-vertical class when direction prop is set to vertical", () => {
    render(
      <Nav direction="vertical" data-testid="nav-vertical">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-vertical");
    expect(navElement).toHaveClass("terkui-nav-direction-vertical");
  });

  test("applies single padding class when padding prop has single value", () => {
    render(
      <Nav padding={{ p: "md" }} data-testid="nav-padding">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-padding");
    expect(navElement).toHaveClass("terkui-p-md");
  });

  test("applies multiple padding classes when padding prop has multiple values", () => {
    render(
      <Nav
        padding={{ pt: "lg", pb: "sm", pl: "xs", pr: "xl" }}
        data-testid="nav-multiple-padding"
      >
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-multiple-padding");
    expect(navElement).toHaveClass("terkui-pt-lg");
    expect(navElement).toHaveClass("terkui-pb-sm");
    expect(navElement).toHaveClass("terkui-pl-xs");
    expect(navElement).toHaveClass("terkui-pr-xl");
  });

  test("applies horizontal and vertical padding classes", () => {
    render(
      <Nav padding={{ px: "2xl", py: "md" }} data-testid="nav-axis-padding">
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-axis-padding");
    expect(navElement).toHaveClass("terkui-px-2xl");
    expect(navElement).toHaveClass("terkui-py-md");
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
      </Nav>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current?.textContent).toBe("Navigation with Div Ref");
  });

  test("renders with custom component", () => {
    interface CustomComponentProps {
      id?: string;
    }
    const CustomComponent = forwardRef<HTMLElement, CustomComponentProps>(
      (props, ref) => <aside {...props} ref={ref} data-testid="custom-aside" />,
    );

    render(
      <Nav component={CustomComponent} data-testid="custom-nav-wrapper">
        Custom Component
      </Nav>,
    );

    const customElement = screen.getByTestId("custom-aside");
    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveClass("terkui-nav");
    expect(customElement).toHaveAttribute("role", "navigation");
    expect(customElement.textContent).toBe("Custom Component");
  });

  test("passes HTML attributes to root element", () => {
    render(
      <Nav data-testid="custom-nav" aria-label="Main Navigation" id="main-nav">
        Navigation Content
      </Nav>,
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
      </Nav>,
    );

    const navElement = screen.getByText("Navigation Content").closest("nav");
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveClass("terkui-nav-justify-center");
    expect(navElement).toHaveClass("terkui-nav-direction-vertical");
    expect(navElement).toHaveClass("custom-class");
  });

  test("combines padding with other props correctly", () => {
    render(
      <Nav
        component="nav"
        justify="start"
        direction="horizontal"
        padding={{ p: "lg" }}
        className="custom-class"
        data-testid="nav-combined"
      >
        Navigation Content
      </Nav>,
    );

    const navElement = screen.getByTestId("nav-combined");
    expect(navElement).toHaveClass("terkui-nav");
    expect(navElement).toHaveClass("terkui-nav-justify-start");
    expect(navElement).toHaveClass("terkui-nav-direction-horizontal");
    expect(navElement).toHaveClass("terkui-p-lg");
    expect(navElement).toHaveClass("custom-class");
    expect(navElement.tagName).toBe("NAV");
  });
});
