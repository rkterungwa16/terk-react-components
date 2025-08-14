# Header Component

A flexible header component that provides a consistent header layout for your application. The Header component can be positioned as `fixed` or `sticky` and can optionally wrap its content in a `Container` for responsive width management.

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
- `.terkui-header-sticky` - Applied when `position="sticky"` is used
- `.terkui-header-fixed` - Applied when `position="fixed"` is used

### CSS Variables

The Header component relies on these CSS variables:

| CSS Variable | Description |
|--------------|-------------|
| `--z-index` | Controls the stacking order of the header (default: 1024) |

## Accessibility

When using the Header component, consider the following accessibility best practices:

- Use semantic HTML elements within your header (e.g., `<nav>`, `<h1>`)
- Ensure sufficient color contrast between text and background
- For fixed or sticky headers, ensure the content underneath is not obscured
- Consider adding a "skip to main content" link for keyboard navigation

## Browser Support

The Header component uses standard CSS positioning properties which are well-supported in all modern browsers.

## Best Practices

- For fixed headers, remember to add appropriate padding to the top of your content to prevent it from being hidden under the header
- Use the container prop to ensure your header content has consistent width constraints that match the rest of your layout
- Consider how the header will behave on mobile devices, especially when using position="fixed"
- Use the z-index carefully if you have other fixed or absolute-positioned elements