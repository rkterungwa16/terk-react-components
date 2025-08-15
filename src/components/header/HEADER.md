# Header Component

A flexible header component that provides a consistent header layout for your application. The Header component can be positioned as `fixed` or `sticky` and can optionally wrap its content in a `Container` for responsive width management. It's designed to work with the `HeaderNav` component to create complete navigation headers, but can be used with any content.

## Installation

This component is part of the terk-react-components library. No additional installation is required if you're already using the library.

## API

```tsx
import { Header } from 'terk-react-components';

<Header position="sticky" container={{ breakpoint: "lg" }}>
  Your header content
</Header>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class names to apply to the header |
| `position` | `"fixed" \| "sticky"` | `undefined` | Controls the positioning behavior of the header |
| `container` | `{ className?: string; breakpoint: ContainerBreakpoint }` | `undefined` | Configuration for the inner Container component |
| `children` | `ReactNode` | `undefined` | The content to be rendered inside the header |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | - | All other props are passed to the underlying div element |

### Container Configuration

When using the `container` prop, you can specify:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `breakpoint` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "fluid"` | Required | Determines the responsive behavior of the container |
| `className` | `string` | `undefined` | Additional CSS class names to apply to the container |

## Positioning Options

The `position` prop controls how the header is positioned on the page:

| Value | Behavior |
|-------|----------|
| `fixed` | Header is fixed at the top of the viewport and does not move when the page is scrolled |
| `sticky` | Header remains in the normal flow until scrolled, then it sticks to the top of the viewport |

## Usage Examples

### Basic Header

```tsx
import { Header } from 'terk-react-components';

function BasicHeader() {
  return (
    <Header>
      <h1>My Application</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </Header>
  );
}
```

### Sticky Header with Container

```tsx
import { Header } from 'terk-react-components';

function StickyHeader() {
  return (
    <Header 
      position="sticky" 
      container={{ breakpoint: "lg" }}
      className="my-custom-header"
    >
      <div className="header-content">
        <div className="logo">Logo</div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </Header>
  );
}
```

### Fixed Header with Custom Styling

```tsx
import { Header } from 'terk-react-components';

function FixedHeader() {
  return (
    <Header 
      position="fixed" 
      container={{ 
        breakpoint: "fluid",
        className: "container-custom-class" 
      }}
      className="bg-dark text-white py-3"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h1>Company Name</h1>
        <button>Menu</button>
      </div>
    </Header>
  );
}
```

### With HeaderNav Integration

```tsx
import { Header, HeaderNav } from 'terk-react-components';

// Navigation data structure
const navigationData = [
  {
    component: "nav-item",
    name: "Home",
    href: "/home",
  },
  {
    component: "nav-group",
    name: "Products",
    group: [
      {
        component: "nav-item",
        name: "Category 1",
        href: "/products/category-1",
      },
      {
        component: "nav-item",
        name: "Category 2",
        href: "/products/category-2",
      }
    ]
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
        <div className="logo">
          <img src="/logo.svg" alt="Company Logo" />
        </div>
        <HeaderNav
          components={{
            nav: "nav",
            navItem: "li"
          }}
          data={navigationData}
        />
      </div>
    </Header>
  );
}
```

### With Event Handlers

```tsx
import { Header } from 'terk-react-components';
import { useState } from 'react';

function InteractiveHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Header 
      position="sticky"
      className={isExpanded ? 'expanded' : ''}
      onClick={() => console.log('Header clicked')}
    >
      <div className="header-content">
        <h1>Interactive Header</h1>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <div className="expanded-content">
          Additional content when expanded
        </div>
      )}
    </Header>
  );
}
```

## Styling

The Header component comes with minimal styling to handle positioning behaviors:

- `.terkui-header` - Base class for all headers
  - Sets positioning at the top of the viewport 
  - Sets z-index to 1024 for proper stacking
- `.terkui-header-sticky` - Applied when `position="sticky"` is used
  - Sets `position: sticky` for header that sticks to viewport when scrolling
- `.terkui-header-fixed` - Applied when `position="fixed"` is used
  - Sets `position: fixed` for header that stays in place regardless of scrolling

When used with the HeaderNav component, the following classes are available:

- `.terkui-header-nav` - Applied to the navigation container
  - Sets display as flex with space-between justification
  - Adds padding for proper spacing
- `.terkui-header-nav-item` - Applied to navigation items
  - Provides consistent styling for nav items within the header
  - Configures proper spacing, text styling, and hover effects

### CSS Variables

The Header component relies on these CSS variables:

| CSS Variable | Description |
|--------------|-------------|
| `--z-index` | Controls the stacking order of the header (default: 1024) |
| `--color-black` | Used for text color in header navigation items |

## Accessibility

When using the Header component, consider the following accessibility best practices:

- Use semantic HTML elements within your header (e.g., `<nav>`, `<h1>`)
- Ensure sufficient color contrast between text and background
- For fixed or sticky headers, ensure the content underneath is not obscured
- Consider adding a "skip to main content" link for keyboard navigation

## Browser Support

The Header component uses standard CSS positioning properties which are well-supported in all modern browsers.

## Related Components

- **HeaderNav**: Specialized navigation component designed to work within the Header
- **Container**: Used internally when the `container` prop is provided
- **Nav**: Base navigation component used by HeaderNav
- **NavItem**: Used by HeaderNav to render individual navigation items

## Best Practices

- For fixed headers, remember to add appropriate padding to the top of your content to prevent it from being hidden under the header
- Use the container prop to ensure your header content has consistent width constraints that match the rest of your layout
- Consider how the header will behave on mobile devices, especially when using position="fixed"
- Use the z-index carefully if you have other fixed or absolute-positioned elements
- Consider using the HeaderNav component for consistent navigation styling
- For responsive designs, you may need to implement a mobile menu toggle for small screens
- Test fixed headers on mobile devices to ensure they don't take up too much screen space