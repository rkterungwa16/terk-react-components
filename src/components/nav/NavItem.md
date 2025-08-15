# NavItem Component

## Overview

The `NavItem` component is a navigation item wrapper that can be configured to render as various HTML elements (`li`, `div`, `span`, or a custom component). It's designed to be used in navigation menus and lists. When provided with an `href` prop, it automatically wraps its children in a `Link` component. The component includes white text styling by default.

## Import

```tsx
import { NavItem } from 'terk-react-components';
```

## Props

The `NavItem` component accepts all properties from the `Link` component plus the following:

### NavItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `classes.item` | `string` | `undefined` | Additional CSS class(es) to apply to the container element |
| `classes.link` | `string` | `undefined` | Additional CSS class(es) to apply to the link element (when href is provided) |
| `component` | `"div" \| "li" \| "span" \| ElementType` | `"li"` | Required. The component used for the root node |

### Inherited from LinkProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | When true, adds `aria-current="page"` to indicate the current page |
| `className` | `string` | `undefined` | CSS class(es) to apply to the component |
| `disabled` | `boolean` | `false` | When true, prevents click events and adds appropriate aria attributes |
| `href` | `string` | `undefined` | The URL that the link points to |
| `onClick` | `(event: React.MouseEvent<HTMLAnchorElement>) => void` | `undefined` | Click event handler |
| `children` | `ReactNode` | Required | The content to be displayed inside the NavItem |

Additionally, the component accepts all standard HTML anchor attributes.

## Examples

### Basic Usage

```tsx
<NavItem component="li" href="/home">Home</NavItem>
```

### With Active State

```tsx
<NavItem component="li" href="/about" active>About</NavItem>
```

### Custom Styling

```tsx
<NavItem 
  component="li"
  href="/contact" 
  classes={{
    item: "custom-item-class",
    link: "custom-link-class"
  }}
>
  Contact Us
</NavItem>
```

### Without Link (Content Only)

```tsx
<NavItem component="li">
  <span>Custom Content</span>
</NavItem>
```

### Using a Different Component

```tsx
<NavItem component="div">
  Custom Div Element
</NavItem>
```

### Using a Custom Component

```tsx
const CustomComponent = forwardRef((props, ref) => (
  <section {...props} ref={ref} />
));

<NavItem component={CustomComponent}>
  Custom Section Element
</NavItem>
```

## Styling

The component comes with minimal default styling:

- `.terkui-nav-item`: Applied to the root element (li, div, span, or custom component)
- `.terkui-text-white`: Applied to provide white text color

Note: The documentation suggests hover state styling and other properties, but these aren't defined in the current styles.css implementation. You may need to add these styles if needed.

You can customize the styling by:

1. Overriding the default CSS classes
2. Providing custom classes through the `classes` prop
3. Using the `className` prop which gets passed to the Link component when an href is provided

## Accessibility

- When `active` is true, the link will have `aria-current="page"`
- When `disabled` is true, the link will have `aria-disabled="true"` and `tabIndex={-1}`

## Implementation Notes

- The NavItem component imports styles.css for basic styling
- The `component` prop is required and determines the root HTML element
- When using NavItem within a Nav component, ensure the component types are semantically appropriate (e.g., use `li` when the Nav is a `ul`)
- The component automatically wraps content in a Link component when an href is provided
