# SidebarNav Component

## Overview

The `SidebarNav` component is a specialized navigation component designed for use within sidebars. It renders a vertical navigation menu from structured data, with support for both navigation items and section subtitles. The component is built on top of the `Nav` and `NavItem` components, with pre-configured settings optimized for sidebar usage (vertical orientation and start justification).

## Import

```tsx
import { SidebarNav } from 'terk-react-components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class(es) to apply to the navigation container |
| `components.nav` | `"div" \| "ul" \| "nav" \| ElementType` | Required | The component type to use for the nav element |
| `components.navItem` | `"div" \| "li" \| "span" \| ElementType` | Required | The component type to use for the navigation items |
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
- `component`: Determines the type of element to render ('nav-item' for links, 'subtitle' for section headers, 'nav-group' for grouped items)
- `name`: The text to display for the item
- `href`: (Optional) The URL for navigation items (automatically wraps the content in a Link component)
- `icon`: (Optional) Icon configuration (not currently implemented in rendering)
- `badge`: (Optional) Badge configuration (not currently implemented in rendering)

Note: Currently, only 'nav-item' and 'subtitle' components are fully implemented in the rendering.

## Examples

### Basic Usage

```tsx
import { SidebarNav } from 'terk-react-components';

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
import { SidebarNav } from 'terk-react-components';
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
- For navigation items:
  - `.terkui-sidebar-nav-item`: Applied to navigation item elements for sidebar-specific styling
    - Provides positioning, whitespace handling, text decoration, cursor, font weight, padding, and border radius
    - Includes hover effects to highlight the active item
- For subtitle elements:
  - `.terkui-text-gray`: Sets gray text color
  - `.terkui-uppercase`: Transforms text to uppercase
  - `.terkui-sidebar-nav-subtitle`: Applies subtitle styling (font size, padding, whitespace, margin, letter spacing)

## Related Components

- `Nav`: The base navigation component used internally for layout and structure
- `NavItem`: Used to render individual navigation items with consistent styling
- `Link`: Used internally by NavItem when an href is provided
- `Sidebar`: The parent container component that typically contains SidebarNav

## Implementation Details

- The SidebarNav component automatically applies vertical direction and start justification to the Nav component
- When rendering nav-items with href attributes, they're automatically wrapped in Link components
- Subtitle elements are rendered as h6 elements with specific styling classes
- Each navigation item receives a unique key based on its name and position in the array

## Accessibility

- The component includes `role="navigation"` to ensure proper accessibility
- Section subtitles are rendered as `h6` elements for proper document structure
- When using with a Nav component, ensure the component types are semantically appropriate (e.g., use `li` for NavItems when Nav is a `ul`)
- Links created from navigation items inherit accessibility features from the Link component

## Best Practices

1. Use semantic HTML elements that match your document structure
2. Organize related navigation items under descriptive subtitles
3. Keep navigation labels concise and clear
4. Use the same component types that you would use in regular navigation (e.g., ul/li pattern)
5. Consider color contrast when customizing the styling of navigation items