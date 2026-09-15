# Design System Master File: Re-Gain

> **LOGIC:** When building a specific page, first check `design-system/re-gain/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file. Otherwise, follow the rules below.

**Project:** Re-Gain (parent brand) + Instinct Maggot (product line)
**Revised:** 2026-09-14, hand-tuned after two generic `ui-ux-pro-max --design-system` passes missed the brief (see history below). Base direction confirmed by user: **white/clean canvas, color carried by typography, assets, and UI elements, not colored background blocks.**

---

## Brand context (why these tokens, not generic ones)

Instinct Maggot (the flagship product under Re-Gain) already has live brand equity: packaging, logo, social media, all built around a **dark forest-green + gold/tan + cream** palette (see `E:\PROJEKAN\Instinct-Landing\css\style.css`). Re-Gain's site must carry the same hue family so the product doesn't look like a foreign brand once a visitor reaches it, but inverted to a white/light canvas per the direction above, with the dark palette demoted to an *accent surface* (footer, nav-on-scroll, badges) rather than the default background.

Two automated `--design-system` passes from `ui-ux-pro-max` were tried and rejected as off-brief (a pink "creator/gaming" palette, then a bright wellness-green palette that still ignored the existing product identity). Logged here so a future session doesn't re-run the same query expecting a different answer. Tokens below are hand-derived from the real brand source instead.

---

## Color Palette

Canvas is white. Color lives in text, icons, borders, buttons, badges, and photography. Large colored background blocks are the exception, not the rule.

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Canvas (base bg) | `#FFFFFF` | `--color-bg` | Default page background, everywhere |
| Canvas alt (section tint) | `#F7F3EA` | `--color-bg-alt` | Occasional section zebra-striping, card fills, warm off-white, never a hard color block |
| Ink (headings, primary text) | `#10241A` | `--color-ink` | Headings, nav, body copy default, ~15:1 on white |
| Ink soft (secondary text) | `#3C4A42` | `--color-ink-soft` | Paragraph copy, captions, ~8:1 on white |
| Muted (tertiary text) | `#6B776E` | `--color-muted` | Hints, meta text, placeholders, ~4.6:1 on white, still AA |
| Gold (decorative accent) | `#C5A880` | `--color-gold` | Eyebrow labels, thin rules, icon fills, badges. Non-critical text/decoration only (contrast on white is AA-large only, not body-text safe) |
| Ember (interactive primary) | `#C48B50` | `--color-ember` | Primary button **fill** (paired with `--color-ink` text, not white text, see Buttons), link underlines, active states |
| Ember text (ember used as text color) | `#8A5A2D` | `--color-ember-text` | When ember needs to be a text/icon color directly on white (not a fill), darkened for 4.5:1+ |
| Forest (dark accent surface) | `#0B1C15` | `--color-forest` | Footer, sticky-nav-on-scroll, the Instinct product "premium moment" panels. Deliberate dark surface, not the page default |
| Cream (text-on-forest) | `#EDE6DA` | `--color-cream` | Text/icons when sitting on `--color-forest` |
| Border | `#E7E0D2` | `--color-border` | Card borders, dividers, input borders |
| Ok (success / available badge) | `#2F8F55` | `--color-ok` | "Tersedia" style badges |
| Danger (form error) | `#B3392C` | `--color-danger` | Form validation text |
| Ring (focus outline) | `#8A5A2D` | `--color-ring` | Keyboard focus ring, visible on white per accessibility requirement |

