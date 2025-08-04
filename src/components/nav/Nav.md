# Nav Component Documentation

## Overview

The `Nav` component is a flexible navigation container that provides structured layout for navigation items. It can be rendered as various HTML elements (`ul`, `div`, `nav`, or a custom component) and supports different alignments and orientations.

## Import

```tsx
import { Nav } from 'path/to/components/nav';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class(es) to apply to the navigation container |
| `component` | `"div" \| "ul" \| "nav" \| ElementType` | `"ul"` | The component used for the root node |
| `justify` | `"start" \| "center" \| "end"` | `undefined` | Horizontal alignment of navigation items |
| `direction` | `"horizontal" \| "vertical"` | `undefined` | Direction of the navigation layout |

Additionally, the component accepts all standard HTML attributes that apply to the chosen root element (div, ul, or nav).

## Examples

### Basic Usage

```tsx
<Nav>
  <NavItem href="/home">Home</NavItem>
  <NavItem href="/about">About</NavItem>
  <NavItem href="/contact">Contact</NavItem>
</Nav>
```

### With Custom Justification

```tsx
<Nav justify="center">
  <NavItem href="/home">Home</NavItem>
  <NavItem href="/about">About</NavItem>
  <NavItem href="/contact">Contact</NavItem>
</Nav>
```

### Vertical Navigation

```tsx
<Nav direction="vertical">
  <NavItem href="/home">Home</NavItem>
  <NavItem href="/about">About</NavItem>
  <NavItem href="/contact">Contact</NavItem>
</Nav>
```

### Using a Different Root Component

```tsx
<Nav component="nav" justify="end">
  <NavItem href="/home">Home</NavItem>
  <NavItem href="/about">About</NavItem>
  <NavItem href="/contact">Contact</NavItem>
</Nav>
```

### Using a Custom Component

```tsx
const CustomNav = forwardRef((props, ref) => (
  <aside {...props} ref={ref} />
));

<Nav component={CustomNav}>
  <NavItem href="/home">Home</NavItem>
  <NavItem href="/about">About</NavItem>
</Nav>
```

## Styling

The component comes with the following default styling:

- `.terkui-nav`: Applied to the root element
  - Sets `display: flex`
  - Removes default padding and margins
  - Removes list styling when used as a list

- `.terkui-nav-justify-start`: Aligns items to the start
  - Sets `justify-content: flex-start`

- `.terkui-nav-justify-center`: Centers items
  - Sets `justify-content: center`

- `.terkui-nav-justify-end`: Aligns items to the end
  - Sets `justify-content: end`

- `.terkui-nav-direction-horizontal`: Horizontal layout
  - Sets `flex-direction: row`

- `.terkui-nav-direction-vertical`: Vertical layout
  - Sets `flex-direction: column`

You can customize the styling by:

1. Overriding the default CSS classes
2. Providing a custom `className` prop

## Accessibility

- The component includes `role="navigation"` to ensure proper accessibility
- When using with `NavItem` components, ensure that you provide proper ARIA attributes for active and disabled states