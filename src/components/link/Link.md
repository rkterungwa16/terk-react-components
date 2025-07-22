# Link Component

The `Link` component is a customizable anchor element (`<a>`) that provides enhanced functionality beyond the standard HTML anchor tag.

## Features

- **Basic Link Functionality**: Renders an HTML anchor element with all standard anchor attributes
- **Active State**: Visually indicates the current active link with proper ARIA attributes
- **Disabled State**: Supports a disabled state with appropriate ARIA attributes and prevents interactions
- **Class Customization**: Allows custom styling while maintaining the base component styling
- **Ref Forwarding**: Supports React's ref forwarding to access the underlying DOM element
- **Event Handling**: Supports all standard DOM events with special handling for disabled state
- **Fully Accessible**: Implements proper accessibility attributes for various states

## Behavior

### Basic Rendering

The Link component renders as an anchor (`<a>`) element with the `terkui-link` class applied. It passes all standard HTML anchor attributes to the underlying element.

### Active State

When the `active` prop is set to `true`, the component adds the `aria-current="page"` attribute to indicate the current active page to assistive technologies.

### Disabled State

When the `disabled` prop is set to `true`, the component:
- Adds `aria-disabled="true"` to indicate the disabled state to assistive technologies
- Sets `tabIndex="-1"` to remove the element from the tab order
- Prevents click events from firing by intercepting and stopping the event propagation
- Prevents the default browser behavior when clicked

### Event Handling

The component properly handles all standard DOM events. For the `onClick` event specifically:
- If the link is disabled, the event is prevented from firing
- If the link is enabled, the event passes through normally

### Styling

The component accepts a custom `className` prop which is appended to the default `terkui-link` class, allowing for custom styling while maintaining the base component styling.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | boolean | `false` | Indicates if the link is for the current page |
| `className` | string | `undefined` | Additional CSS class(es) to apply to the component |
| `disabled` | boolean | `false` | Sets the link to a disabled state |
| `children` | ReactNode | Required | Content to render inside the link |
| `...rest` | HTMLAnchorElement props | - | All standard HTML anchor attributes are supported |

## Usage Examples

### Basic Link

```tsx
<Link href="https://example.com">Visit Example</Link>
```

### Active Link

```tsx
<Link href="/current-page" active>Current Page</Link>
```

### Disabled Link

```tsx
<Link href="/unavailable" disabled>Unavailable Page</Link>
```

### Custom Styling

```tsx
<Link href="/styled-link" className="custom-link primary-link">Styled Link</Link>
```

### With Events

```tsx
<Link 
  href="/clickable" 
  onClick={(e) => console.log('Link clicked', e)}
  onMouseEnter={() => console.log('Mouse entered')}
>
  Interactive Link
</Link>
```

## Accessibility

The Link component follows accessibility best practices by:

1. Using semantic HTML (`<a>` element)
2. Using `aria-current="page"` for active links
3. Using `aria-disabled="true"` and removing from tab order for disabled links
4. Preserving all standard HTML attributes for anchor elements

## Best Practices

- Use the `active` prop to indicate the current page in navigation
- Use the `disabled` prop for links that are temporarily unavailable
- Provide meaningful text content for screen readers
- Add `target="_blank"` and `rel="noopener noreferrer"` when linking to external sites