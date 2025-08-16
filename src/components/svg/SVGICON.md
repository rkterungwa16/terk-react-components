# SvgIcon Component

A flexible SVG icon component that renders SVG elements with configurable sizes and attributes. This component provides a consistent way to display vector graphics throughout your application with support for predefined size classes or custom dimensions.

## Installation

This component is part of the terk-react-components library. No additional installation is required if you're already using the library.

## Import

```tsx
import { SvgIcon } from 'terk-react-components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class(es) to apply to the SVG element |
| `height` | `number` | `undefined` | Custom height for the SVG (overrides size class) |
| `width` | `number` | `undefined` | Custom width for the SVG (overrides size class) |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `undefined` | Predefined size class to apply to the icon |
| `viewBox` | `string` | `undefined` | SVG viewBox attribute |
| `...rest` | `HTMLAttributes<SVGSVGElement>` | - | All other props are passed to the underlying SVG element |

## Size Classes

The component supports the following predefined size classes that apply consistent dimensions:

| Size | CSS Class | CSS Variables Used |
|------|-----------|-------------------|
| `xs` | `.terkui-icon-size-xs` | `--icon-size-xs` |
| `sm` | `.terkui-icon-size-sm` | `--icon-size-sm` |
| `md` | `.terkui-icon-size-md` | `--icon-size-md` |
| `lg` | `.terkui-icon-size-lg` | `--icon-size-lg` |
| `xl` | `.terkui-icon-size-xl` | `--icon-size-xl` |
| `2xl` | `.terkui-icon-size-2xl` | `--icon-size-2xl` |

## Examples

### Basic Usage

```tsx
<SvgIcon size="md">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
</SvgIcon>
```

### With Custom ViewBox

```tsx
<SvgIcon viewBox="0 0 24 24" size="lg">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
</SvgIcon>
```

### With Custom Dimensions

```tsx
<SvgIcon width={32} height={32}>
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
</SvgIcon>
```

### With Additional Props and Class Name

```tsx
<SvgIcon 
  size="sm" 
  className="custom-icon" 
  onClick={handleClick}
  style={{ color: 'blue' }}
  data-testid="check-icon"
>
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
</SvgIcon>
```

### With Forward Ref

```tsx
import { useRef } from 'react';

function IconWithRef() {
  const iconRef = useRef<SVGSVGElement>(null);
  
  return (
    <SvgIcon 
      ref={iconRef}
      size="md"
      onClick={() => {
        // Access the SVG element through the ref
        console.log('Icon dimensions:', iconRef.current?.getBoundingClientRect());
      }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </SvgIcon>
  );
}
```

## Customization

### Using CSS Variables

The predefined size classes use CSS variables that you can override in your application's CSS:

```css
:root {
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 40px;
  --icon-size-2xl: 48px;
}
```

### Using Custom Classes

You can also apply your own custom CSS classes for more specific styling:

```tsx
<SvgIcon className="animated-icon rotating-icon">
  <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
</SvgIcon>
```

## Accessibility

The SvgIcon component includes:

- `role="img"` to identify the element as an image to assistive technologies
- `aria-hidden="true"` to indicate that the icon is decorative and should be hidden from screen readers

For icons that convey meaning and are not purely decorative, you should:

1. Set `aria-hidden="false"` on the SvgIcon
2. Add a descriptive `aria-label`

```tsx
<SvgIcon 
  size="md" 
  aria-hidden="false"
  aria-label="Save document"
>
  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
</SvgIcon>
```

## Best Practices

1. **Use consistent sizing** through the size prop rather than manual width/height when possible
2. **Keep SVG paths simple** to maintain good performance
3. **Add meaningful descriptions** for icons that convey important information using aria-label
4. **Use decorative icons appropriately** by keeping aria-hidden="true" for icons that are purely visual
5. **Consider color inheritance** - by default, SVGs will inherit the current text color (fill: currentColor)
6. **Optimize SVG paths** before adding them to your application to reduce file size

## Related Components

- **Button**: Often used with SvgIcon components for icon buttons
- **NavItem**: May use icons for navigation items

## Implementation Notes

- The SvgIcon component does not import SVG files directly; it expects path data to be provided as children
- If you need to use external SVG files, consider converting them to React components first
- The component automatically sets `xmlns="http://www.w3.org/2000/svg"` on the SVG element