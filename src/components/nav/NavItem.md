# NavItem Component Documentation

## Overview

The `NavItem` component is a navigation item wrapper that renders as an `<li>` element. It's designed to be used in navigation menus and lists. When provided with an `href` prop, it automatically wraps its children in a `Link` component.

## Import

```tsx
import { NavItem } from 'path/to/components/nav';
```

## Props

The `NavItem` component accepts all properties from the `Link` component plus the following:

### NavItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `classes.item` | `string` | `undefined` | Additional CSS class(es) to apply to the list item element |
| `classes.link` | `string` | `undefined` | Additional CSS class(es) to apply to the link element (when href is provided) |

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
<NavItem href="/home">Home</NavItem>
```

### With Active State

```tsx
<NavItem href="/about" active>About</NavItem>
```

### Custom Styling

```tsx
<NavItem 
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
<NavItem>
  <span>Custom Content</span>
</NavItem>
```

## Styling

The component comes with minimal default styling:

- `.terkui-nav-item`: Applied to the list item element
  - Sets `position: relative`
  - Sets `white-space: nowrap`
  - Sets `text-decoration: none`
  - Sets `cursor: pointer`

You can customize the styling by:

1. Overriding the default CSS classes
2. Providing custom classes through the `classes` prop
3. Using the `className` prop which gets passed to the Link component when an href is provided

## Accessibility

- When `active` is true, the link will have `aria-current="page"`
- When `disabled` is true, the link will have `aria-disabled="true"` and `tabIndex={-1}`
