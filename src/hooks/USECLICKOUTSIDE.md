# useClickOutside Hook

A React hook that detects clicks outside of a specified element and triggers a callback function. This is commonly used for closing modals, dropdowns, or sidebars when a user clicks outside of them.

## Installation

This hook is part of the terk-react-components library. No additional installation is required if you're already using the library.

## API

```typescript
useClickOutside({
  overlayContainerRef,
  action?
}: {
  overlayContainerRef?: RefObject<HTMLElement | null>;
  action?: () => void;
}): void
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `overlayContainerRef` | `RefObject<HTMLElement \| null>` | No | React ref to the overlay element that should trigger the action when clicked |
| `action` | `() => void` | No | Callback function to be executed when the overlay element is clicked |

## Behavior

- The hook attaches a `mousedown` event listener to the element referenced by `overlayContainerRef`.
- When a click is detected on the element, the `action` callback is executed.
- The event listener is automatically cleaned up when the component unmounts or when the dependencies change.
- If `overlayContainerRef` is null or undefined, no event listener will be attached.

## Usage Examples

### Basic Usage with a Sidebar

```tsx
import { useRef, useState } from 'react';
import { useClickOutside } from 'terk-react-components';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  
  useClickOutside({
    overlayContainerRef: sidebarRef,
    action: () => {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  });

  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
      
      {isOpen && (
        <div ref={sidebarRef} className="sidebar">
          <h2>Sidebar Content</h2>
          <p>Click outside to close</p>
        </div>
      )}
    </div>
  );
}
```

### With a Modal Dialog

```tsx
import { useRef, useState } from 'react';
import { useClickOutside } from 'terk-react-components';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  useClickOutside({
    overlayContainerRef: modalRef,
    action: () => setIsOpen(false)
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      {isOpen && (
        <div className="modal-backdrop">
          <div ref={modalRef} className="modal">
            <h2>Modal Content</h2>
            <p>Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Test Cases

Here are some examples of how to test the `useClickOutside` hook:

### Testing with Jest and React Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { useRef, useState } from 'react';
import { useClickOutside } from 'terk-react-components';

// Test component
function TestComponent() {
  const [isActive, setIsActive] = useState(true);
  const ref = useRef(null);
  
  useClickOutside({
    overlayContainerRef: ref,
    action: () => setIsActive(false)
  });
  
  return (
    <div>
      <div data-testid="outside-element">Click outside</div>
      <div ref={ref} data-testid="target-element">
        {isActive ? 'Active' : 'Inactive'}
      </div>
    </div>
  );
}

describe('useClickOutside hook', () => {
  test('should call action when clicking outside the target element', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('target-element')).toHaveTextContent('Active');
    
    // Click outside the target element
    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    
    expect(screen.getByTestId('target-element')).toHaveTextContent('Inactive');
  });
  
  test('should not call action when clicking inside the target element', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('target-element')).toHaveTextContent('Active');
    
    // Click inside the target element
    fireEvent.mouseDown(screen.getByTestId('target-element'));
    
    // Should still be active
    expect(screen.getByTestId('target-element')).toHaveTextContent('Active');
  });
  
  test('should not call action when clicking on a button element', () => {
    const { container } = render(
      <div>
        <TestComponent />
        <button>Button outside</button>
      </div>
    );
    
    expect(screen.getByTestId('target-element')).toHaveTextContent('Active');
    
    // Find the button and click it
    const button = container.querySelector('button');
    if (button) fireEvent.mouseDown(button);
    
    // Should still be active since we clicked a button
    expect(screen.getByTestId('target-element')).toHaveTextContent('Active');
  });
});
```

### Testing Edge Cases

```tsx
describe('useClickOutside edge cases', () => {
  test('should not throw when sidebarContainerRef is null', () => {
    // Create a test component where the ref is initially null
    function NullRefComponent() {
      const [isActive, setIsActive] = useState(true);
      const nullRef = { current: null };
      
      useClickOutside({
        overlayContainerRef: nullRef,
        action: () => setIsActive(false)
      });
      
      return (
        <div data-testid="component">
          {isActive ? 'Active' : 'Inactive'}
        </div>
      );
    }
    
    // Should render without errors
    expect(() => render(<NullRefComponent />)).not.toThrow();
    
    // Click anywhere should not cause errors
    expect(() => {
      fireEvent.mouseDown(document.body);
    }).not.toThrow();
  });
  
  test('should do nothing when action is not provided', () => {
    // Component with no action
    function NoActionComponent() {
      const ref = useRef(null);
      
      useClickOutside({
        overlayContainerRef: ref
        // No action provided
      });
      
      return <div ref={ref} data-testid="element">Test</div>;
    }
    
    render(<NoActionComponent />);
    
    // Click outside - no error should occur
    expect(() => {
      fireEvent.mouseDown(document.body);
    }).not.toThrow();
  });
});
```

## Considerations and Limitations

1. **Event Target**: The hook now attaches the event listener directly to the overlay container element instead of the document, which changes how clicks are detected and handled.

2. **Optional Ref**: The `overlayContainerRef` parameter is now optional. If not provided or if it's null, no event listener will be attached.

3. **Event Type**: The hook uses the `mousedown` event rather than `click`. This is generally preferable for UI interactions as it fires earlier in the click sequence.

4. **Accessibility**: For fully accessible UI components, consider also handling keyboard events (like Escape key) to close modals or dropdowns.

## License

This hook is part of the terk-react-components library. Refer to the library's license for usage terms.