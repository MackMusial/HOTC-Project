# Animation plan (not built yet)

Ideas for adding motion to the site. Keep everything gentle, short (150–600ms), and CSS-first. No animation library is needed.

## Rules for every animation
- **Respect reduced motion.** Wrap motion in `@media (prefers-reduced-motion: no-preference)`, or add it to the existing `prefers-reduced-motion: reduce` block in `css/styles.css` that turns things off. Many visitors to this site may have vestibular or sensory sensitivities.
- Animate only `transform` and `opacity`, for smooth performance on older phones.
- Nothing flashes, loops forever, or auto-plays with sound.
- Content must be fully visible without JavaScript. Hide things for an entrance only after JS adds a class such as `js-anim` to `<html>`.

## 1. Fade-up on scroll (all pages)
Sections, cards, program boxes and photos fade in and rise about 16px when they scroll into view.
- CSS: `.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }` and `.reveal.is-visible { opacity: 1; transform: none; }`.
- JS: one `IntersectionObserver` in `js/main.js` that adds `is-visible` once and then stops watching that element.
- Stagger grid items (cards, service list, photo row) with `transition-delay: calc(var(--i) * 80ms)`.

## 2. Hero logo "heartbeat" (home page)
When the home page loads, the hero logo scales from 0.92 to 1.04 to 1 once over about 900ms, like a single heartbeat. It plays once and never loops.

## 3. Key Focus tabs (home page)
- When switching tabs, the new panel cross-fades in: text first, then the photo slides in 12px from the right, about 80ms later.
- The underline or highlight under the active tab slides to the new tab instead of jumping.

## 4. Buttons
Buttons already lift 2px on hover. Also add:
- A press effect: `:active { transform: scale(.97); }`.
- Arrow buttons ("Explore Adult Programming" and similar): the arrow nudges 4px right on hover.

## 5. Program cards (home page)
On hover or keyboard focus, the card lifts 4px and its shadow deepens. Use `:focus-within` so keyboard users see the same effect.

## 6. Photos
- On hover, the photo inside its rounded frame zooms to 1.03 over 500ms. The frame needs `overflow: hidden`.
- Photos fade in when they finish loading so lazy-loaded images don't pop in.

## 7. Header
- After the page scrolls past about 80px, the header shrinks slightly (logo 64px to 52px) and gains a soft shadow, using a 250ms transition.
- On mobile, the menu slides down and fades in rather than appearing instantly. The hamburger icon morphs into an X.

## 8. Forms (contact and newsletter)
- On success, a small checkmark draws in with an SVG `stroke-dashoffset` animation and the message fades up.
- On an error, the field shakes gently, 3 small horizontal moves over 300ms. Turn this off for reduced motion.
- While submitting, the button shows a small spinner. The button is already disabled during sending.

## 9. Donate buttons (Get Involved page)
A small heart icon next to "Donate Online" pulses once when the donate card scrolls into view. It does not loop.

## 10. Scripture-style taglines
Script-font lines like "Together We Build Brighter Futures!" fade in letter-group by letter-group, or with a simple left-to-right `clip-path` wipe over about 800ms, when they scroll into view.

## Suggested build order
1 (biggest impact) → 4 → 5 → 7 → 3 → 8 → the rest.

## Where the code goes
- CSS: the bottom of `css/styles.css`, in an "Animations" section.
- JS: a new `initAnimations()` in `js/main.js`, called after `renderLayout()` because the header and footer are injected by JS.
