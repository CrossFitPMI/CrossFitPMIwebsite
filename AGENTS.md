# Gym Website - Agent Guidelines & Best Practices

Always use Context7 MCP when I need library/API documentation, code generation, or setup steps.

## Architecture

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables (`globals.css`)
- **Components**: shadcn/ui components in `components/ui/`
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: CSS animations with Intersection Observer

## File Structure

```
app/
├── page.tsx              # Homepage
├── about/page.tsx        # About page
├── contact/page.tsx      # Contact page
├── programs/page.tsx     # Programs page
├── layout.tsx            # Root layout
└── globals.css           # Global styles & design system

components/
├── ui/                   # shadcn/ui primitives
├── Hero.tsx              # Hero section
├── AboutSection.tsx      # About section
├── Programs.tsx          # Programs section
├── Testimonials.tsx      # Testimonials section
├── Community.tsx         # Community section
├── Header.tsx            # Navigation header
└── Footer.tsx            # Footer

lib/
├── gym-config.ts         # Gym configuration & content
└── utils.ts              # Utility functions (cn, etc.)

hooks/
├── use-toast.ts          # Toast notifications
└── useFormProtection.ts  # Form spam protection
```

## Design System - CONSISTENCY RULES

### Spacing

**ALWAYS use these exact spacing values from `globals.css`:**

```css
--spacing-xs: 0.5rem;    /* 8px  - Tight spacing */
--spacing-sm: 1rem;      /* 16px - Small gaps */
--spacing-md: 1.5rem;    /* 24px - Medium gaps */
--spacing-lg: 2rem;      /* 32px - Large gaps */
--spacing-xl: 3rem;      /* 48px - Extra large */
--spacing-2xl: 4rem;     /* 64px - Section spacing */
--spacing-3xl: 6rem;     /* 96px - Large sections */
--spacing-4xl: 8rem;     /* 128px - Hero sections */
```

**Section Padding Rules:**
- **Mobile**: `py-16` (64px) - use `--spacing-2xl`
- **Desktop**: `py-24` (96px) - use `--spacing-3xl`
- **Hero sections**: `py-32` (128px) - use `--spacing-4xl`
- **Between elements**: `gap-6` to `gap-12` (24px-48px)

### Max Width

**ALWAYS use these container widths:**

```css
.content-width {
  max-width: 90rem;  /* 1440px - Main content */
}

.content-width-narrow {
  max-width: 64rem;  /* 1024px - Text-heavy content */
}
```

**Container Rules:**
- **Default sections**: `max-w-7xl` (1280px)
- **Wide sections** (hero, gallery): `max-w-[90rem]` (1440px)
- **Text content** (about, blog): `max-w-4xl` (896px)
- **Forms**: `max-w-2xl` (672px)

### Typography

**ALWAYS use these predefined classes from `globals.css`:**

#### Display Headings (Hero, Landing)
```css
.display-2xl  /* 72px → 96px responsive */
.display-xl   /* 60px → 84px responsive */
.display-lg   /* 48px → 72px responsive */
.display-md   /* 36px → 60px responsive */
.display-sm   /* 30px → 44px responsive */
```

#### Section Headings
```css
.heading-xl   /* 24px - Main section titles */
.heading-lg   /* 20px - Subsection titles */
.heading-md   /* 18px - Card titles */
.heading-sm   /* 16px - Small headings */
```

#### Body Text
```css
.body-xl      /* 20px - Large body text */
.body-lg      /* 18px - Emphasized body */
.body-md      /* 16px - Default body */
.body-sm      /* 14px - Small text */
```

#### Captions
```css
.caption-lg   /* 14px - Large captions */
.caption-md   /* 12px - Small captions */
```

**Typography Rules:**
- **Page titles**: Use `.display-lg` or `.display-md`
- **Section headings**: Use `.heading-xl` or `.heading-lg`
- **Card titles**: Use `.heading-md`
- **Body paragraphs**: Use `.body-lg` or `.body-md`
- **Metadata/labels**: Use `.caption-lg`

### Colors

**CrossFit PMI Brand Palette:**

| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#ED1707` | Primary accent - buttons, icons, highlights, hover borders |
| `--color-bg-primary` | `#0f0f0f` | Page background |
| `--color-bg-secondary` | `#1a1a1a` | Section backgrounds |
| `--color-bg-surface` | `rgba(255,255,255,0.04)` | Card backgrounds |
| `--color-text-primary` | `#ffffff` | Primary text |
| `--color-text-tertiary` | `#a1a1aa` | Muted / body text |

**Rules:**
- **Primary brand colour is `#ED1707`** - use this for all accent elements (icons, borders, highlights, CTA underlines)
- **NEVER use yellow/amber** (`#fbbf24`, `--color-accent-primary`) - those are generic theme defaults, not PMI brand colours
- **Always reference `#ED1707` directly** or via `--color-brand-primary` CSS variable
- Use CSS variables for all other colours - never hardcode other hex values

## Component Guidelines

### Styling Rules

1. **ALWAYS use `cn()` from `@/lib/utils`** for combining classes
2. **Use predefined classes** from `globals.css` - don't create custom font sizes
3. **Use CSS variables** for colors - never hardcode hex values
4. **Consistent spacing** - use the spacing scale, not arbitrary values
5. **Responsive design** - mobile-first approach

### Component Structure

```tsx
// ✅ GOOD - Uses design system
<section className="section-padding container-padding content-width">
  <h2 className="display-md text-center mb-12">Our Programs</h2>
  <div className="grid gap-8 md:grid-cols-3">
    {/* Content */}
  </div>
</section>

// ❌ BAD - Arbitrary values
<section className="py-20 px-4 max-w-[1200px]">
  <h2 className="text-5xl text-center mb-10">Our Programs</h2>
  <div className="grid gap-6 md:grid-cols-3">
    {/* Content */}
  </div>
</section>
```

### Forms

- Use **React Hook Form** for all forms
- Use **Zod** for validation schemas
- Use **shadcn/ui** form components
- Show validation errors inline
- Use `useFormProtection` hook for spam prevention

### Icons

- Use **Lucide React** icons only
- Consistent sizing: `size={24}` for default, `size={20}` for small
- Use `className` for colors, not inline styles

## Naming Conventions

### Files
- **Components**: `PascalCase.tsx` (e.g., `Hero.tsx`, `AboutSection.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `gym-config.ts`, `utils.ts`)
- **Hooks**: `useCamelCase.ts` (e.g., `useFormProtection.ts`)

### Code
- **Components**: `PascalCase` (e.g., `Hero`, `ProgramCard`)
- **Functions**: `camelCase` (e.g., `handleSubmit`, `validateForm`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `PROGRAMS`, `TESTIMONIALS`)
- **CSS classes**: `kebab-case` (e.g., `.modern-card`, `.btn-primary`)

## Content Management

All gym content lives in `lib/gym-config.ts`:
- Gym name, tagline, contact info
- Programs, coaches, testimonials
- Navigation items
- Social media links

**Never hardcode content in components** - import from `gym-config.ts`.

## Performance

- Use Next.js Image component for all images
- Optimize images (WebP format preferred)
- Lazy load sections below the fold
- Use CSS animations over JS when possible

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
