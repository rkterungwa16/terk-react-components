import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link } from "./Link";
import { createRef } from "react";
import { jest } from "@jest/globals";

describe("Link Component", () => {
  test("renders correctly with children", () => {
    render(<Link href="https://example.com">Link Text</Link>);
    const linkElement = screen.getByText("Link Text");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveClass("terkui-link");
  });

  test("applies custom className", () => {
    render(
      <Link href="https://example.com" className="custom-class">
        Link Text
      </Link>,
    );

    const linkElement = screen.getByText("Link Text");
    expect(linkElement).toHaveClass("custom-class");
    expect(linkElement).toHaveClass("terkui-link");
  });

  test("applies active state correctly", () => {
    render(
      <Link href="https://example.com" active>
        Active Link
      </Link>,
    );

    const linkElement = screen.getByText("Active Link");
    expect(linkElement).toHaveAttribute("aria-current", "page");
  });

  test("applies disabled state correctly", () => {
    render(
      <Link href="https://example.com" disabled>
        Disabled Link
      </Link>,
    );

    const linkElement = screen.getByText("Disabled Link");
    expect(linkElement).toHaveAttribute("aria-disabled", "true");
    expect(linkElement).toHaveAttribute("tabIndex", "-1");
  });

  test("forwards ref to the underlying anchor element", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Link href="https://example.com" ref={ref}>
        Link with Ref
      </Link>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("A");
    expect(ref.current?.textContent).toBe("Link with Ref");
  });

  test("passes HTML attributes to anchor element", () => {
    render(
      <Link
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        title="Link title"
        data-testid="custom-link"
      >
        Link with Attributes
      </Link>,
    );

    const linkElement = screen.getByText("Link with Attributes");
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkElement).toHaveAttribute("title", "Link title");
    expect(linkElement).toHaveAttribute("data-testid", "custom-link");
  });

  test("handles click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Link href="https://example.com" onClick={handleClick}>
        Clickable Link
      </Link>,
    );

    const linkElement = screen.getByText("Clickable Link");
    await user.click(linkElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disabled link does not trigger click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Link href="https://example.com" onClick={handleClick} disabled>
        Disabled Link
      </Link>,
    );

    const linkElement = screen.getByText("Disabled Link");
    await user.click(linkElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
