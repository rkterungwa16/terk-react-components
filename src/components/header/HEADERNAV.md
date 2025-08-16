# HeaderNav Component

A specialized navigation component designed for use within headers. The HeaderNav component renders a horizontal navigation menu from structured data, with support for both individual navigation items and grouped items. It's built on top of the `Nav` and `NavItem` components, with pre-configured settings optimized for header usage.

## Installation

This component is part of the terk-react-components library. No additional installation is required if you're already using the library.

## API

```tsx
import { HeaderNav } from 'terk-react-components';

<HeaderNav 
  components={{ nav: "nav", navItem: "li" }}
  data={headerNavData}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class names to apply to the navigation container |
| `components.nav` | `"div" \| "ul" \| "nav" \| ElementType` | Required | The component type to use for the nav element |
| `components.navItem` | `"div" \| "li" \| "span" \| ElementType` | Required | The component type to use for the navigation items |
| `data` | `HeaderNavData` | Required | Array of navigation items to render (see HeaderNavData format below) |
| `padding` | `PaddingSpacing` | `undefined` | Configures padding for the navigation container using predefined spacing values |
| `...rest` | `HTMLAttributes<HTMLElement>` | - | All other props are passed to the underlying Nav component |

### HeaderNavData Format

The `data` prop should be an array of objects with the following structure:

```ts
type HeaderNavDataItem = {
  component: "nav-item" | "nav-group" | "logo" | "button" | "icon" | "image";
  name: string;
  href?: string;
  isDropdown?: boolean;
  icon?: {
    class?: string;
    name: string;
  };
  group?: HeaderNavDataItem[];
};

type HeaderNavData = HeaderNavDataItem[];
```

Where:
- `component`: Determines the type of element to render 
  - `"nav-item"`: Individual navigation item (renders as a NavItem)
  - `"nav-group"`: Group of navigation items (renders as a nested nav)
  - Other types are defined but not currently implemented in the rendering
- `name`: The text to display for the item
- `href`: (Optional) The URL for navigation items (automatically wraps content in a Link)
- `isDropdown`: (Optional) Indicates if the item should be treated as a dropdown menu
- `icon`: (Optional) Icon configuration
- `group`: (Optional) Array of child navigation items (for nav-group components)

## Usage Examples

### Basic Usage

```tsx
import { HeaderNav } from 'terk-react-components';

const navigationData = [
  {
    component: "nav-item",
    name: "Home",
    href: "/home",
  },
  {
    component: "nav-item",
    name: "About",
    href: "/about",
  },
  {
    component: "nav-item",
    name: "Contact",
    href: "/contact",
  }
];

function HeaderNavigation() {
  return (
    <HeaderNav
      components={{
        nav: "nav",
        navItem: "li"
      }}
      data={navigationData}
    />
  );
}
```

### With Grouped Navigation Items

```tsx
import { HeaderNav } from 'terk-react-components';

const navigationData = [
  {
    component: "nav-item",
    name: "Home",
    href: "/home",
  },
  {
    component: "nav-group",
    name: "Resources",
    group: [
      {
        component: "nav-item",
        name: "Documentation",
        href: "/docs",
      },
      {
        component: "nav-item",
        name: "Tutorials",
        href: "/tutorials",
      },
      {
        component: "nav-item",
        name: "API Reference",
        href: "/api",
      }
    ]
  }
];

function GroupedHeaderNav() {
  return (
    <HeaderNav
      components={{
        nav: "nav",
        navItem: "li"
      }}
      data={navigationData}
      className="site-navigation"
    />
  );
}
```

### Integration with Header Component

```tsx
import { Header, HeaderNav } from 'terk-react-components';

const navigationData = [
  {
    component: "nav-item",
    name: "Home",
    href: "/home",
  },
  {
    component: "nav-item",
    name: "Products",
    href: "/products",
  },
  {
    component: "nav-item",
    name: "Contact",
    href: "/contact",
  }
];

function MainHeader() {
  return (
    <Header 
      position="sticky" 
      container={{ breakpoint: "lg" }}
    >
      <div className="header-content">
        <div className="logo">MyApp</div>
        <HeaderNav
          components={{
            nav: "nav",
            navItem: "li"
          }}
          data={navigationData}
          padding={{ px: "md", py: "sm" }}
        />
      </div>
    </Header>
  );
}
```

### With Custom Components

```tsx
import { HeaderNav } from 'terk-react-components';
import { forwardRef } from 'react';

// Custom nav component
const CustomNav = forwardRef((props, ref) => (
  <aside {...props} ref={ref} className={`custom-nav ${props.className || ''}`} />
));

// Custom nav item component
const CustomNavItem = forwardRef((props, ref) => (
  <div {...props} ref={ref} className={`custom-nav-item ${props.className || ''}`} />
));

function CustomizedHeaderNav() {
  return (
    <HeaderNav
      components={{
        nav: CustomNav,
        navItem: CustomNavItem
      }}
      data={navigationData}
      className="header-navigation"
      padding={{ p: "lg" }}
    />
  );
}
```

## Styling

The component uses the following CSS classes:

- `.terkui-header-nav`: Applied to the root Nav component
  - Configures display as flex with space-between justification and padding
- `.terkui-header-nav-item`: Applied to navigation item elements for header-specific styling
  - Provides positioning, whitespace handling, text decoration, cursor, font weight, padding, and border radius
  - Includes hover effects to emphasize interactive items
- `.terkui-header-nav-subtitle`: Available for subtitle styling (not currently used by default)

The component also supports standard padding utility classes based on the `padding` prop:
- `.terkui-p-{size}` - Applied for all-sides padding (where size is xs, sm, md, lg, xl, or 2xl)
- `.terkui-pt-{size}` - Top padding
- `.terkui-pr-{size}` - Right padding
- `.terkui-pb-{size}` - Bottom padding
- `.terkui-pl-{size}` - Left padding
- `.terkui-px-{size}` - Horizontal padding (left and right)
- `.terkui-py-{size}` - Vertical padding (top and bottom)

The component also inherits classes from the Nav component:
- `.terkui-nav-direction-horizontal`: Sets horizontal layout
- `.terkui-nav-justify-start`: Aligns items to the start

## Related Components

- `Nav`: The base navigation component used internally for layout and structure
- `NavItem`: Used to render individual navigation items with consistent styling
- `Link`: Used internally by NavItem when an href is provided
- `Header`: The parent container component that typically contains HeaderNav

## Implementation Details

- The HeaderNav component automatically applies horizontal direction and start justification to the Nav component
- When rendering nav-items with href attributes, they're automatically wrapped in Link components
- Each navigation item receives a unique key based on its name and position in the array
- Navigation groups are rendered as nested nav elements containing their child items

## Accessibility

- The component includes `role="navigation"` to ensure proper accessibility
- When using with a Nav component, ensure the component types are semantically appropriate (e.g., use `li` for NavItems when Nav is a `ul`)
- Links created from navigation items inherit accessibility features from the Link component

## Best Practices

1. Use semantic HTML elements that match your document structure (e.g., ul/li pattern)
2. For dropdown navigation items, consider adding ARIA attributes for better accessibility
3. Keep navigation labels concise and clear
4. Consider how navigation will respond at different viewport sizes
5. Limit the number of top-level navigation items to avoid overcrowding the header
6. For complex navigation structures, consider implementing a mobile-friendly navigation pattern
7. Use the `padding` prop for consistent spacing rather than manually adding padding classes