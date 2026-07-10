# Ayanna Redwood-Crawford Portfolio - Product Requirements Document

## Executive Summary
Build a fast, single-page personal portfolio for Ayanna Redwood-Crawford, a NYT Wirecutter staff writer covering beauty, personal care, and lifestyle. The site presents her positioning, links her published work and short-form video, offers her resume, signals openness to London roles, and ships with a user-facing appearance toggle that switches between two designed looks ("Nightstand" and "Golden Hour").

A polished reference build already exists as a single file, `index.html` (provided alongside this PRD). Treat that file as the visual and behavioral source of truth. This PRD specifies how to productionize it into a clean, maintainable codebase.

## Problem Statement
Ayanna needs a portfolio that reads as serious and editorial (not templated, not "AI-sounding"), collects her bylines in one place, and doubles as a job-seeking asset while she looks toward a move to London. The current asset is a hand-built single HTML file deployed via Netlify Drop. It works, but it should become a proper codebase so it is easy to maintain, extend, and redeploy, with the appearance toggle promoted from a preview control to a real site feature.

## Solution Overview
A static, single-page site built from componentized sections, styled with CSS custom properties so the two themes are pure token swaps. No backend, database, or authentication. The appearance toggle flips a class on the root element and persists the choice. Video plays inline via a lightweight modal so visitors are not sent to another app. Deployed as static files to Netlify.

## Target Users
**Primary:** Hiring editors and recruiters (US and London) evaluating Ayanna for staff or freelance beauty/lifestyle writing roles. They skim quickly, click a byline or two, and want the resume in one tap.
**Secondary:** Brand and PR contacts sourcing collaborators, and peers sharing her work.

## Source of Truth
`index.html` is the authoritative reference for layout, copy, colors, type, spacing, motion, and interactions. Where this PRD and the file disagree, prefer the file for visual detail and prefer this PRD for structure, the appearance toggle behavior, accessibility, and content accuracy. Do not restyle or "improve" the aesthetic without a request; the design has been through many client rounds.

## Core Features

### Phase 1: MVP (the whole site)
| Feature | Description | Priority | Complexity |
|---|---|---|---|
| Nav | Name wordmark plus links: Work, About, Resume (PDF, new tab), Say Hello (anchor scroll) | P0 | Low |
| Hero (text only) | Eyebrow metadata line, first-person statement, two buttons. No photo for now (portrait removed at client request) | P0 | Low |
| Selected Work grid | Five cover cards linking to real articles; one "coming soon" card that is dimmed and unlinked | P0 | Med |
| Caught on video | Two chips that open short-form videos inline in a modal, with external link fallback | P0 | Med |
| About | Beats list plus a short first-person bio; final sentence in the accent color | P0 | Low |
| Footer / contact | Big mailto headline plus a details row (Email, Based in, Open to, For, Elsewhere links) | P0 | Low |
| Appearance toggle | User-facing control switching Nightstand and Golden Hour; persists choice; no flash on load | P0 | Med |
| Responsive layout | Mobile, tablet, desktop | P0 | Med |
| Motion + polish | Scroll reveals, hero statement stagger (motion-safe), grain texture, custom cursor on desktop | P1 | Med |
| Accessibility | Keyboard, focus states, reduced-motion, contrast, semantic landmarks | P0 | Med |
| SEO + meta | Title, description, Open Graph, favicon | P1 | Low |

### Phase 2: When assets arrive
| Feature | Description | Priority | Complexity |
|---|---|---|---|
| Headshot | Reintroduce a portrait in the hero once her new staff photos land (design TBD with client) | P2 | Low |
| Accessible Beauty link | Flip the "coming soon" card to a live link when the guide publishes | P1 | Low |
| Hi-res media | Swap any placeholder imagery for higher-resolution files | P2 | Low |

## Design System

Themes are implemented purely as CSS custom properties on the root/body. Switching themes swaps a class; every color reads from a variable so no component needs theme-specific code.

### Theme tokens

