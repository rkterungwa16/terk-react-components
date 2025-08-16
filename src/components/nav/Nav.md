# Nav Component

## Overview

The `Nav` component is a flexible navigation container that provides structured layout for navigation items. It can be rendered as various HTML elements (`ul`, `div`, `nav`, or a custom component) and supports different alignments and orientations through customizable justify and direction props.

## Import

```tsx
import { Nav } from 'terk-react-components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class(es) to apply to the navigation container |
| `component` | `"div" \| "ul" \| "nav" \| ElementType` | `"ul"` | The component used for the root node |
| `justify` | `"start" \| "center" \| "end"` | `undefined` | Horizontal alignment of navigation items (applies `justify-content` CSS property) |
| `direction` | `"horizontal" \| "vertical"` | `undefined` | Direction of the navigation layout (controls `flex-direction` CSS property) |
| `padding` | `PaddingSpacing` | `undefined` | Configures padding for the navigation using predefined spacing values |
| `data-testid` | `string` | `undefined` | Test ID for testing library selection (primarily for testing) |

Additionally, the component accepts all standard HTML attributes that apply to the chosen root element (div, ul, or nav).

## Examples

### Basic Usage

```tsx
<Nav>
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <NavItem component="li" href="/contact">Contact</NavItem>
</Nav>
```

### With Custom Justification

```tsx
<Nav justify="center">
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <NavItem component="li" href="/contact">Contact</NavItem>
</Nav>
```

### Vertical Navigation

```tsx
<Nav direction="vertical">
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <NavItem component="li" href="/contact">Contact</NavItem>
</Nav>
```

### Using a Different Root Component

```tsx
<Nav component="nav" justify="end">
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <NavItem component="li" href="/contact">Contact</NavItem>
</Nav>
```

### Using a Custom Component

```tsx
const CustomNav = forwardRef((props, ref) => (
  <aside {...props} ref={ref} />
));

<Nav component={CustomNav}>
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
</Nav>
```

### With Padding

```tsx
<Nav padding={{ px: "lg", py: "md" }}>
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <NavItem component="li" href="/contact">Contact</NavItem>
</Nav>
```

### With Multiple Padding Values

```tsx
<Nav padding={{ pt: "xl", pb: "sm", pl: "md", pr: "lg" }}>
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
</Nav>
```

### With Subtitle Section

```tsx
<Nav direction="vertical">
  <h6 className="terkui-nav-subtitle">Main Navigation</h6>
  <NavItem component="li" href="/home">Home</NavItem>
  <NavItem component="li" href="/about">About</NavItem>
  <h6 className="terkui-nav-subtitle">User Options</h6>
  <NavItem component="li" href="/profile">Profile</NavItem>
  <NavItem component="li" href="/settings">Settings</NavItem>
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

- `.terkui-nav-filled`: When you want the navigation to take full width
  - Sets `width: 100%`

- Padding utility classes generated from the `padding` prop:
  - `.terkui-p-{size}`: All-sides padding (where size is xs, sm, md, lg, xl, or 2xl)
  - `.terkui-pt-{size}`, `.terkui-pr-{size}`, `.terkui-pb-{size}`, `.terkui-pl-{size}`: Individual side padding
  - `.terkui-px-{size}`: Horizontal padding (left and right)
  - `.terkui-py-{size}`: Vertical padding (top and bottom)

Note: The documentation references `.terkui-nav-subtitle`, but this class is not defined in the current styles.css implementation. You may need to add it if you want to use navigation subtitles as shown in the examples.

You can customize the styling by:

1. Overriding the default CSS classes
2. Providing a custom `className` prop

## Accessibility

- The component includes `role="navigation"` to ensure proper accessibility
- When using with `NavItem` components, ensure that you provide proper ARIA attributes for active and disabled states
- For navigation menus that serve as the main navigation, consider using the `<nav>` element with `component="nav"` for better semantic structure

## Implementation Notes

- The Nav component does not import any CSS directly; styles are applied through class names
- Make sure you have imported the main stylesheet from the library when using this component
- For proper nesting, use a `component` value that semantically matches your usage (e.g., use `ul` when NavItems are `li` elements)