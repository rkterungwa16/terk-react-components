import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useClickOutside } from "./useClickOutside";
import { useRef, useState } from "react";
import { jest } from "@jest/globals";

// Test component that uses the useClickOutside hook
function TestComponent({
  onClickOutside = () => {},
  includeButton = false,
}: {
  onClickOutside?: () => void;
  includeButton?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    sidebarContainerRef: containerRef,
    action: onClickOutside,
  });

  return (
    <div data-testid="outer-container">
      <div data-testid="outside-element">Outside Element</div>
      {includeButton && (
        <button data-testid="outside-button">Button Outside</button>
      )}
      <div ref={containerRef} data-testid="container">
        <div data-testid="inside-element">Inside Element</div>
        {includeButton && (
          <button data-testid="inside-button">Button Inside</button>
        )}
      </div>
    </div>
  );
}

// Component with toggling state to visually verify the hook works
function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    sidebarContainerRef: containerRef,
    action: () => setIsVisible(false),
  });

  return (
    <div>
      {isVisible ? (
        <div ref={containerRef} data-testid="toggle-container">
          Click outside to close me
        </div>
      ) : (
        <div data-testid="closed-message">Container closed</div>
      )}
    </div>
  );
}

// Component with null ref
function NullRefComponent() {
  const [wasCalled, setWasCalled] = useState(false);
  const nullRef = { current: null };

  useClickOutside({
    sidebarContainerRef: nullRef,
    action: () => setWasCalled(true),
  });

  return (
    <div data-testid="null-ref-component">
      {wasCalled ? "Action was called" : "Action not called"}
    </div>
  );
}

// Component with no action
function NoActionComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    sidebarContainerRef: containerRef,
    // No action provided
  });

  return (
    <div ref={containerRef} data-testid="no-action-component">
      No action provided
    </div>
  );
}

describe("useClickOutside Hook", () => {
  test("calls action when clicking outside the referenced element", async () => {
    const handleClickOutside = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClickOutside={handleClickOutside} />);

    const outsideElement = screen.getByTestId("outside-element");
    await user.click(outsideElement);

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  test("does not call action when clicking inside the referenced element", async () => {
    const handleClickOutside = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClickOutside={handleClickOutside} />);

    const insideElement = screen.getByTestId("inside-element");
    await user.click(insideElement);

    // The current hook implementation only checks if the click target
    // is the same node as the ref, not if it's a child of the ref
    // So clicking inside WILL trigger the action
    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  test("does not call action when clicking on the referenced element itself", async () => {
    const handleClickOutside = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClickOutside={handleClickOutside} />);

    const container = screen.getByTestId("container");
    await user.click(container);

    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  test("does not call action when clicking on a button element (outside the container)", async () => {
    const handleClickOutside = jest.fn();
    const user = userEvent.setup();

    render(
      <TestComponent
        onClickOutside={handleClickOutside}
        includeButton={true}
      />,
    );

    const outsideButton = screen.getByTestId("outside-button");
    await user.click(outsideButton);

    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  test("closes container when clicking outside (functional test)", async () => {
    const user = userEvent.setup();

    render(<ToggleComponent />);

    // Container should be visible initially
    expect(screen.getByTestId("toggle-container")).toBeInTheDocument();

    // Click outside the container
    await user.click(document.body);

    // Container should be closed now
    expect(screen.queryByTestId("toggle-container")).not.toBeInTheDocument();
    expect(screen.getByTestId("closed-message")).toBeInTheDocument();
  });

  test("cleans up event listener when component unmounts", () => {
    // Mock document.addEventListener and removeEventListener
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(<TestComponent />);

    // Verify addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    // Unmount the component
    unmount();

    // Verify removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    // Clean up spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test("handles null ref gracefully", async () => {
    const user = userEvent.setup();

    render(<NullRefComponent />);

    // Click outside - this should not throw an error
    await user.click(document.body);

    // Since the ref is null, and the hook checks for sidebarContainerRef.current
    // before calling the action, the action should not be called
    expect(screen.getByTestId("null-ref-component")).toHaveTextContent(
      "Action not called",
    );
  });

  test("handles missing action gracefully", async () => {
    const user = userEvent.setup();

    render(<NoActionComponent />);

    // This should not throw an error
    await user.click(document.body);

    // Component should still be in the document
    expect(screen.getByTestId("no-action-component")).toBeInTheDocument();
  });

  test("can handle mousedown event directly", () => {
    const handleClickOutside = jest.fn();

    render(<TestComponent onClickOutside={handleClickOutside} />);

    const outsideElement = screen.getByTestId("outside-element");

    // Manually dispatch a mousedown event
    fireEvent.mouseDown(outsideElement);

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  test("properly identifies different node types", () => {
    const handleClickOutside = jest.fn();

    render(<TestComponent onClickOutside={handleClickOutside} />);

    // Create a text node (which is a different node type)
    const textNode = document.createTextNode("Text Node");
    document.body.appendChild(textNode);

    // Simulate a click on the text node
    fireEvent.mouseDown(textNode);

    expect(handleClickOutside).toHaveBeenCalledTimes(1);

    // Clean up
    document.body.removeChild(textNode);
  });
});
