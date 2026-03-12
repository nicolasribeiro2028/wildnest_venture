# product.md — Product Design & Production

This file organizes all **production-side** requirements for the WildNest MVP: brand, design system, UI specs, and content guidelines. Use this for design decisions and implementation consistency.

> **Implementation:** Design tokens live in `app/design-tokens.css`. Edit that file to change colors, fonts, sizes, and spacing across the app.

---

## Brand assets

- **Logo**: `wildnest_logo.png` @ `public/assets/`
- **Main colors**:
  - Purple Northwestern `#4E2A84` (5%)
  - Soft Sand `#F2E9DC` (normal white areas)
  - Laranja `#F59E42` (primary visual identity)
  - Preto fosco `#2E2E2E` (black elements)

### Supporting UI colors

- **Success**: `#22C55E`
- **Warning**: `#FACC15`
- **Error**: `#EF4444`
- **Border**: `#E5E5E5`

---

## Typography

The WildNest UI uses clean, modern, soft-feeling typography. Avoid overly geometric or aggressive fonts.

### Headings

- **Font families**:  
  - Recommended: [Sora](https://fonts.google.com/specimen/Sora), [Inter Tight](https://fonts.google.com/specimen/Inter+Tight), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Font scale**:  
  - H1 — 48px / 600  
  - H2 — 36px / 600  
  - H3 — 28px / 600  
  - H4 — 22px / 500  
- **Line height**: 1.25

### Body text

- **Font**: Inter
- **Weight**: 400 (normal)
- **Text scale:**
  - `text-xs` — 12px
  - `text-sm` — 14px
  - `text-base` — 16px
  - `text-lg` — 18px
  - `text-xl` — 20px
  - `text-2xl` — 24px
- **Line height**: 1.6

> _Readable, friendly for listing descriptions and longer texts_

---

## Spacing & layout

Minimalism relies on generous spacing and clear hierarchy.

### Container

- `max-width`: 1200px
- `margin`: auto
- `padding`: 24px

### Grid system

- **Desktop**: 12 columns
- **Tablet**: 8 columns
- **Mobile**: 4 columns

### Spacing scale

Use an 8px base spacing system:

| Step | Value  |
|------|--------|
| 1    | 4px    |
| 2    | 8px    |
| 3    | 12px   |
| 4    | 16px   |
| 5    | 20px   |
| 6    | 24px   |
| 8    | 32px   |
| 10   | 40px   |
| 12   | 48px   |
| 16   | 64px   |

### Border radius

Rounded surfaces are essential for a cozy feel:

- Small elements: 8px
- Inputs: 10px
- Cards: 16px
- Large containers: 24px
- Buttons: 999px (pill style)

---

## Components

### Buttons

**Primary**
- Background: `#F59E42`
- Color: white
- Border-radius: 999px
- Padding: 12px 20px
- Font-weight: 600
- Transition: 0.15s ease
- Hover: background `#e88928`, `transform: translateY(-1px)`

**Secondary**
- Background: `#F2E9DC`
- Color: `#2E2E2E`
- Border: 1px solid `#E5E5E5`
- Border-radius: 999px

**Ghost**
- Background: transparent
- Color: `#2E2E2E`
- No border

### Cards (listings & messages)

- Background: white
- Border-radius: 16px
- Padding: 16px
- Box-shadow: 0 2px 12px rgba(0,0,0,0.05)
- Display: flex, flex-direction: column, gap: 8px

**Card hover**
- transform: translateY(-3px)
- box-shadow: 0 10px 25px rgba(0,0,0,0.08)
- transition: 0.15s ease

_Typical listing card structure:_
- [Image]
- Title
- Price
- Location
- Tags (e.g., • Furnished, • Near Campus)

### Form inputs

- Height: 44px
- Border-radius: 10px
- Border: 1px solid `#E5E5E5`
- Padding: 12px
- Background: white
- Font-size: 16px

**Focus:**  
- border: 1px solid `#F59E42`
- box-shadow: 0 0 0 3px rgba(245,158,66,0.15)
  
**Error:**  
- border: 1px solid `#EF4444`

### Map pins

- **Default:** `#F59E42`, 32px, rounded drop shape
- **Hover:** scale 1.1, add shadow
- **Selected:** `#4E2A84`

---

## UI states

### Hover/active

- transition: 0.15s ease
- slight elevation/shadow

### Loading

- Prefer skeleton loaders over spinners (e.g., image placeholder, three text lines, price placeholder)

### Empty states

- Friendly copy + helpful suggestion  
  _Example:_  
  "No listings found yet 🏡  
  Try adjusting your filters or explore nearby neighborhoods."

### Error states

- Simple, direct messaging  
  _Example:_  
  "Something went wrong. Please try again."  
  For validation: "Please enter a valid email."

---

## Responsive & layout

### Breakpoints

- **Mobile:** 0–640px
- **Tablet:** 640–1024px
- **Desktop:** 1024px+

### Mobile layout

- Single column
- Large search bar
- Sticky bottom navigation
- Map toggle button

### Navigation

- **Desktop:** `[Logo] [Search bar] [Post listing] [Profile]`
- **Mobile:** Hamburger menu, search icon, profile icon

---

## Accessibility

- **Contrast:** Minimum 4.5:1 for body text; 3:1 for large text
- **Focus indicators:** outline: 2px solid `#F59E42`, outline-offset: 2px
- **Semantic structure:** Use headings and landmarks appropriately

---

## Content & voice

- **Tone:** Friendly, clear, approachable, student-focused, not corporate
- **Examples:**
  - Instead of "Submit listing" — use "Post your place"
  - Instead of "Listings unavailable" — use "No homes found yet"

---

## Map-specific

- **Map theme:** Light & minimal, to match cozy interface  
  _Recommended Mapbox styles: `mapbox/light-v11`, `mapbox/outdoors`_
  - Suggested: roads in light gray, parks soft green, water pale blue

- **Pin design:**  
  - Default color: `#F59E42`
  - Selected color: `#4E2A84`
  - Shape: rounded drop
  - Size: 32px
  - Hover: scale 1.1, shadow
