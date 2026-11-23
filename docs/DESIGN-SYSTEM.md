# Design System

## Brand Identity

### Brand Colors

#### Primary Colors
```css
--deep-navy: #10263D;      /* Primary brand color */
--electric-blue: #1677FF;   /* Interactive elements */
--teal: #18C9B5;           /* Accents and success states */
```

#### Neutral Colors
```css
--white: #FFFFFF;
--light-bg: #F2F6FA;       /* Page backgrounds */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

#### Semantic Colors
```css
--success: #10B981;        /* Success states */
--warning: #F59E0B;        /* Warning states */
--error: #EF4444;          /* Error states */
--info: #3B82F6;           /* Information */
```

### Typography

#### Font Families
```css
--font-heading: 'Manrope', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

#### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
```

#### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

#### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Spacing

```css
--space-0: 0;
--space-1: 0.25rem;      /* 4px */
--space-2: 0.5rem;       /* 8px */
--space-3: 0.75rem;      /* 12px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-8: 2rem;         /* 32px */
--space-10: 2.5rem;      /* 40px */
--space-12: 3rem;        /* 48px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
```

### Border Radius

```css
--radius-sm: 0.125rem;   /* 2px */
--radius: 0.375rem;      /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Full round */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Breakpoints

```css
--screen-sm: 640px;      /* Mobile landscape */
--screen-md: 768px;      /* Tablet portrait */
--screen-lg: 1024px;     /* Tablet landscape / small desktop */
--screen-xl: 1280px;     /* Desktop */
--screen-2xl: 1536px;    /* Large desktop */
```

## Component Library

### Buttons

#### Primary Button
- Background: `--electric-blue`
- Text: `--white`
- Hover: Darken by 10%
- Padding: `12px 24px`
- Border radius: `--radius-md`
- Font weight: `--font-semibold`

#### Secondary Button
- Background: Transparent
- Border: 2px solid `--electric-blue`
- Text: `--electric-blue`
- Hover: Background `--electric-blue`, text `--white`

#### Tertiary Button
- Background: `--gray-100`
- Text: `--gray-700`
- Hover: Background `--gray-200`

#### Sizes
- Small: `8px 16px`, text `--text-sm`
- Medium: `12px 24px`, text `--text-base` (default)
- Large: `16px 32px`, text `--text-lg`

### Form Inputs

#### Text Input
- Border: 1px solid `--gray-300`
- Padding: `10px 14px`
- Border radius: `--radius-md`
- Focus: Border `--electric-blue`, shadow
- Error: Border `--error`

#### Select Dropdown
- Same as text input
- Chevron icon on right
- Options dropdown with shadow

#### Checkbox & Radio
- Size: 20px
- Border: `--gray-400`
- Checked: Background `--electric-blue`
- Checkmark: `--white`

### Cards

#### Product Card
- Background: `--white`
- Border: 1px solid `--gray-200`
- Border radius: `--radius-lg`
- Shadow: `--shadow-sm`
- Hover: Shadow `--shadow-md`, slight scale
- Padding: `--space-6`

#### Content Card
- Background: `--white`
- Border radius: `--radius-lg`
- Shadow: `--shadow`
- Padding: `--space-8`

### Navigation

#### Header
- Background: `--white`
- Border bottom: 1px solid `--gray-200`
- Height: 72px (desktop), 64px (mobile)
- Shadow: `--shadow-sm` on scroll

#### Mobile Menu
- Full-screen overlay
- Slide-in animation
- Background: `--white`

#### Breadcrumbs
- Font size: `--text-sm`
- Color: `--gray-600`
- Separator: `/` or chevron

### Badges

#### Status Badges
- Padding: `4px 12px`
- Border radius: `--radius-full`
- Font size: `--text-xs`
- Font weight: `--font-medium`

**Variants:**
- Success: Background `--success` (light), text `--success` (dark)
- Warning: Background `--warning` (light), text `--warning` (dark)
- Error: Background `--error` (light), text `--error` (dark)
- Info: Background `--info` (light), text `--info` (dark)

