# CV Generator — Style Guide

## Purpose

This guide defines the **principles and constraints** for generating professional CV/resume HTML files. It is not a template — the agent uses these rules as guardrails while crafting a unique design for each user. Every CV should feel intentionally designed for the person and the role, not stamped from a mold.

Visual decisions (layout, colors, typography, mood) are made collaboratively with the user. This guide ensures those decisions produce output that is technically sound, print-safe, and professionally effective.

---

## Hard Constraints

These are non-negotiable. Every generated CV must satisfy all of them.

1. **A4 dimensions** — The `.cv` container is exactly `210mm × 297mm`. Content must fit within it.
2. **Single-file output** — One `.html` file. All CSS in a `<style>` block. Inline SVG icons only. No external dependencies except one Google Fonts `<link>`.
3. **Print-first** — Design for paper. Screen preview is secondary. Use `@page { size: A4; margin: 0; }` and `print-color-adjust: exact`.
4. **Semantic HTML** — Use `<header>`, `<section>`, `<article>`, `<h1>`–`<h4>`, `<ul>`, `<time>`. Aids accessibility and ATS parsing.
5. **No JavaScript** — Static HTML + CSS only.
6. **Photos as data URIs** — If a photo is included, embed it as a base64 `data:image/...` URI in an `<img>` tag. No external image files.
7. **Validated fit** — After generating, always run `npm run validate <file.html>` to confirm content fits. Never rely on visual estimation alone.

### Page Shell

Every CV shares this minimal page setup:

```css
@page {
  size: A4;
  margin: 0;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0;
    padding: 0;
  }
}

.cv {
  width: 210mm;
  height: 297mm;
  overflow: hidden;        /* safety net — content should fit, not be clipped */
  margin: 0 auto;
}
```

Screen preview styling (shadow, background) is optional and should complement the design's mood.

### Vertical Balance

Content should be **vertically centered** or evenly distributed within the A4 page — not crammed to the top with a large empty gap at the bottom, or vice versa.

**Approach:** Use flexbox on the main content column with `justify-content` to distribute vertical space:

