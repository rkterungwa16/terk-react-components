import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { NavItem } from "./NavItem";

describe("NavItem Component", () => {
  test("renders correctly as a list item", () => {
    render(<NavItem>Nav Item Text</NavItem>);

    const element = screen.getByText("Nav Item Text");
    const listItem = element.closest("li");

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass("terkui-nav-item");
  });

  test("applies custom class to list item", () => {
    render(
      <NavItem classes={{ item: "custom-item-class" }}>
        Nav Item Text
      </NavItem>
    );

    const listItem = screen.getByText("Nav Item Text").closest("li");
    expect(listItem).toHaveClass("custom-item-class");
    expect(listItem).toHaveClass("terkui-nav-item");
  });

  test("wraps children in Link component when href is provided", () => {
    render(
      <NavItem href="/test-link">Link Text</NavItem>
    );

    const linkElement = screen.getByText("Link Text");
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "/test-link");
    expect(linkElement).toHaveClass("terkui-link");
    expect(linkElement.closest("li")).toHaveClass("terkui-nav-item");
  });

  test("applies custom class to wrapped Link component", () => {
    render(
      <NavItem
        href="/test-link"
        classes={{ link: "custom-link-class" }}
      >
        Link Text
      </NavItem>
    );

    const linkElement = screen.getByText("Link Text");
    expect(linkElement).toHaveClass("custom-link-class");
  });

  test("applies both item and link custom classes", () => {
    render(
      <NavItem
        href="/test-link"
        classes={{
          item: "custom-item-class",
          link: "custom-link-class"
        }}
      >
        Link Text
      </NavItem>
    );

    const linkElement = screen.getByText("Link Text");
    const listItem = linkElement.closest("li");

    expect(linkElement).toHaveClass("custom-link-class");
    expect(listItem).toHaveClass("custom-item-class");
  });

  test("forwards ref to the underlying list item element", () => {
    const ref = createRef<HTMLLIElement>();

    render(
      <NavItem ref={ref}>Nav Item with Ref</NavItem>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("LI");
    expect(ref.current?.textContent).toBe("Nav Item with Ref");
  });

  test("passes Link props to the Link component when href is provided", () => {
    render(
      <NavItem
        href="/test-link"
        target="_blank"
        rel="noopener noreferrer"
        active
        disabled
      >
        Link Text
      </NavItem>
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
      <NavItem>
        <span data-testid="custom-child">Custom Child Element</span>
      </NavItem>
    );

    const childElement = screen.getByTestId("custom-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe("SPAN");
    expect(childElement.closest("li")).toHaveClass("terkui-nav-item");
  });
});