**Nightstand (default, full black):**
```
--bg:#141110;  --ink:#F2ECE1;  --muted:#9C9081;
--accent:#E2925E;  --accent2:#C9A86A;
--on-hero:#F2ECE1;  --hero-accent:#E2925E;  --hero-muted:#9C9081;
--line:rgba(242,236,225,.16);  --card:#1E1916;  --card-line:rgba(242,236,225,.14);
--foot-bg:#0F0C0B;  --foot-ink:#F2ECE1;  --foot-accent:#E2925E;
```

**Golden Hour (warm):**
```
--bg:#F0E4D1;  --ink:#241C12;  --muted:#7A6B54;
--accent:#C2724B;  --accent2:#D8B27C;
--on-hero:#241C12;  --hero-accent:#B85F36;  --hero-muted:#8C7A60;
--line:rgba(36,28,18,.18);  --card:#F7EEDF;  --card-line:rgba(36,28,18,.14);
--foot-bg:#1A140D;  --foot-ink:#F4E8D5;  --foot-accent:#E0A766;
```

Background and text color transition smoothly (about .55s ease) when the theme changes.

### Typography
- Display: **Bodoni Moda** (Google Fonts), weights 400 to 600, italic used for emphasized words. This high-contrast Didone is the "serious, not friendly" face the client asked for. Hero statement and section headings use weight 500.
- Body / UI: **DM Sans** (Google Fonts), weights 300 to 700.
- Load both from Google Fonts (or self-host for performance; see Non-Functional). Provide `Georgia, serif` and `system-ui, sans-serif` fallbacks.

### Visual language
- **Sharp edges.** No border radius on cards, panels, the portrait slot, or buttons. The only rounded elements are the small toggle pills.
- **Grain overlay:** a fixed, low-opacity SVG noise layer over the page for texture.
- **Custom cursor:** a small accent dot that eases toward the pointer and grows over links; hidden on touch devices.
- **Hero statement** renders as one flowing, horizontal paragraph (sentences run inline, not stacked).
- **House rule: no em dashes anywhere** in copy, UI text, comments, or metadata. Use periods, commas, or middots.

### Motion
- Section reveal on scroll (fade and rise) via IntersectionObserver.
- Hero statement lines stagger in on load, but only under `prefers-reduced-motion: no-preference`. Lines must be fully visible by default so reduced-motion users never see empty space.
- All non-essential motion is disabled under `prefers-reduced-motion: reduce`.

## Page Structure and Components

Build these as discrete components/partials.

