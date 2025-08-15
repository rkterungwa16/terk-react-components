import { render, screen } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import { NavItem } from "./NavItem";
import { jest } from "@jest/globals";

describe("NavItem Component", () => {
  // Reset any mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders correctly as a list item", () => {
    render(
      <NavItem component="li" data-testid="nav-item-li">
        Nav Item Text
      </NavItem>,
    );

    const listItem = screen.getByText("Nav Item Text").closest("li");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass("terkui-nav-item");
    expect(listItem).toHaveClass("terkui-text-white");
  });

  test("applies custom class to list item", () => {
    render(
      <NavItem
        component="li"
        classes={{ item: "custom-item-class" }}
        data-testid="custom-class-item"
      >
        Nav Item Text
      </NavItem>,
    );

    const listItem = screen.getByText("Nav Item Text").closest("li");
    expect(listItem).toHaveClass("custom-item-class");
    expect(listItem).toHaveClass("terkui-nav-item");
    expect(listItem).toHaveClass("terkui-text-white");
  });

  test("wraps children in Link component when href is provided", () => {
    render(
      <NavItem component="li" href="/test-link" data-testid="link-wrapper">
        Link Text
      </NavItem>,
    );

    const linkElement = screen.getByText("Link Text");
    const wrapper = linkElement.closest("li");

    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "/test-link");
    expect(linkElement).toHaveClass("terkui-link");
    expect(wrapper).toHaveClass("terkui-nav-item");
    expect(wrapper).toHaveClass("terkui-text-white");
  });

  test("applies custom class to wrapped Link component", () => {
    render(
      <NavItem
        component="li"
        href="/test-link"
        classes={{ link: "custom-link-class" }}
        data-testid="custom-link-wrapper"
      >
        Link Text
      </NavItem>,
    );

    const linkElement = screen.getByText("Link Text");
    expect(linkElement).toHaveClass("custom-link-class");
    expect(linkElement).toHaveClass("terkui-link");
  });

  test("applies both item and link custom classes", () => {
    render(
      <NavItem
        href="/test-link"
        component="li"
        classes={{
          item: "custom-item-class",
          link: "custom-link-class",
        }}
        data-testid="both-custom-classes"
      >
        Link Text
      </NavItem>,
    );

    const linkElement = screen.getByText("Link Text");
    const listItem = linkElement.closest("li");

    expect(linkElement).toHaveClass("custom-link-class");
    expect(listItem).toHaveClass("custom-item-class");
    expect(listItem).toHaveClass("terkui-nav-item");
  });

  test("forwards ref to the underlying list item element", () => {
    const ref = createRef<HTMLLIElement>();

    render(
      <NavItem component="li" ref={ref} data-testid="ref-li">
        Nav Item with Ref
      </NavItem>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("LI");
    expect(ref.current?.textContent).toBe("Nav Item with Ref");
    expect(ref.current).toHaveClass("terkui-nav-item");
  });

  test("forwards ref to the underlying div element when component is div", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <NavItem component="div" ref={ref} data-testid="ref-div">
        Nav Item with Div Ref
      </NavItem>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current?.textContent).toBe("Nav Item with Div Ref");
    expect(ref.current).toHaveClass("terkui-nav-item");
  });

  test("passes Link props to the Link component when href is provided", () => {
    render(
      <NavItem
        component="li"
        href="/test-link"
        target="_blank"
        rel="noopener noreferrer"
        active
        disabled
      >
        Link Text
      </NavItem>,
    );

    const linkElement = screen.getByText("Link Text");
    expect(linkElement).toHaveAttribute("href", "/test-link");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkElement).toHaveAttribute("aria-current", "page");
    expect(linkElement).toHaveAttribute("aria-disabled", "true");
  });

  test("renders children directly when no href is provided", () => {
    render(
      <NavItem component="li">
        <span data-testid="custom-child">Custom Child Element</span>
      </NavItem>,
    );

    const childElement = screen.getByTestId("custom-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe("SPAN");
    expect(childElement.closest("li")).toHaveClass("terkui-nav-item");
    expect(childElement.closest("li")).toHaveClass("terkui-text-white");
  });

  test("renders as a div when component prop is set to div", () => {
    render(
      <NavItem component="div" data-testid="div-element">
        Div Nav Item
      </NavItem>,
    );

    const divElement = screen.getByText("Div Nav Item").closest("div");

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass("terkui-nav-item");
    expect(divElement).toHaveClass("terkui-text-white");
  });

  test("renders as a span when component prop is set to span", () => {
    render(
      <NavItem component="span" data-testid="span-element">
        Span Nav Item
      </NavItem>,
    );

    const spanElement = screen.getByText("Span Nav Item").closest("span");

    expect(spanElement).toBeInTheDocument();
    expect(spanElement.tagName).toBe("SPAN");
    expect(spanElement).toHaveClass("terkui-nav-item");
    expect(spanElement).toHaveClass("terkui-text-white");
  });

  test("renders with custom component", () => {
    interface CustomComponentProps {
      id?: string;
    }
    const CustomComponent = forwardRef<HTMLElement, CustomComponentProps>(
      (props, ref) => (
        <section {...props} ref={ref} data-testid="custom-section" />
      ),
    );

    render(
      <NavItem
        component={CustomComponent}
        data-testid="custom-component-wrapper"
      >
        Custom Component
      </NavItem>,
    );

    const customElement = screen.getByTestId("custom-section");

    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveClass("terkui-nav-item");
    expect(customElement).toHaveClass("terkui-text-white");
    expect(customElement.textContent).toBe("Custom Component");
  });

  test("handles event callbacks correctly", () => {
    const handleClick = jest.fn();

    render(
      <NavItem
        component="li"
        href="/test-link"
        onClick={handleClick}
        data-testid="clickable-item"
      >
        Clickable Item
      </NavItem>,
    );

    const linkElement = screen.getByText("Clickable Item");
    linkElement.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
