# EverGreen Estates — Responsive Landing Page

An original editorial-style landing page for a property company, built with vanilla HTML, CSS and JavaScript.

**Teczo Softwares — Internship Task, Day 4**

## Live Demo

<!-- Replace after enabling GitHub Pages -->
https://sanjana1kumari.github.io/EverGreenEstates_Webpage/

## Design Direction

Rather than copying the reference layout, this takes the same content in a different visual direction:

| | Reference | This build |
|---|---|---|
| Palette | Green, white, rounded | Warm paper, ink, terracotta accent |
| Corners | Heavily rounded pills | Square — hairline rules instead |
| Type | Single sans-serif | Fraunces serif display + Inter body |
| Layout | Centred, card-based | Asymmetric, numbered sections, full-bleed bands |
| Motion | Static | Scroll reveal via IntersectionObserver |

## Tech Stack

- HTML5, semantic elements
- CSS3 — custom properties, Grid, Flexbox, `clamp()`, `aspect-ratio`, media queries
- Vanilla JavaScript (ES6) — no frameworks or libraries
- Google Fonts (Fraunces, Inter)
- Photography from [Unsplash](https://unsplash.com), hotlinked

## Structure

```
evergreen-editorial/
├── index.html          # All sections
├── css/style.css       # Tokens → base → components → sections → breakpoints
├── js/script.js        # Six independent feature functions
└── README.md
```

## Sections

Sticky masthead · Split hero · Inline search bar · Approach (01) · Figures · Collection with filter (02) · Questions accordion (03) · Voices (04) · Closing CTA · Footer

## JavaScript Features

| # | Feature | Technique |
|---|---|---|
| 1 | Mobile navigation | Class toggle, `aria-expanded`, Escape to close |
| 2 | Scroll reveal | `IntersectionObserver` with a staggered delay, unobserved after firing |
| 3 | Accordion | Animates `max-height` using the measured `scrollHeight` |
| 4 | Quote cross-fader | Stacked absolute figures, autoplay with pause on hover/focus |
| 5 | Collection filter | Matches `data-filter` against `data-type`, shows an empty state |
| 6 | Search form | `preventDefault()` + `FormData`, smooth scroll to results |

Plus an `onerror` image fallback so a blocked network degrades to neutral blocks instead of broken icons.

## Responsive Breakpoints

| Width | Layout |
|---|---|
| > 1024px | Two-column hero, 3-up listings, 4-up figures, 5-column search bar |
| ≤ 1024px | Stacked hero, 2-up listings and figures, 2-column search |
| ≤ 820px | Hamburger menu, stacked section headers, reduced indents |
| ≤ 560px | Single column throughout, hidden question numbers |

## Accessibility

Skip link · visible focus rings · `aria-expanded` on all toggles · `aria-label` on icon-only buttons · alt text on every content image · `prefers-reduced-motion` honoured.

## Running Locally

```bash
git clone https://github.com/YOUR-USERNAME/evergreen-landing-page.git
cd evergreen-landing-page
```

Open `index.html` in a browser, or use VS Code Live Server. An internet connection is needed for the fonts and photography.

## Author

Sanjana kumari — Internship Task, Day 4
