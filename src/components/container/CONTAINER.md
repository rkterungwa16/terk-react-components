# Container Component

A responsive container component that manages content width based on viewport size. The Container component applies appropriate max-width constraints at different screen sizes to provide consistent layouts across various devices.

## Installation

This component is part of the terk-react-components library. No additional installation is required if you're already using the library.

## API

```tsx
import { Container } from 'terk-react-components';

<Container breakpoint="md">
  Your content here
</Container>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breakpoint` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "fluid"` | `"fluid"` | Determines the responsive behavior of the container |
| `className` | `string` | `undefined` | Additional CSS class names to apply to the container |
| `children` | `ReactNode` | `undefined` | The content to be rendered inside the container |

## Breakpoint Behavior

The `breakpoint` prop controls how the container's width responds to different viewport sizes:

| Breakpoint | Behavior |
|------------|----------|
| `sm` | 100% width until 640px viewport, then max-width of 540px |
| `md` | 100% width until 768px viewport, then max-width of 720px |
| `lg` | 100% width until 1024px viewport, then max-width of 960px |
| `xl` | 100% width until 1280px viewport, then max-width of 1140px |
| `2xl` | 100% width until 1536px viewport, then max-width of 1320px |
| `fluid` | Always 100% width, spanning the entire viewport |

## Usage Examples

### Basic Usage

```tsx
import { Container } from 'terk-react-components';

function App() {
  return (
    <Container breakpoint="lg">
      <h1>Hello World</h1>
      <p>This content will be responsively contained.</p>
    </Container>
  );
}
```

### Fluid Container

```tsx
import { Container } from 'terk-react-components';

function FullWidthSection() {
  return (
    <Container breakpoint="fluid">
      <div className="hero-banner">
        <h1>Welcome to our website</h1>
      </div>
    </Container>
  );
}
```

### Nested Containers

```tsx
import { Container } from 'terk-react-components';

function NestedLayout() {
  return (
    <Container breakpoint="fluid">
      <header>
        <Container breakpoint="xl">
          <nav>Navigation items</nav>
        </Container>
      </header>
      
      <main>
        <Container breakpoint="lg">
          <h1>Main Content</h1>
          <p>This content uses a narrower container.</p>
        </Container>
      </main>
    </Container>
  );
}
```

### With Custom Styling

```tsx
import { Container } from 'terk-react-components';

function CustomContainer() {
  return (
    <Container 
      breakpoint="md" 
      className="bg-gray-100 p-4 rounded-lg shadow"
    >
      <h2>Custom Styled Container</h2>
      <p>This container has additional styling applied.</p>
    </Container>
  );
}
```

## CSS Variables

The Container component uses the following CSS variables for responsive behavior:

| CSS Variable | Value | Description |
|--------------|-------|-------------|
| `--breakpoint-sm` | 640px | Small breakpoint |
| `--breakpoint-md` | 768px | Medium breakpoint |
| `--breakpoint-lg` | 1024px | Large breakpoint |
| `--breakpoint-xl` | 1280px | Extra large breakpoint |
| `--breakpoint-2xl` | 1536px | Double extra large breakpoint |
| `--breakpoint-max-width-sm` | 540px | Maximum width for small containers |
| `--breakpoint-max-width-md` | 720px | Maximum width for medium containers |
| `--breakpoint-max-width-lg` | 960px | Maximum width for large containers |
| `--breakpoint-max-width-xl` | 1140px | Maximum width for extra large containers |
| `--breakpoint-max-width-2xl` | 1320px | Maximum width for double extra large containers |

## Accessibility

Container components don't directly impact accessibility, but they do help maintain readable line lengths on larger screens, which can improve readability for users with certain visual or cognitive disabilities.

## Browser Support

The Container component relies on CSS media queries and variables, which are supported in all modern browsers. Internet Explorer 11 requires additional polyfills for CSS variables.

## Best Practices

- Choose the appropriate breakpoint based on your content and design requirements
- Use fluid containers for full-width sections like headers, footers, or hero areas
- Use narrower containers (`md` or `lg`) for text-heavy content to maintain readable line lengths
- Avoid nesting containers with the same breakpoint as it may cause unintended padding