### Alerts

#### Banner Alerts
- Padding: `--space-4`
- Border radius: `--radius-md`
- Icon on left
- Close button on right

**Variants:**
- Success: Light green background
- Warning: Light yellow background
- Error: Light red background
- Info: Light blue background

### Loading States

#### Spinner
- Size: 20px (small), 32px (medium), 48px (large)
- Color: `--electric-blue`
- Animation: Spin 1s linear infinite

#### Skeleton
- Background: `--gray-200`
- Animation: Pulse
- Border radius: `--radius`

### Modals

#### Dialog Modal
- Max width: 500px
- Background: `--white`
- Border radius: `--radius-xl`
- Shadow: `--shadow-2xl`
- Backdrop: rgba(0, 0, 0, 0.5)
- Padding: `--space-8`

### Tables

#### Data Table
- Border: 1px solid `--gray-200`
- Header background: `--gray-50`
- Row hover: `--gray-50`
- Cell padding: `12px 16px`
- Striped rows (optional)

### Icons

- Library: Lucide Icons
- Default size: 20px
- Stroke width: 2px
- Use semantic sizing (16px, 20px, 24px)

## Layout Patterns

### Container
- Max width: 1280px
- Padding: `--space-6` (mobile), `--space-8` (desktop)
- Centered with margin auto

### Grid System
- 12-column grid
- Gap: `--space-6`
- Responsive breakpoints

### Spacing System
- Consistent vertical rhythm
- Section spacing: `--space-16` or `--space-20`
- Component spacing: `--space-6` or `--space-8`

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements meet WCAG AAA when possible (7:1)

### Focus States
- Visible focus ring on all interactive elements
- Color: `--electric-blue`
- Outline: 2px solid, offset 2px

### Screen Reader Support
- Semantic HTML
- ARIA labels where needed
- Skip links for navigation

### Keyboard Navigation
- Tab order follows visual flow
- All interactive elements keyboard accessible
- Escape key closes modals

## Animation

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### Common Animations
- Fade in: Opacity 0 → 1
- Slide up: Transform translateY(10px) → 0
- Scale: Transform scale(0.95) → 1
- Rotate spinner: 360deg continuous

## Responsive Design

### Mobile First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly targets (minimum 44x44px)

### Breakpoint Strategy
- `sm:` Tablet portrait (640px+)
- `md:` Tablet landscape (768px+)
- `lg:` Desktop (1024px+)
- `xl:` Large desktop (1280px+)

### Typography Scale
- Responsive font sizes using clamp()
- Headings scale down on mobile
- Maintain readability at all sizes

## Dark Mode (Future)

Prepared for dark mode implementation:
- CSS custom properties for easy theming
- Semantic color names
- Separate dark mode palette

## Implementation with Tailwind CSS

### Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'deep-navy': '#10263D',
        'electric-blue': '#1677FF',
        'teal': '#18C9B5',
        'light-bg': '#F2F6FA',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Usage with shadcn/ui
- Use shadcn/ui components as base
- Customize theme colors
- Extend with custom components
- Maintain consistent design language

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #1677FF;
  --color-primary-dark: #10263D;
  --color-accent: #18C9B5;

  /* Typography */
  --font-heading: 'Manrope', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --space-unit: 0.25rem;

  /* Borders */
  --border-radius: 0.5rem;
  --border-width: 1px;
  --border-color: #E5E7EB;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-base: 200ms ease;
}
```

## Component Development Guidelines

1. **Consistency** - Use design tokens consistently
2. **Accessibility** - Follow WCAG 2.1 AA standards
3. **Responsiveness** - Mobile-first, responsive design
4. **Performance** - Optimize for fast loading
5. **Reusability** - Create composable components
6. **Documentation** - Document component usage
7. **Testing** - Test across browsers and devices

## Resources

- Figma Design File (to be created)
- Component Storybook (future)
- Brand Guidelines Document
- Accessibility Checklist
