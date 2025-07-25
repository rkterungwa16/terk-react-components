# Overlay Component

The `Overlay` component provides a customizable full-screen overlay that can be used to create modal backgrounds, loading screens, or any other UI element that needs to cover the entire viewport with a semi-transparent layer.

## Features

- **Visibility Control**: Can be shown or hidden with the `visible` prop
- **Animation Support**: Supports fade-in and fade-out animations
- **Customizable Timing**: Multiple transition duration options
- **Styling Flexibility**: Can be styled with custom classes
- **Accessible**: Designed with accessibility in mind
- **Ref Forwarding**: Supports React's ref forwarding for DOM access

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `undefined` | Additional CSS class(es) to apply to the overlay |
| `visible` | boolean | `false` | Controls the visibility of the overlay |
| `timeout` | 150 \| 200 \| 250 \| 300 \| 350 \| 400 | `150` | Duration of the animation in milliseconds |
| `animation` | "fadein" \| "fadeout" | `"fadein"` | Type of animation to apply |
| `children` | ReactNode | `undefined` | Content to render inside the overlay |
| `...rest` | HTMLAttributes<HTMLDivElement> | - | Additional HTML attributes passed to the div element |

## Behavior

The Overlay component renders a full-screen div with a semi-transparent background. Its behavior is primarily controlled through three props:

1. **visible**: When `true`, the overlay is shown with an opacity of 1. When `false`, the overlay has an opacity of 0 but remains in the DOM.

2. **animation**: Determines which animation to apply:
   - `fadein`: Gradually increases opacity from 0 to the target value
   - `fadeout`: Gradually decreases opacity from the current value to 0

3. **timeout**: Controls the duration of the animation, with options ranging from 150ms to 400ms. This value is mapped to CSS animation duration classes:
   - `150` → `xs` (extra small)
   - `200` → `sm` (small)
   - `250` → `md` (medium)
   - `300` → `lg` (large)
   - `350` → `xl` (extra large)
   - `400` → `2xl` (double extra large)

## Usage Examples

### Basic Overlay

```tsx
import { Overlay } from './Overlay';
import { useState } from 'react';

function BasicOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowOverlay(!showOverlay)}>
        Toggle Overlay
      </button>
      
      <Overlay visible={showOverlay}>
        <div className="centered-content">
          <p>This content appears over the page</p>
          <button onClick={() => setShowOverlay(false)}>Close</button>
        </div>
      </Overlay>
    </>
  );
}
```

### Loading Overlay

```tsx
import { Overlay } from './Overlay';

function LoadingOverlay({ isLoading }) {
  return (
    <Overlay visible={isLoading} timeout={250}>
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </Overlay>
  );
}
```

### Custom Animation and Timing

```tsx
import { Overlay } from './Overlay';

function CustomOverlay({ isVisible }) {
  return (
    <Overlay 
      visible={isVisible}
      animation="fadeout"
      timeout={400}
      className="custom-overlay"
    >
      <div className="notification">
        <h3>Notification</h3>
        <p>This notification will fade out slowly</p>
      </div>
    </Overlay>
  );
}
```

## Styling

The Overlay component applies the following CSS classes that can be targeted for customization:

- `terkui-overlay`: Base class with position and background color
- `terkui-animation-{animation}-{timeout}`: Animation type and duration
- `terkui-opacity-{0|1}`: Opacity based on visibility

## Accessibility Considerations

When using the Overlay component, especially for modal or dialog content, consider the following accessibility best practices:

1. **Focus Management**: When showing an overlay with interactive elements, trap focus within it
2. **Keyboard Navigation**: Ensure all elements are keyboard accessible
3. **ARIA Attributes**: Add appropriate ARIA attributes such as `aria-modal="true"` for modal overlays
4. **Screen Reader Support**: Include proper labels and descriptions

## Best Practices

1. **Performance**: Avoid showing/hiding the overlay frequently in short intervals
2. **Z-index Management**: Be aware that the overlay has a high z-index (1000) by default
3. **Content Organization**: Place important content near the center of the overlay for visibility
4. **Mobile Considerations**: Test overlay behavior on mobile devices to ensure proper display
5. **Animation Choice**: Use `fadein` for appearing elements and `fadeout` for disappearing elements