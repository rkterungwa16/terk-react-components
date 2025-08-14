# useCurrentBreakpoint Hook

A React hook that detects and tracks the current viewport breakpoint. This hook is useful for implementing responsive UI behaviors that need to react to screen size changes.

## Installation

This hook is part of the terk-react-components library. No additional installation is required if you're already using the library.

## API

```typescript
useCurrentBreakpoint(): Breakpoint | null
```

### Return Value

Returns the current breakpoint as a string, which will be one of the following values:

| Breakpoint | Viewport Width Range       | Description            |
|------------|----------------------------|------------------------|
| `"sm"`     | < 768px                    | Mobile devices         |
| `"md"`     | >= 768px and < 1024px      | Tablets                |
| `"lg"`     | >= 1024px and < 1280px     | Laptops/small screens  |
| `"xl"`     | >= 1280px and < 1536px     | Large screens/desktops |
| `"2xl"`    | >= 1536px                  | TV/Extra large screens |

Returns `null` during initial render before the hook has had a chance to determine the current breakpoint.

## Behavior

- The hook uses window resize events to detect viewport size changes
- It calculates the current breakpoint based on predefined width thresholds
- It automatically updates when the window is resized
- It handles cleanup by removing event listeners when the component unmounts
- When used in server-side rendering, it safely checks for window availability
- The default fallback is the "lg" breakpoint if the calculation fails

## Usage Examples

### Basic Usage

```tsx
import { useCurrentBreakpoint } from 'terk-react-components';

function ResponsiveComponent() {
  const breakpoint = useCurrentBreakpoint();
  
  return (
    <div>
      <p>Current breakpoint: {breakpoint || 'calculating...'}</p>
      
      {/* Conditional rendering based on breakpoint */}
      {(breakpoint === 'sm' || breakpoint === 'md') && (
        <p>Mobile or tablet view</p>
      )}
      
      {(breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl') && (
        <p>Desktop view</p>
      )}
    </div>
  );
}
```

### With Responsive Styling

```tsx
import { useCurrentBreakpoint } from 'terk-react-components';
import { useState, useEffect } from 'react';

function ResponsiveLayout() {
  const breakpoint = useCurrentBreakpoint();
  const [columns, setColumns] = useState(4);
  
  useEffect(() => {
    // Adjust layout based on breakpoint
    if (!breakpoint) return;
    
    switch(breakpoint) {
      case 'sm':
        setColumns(1);
        break;
      case 'md':
        setColumns(2);
        break;
      case 'lg':
        setColumns(3);
        break;
      case 'xl':
      case '2xl':
        setColumns(4);
        break;
      default:
        setColumns(3); // Default fallback
    }
  }, [breakpoint]);
  
  return (
    <div className={`grid-columns-${columns}`}>
      {/* Grid content */}
    </div>
  );
}
```

## Internal Implementation

The hook consists of two main parts:

1. `checkCurrentBreakpoint` - A utility function that determines the breakpoint based on screen width
2. `useCurrentBreakpoint` - The hook itself which sets up event listeners and manages state

## Considerations and Limitations

1. **Server-Side Rendering**: The hook checks for `window` availability to avoid errors during SSR.

2. **Initial Value**: During the first render, the hook may return `null` before it calculates the breakpoint.

3. **Performance**: The resize event has built-in performance optimization using `useCallback` to prevent unnecessary rerenders.

4. **Breakpoint Definitions**: The breakpoints are defined in `src/utils/breakpoints.ts` and represent standard device sizes:
   - `sm`: Mobile devices (< 768px)
   - `md`: Tablets (768px - 1023px)
   - `lg`: Laptops/small screens (1024px - 1279px)
   - `xl`: Large screens/desktops (1280px - 1535px)
   - `2xl`: TV/Extra large screens (>= 1536px)

## Related Utilities

- `checkCurrentBreakpoint`: A standalone function exported from the same module that can be used to determine a breakpoint from a width value directly.

## License

This hook is part of the terk-react-components library. Refer to the library's license for usage terms.
