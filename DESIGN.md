# Design System: CENA - Comunidade de Educação e Networking Angolana

## 1. Visual Theme & Atmosphere

A **sophisticated, warm, and empowering** nonprofit aesthetic that balances heritage pride with modern professionalism. The design language combines rich crimson tones with golden accents against clean whites and soft grays, conveying trustworthiness, cultural warmth, and forward-looking community leadership. The atmosphere is **premium yet approachable** — not corporate-cold, but refined-elegant.

**Design Philosophy:** Every element should feel intentional, like a well-curated exhibition — generous whitespace, purposeful typography hierarchy, and subtle depth through glassmorphism and refined shadows.

## 2. Color Palette & Roles

- **Heritage Crimson** (#A32020) — Primary brand color for headers, CTAs, and accent borders. Conveys strength and Angolan cultural roots.
- **Deep Crimson** (#8B1B1B) — Darker variant for hover states, gradients, and depth layering.
- **Heritage Gold** (#FDB913) — Secondary accent for badges, highlights, interactive feedback. Conveys warmth, optimism, and celebration.
- **Warm Gold Hover** (#E5A50D) — Darkened gold for hover/pressed states on gold elements.
- **True Black** (#000000) — Used sparingly for maximum emphasis, certain badges, and dark gradient endpoints.
- **Near Black** (#111827) — Primary text color for headings. Deep, warm black with subtle warmth.
- **Charcoal Gray** (#374151) — Secondary heading text.
- **Muted Gray** (#6B7280) — Body text and descriptions. Readable without being heavy.
- **Light Gray** (#F9FAFB) — Section alternate backgrounds. Barely-there warmth.
- **Pure White** (#FFFFFF) — Primary card and content backgrounds.
- **Frosted Glass** (rgba(255,255,255,0.08)) — Glassmorphism overlays for premium depth.

## 3. Typography Rules

- **Font Family:** Inter (primary), system-ui fallback — Clean, modern, excellent readability at all sizes.
- **Headings:** Font-weight 700 (bold) for h1-h2, 600 (semibold) for h3-h4. Tight letter-spacing (-0.02em) for large headlines.
- **Body:** Font-weight 400 (normal), relaxed line-height (1.6-1.75).
- **Badges/Labels:** Font-weight 500 (medium), tracking-wider (0.05em), uppercase.
- **Accent Text:** Font-weight 600 for CTAs and emphasis.

## 4. Component Stylings

* **Buttons:**
  - Primary: Heritage Crimson background, white text, generously rounded (10px), subtle shadow on hover, scale(1.02) on hover.
  - Secondary: Heritage Gold background, black text, same roundness.
  - Outline: Transparent background, 2px solid border, color-matched text.
  - All buttons: 300ms smooth transitions, hover shadow elevation.

* **Cards/Containers:**
  - Generously rounded corners (16px).
  - Pure white background with subtle shadow (0 1px 3px rgba(0,0,0,0.06)).
  - On hover: elevated shadow (0 20px 60px rgba(0,0,0,0.08)), slight scale(1.02).
  - CTA cards: Gradient background from Heritage Crimson to True Black, white text.
  - Glassmorphism cards: Semi-transparent white with backdrop-blur(16px).

* **Badges:**
  - Pill-shaped (full rounded), small padding, medium font weight.
  - Color-coded: Crimson for mission/team, Gold for community/approach, Black for programs/members.

* **Inputs/Forms:**
  - Semi-transparent backgrounds (white/10) on dark surfaces.
  - 1px border with white/30 opacity, focus ring in Heritage Gold.
  - Smooth 200ms transitions on focus state.

* **Section Headers:**
  - Badge → H2 Title → Description paragraph pattern.
  - Centered alignment with max-width constraint (3xl/48rem).
  - Generous vertical spacing between elements.

## 5. Layout Principles

- **Container:** max-width 80rem (1280px), centered with responsive horizontal padding.
- **Section Spacing:** py-20 to py-32 (generous vertical breathing room).
- **Grid System:** 1-col mobile → 2-col tablet → 3-4-col desktop. Gap-8 standard.
- **Whitespace Strategy:** Generous — never feel cramped. Sections breathe.
- **Responsive Breakpoints:** sm(640px), md(768px), lg(1024px), xl(1280px).

## 6. Animation & Interaction Guidelines

- **Transitions:** 300ms ease-out default. Never abrupt.
- **Hover Cards:** Subtle lift (translateY(-4px)) with shadow amplification.
- **Scroll Animations:** Fade-up on section entry, staggered children.
- **Micro-interactions:** Icon glow on hover, button scale pulse, smooth scroll navigation.
- **Performance:** Use CSS transitions over JS where possible. GPU-accelerated transforms only.
