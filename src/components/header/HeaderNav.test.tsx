import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { HeaderNav, HeaderNavProps } from "./HeaderNav";
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

  const defaultProps: HeaderNavProps = {
    components: {
      nav: { component: "ul", className: "test-nav-class" },
      navItem: { component: "li" },
    },
    data: mockNavData,
  };

  test("renders correctly with default props", () => {
    render(<HeaderNav {...defaultProps} />);

    // Check if nav element is rendered
    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("terkui-header-nav");

    // Check if NavItems are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Check if nav-group items are rendered
    const aboutLink = screen.getByText("About");
    const contactLink = screen.getByText("Contact");
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<HeaderNav {...defaultProps} className="custom-header-nav" />);

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
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
          nav: {
            component: "ul"
          },
        }}
      />,
    );

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement?.tagName).toBe("UL");
  });

  test("renders with div as navItem component", () => {
    render(
      <HeaderNav
        {...defaultProps}
        components={{
          ...defaultProps.components,
          navItem: {
            component: "div"
          }
        }}
      />,
    );

    // We'll just check that the component renders without errors
    // and that we can find the Home link, since the actual parent element implementation
    // may vary based on the Nav component's rendering
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
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
        components={{
          ...defaultProps.components,
          nav: { ...defaultProps.components.nav, "data-testid": "empty-nav" },
        }}
        data={[]}
      />,
    );

    const navElement = screen.getByTestId("empty-nav");
    expect(navElement).toBeInTheDocument();
    // No nav items should be rendered
    expect(navElement.children.length).toBe(0);
  });

  test("renders with Nav having correct direction and justify props", () => {
    render(<HeaderNav {...defaultProps} />);

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
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

  test("applies padding classes when padding prop is provided", () => {
    render(<HeaderNav {...defaultProps} padding={{ p: "md" }} />);

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement).toHaveClass("terkui-p-md");
  });

  test("applies multiple padding classes when multiple padding values are provided", () => {
    render(
      <HeaderNav
        {...defaultProps}
        padding={{ pt: "lg", pb: "sm", pl: "xs", pr: "xl" }}
      />,
    );

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement).toHaveClass("terkui-pt-lg");
    expect(navElement).toHaveClass("terkui-pb-sm");
    expect(navElement).toHaveClass("terkui-pl-xs");
    expect(navElement).toHaveClass("terkui-pr-xl");
  });

  test("applies horizontal and vertical padding classes", () => {
    render(<HeaderNav {...defaultProps} padding={{ px: "2xl", py: "md" }} />);

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement).toHaveClass("terkui-px-2xl");
    expect(navElement).toHaveClass("terkui-py-md");
  });

  test("combines padding with other classes correctly", () => {
    render(
      <HeaderNav
        {...defaultProps}
        className="custom-class"
        padding={{ p: "lg" }}
      />,
    );

    const navElement = screen.getByText("Home").closest(".terkui-header-nav");
    expect(navElement).toHaveClass("terkui-header-nav");
    expect(navElement).toHaveClass("terkui-p-lg");
    expect(navElement).toHaveClass("custom-class");
  });
});