```css
/* Example: sidebar layout — apply to the main column */
.cv__main {
  display: flex;
  flex-direction: column;
  justify-content: center;    /* or space-between, depending on density */
}

/* Example: single-column layout — apply to the .cv itself */
.cv {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

The right `justify-content` value depends on the content amount:
- **Content fills ~80–100% of the page**: use `flex-start` (natural flow, spacing is already tight)
- **Content fills ~60–80%**: use `space-between` (distributes gaps evenly between sections)
- **Content fills <60%**: use `center` (vertically centers the block, avoids the "floating header, empty bottom" problem)

The validation script reports remaining space — use it to decide.

### Page Fit: Generate → Validate → Adjust

HTML text rendering is non-deterministic — font metrics, line-breaking, and subpixel rounding mean you **cannot predict from source alone** whether content will fit an A4 page. The only reliable method is to render in a real browser and measure.

**Workflow:**

1. **Generate** the HTML with conservative content (err on the side of fewer bullets)
2. **Validate** by running: `npm run validate output/cv-target-date.html`
3. **Read the report** — it shows:
   - Total content height vs. page height
   - Overflow or remaining space (in mm and px)
   - Per-section height breakdown (header, summary, each role, etc.)
   - Sidebar vs. main column heights
4. **Adjust if needed:**
   - **Overflow**: remove bullets from the longest role, trim the summary, reduce spacing, or drop the least relevant section. Then re-validate.
   - **Too much space** (>15mm remaining): add a bullet to a thin role, increase spacing slightly, or adjust `justify-content` for better distribution.
5. **Repeat** until the report shows the content fits with 3–15mm of remaining space.

**Target: 3–15mm of remaining vertical space.** Less than 3mm risks clipping from font rendering differences across systems. More than 15mm looks unfinished.

When satisfied, generate the final PDF: `npm run pdf output/cv-target-date.html`. Both commands exit with code 1 on overflow — content must pass validation before a PDF is produced.

### Two-Page CVs

For senior professionals (10+ years), a two-page layout may be justified. It must be **deliberate** — never overflow.

- Use separate `.cv` containers per page, each at fixed A4 dimensions.
- Page 1: name, summary, most relevant/recent roles. Page 2: supporting roles, projects, certifications.
- Never leave page 2 less than half full.
- Use `page-break-before: always` on the second container and `break-inside: avoid` on role/project blocks.
- Validate both pages — run the script to check each page's content height.

---

## Design Principles

These guide creative decisions. They are not pixel-level rules — interpret them for each design.

### 1. Scannable Hierarchy

Recruiters spend 6–10 seconds on first pass. The candidate's name, target title, and most recent role must be instantly locatable. Establish clear visual hierarchy through size, weight, color, and spacing — not through decoration.

### 2. Content Density

A CV is not a poster. Every unit of whitespace should be intentional. Aim for a rhythm that feels organized but not cramped. Generous margins around the page edge; tight, consistent spacing between content blocks.

### 3. One Dominant Accent

Pick one accent color (or one hue family). Derive all highlights, backgrounds, borders, and tints from it. A single strong color creates a more memorable and cohesive impression than a palette of competing hues.

### 4. Typographic Intentionality

Choose fonts that match the person and the role. A creative director's CV shouldn't use the same font as a financial analyst's. Pair a distinctive display/heading font with a readable body font — or use one versatile family at different weights.

Avoid: Inter, Roboto, Arial, system-ui as primary fonts. These are defaults, not choices. Pick something with character.

### 5. Print Safety

Dark backgrounds, heavy gradients, and full-bleed color areas can fail in print. If using a dark sidebar or colored header, verify it works with `print-color-adjust: exact`. Ensure all text meets WCAG AA contrast (4.5:1 for body text) against its background.

### 6. Unique but Professional

Each CV should be a distinctive design — not a reskinned template. Vary the layout structure, typography pairing, spacing rhythm, heading treatments, and decorative details across designs. At the same time, stay professional: the design should enhance the content, never distract from it.

---

## Layout Archetypes

The agent should choose or invent a layout that suits the content and the user's aesthetic. Here are common archetypes for inspiration — the agent is free to combine, modify, or design something new.

### Sidebar + Main (Classic)

Two-column: colored or textured sidebar (25–35% width) for contact, skills, education. Main column for name, summary, experience. The sidebar can be on the left or right.

### Top Header + Single Column

Full-width header with name, title, contact in a row or grid. Content flows in a single column below. Good for dense experience sections or when sidebar content is minimal.

### Top Header + Two Column Body

Full-width header, then a two-column body (e.g., 60/40 or 65/35) for experience vs. skills/education. The header area can include a photo.

### Magazine / Editorial

Asymmetric layout with overlapping elements, pull quotes, or unconventional grid. A bold name treatment spanning the full width, with content arranged in fluid blocks below. Best for creative roles.

### Compact Card

Tight margins, minimal chrome. Name and contact on one line. Dense two-column layout optimized for maximum content in minimum space. Good for senior engineers with many roles.

### With Photo

Any layout above can incorporate a photo. Common placements:
- **Sidebar top** — circular or rounded-rectangle crop, 70–90px wide
- **Header left/right** — next to name and title
- **Header background** — subtle, desaturated, behind the name (creative roles only)

Photo guidelines:
- Always circular or rounded-rectangle crop
- Keep it small — 60–100px in the longest dimension
- Desaturate or apply a subtle filter if it clashes with the color scheme
- Never let the photo dominate — the name and experience are the focus

---

## Typography Guidelines

Instead of a fixed type scale, follow these principles:

### Size Range

- **Name**: 22–32px — the largest element on the page
- **Section headings**: 11–15px — clearly distinct from body but not competing with name
- **Body text / bullets**: 11–13px — optimized for readability at print scale
- **Small text** (dates, labels, tags): 10–12px
- **Absolute minimum**: 9px. Nothing smaller prints legibly.
- **Absolute maximum**: 36px. Larger competes with the content.

### Weight & Style

- Use weight to establish hierarchy: 700 for name, 600 for role titles, 400–500 for body
- Limit to 3–4 distinct weight levels
- Avoid italic except for specific semantic use (degree names, publication titles, foreign phrases)
- UPPERCASE sparingly — for section headings, labels, or title subtitle. Never for body text.

### Font Selection

Choose fonts that reflect the user's industry and personality:

| Mood | Direction | Examples |
|------|-----------|----------|
| Technical / Modern | Geometric or humanist sans | Space Grotesk, DM Sans, Outfit, Satoshi, Manrope |
| Creative / Expressive | Display sans or slab | Sora, Clash Display, Plus Jakarta Sans, Bricolage Grotesque |
| Traditional / Authoritative | Serif or transitional | Lora, Playfair Display, Source Serif Pro, Crimson Pro |
| Elegant / Refined | High-contrast serif or thin sans | Cormorant Garamond, Fraunces, Instrument Serif |
| Minimal / Precise | Grotesque or neo-grotesque | Geist, General Sans, Switzer, Nacelle |

These are starting points — the agent should explore and surprise. Avoid reusing the same font across consecutive CVs.

---

## Spacing Principles

Use a consistent base unit (4px or 8px) and derive all spacing from it. The specific values depend on the design's density:

- **Tight designs** (dense content, senior engineers): 4px base — `4, 8, 12, 16, 20, 24`
- **Airy designs** (creative, fewer items): 8px base — `8, 16, 24, 32, 40`

Key spatial relationships:
- Page margins/padding: 14–20mm — enough to breathe, not so much it wastes space
- Between major sections: largest gap in the system
- Between items within a section (roles, education entries): medium gap
- Between lines within an item (title → bullets): smallest gap
- Sidebar padding should match the page margins for alignment

Define spacing as CSS variables for consistency within each design.

---

## Icons

Use **inline SVGs** for contact items and optional section decorations.

- Size: 12–16px, consistent within a design
- Style: stroke-based (1.5px stroke, no fill) **or** filled — pick one style and commit
- Color: `currentColor` or the accent color
- Vertically aligned with adjacent text
- Required: email, phone, location. Optional: LinkedIn, GitHub, website, portfolio, calendar

The icon set should match the design's aesthetic. Rounded stroke icons for friendly designs; sharp geometric for modern; thin line for elegant.

---

## Color System

Define colors as CSS custom properties. At minimum, every design needs:

```css
:root {
  --text-primary:    /* main body text */;
  --text-secondary:  /* supporting text (dates, companies) */;
  --text-muted:      /* tertiary text (labels, captions) */;
  --accent:          /* primary accent — name, links, highlights */;
  --bg:              /* main background */;
  --bg-alt:          /* sidebar or secondary area background */;
}
```

Additional variables for tags, borders, heading colors, etc. are design-specific.

### Color Principles

- **One hue family** for accents. Derive lights, darks, and tints from it.
- **Contrast first** — all text must be legible on its background. Test light text on colored backgrounds carefully.
- **Dark themes are valid** — a dark sidebar, dark header, or fully dark design can work for creative roles. Just ensure print safety.
- **Industry-appropriate** — vibrant for tech/startup/creative, muted for finance/law/consulting, earthy for non-profit/education. But break the mold when it serves the user.

---

## Content Rules

### Bullet Writing

- 3–6 bullets per role. Fewer for older/shorter roles. Most recent role gets the most.
- Start with a strong verb: Led, Built, Designed, Migrated, Reduced, Shipped, Automated.
- Include quantifiable outcomes when available (%, time saved, revenue, scale).
- Max ~120 characters per bullet. If it takes 3 lines, split or rewrite.
- Active voice only. Never "Was responsible for..." — say what you did.

### Summary

- 2–3 sentences, max ~50 words
- Mentions: years of experience, core domain, 1–2 differentiators
- Tailored to the target job — mirror their language and priorities

### Skills

- Grouped by category (Languages, Frameworks, Tools, etc.)
- Ordered by relevance to the target job
- Curated — omit skills irrelevant to the role
- Displayed as compact tags or inline lists

### Section Order

Decide based on what's strongest for this candidate and role:
- **Experience-first** (default): Name → Title → Summary → Experience → Skills → Education
- **Skills-first**: When the role is highly technical and skills are the primary filter
- **Projects-first**: When side projects or portfolio pieces are more impressive than employment history

Contact info placement depends on the layout — sidebar, header row, or footer.

---

## Typography: Non-Breaking Spaces

Proper use of non-breaking spaces (`&nbsp;` in HTML) prevents ugly line breaks in professional documents. Apply these rules consistently:

### When to Use `&nbsp;`

| Context | Example | Why |
|---------|---------|-----|
| Between a number and its unit | `3&nbsp;years`, `50&nbsp;ms`, `99.9&nbsp;%` | "3" orphaned at line end looks broken |
| In date ranges | `Jan&nbsp;2022&nbsp;— Dec&nbsp;2024` | Keeps dates as a visual unit |
| After single-letter prepositions/conjunctions | `worked&nbsp;w/ team`, `5&nbsp;× faster` | Prevents dangling single characters |
| In proper nouns with spaces | `New&nbsp;York`, `San&nbsp;Francisco` | City names shouldn't split |
| Between title and name | `Dr.&nbsp;Smith`, `Prof.&nbsp;Lee` | Title and name are one unit |
| In phone numbers | `+48&nbsp;123&nbsp;456&nbsp;789` | Keep phone as a visual block |
| In abbreviated phrases | `e.g.&nbsp;React`, `i.e.&nbsp;the API` | Abbreviation stays with what follows |

### When NOT to Use

- In running body text between normal words (let natural breaks happen)
- Between every word in a short phrase (only protect the break points that would look bad)
- In HTML tags or attributes

### Implementation

Apply non-breaking spaces in the final HTML output, not in the user's data files. The agent handles this during generation as a typographic polish step.

---

## Anti-Patterns

### Visual

- Skill progress bars or percentage indicators (dishonest and meaningless)
- Multiple competing accent colors (one hue, multiple tints only)
- Justified body text (creates uneven word spacing at small sizes)
- Tables for layout (breaks ATS parsing)
- Heavy drop shadows or 3D effects (dated aesthetic, print issues)
- External icon libraries or font icon sets — inline SVGs only

### Content

- Listing every technology ever touched — curate for the role
- Passive voice bullet points — show impact, not duties
- Job descriptions instead of achievements
- Walls of text — if a bullet needs 3+ lines, split or rewrite
- "References available upon request" (implicit, wastes a line)
- Generic objective statements — use a tailored summary instead
- Hobbies/interests (unless directly relevant to the role)

---

## Print & PDF Checklist

Before generating the final PDF (`npm run pdf`):
- [ ] Fits on a single A4 page (default) — validated with `npm run validate`
- [ ] If two pages: both intentionally filled, page 2 at least half full
- [ ] All links are full URLs (no "click here")
- [ ] Name and title visible without scrolling
- [ ] Font loads from Google Fonts (fallback is acceptable)
- [ ] Icons render correctly in print (inline SVG)
- [ ] Non-breaking spaces applied in dates, numbers with units, and proper nouns

`npm run pdf` handles margins, background graphics, and page dimensions automatically via Puppeteer.
