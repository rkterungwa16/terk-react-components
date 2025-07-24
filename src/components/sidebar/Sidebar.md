# Sidebar Component

The `Sidebar` component provides a collapsible, responsive side navigation panel that integrates seamlessly with your application's layout. It supports theming, size customization, and responsive behavior based on screen size.

## Features

- **Collapsible**: Can be toggled between open and closed states
- **Responsive**: Automatically adjusts to different screen sizes
- **Customizable Theming**: Supports light and dark themes
- **Flexible Sizing**: Multiple size options (sm, lg, xl)
- **Transition Effects**: Smooth animations when opening/closing
- **Click Outside Detection**: Can automatically close when clicking outside the sidebar
- **Flexible Rendering**: Uses render props pattern for complete control over the sidebar content
- **Container Margin Adjustment**: Automatically adjusts the margin of a container element to accommodate the sidebar

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isClose` | boolean | Required | Controls whether the sidebar is closed |
| `timeout` | number | 150 | Transition duration in milliseconds |
| `theme` | object | undefined | Custom theme settings for colors |
| `themeMode` | "dark" \| "light" | undefined | The theme variant to use |
| `size` | "sm" \| "lg" \| "xl" | undefined | Controls the width of the sidebar |
| `width` | number | undefined | Custom width in pixels (overrides size) |
| `className` | string | undefined | Additional CSS class(es) |
| `visible` | boolean | undefined | Controls visibility independently of isClose |
| `mainContainerRef` | RefObject | Required | Reference to main content container for margin adjustment |
| `sidebarContainerRef` | RefObject | undefined | Reference to sidebar container element (if not provided, an internal ref is used) |
| `handleClose` | (close: boolean) => () => void | undefined | Callback factory that receives current closed state and returns click handler |
| `renderChildren` | function | undefined | Render prop function for sidebar content |

### renderChildren Function

The `renderChildren` prop accepts a function with the following signature:

```tsx
({
  ref,
  style,
  props,
  isClose,
  classes
}: {
  ref?: RefObject<HTMLDivElement | null> | Ref<HTMLDivElement | null>;
  style: {
    opacity: number;
    transform?: string;
  };
  isClose?: boolean;
  props?: Record<string, unknown>;
  classes?: string[];
}) => ReactElement
```

## Behavior

### Responsive Behavior

The Sidebar component automatically adapts to different screen sizes:

- On small screens (sm, md breakpoints): Sidebar is hidden by default
- On larger screens (lg, xl, 2xl breakpoints): Sidebar is visible according to the `isClose` prop

### Transition States

The component uses React Transition Group to handle smooth animations with four states:

1. **entering**: Initial state when opening
2. **entered**: Completed open state
3. **exiting**: Initial state when closing
4. **exited**: Completed closed state

### Container Margin Adjustment

The component uses `mainContainerRef` to automatically adjust the margin of the main content to accommodate the sidebar:

- On desktop screens (lg, xl, 2xl breakpoints):
  - When sidebar is open: Main container margin is adjusted to the sidebar width
  - When sidebar is closed: Main container margin is reset to 0
- On mobile screens (sm, md breakpoints):
  - Main container margin is always 0, regardless of sidebar state

### Click Outside Detection

The sidebar uses the `useClickOutside` hook to detect clicks on the main container element. When a `handleClose` prop is provided, clicking outside the sidebar will trigger this callback, typically used to close the sidebar.

The `handleClose` function receives the current `isClose` state and should return a callback function that will be executed when clicking outside.

## Usage Examples

### Basic Sidebar

```tsx
import Sidebar from './Sidebar';
import { useRef, useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Sidebar
      </button>
      
      <Sidebar
        isClose={!isOpen}
        size="lg"
        themeMode="light"
        width={240}
        mainContainerRef={containerRef}
        handleClose={(isClose) => () => setIsOpen(!isClose)}
        renderChildren={({ ref, style, classes }) => (
          <div ref={ref} className={classes?.join(' ')} style={style}>
            <h2>Sidebar</h2>
            <nav>
              <ul>
                <li>Home</li>
                <li>Dashboard</li>
                <li>Settings</li>
              </ul>
            </nav>
          </div>
        )}
      />
      
      <main ref={containerRef}>
        Main content here
      </main>
    </>
  );
}
```

### Themed Sidebar

```tsx
import Sidebar from './Sidebar';

function ThemedSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  
  // Custom theme
  const customTheme = {
    sidebar: {
      dark: {
        color: '#ffffff',
        backgroundColor: '#222222'
      },
      light: {
        color: '#333333',
        backgroundColor: '#f5f5f5'
      }
    }
  };
  
  return (
    <Sidebar
      isClose={!isOpen}
      themeMode="dark"
      theme={customTheme}
      size="xl"
      mainContainerRef={containerRef}
      renderChildren={({ ref, style, classes }) => (
        <div ref={ref} className={classes?.join(' ')} style={style}>
          Themed Sidebar Content
        </div>
      )}
    />
  );
}
```

## Best Practices

1. **Main Container Reference**: Always provide a `mainContainerRef` as it's required for the sidebar to function properly
2. **Click Outside Handling**: Implement `handleClose` with the correct signature for mobile-friendly interaction
3. **Accessibility**: Ensure your rendered content includes proper ARIA attributes for navigation
4. **Responsive Design**: Test the sidebar at different breakpoints to ensure proper behavior
5. **Performance**: Avoid heavy computations in the `renderChildren` function as it may be called multiple times during transitions

## CSS Customization

The Sidebar component applies the following CSS classes that can be targeted for customization:

- `terkui-sidebar`: Applied to the root element
- `terkui-sidebar-size-[size]`: Size-specific class (sm, lg, xl)
- `terkui-sidebar-theme-[theme]`: Theme-specific class (dark, light)

## Accessibility Considerations

When implementing the sidebar content using `renderChildren`, ensure that:

1. Navigation elements use semantic HTML (`<nav>`, `<ul>`, `<li>`)
2. Include proper focus management for keyboard users
3. Consider adding a "Skip to main content" link at the top of the sidebar
4. Use appropriate ARIA attributes for navigation landmarks