1. **AppearanceToggle** - two options, Nightstand and Golden Hour. See spec below.
2. **Nav** - wordmark "Ayanna Redwood-Crawford" (links to top); links: Work (#work), About (#about), Resume (`/ayanna-resume.pdf`, new tab), Say Hello (#say-hello).
3. **Hero** - eyebrow row, statement, two buttons. No image.
4. **WorkGrid** - five **WorkCard** items (four links plus one coming-soon), then a **VideoChips** row, then a small "See the full archive" line linking to Muck Rack.
5. **VideoModal** - a single dialog reused by both chips.
6. **About** - beats list plus bio.
7. **Footer** - mailto headline plus details row.

## Content Specification (use verbatim)

### Hero eyebrow (metadata, middot or gap separated)
Staff Writer, **NYT Wirecutter**  ·  Beauty, Personal Care & Lifestyle  ·  Brooklyn, NY  ·  Open to **London**
(The words "NYT Wirecutter" and "London" are emphasized in the accent color.)

### Hero statement (emphasized words in italic accent: "beauty" and "truth")
"Hi, I'm Ayanna Redwood-Crawford. I write about beauty and the small, well-made things that make life feel good. The lipstick that earns a permanent spot in your bag. The products worth the counter space. Before beauty, I spent a few years on the sleep beat, testing mattresses down to the last coil. I test everything myself, I trust almost nothing on the first try, and I tell you the truth either way."

### Hero buttons
- Primary: "Read my work" -> #work
- Secondary: "Work with me" -> #say-hello

### Work cards
Section eyebrow "Selected Work", heading "A few favorites.", deck "Click any piece to read it."

| # | Title | Tag | Link | Blurb | Cover gradient (150deg) |
|---|---|---|---|---|---|
| 1 | The 4 Best Foundations | Beauty · Wirecutter | https://www.nytimes.com/wirecutter/reviews/best-foundations/ | Popular formulas tested by very picky testers, including a $7 sleeper hit. | #D9A77A -> #9C6B45 |
| 2 | 30 Lipsticks, 6 Standouts | Beauty · Wirecutter | https://www.nytimes.com/wirecutter/reviews/best-lipstick/ | A lot of swatches. Six earned a permanent spot in the bag. | #C05C43 -> #7E2E2A |
| 3 | The 3 Best Self-Tanners | Beauty · Wirecutter | https://www.nytimes.com/wirecutter/reviews/best-self-tanner/ | A no-streaks field guide to faking a summer glow. | #C88A4E -> #8A4E28 |
| 4 | An Ode to the Kitchen Torch | Lifestyle · Wirecutter | https://www.nytimes.com/wirecutter/reviews/best-kitchen-torch-whip-it-motif/ | Four models tested to find the Goldilocks of the bunch. Melted cheese optional. | #E0913F -> #B0431F |
| 5 | A Guide to Accessible Beauty | Beauty · Coming soon | none (dimmed, not clickable, shows "Soon") | In the works. This one goes live shortly. | #B98AA6 -> #6E4F63 |

Archive line under the grid: "Real bylines, all live." plus link "See the full archive" -> https://muckrack.com/ayanna-redwood-crawford-1

### Caught on video
Label: "Caught on video". Two chips, each a play glyph plus text:
- "Torch-testing, four ways" - modal embed `https://www.tiktok.com/embed/v2/7414127405763169578`; fallback link `https://www.tiktok.com/@wirecutter/video/7414127405763169578`
- "The fake-spills mattress stress test" - modal embed `https://www.instagram.com/reel/DJpFtT8OQ89/embed/`; fallback link `https://www.instagram.com/reel/DJpFtT8OQ89/`

### About
Eyebrow "About", heading "The short version."
Beats: Beauty & Personal Care · Lifestyle · Brand Voice · Previously · Sleep
Lead: "Good writing, to me, is just good taste with a deadline."
Paragraph 1: "Before there were bylines, there were spreadsheets. I spent my early career in startup operations, logistics, and recruiting, which is a long way of saying I learned how things actually get made and who to call when they break."
Paragraph 2: "These days I write about beauty and the everyday things worth getting right, from what goes on your face to what makes a home feel good. I've also written brand voice and CEO copy for founders who wanted to sound like themselves, only sharper. The throughline is taste, patience, and a low tolerance for things that do not work." (Final sentence renders in the accent color.)

### Footer
Eyebrow "Say Hello". Headline "Let's make something good." linking to `mailto:hello@ayannacrawford.com`.
Details row:
- Email: hello@ayannacrawford.com
- Based in: Brooklyn, New York
- Open to: Roles in London
- For: Assignments, collaborations, strong opinions about lipstick
- Elsewhere: Resume (`/ayanna-resume.pdf`), LinkedIn (https://www.linkedin.com/in/ayannacrawford/), Muck Rack (https://muckrack.com/ayanna-redwood-crawford-1)

## Appearance Toggle Specification
- Two options: **Nightstand** (default) and **Golden Hour**.
- Implemented by toggling a class on the root element (`theme-nightstand` / `theme-golden`); all colors read from CSS variables so no other code branches on theme.
- **Persistence:** store the choice in `localStorage` and restore it on load.
- **No flash of wrong theme:** set the stored theme via a tiny inline script in `<head>` before first paint, so the page never flashes the default then switch.
- **Optional default:** on first visit with no stored choice, default to Nightstand. (Do not auto-follow the OS light/dark setting; the client wants Nightstand as the front door. This can be revisited.)
- **Accessible:** the control is real buttons with `aria-pressed`, reachable and operable by keyboard, with visible focus. Provide an accessible group label ("Appearance").
- **Placement:** in the reference file it sits in a top bar. For production, place it where it reads as a deliberate site control (top bar or nav corner). Keep it unobtrusive and consistent across breakpoints.

## Technical Architecture

### Recommended stack
| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Astro** (static output) | Component/partial structure for the sections with zero client JS by default, so the site ships as fast static HTML. Keeps the existing CSS-variable theming intact and is simple for an AI coding tool to scaffold and for a solo owner to maintain. |
| Styling | **Vanilla CSS with custom properties** (as in the reference) | The theming is already expressed cleanly as CSS variables. No need for Tailwind; porting to it would add churn without benefit. Scope component styles with Astro's built-in scoped styles or a single global stylesheet. |
| Interactivity | Small vanilla JS (Astro islands or plain `<script>`) | Theme toggle, video modal, scroll reveal, cursor. No framework runtime required. |
| Fonts | Google Fonts, or self-hosted via Fontsource | Bodoni Moda + DM Sans. Self-hosting is preferred for performance and privacy; Google Fonts is acceptable for speed of build. |
| Hosting | **Netlify** (static) | Already in use (`yanners.netlify.app`). Drag-and-drop or Git-connected. The resume PDF sits at the site root. |
| Analytics (optional) | Netlify Analytics or Plausible | Privacy-friendly, no cookie banner needed. |

**Zero-build alternative:** if a framework is unwanted, ship the existing `index.html` plus `ayanna-resume.pdf` as plain static files. Everything in this PRD works without a framework; Astro is a maintainability choice, not a requirement.

### Suggested file structure (Astro)
```
/
  astro.config.mjs
  package.json
  public/
    ayanna-resume.pdf         # linked as /ayanna-resume.pdf
    favicon.svg
    og-image.jpg              # optional social preview
  src/
    layouts/Base.astro        # <head>, fonts, grain, cursor, theme init script
    pages/index.astro         # composes the sections
    components/
      AppearanceToggle.astro
      Nav.astro
      Hero.astro
      WorkGrid.astro
      WorkCard.astro
      VideoChips.astro
      VideoModal.astro
      About.astro
      Footer.astro
    styles/
      global.css              # tokens (both themes), base, utilities
    scripts/
      theme.ts                # toggle + persistence
      modal.ts                # video modal open/close
      reveal.ts               # IntersectionObserver reveals
      cursor.ts               # custom cursor (desktop only)
    content/
      work.ts                 # the five cards as data
      videos.ts               # the two video items
```
Drive WorkGrid and VideoChips from the `content/*` data files so future edits are one-line changes.

### Data model (static content, no DB)
`WorkItem { title, tag, href | null, blurb, coverFrom, coverTo, comingSoon }`
`VideoItem { label, embedSrc, fallbackHref }`

## User Flows

### Evaluate and contact
1. Visitor lands on the hero and reads the statement.
2. Clicks "Read my work" or a byline card; the article opens in a new tab.
3. Returns, opens a video chip; it plays inline in the modal; closes it.
4. Clicks Resume in the nav; the PDF opens in a new tab.
5. Clicks the email headline in the footer to reach out.

### Switch appearance
1. Visitor clicks the appearance control.
2. The theme swaps instantly with a smooth color transition.
3. The choice is remembered on the next visit with no flash.

## Non-Functional Requirements

### Performance
- Lighthouse performance target 95+ on desktop, 90+ on mobile.
- Preload/`font-display: swap` for fonts; subset if self-hosting.
- Total initial payload target under ~500 KB excluding any future large imagery.

### Accessibility
- Target WCAG 2.1 AA.
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`.
- Visible focus styles; full keyboard operation of the toggle, cards, chips, and modal (including focus trap and Escape to close).
- Respect `prefers-reduced-motion`.
- Verify contrast for both themes (accent-on-dark and accent-on-warm).

### SEO and metadata
- Descriptive `<title>` and meta description.
- Open Graph and Twitter card tags with an OG image.
- Sensible favicon.

### Browser support
- Current Chrome, Safari, Firefox, Edge; iOS and Android. Graceful degradation of the custom cursor (off on touch) and backdrop blur.

## Assets Needed
- `ayanna-resume.pdf` at the site root (provided; link already points to `/ayanna-resume.pdf`).
- Headshot: pending her new NYT staff shoot; not on the site right now. Design for reintroduction later.
- Higher-resolution versions of any future imagery.
- Optional OG social image and favicon.

## Acceptance Criteria
- [ ] All four live work links resolve to the correct NYT Wirecutter articles; the fifth card is visibly "coming soon", dimmed, and not clickable.
- [ ] Both video chips open and play inside the on-page modal; closing works via the close button, backdrop click, and Escape; if an embed is blocked, the fallback external link is used.
- [ ] Appearance toggle switches Nightstand and Golden Hour, persists across reloads, and shows no flash of the wrong theme on load.
- [ ] Resume link opens `/ayanna-resume.pdf` in a new tab.
- [ ] "Open to London" appears in the hero eyebrow and the footer.
- [ ] Copy matches this PRD exactly; there are no em dashes anywhere in the output.
- [ ] Hero statement is fully visible with reduced motion enabled.
- [ ] Layout holds at 360px, 768px, and 1280px widths with no overflow.
- [ ] Keyboard-only user can reach and operate the nav, toggle, cards, chips, and modal with visible focus.
- [ ] Lighthouse: Performance 90+ mobile, Accessibility 95+.

## Risks and Mitigations
| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Theme flash on first paint (FOUC) | Med | Med | Set stored theme via inline head script before render. |
| Third-party video embeds blocked or heavy | Med | Med | Load the iframe only when the modal opens; keep the external link as fallback; lazy and sandboxed. |
| A guide URL changes or an article is retitled | Med | Low | Centralize links in `content/work.ts`; spot-check on deploy. |
| Font loading shifts layout (FOUT/CLS) | Low | Med | `font-display: swap`, preconnect or self-host, reserve space. |
| Resume file missing at root after deploy | Med | Low | Deploy PDF with the site (in `public/`); verify the link post-deploy. |
| Full site fails to build in the chosen framework | High | Low | The zero-build static `index.html` is a always-working fallback that can be shipped as-is. |

## Timeline and Milestones
| Day | Milestone | Deliverable |
|---|---|---|
| 1 | Scaffold + design system | Project set up, tokens and fonts in, both themes switch |
| 1-2 | Sections | Nav, Hero, Work grid, About, Footer built from data |
| 2 | Interactions | Appearance toggle with persistence, video modal, reveals, cursor |
| 3 | Polish + a11y + SEO | Responsive pass, keyboard/reduced-motion, meta tags, Lighthouse |
| 3 | Deploy | Static build live on Netlify with resume at root |

## Open Questions
- [ ] Framework: Astro (recommended) or keep it as plain static `index.html`?
- [ ] Toggle placement in production: top bar, nav corner, or footer?
- [ ] Should first-visit default ever follow the OS light/dark setting, or always Nightstand?
- [ ] Self-host fonts, or Google Fonts is fine?
- [ ] Custom domain (for example ayannacrawford.com) or stay on `yanners.netlify.app`?
- [ ] Add privacy-friendly analytics?

## Appendix

### Confirmed links
- Foundations: https://www.nytimes.com/wirecutter/reviews/best-foundations/
- Lipstick: https://www.nytimes.com/wirecutter/reviews/best-lipstick/
- Self-tanner: https://www.nytimes.com/wirecutter/reviews/best-self-tanner/
- Kitchen torch: https://www.nytimes.com/wirecutter/reviews/best-kitchen-torch-whip-it-motif/
- Torch video (TikTok): https://www.tiktok.com/@wirecutter/video/7414127405763169578
- Mattress-protector video (Instagram): https://www.instagram.com/reel/DJpFtT8OQ89/
- Muck Rack: https://muckrack.com/ayanna-redwood-crawford-1
- LinkedIn: https://www.linkedin.com/in/ayannacrawford/
- Email: hello@ayannacrawford.com

### Notes carried from the client's rounds
- Serious and editorial, not friendly. The display face (Bodoni Moda) and sharp edges are load-bearing choices; keep them.
- Beauty and lifestyle are the present beat; sleep is past. Copy already reflects this.
- No em dashes, anywhere.
- Horizontal hero statement is the chosen layout (locked).
- The door photo experiment was removed; the hero is text only for now.
