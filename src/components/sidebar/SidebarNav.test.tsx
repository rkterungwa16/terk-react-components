import React, { ElementType, createRef } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SidebarNav } from "./SidebarNav";
import { NavData } from "./navData";

describe("SidebarNav Component", () => {
  // Sample navigation data for testing
  const mockNavData: NavData = [
    {
      component: "nav-item",
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      component: "subtitle",
      name: "Products",
    },
    {
      component: "nav-item",
      name: "T-Shirts",
      href: "/products/t-shirts",
    },
  ];

  const defaultProps = {
    components: {
      nav: "nav" as ElementType,
      navItem: "li" as ElementType,
    },
    data: mockNavData,
  };

  test("renders correctly with default props", () => {
    render(<SidebarNav {...defaultProps} />);

    // Check if nav element is rendered
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    expect(navElement.tagName).toBe("NAV");

    // Check if NavItems are rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("T-Shirts")).toBeInTheDocument();

    // Check if subtitle is rendered
    const subtitle = screen.getByText("Products");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.tagName).toBe("H6");
    expect(subtitle).toHaveClass("terkui-text-gray");
    expect(subtitle).toHaveClass("terkui-uppercase");
    expect(subtitle).toHaveClass("terkui-nav-subtitle");
  });

  test("applies custom className", () => {
    render(<SidebarNav {...defaultProps} className="custom-sidebar-nav" />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass("custom-sidebar-nav");
  });

  test("renders NavItems with correct href attributes", () => {
    render(<SidebarNav {...defaultProps} />);

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    const tShirtsLink = screen.getByText("T-Shirts").closest("a");
    expect(tShirtsLink).toHaveAttribute("href", "/products/t-shirts");
  });

  test("renders with ul as nav component", () => {
    render(
      <SidebarNav
        {...defaultProps}
        components={{
          ...defaultProps.components,
          nav: "ul" as ElementType,
        }}
      />,
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement.tagName).toBe("UL");
  });

  test("renders with div as navItem component", () => {
    render(
      <SidebarNav
        {...defaultProps}
        components={{
          ...defaultProps.components,
          navItem: "div" as ElementType,
        }}
      />,
    );

    // NavItems should be div elements now
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink?.parentElement?.tagName).toBe("DIV");
  });

  test("forwards ref to the underlying nav element", () => {
    const ref = createRef<
      HTMLDivElement | HTMLUListElement | HTMLOListElement
    >();

    render(<SidebarNav {...defaultProps} ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("NAV");
  });

  test("renders with empty data array", () => {
    render(<SidebarNav components={defaultProps.components} data={[]} />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    // No nav items or subtitles should be rendered
    expect(navElement.children.length).toBe(0);
  });

  test("ignores unknown component types in data", () => {
    // Create a type that allows us to safely test invalid component types
    type TestNavDataItem = Omit<NavDataItem, "component"> & {
      component: string;
    };

    const dataWithUnknownType = [
      ...mockNavData,
      {
        component: "unknown-type", // This is intentionally invalid for testing
        name: "Should not render",
      } as TestNavDataItem,
    ];

    render(
      <SidebarNav
        components={defaultProps.components}
        data={dataWithUnknownType}
      />,
    );

    // The unknown component type should not be rendered
    // The unknown component type should be ignored by the renderer
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });

  test("passes HTML attributes to root element", () => {
    render(
      <SidebarNav
        {...defaultProps}
        data-testid="custom-sidebar-nav"
        aria-label="Site Navigation"
      />,
    );

    const navElement = screen.getByTestId("custom-sidebar-nav");
    expect(navElement).toHaveAttribute("aria-label", "Site Navigation");
  });

  test("renders with Nav having correct direction and justify props", () => {
    render(<SidebarNav {...defaultProps} />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass("terkui-nav-direction-vertical");
    expect(navElement).toHaveClass("terkui-nav-justify-start");
  });
});