**Contrast notes:** `--color-gold` (#C5A880) and raw `--color-ember` (#C48B50) are decorative-only against white, do not set body text in either. Use `--color-ember-text` (#8A5A2D) wherever ember needs to *be* readable text (links, icon-with-label). This is the one deliberate deviation from a copy-paste of the packaging palette: those colors were chosen for a near-black background and don't pass AA on white as-is.

## Typography

- **Display/Headings + numerals:** Bricolage Grotesque (kept from Instinct Maggot, already has equity on the "big number" price/stat treatment, works fine on a white canvas, no reason to replace)
- **Body:** Karla
- Same Google Fonts import already used in `Instinct-Landing/index.html`:
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Karla:wght@400;500;700&display=swap');
```
- Base size 16px, line-height 1.5 to 1.7 for body copy, `text-wrap: balance` on headings (already the Instinct convention).

## Spacing

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

## Shadows

Used sparingly. A white-canvas site should mostly rely on whitespace and `--color-border` to separate content, not drop shadows.

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(16,36,26,.06)` | Subtle card lift |
| `--shadow-md` | `0 8px 20px rgba(16,36,26,.08)` | Hover state on cards |

## Components

**Primary button:** ember fill + ink text (not white text, see contrast notes):
```css
.btn-primary{
  background:var(--color-ember); color:var(--color-ink);
  padding:.85rem 1.6rem; border-radius:4px; font-weight:700;
  transition:transform .2s ease, background .2s ease; cursor:pointer;
}
.btn-primary:hover{ background:#B87A3E; transform:translateY(-1px); }
```

**Secondary/ghost button:** outline, no fill:
```css
.btn-ghost{
  background:transparent; color:var(--color-ink); border:1.5px solid var(--color-ink);
  padding:.85rem 1.6rem; border-radius:4px; font-weight:700; cursor:pointer;
}
```

**Card:**
```css
.card{
  background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px;
  padding:1.5rem; transition:box-shadow .2s ease, transform .2s ease;
}
.card:hover{ box-shadow:var(--shadow-md); transform:translateY(-2px); }
```

**Dark accent panel** (footer, product "premium moment", used deliberately, not as page default):
```css
.panel-forest{ background:var(--color-forest); color:var(--color-cream); }
.panel-forest a, .panel-forest .accent{ color:var(--color-gold); }
```

## Motion split

- **CSS transitions:** hover states, simple fades, anything not needing scroll/state choreography. See existing `.reveal` pattern in `Instinct-Landing/js/main.js` (IntersectionObserver + class toggle), reuse this pattern for simple "appear on scroll" needs, don't reach for GSAP for it.
- **GSAP + ScrollTrigger:** the flow diagram (sampah to maggot to produk), any pinned/scrubbed scroll narrative, complex multi-element choreography. Reference stagger preset (from `ui-ux-pro-max --domain gsap`, adapted):
```js
gsap.from('.grid-item', { opacity:0, y:16, duration:.4, stagger:{each:.06,from:'start'}, ease:'power2.out' });
```
(Note: swapped the tool's default `back.out(1.4)` overshoot for `power2.out`. A bounce/overshoot easing reads as playful/gamified, which doesn't fit a circular-economy B2B trust page. Keep `power2.out`/`power3.out` as the house easing; save spring/bounce easing for the Instinct product page only, if at all.)
- **Motion (React):** component-level enter/exit, gesture feedback (hover/tap on cards), stagger lists inside the React tree. See the `motion-animation` skill for API reference. Use Motion where the animation is tied to component state/mount-unmount; use GSAP ScrollTrigger where it's tied to scroll position independent of component lifecycle.
- Always respect `prefers-reduced-motion`, matching the existing Instinct-Landing convention exactly (see its CSS `@media (prefers-reduced-motion:reduce)` block and JS reveal-fallback logic). Carry the same fallback behavior forward.

## Anti-patterns (do not use)

- Colored background blocks as the default section treatment. Canvas stays white/off-white; color comes from text/assets/elements per the brand direction.
- Ember or gold as body text color directly (fails contrast on white). Use `--color-ember-text` or `--color-ink`.
- Bounce/overshoot easing (`back.out`, elastic) on B2B/trust-building sections. Reads as gamified, undermines credibility with hotel/restaurant procurement audiences.
- Emoji as icons. SVG only (the existing Instinct-Landing icon style, thin-stroke line icons, is the house style, keep using it).
- Missing `cursor:pointer`, invisible focus states, sub-4.5:1 body text, motion with no `prefers-reduced-motion` fallback.

## Pre-delivery checklist

- [ ] No color used as the sole carrier of meaning (pair with icon/text)
- [ ] All body text at least 4.5:1 contrast on its actual background
- [ ] `cursor:pointer` + visible focus ring on every interactive element
- [ ] `prefers-reduced-motion` respected (CSS and GSAP/Motion paths both)
- [ ] Responsive at 375 / 768 / 1024 / 1440px, no horizontal scroll
- [ ] Dark `--color-forest` panels used deliberately (footer / product premium moment), not as a default section background
