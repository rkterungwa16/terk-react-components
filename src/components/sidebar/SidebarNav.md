# SidebarNav Component Documentation

## Overview

The `SidebarNav` component is a specialized navigation component designed for use within sidebars. It renders a vertical navigation menu from structured data, with support for both navigation items and section subtitles. The component is built on top of the `Nav` and `NavItem` components, with pre-configured settings optimized for sidebar usage.

## Import

```tsx
import { SidebarNav } from 'path/to/components/sidebar';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class(es) to apply to the navigation container |
| `components.nav` | `"div" \| "ul" \| "nav" \| ElementType` | Required | The component type to use for the nav element |
| `components.navItem` | `"div" \| "li" \| ElementType` | Required | The component type to use for the navigation items |
| `data` | `NavData` | Required | Array of navigation items to render (see NavData format below) |

Additionally, the component accepts all standard HTML attributes that apply to the chosen root element.

### NavData Format

The `data` prop should be an array of objects with the following structure:

```ts
type NavDataItem = {
  component: 'nav-item' | 'nav-group' | 'subtitle';
  name: string;
  href?: string;
  icon?: {
    class?: string;
    name: string;
  };
  badge?: {
    color: string;
    text: string;
  };
};

type NavData = NavDataItem[];
```

Where:
- `component`: Determines the type of element to render ('nav-item' for links, 'subtitle' for section headers)
- `name`: The text to display for the item
- `href`: (Optional) The URL for navigation items
- `icon`: (Optional) Icon configuration (not currently implemented in rendering)
- `badge`: (Optional) Badge configuration (not currently implemented in rendering)

## Examples

### Basic Usage

```tsx
import { SidebarNav } from 'path/to/components/sidebar';

const navigationData = [
  {
    component: "nav-item",
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    component: "subtitle",
    name: "Products",
  },
  {
    component: "nav-item",
    name: "T-Shirts",
    href: "/products/t-shirts",
  },
  {
    component: "nav-item",
    name: "Pants",
    href: "/products/pants",
  }
];

function Sidebar() {
  return (
    <SidebarNav
      components={{
        nav: "nav",
        navItem: "li"
      }}
      data={navigationData}
    />
  );
}
```

### With Custom Components

```tsx
import { SidebarNav } from 'path/to/components/sidebar';
import { forwardRef } from 'react';

// Custom nav component
const CustomNav = forwardRef((props, ref) => (
  <aside {...props} ref={ref} />
));

// Custom nav item component
const CustomNavItem = forwardRef((props, ref) => (
  <div {...props} ref={ref} className={`custom-nav-item ${props.className || ''}`} />
));

function Sidebar() {
  return (
    <SidebarNav
      components={{
        nav: CustomNav,
        navItem: CustomNavItem
      }}
      data={navigationData}
      className="custom-sidebar-nav"
    />
  );
}
```

## Styling

The component uses the following CSS classes:

- Uses all classes from the `Nav` component with `direction="vertical"` and `justify="start"`
- For subtitle elements:
  - `.terkui-text-gray`: Sets gray text color
  - `.terkui-uppercase`: Transforms text to uppercase
  - `.terkui-nav-subtitle`: Applies subtitle styling (font size, padding, letter spacing)

## Related Components

- `Nav`: The base navigation component used internally
- `NavItem`: Used to render individual navigation items
- `Sidebar`: The parent container component that typically contains SidebarNav

## Accessibility

- The component includes `role="navigation"` to ensure proper accessibility
- Section subtitles are rendered as `h6` elements for proper document structure