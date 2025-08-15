import { render, screen } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import { HeaderNav } from "./HeaderNav";
import { HeaderNavData } from "./header-nav.data";

describe("HeaderNav Component", () => {
  // Sample navigation data for testing
  const mockNavData: HeaderNavData = [
    {
      component: "nav-item",
      name: "Home",
      href: "/home",
    },
    {
      component: "nav-group",
      name: "Links",
      group: [
        {
          component: "nav-item",
          name: "About",
          href: "/about",
        },
        {
          component: "nav-item",
          name: "Contact",
          href: "/contact",
        },
      ],
    },
  ];

  const defaultProps = {
    components: {
      nav: "nav",
      navItem: "li",
    },
    data: mockNavData,
  };

  test("renders correctly with default props", () => {
    render(<HeaderNav {...defaultProps} data-testid="header-nav" />);

    // Check if nav element is rendered
    const navElement = screen.getByTestId("header-nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-header-nav");
    expect(navElement).toHaveAttribute("role", "navigation");

    // Check if NavItems are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Check if nav-group items are rendered
    const aboutLink = screen.getByText("About");
    const contactLink = screen.getByText("Contact");
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <HeaderNav
        {...defaultProps}
        className="custom-header-nav"
        data-testid="header-nav"
      />,
    );

    const navElement = screen.getByTestId("header-nav");
    expect(navElement).toHaveClass("custom-header-nav");
    expect(navElement).toHaveClass("terkui-header-nav");
  });

  test("renders NavItems with correct href attributes", () => {
    render(<HeaderNav {...defaultProps} />);

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/home");

    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink).toHaveAttribute("href", "/about");

    const contactLink = screen.getByText("Contact").closest("a");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("renders with ul as nav component", () => {
    render(
      <HeaderNav
        {...defaultProps}
        components={{
          ...defaultProps.components,
          nav: "ul",
        }}
        data-testid="header-nav"
      />,
    );

    const navElement = screen.getByTestId("header-nav");
    expect(navElement.tagName).toBe("UL");
  });

  test("renders with div as navItem component", () => {
    render(
      <HeaderNav
        {...defaultProps}
        components={{
          ...defaultProps.components,
          navItem: "div",
        }}
      />,
    );

    // NavItems should be div elements now
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink?.parentElement?.tagName).toBe("DIV");
  });

  test("forwards ref to the underlying nav element", () => {
    const ref = createRef<
      HTMLDivElement | HTMLUListElement | HTMLOListElement
    >();

    render(<HeaderNav {...defaultProps} ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("NAV");
  });

  test("renders with empty data array", () => {
    render(
      <HeaderNav
        components={defaultProps.components}
        data={[]}
        data-testid="header-nav"
      />,
    );

    const navElement = screen.getByTestId("header-nav");
    expect(navElement).toBeInTheDocument();
    // No nav items should be rendered
    expect(navElement.children.length).toBe(0);
  });

  test("renders with custom components", () => {
    // Create custom components
    const CustomNav = forwardRef<HTMLElement>((props, ref) => (
      <aside {...props} ref={ref} data-testid="custom-nav" />
    ));

    const CustomNavItem = forwardRef<HTMLElement>((props, ref) => (
      <div {...props} ref={ref} data-testid="custom-nav-item" />
    ));

    render(
      <HeaderNav
        {...defaultProps}
        components={{
          nav: CustomNav,
          navItem: CustomNavItem,
        }}
      />,
    );

    // Verify custom components are used
    expect(screen.getByTestId("custom-nav")).toBeInTheDocument();
    expect(screen.getAllByTestId("custom-nav-item")).toHaveLength(3); // All nav items including those in groups
  });

  test("passes HTML attributes to root element", () => {
    render(
      <HeaderNav
        {...defaultProps}
        data-testid="custom-header-nav"
        aria-label="Site Navigation"
        id="main-nav"
      />,
    );

    const navElement = screen.getByTestId("custom-header-nav");
    expect(navElement).toHaveAttribute("aria-label", "Site Navigation");
    expect(navElement).toHaveAttribute("id", "main-nav");
  });

  test("renders with Nav having correct direction and justify props", () => {
    render(<HeaderNav {...defaultProps} data-testid="header-nav" />);

    const navElement = screen.getByTestId("header-nav");
    expect(navElement).toHaveClass("terkui-nav-direction-horizontal");
    expect(navElement).toHaveClass("terkui-nav-justify-start");
  });

  test("applies terkui-header-nav-item class to NavItems", () => {
    render(<HeaderNav {...defaultProps} />);

    // Get the NavItem containers
    const homeNavItem = screen.getByText("Home").closest("li");
    expect(homeNavItem).toHaveClass("terkui-header-nav-item");

    // Get grouped NavItem containers
    const aboutNavItem = screen.getByText("About").closest("li");
    expect(aboutNavItem).toHaveClass("terkui-header-nav-item");
  });
});
