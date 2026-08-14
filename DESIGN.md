---
name: Tigris Learning
colors:
  surface: '#fdf9ee'
  surface-dim: '#dddacf'
  surface-bright: '#fdf9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3e8'
  surface-container: '#f1eee3'
  surface-container-high: '#ece8dd'
  surface-container-highest: '#e6e2d8'
  on-surface: '#1c1c15'
  on-surface-variant: '#424754'
  inverse-surface: '#31312a'
  inverse-on-surface: '#f4f1e6'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#3f6353'
  on-tertiary: '#ffffff'
  tertiary-container: '#577c6b'
  on-tertiary-container: '#f5fff7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#c3ecd7'
  tertiary-fixed-dim: '#a8cfbc'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#294e3f'
  background: '#fdf9ee'
  on-background: '#1c1c15'
  surface-variant: '#e6e2d8'
typography:
  headline-lg:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 20px
  section-gap: 64px
  blob-offset: -40px
---

## Brand & Style

This design system is built on a foundation of **softness, optimism, and companionship**. It translates the "kawaii" aesthetic into a functional educational environment, moving away from the cold precision of typical AI tools toward a warm, "hug-like" interface. 

The visual style is **Soft-Tactile**. It utilizes organic shapes, pill-like components, and a bright, airy atmosphere to reduce "learning anxiety." The design should evoke the feeling of a supportive study session with a friend, using the tiger mascot as the anchor for both color and character.

- **Minimalist Base:** Large amounts of white space (or light cream) prevent the colorful elements from becoming overwhelming.
- **Organic Flow:** Use of "blob" background shapes and hand-drawn-style icons to maintain a playful, human touch.
- **Friendly Professionalism:** While the aesthetic is "cute," the layouts remain structured to ensure information density for older students is respected.

## Colors

The palette is derived directly from the tiger mascot's vibrant world. It uses high-saturation primaries for action and soft pastels for secondary context.

- **Primary Blue (#3B82F6):** Used for main actions, active states, and the "AI Guide" identity.
- **Vibrant Orange (#F59E0B):** Used for "Success" states, progress milestones, and attention-grabbing accents.
- **Pastel Tints:** 
    - **Mint (#D1FAE5):** Positive reinforcement and completed tasks.
    - **Soft Pink (#FEE2E2):** Creative prompts and emotional support UI.
    - **Sunny Yellow (#FEF3C7):** Insights, tips, and light bulbs.
- **Background:** Avoid pure white (#FFFFFF) in large blocks; use a very light Cream (#FFFBF0) to create a paper-like, warm reading surface.

## Typography

This design system uses **Quicksand** exclusively for its rounded terminals and open apertures, which mirror the "super-rounded" shape language of the UI.

- **Hierarchy:** Use Bold (700) for headlines to create a strong visual anchor. Medium (500) is preferred for body text to maintain legibility without the harshness of a regular weight on high-resolution screens.
- **Coloration:** Never use pure black for text. Use a deep navy or dark charcoal to keep the contrast soft and readable.
- **Spacing:** Headlines should have slightly tightened letter-spacing to feel "contained" and friendly.

## Layout & Spacing

The layout philosophy follows a **Fluid-Floating** model. Elements are not strictly bound to rigid boxes but often float over soft "blob" shapes that break the grid.

- **The 8px Rhythm:** All padding, margins, and heights are multiples of 8.
- **Safe Zones:** Use generous 24px margins on mobile to ensure the interface never feels cramped.
- **Dynamic Blobs:** Decorative background shapes should be placed at `-40px` offsets from container edges to create a sense of depth and playfulness.
- **Desktop Grid:** A 12-column system with 20px gutters. Content is typically centered in an 8-column "reading-well" to focus the student's attention.

## Elevation & Depth

To match the "cute" and "approachable" vibe, we avoid realistic or heavy shadows.

- **Cloud Shadows:** Shadows are extremely diffused. Use a large blur radius (20px+) with low opacity (8-12%). The shadow color should be slightly tinted with the Primary Blue rather than neutral gray.
- **Floating Effect:** Higher-priority items (like the AI Coach chat bubble) use a "double-stack" shadow to appear as if they are floating closer to the user.
- **Tonal Layering:** Depth is primarily established through color shifts—placing a white card on a cream background, or a pastel mint chip on a white card.

## Shapes

The shape language is **Ultra-Rounded**. There are no sharp corners in the design system.

- **Cards & Containers:** Use a minimum radius of `24px` for cards.
- **Buttons & Inputs:** Use the full **Pill-shape** (`rounded-full`) for all buttons and interactive fields.
- **The "Squircle":** When using icons or profile pictures, use a squircle or a heavily rounded polygon rather than a perfect circle to maintain the organic, custom feel of the mascot's world.

## Components

### Buttons
Buttons should be "chunky" and tactile. 
- **Primary:** Solid #3B82F6 with white text, using a subtle 2px bottom border (inner shadow) to give a "pressable" 3D feel.
- **Secondary:** White background with a 2px colored border and #3B82F6 text.

### Chips & Tags
Used for subject categories (e.g., "Math," "History"). These should use the pastel palette with high-contrast text of the same hue (e.g., Dark Green text on Pastel Mint background).

### Input Fields
Inputs are pill-shaped with a thick 2px border in a soft gray. On focus, the border turns Primary Blue and the field gains a soft blue glow.

### Cards
Cards are the primary content container. They should have a white fill, 24px corner radius, and a "Cloud Shadow." For a "GuideLearn" signature look, add a small 8px color strip at the top of cards to categorize content by subject.

### The "Coach Bubble"
A specialized component for AI responses. It features a tail that points toward the tiger mascot and uses a soft gradient from White to Cream to distinguish it from static interface elements.