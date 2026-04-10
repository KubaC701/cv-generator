# CV Generator — Style Guide

## Purpose

This guide defines the structural and visual rules for generating professional CV/resume HTML files. An agent uses this as the single source of truth when producing output. The HTML must render correctly in a browser and export cleanly to PDF (via browser print or Puppeteer).

Visual theming (colors, fonts) is separated from structure so that different users can express different aesthetics — from vibrant modern to classic professional — without changing the underlying layout or component system.

---

## Core Principles

1. **Print-first** — Design for A4 paper. Screen is secondary.
2. **Content density** — A CV must fit 1–2 pages. Every pixel of whitespace is intentional.
3. **Scannable hierarchy** — Recruiters spend 6–10 seconds on first pass. Name, title, and most recent role must pop immediately.
4. **Themeable** — Colors and fonts are driven by CSS custom properties. Swapping a theme changes the aesthetic without touching structure.
5. **Semantic HTML** — Use `<header>`, `<section>`, `<article>`, `<h1>`–`<h4>`, `<ul>`, `<time>`. Aids accessibility and ATS parsing.
6. **Single-file output** — Everything (HTML + CSS + inline SVG icons) in one `.html` file. No external dependencies except one Google Fonts import.

---

## Page Setup

| Property       | Value                    |
|----------------|--------------------------|
| Page size      | A4 (210mm × 297mm)       |
| Margins        | 16mm top/bottom, 18mm left/right |
| Orientation    | Portrait                 |
| Export         | Browser print → PDF (background graphics ON) |

```css
@page {
  size: A4;
  margin: 16mm 18mm;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**Page break control** — Never break inside a role/project block. Prefer breaks between sections.

```css
section { break-inside: avoid; }
article { break-inside: avoid; }
h2, h3  { break-after: avoid; }
```

---

## Theme System

All visual identity — colors, fonts, and mood — is expressed through CSS custom properties on `:root`. The agent selects or creates a theme based on the user's preference, then plugs the values into the same variable names. Structural CSS references only these variables — never raw color or font values.

### Theme Variables

Every theme must define all of these variables:

```css
:root {
  /* Typography */
  --font-family: /* Primary font */, system-ui, -apple-system, sans-serif;

  /* Colors */
  --text-primary:     /* Main body text and headings */;
  --text-secondary:   /* Job titles, company names, dates, sidebar body */;
  --text-muted:       /* Labels, secondary info */;
  --accent:           /* Name, icons, links, section heading accents */;
  --accent-light:     /* Tag backgrounds, subtle highlights */;
  --sidebar-bg:       /* Sidebar background */;
  --sidebar-heading:  /* Sidebar section heading color */;
  --border:           /* General borders */;
  --border-light:     /* Subtle borders */;
  --bg:               /* Main column background */;
  --tag-bg:           /* Tag background color */;
  --tag-border:       /* Tag border color */;
  --tag-text:         /* Tag text color */;
}
```

### Example Themes

Below are three reference themes. The agent can use one directly, blend elements, or create a new theme that fits the user's stated preference.

#### Modern Vibrant

Geometric sans-serif, vibrant accent, light colored sidebar. Ideal for tech, design, startups.

```css
:root {
  --font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  --text-primary:     #1a1a1a;
  --text-secondary:   #4a4a4a;
  --text-muted:       #6b6b6b;
  --accent:           #3941E4;
  --accent-light:     #e0e1fb;
  --sidebar-bg:       #eef0fc;
  --sidebar-heading:  #2a31b8;
  --border:           #d4d4d4;
  --border-light:     #e5e5e5;
  --bg:               #ffffff;
  --tag-bg:           #ffffff;
  --tag-border:       var(--accent-light);
  --tag-text:         var(--accent);
}
```

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap
```

#### Classic Professional

Serif font, muted earth tones, warm paper feel. Ideal for law, finance, consulting, academia.

```css
:root {
  --font-family: 'Libre Baskerville', 'Georgia', serif;

  --text-primary:     #2c2c2c;
  --text-secondary:   #555555;
  --text-muted:       #777777;
  --accent:           #8B4513;
  --accent-light:     #f5ebe0;
  --sidebar-bg:       #faf6f1;
  --sidebar-heading:  #6b3410;
  --border:           #d4c5b3;
  --border-light:     #e8ddd0;
  --bg:               #ffffff;
  --tag-bg:           #ffffff;
  --tag-border:       var(--border-light);
  --tag-text:         var(--text-secondary);
}
```

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap
```

Note: Libre Baskerville only ships 400 and 700. Map 500 → 400, 600 → 700 in this theme.

#### Minimal Slate

Clean sans-serif, monochrome with a single cool accent. Ideal for engineering, product, data science.

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;

  --text-primary:     #1a1a2e;
  --text-secondary:   #4a4a5a;
  --text-muted:       #71717a;
  --accent:           #2563eb;
  --accent-light:     #dbeafe;
  --sidebar-bg:       #f4f4f5;
  --sidebar-heading:  #1e40af;
  --border:           #d4d4d8;
  --border-light:     #e4e4e7;
  --bg:               #ffffff;
  --tag-bg:           #ffffff;
  --tag-border:       var(--border-light);
  --tag-text:         var(--text-primary);
}
```

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap
```

### Creating Custom Themes

When the user describes a preference that doesn't match an existing theme, the agent should:

1. **Identify the mood** — What adjectives describe it? (warm, bold, minimal, corporate, creative)
2. **Pick a font** — Sans-serif for modern/tech, serif for traditional/academic, geometric sans for creative
3. **Choose a single accent hue** — All accent values (accent, accent-light, sidebar-bg, sidebar-heading) must derive from the same hue at different lightness levels
4. **Ensure contrast** — Text on sidebar-bg must meet WCAG AA (4.5:1 for body text). Tags must be legible on both sidebar and main backgrounds.
5. **Test print** — Ensure the sidebar background and accent borders render with `print-color-adjust: exact`

---

## Typography Scale

The type scale is fixed across all themes. Only the font family changes.

| Element              | Size   | Weight | Color              | Extra                              |
|----------------------|--------|--------|--------------------|------------------------------------|
| Candidate name       | 26px   | 700    | `--accent`         | —                                  |
| Target role / title  | 14px   | 500    | `--text-secondary` | uppercase, letter-spacing: 0.05em  |
| Section heading (h2) | 13px   | 700    | `--text-primary`   | uppercase, letter-spacing: 0.06em, accent underline |
| Sidebar heading (h2) | 12px   | 700    | `--sidebar-heading`| uppercase, letter-spacing: 0.06em  |
| Role title (h3)      | 14px   | 600    | `--text-primary`   | —                                  |
| Company + dates      | 13px   | 500    | `--text-secondary` | —                                  |
| Body text            | 12px   | 400    | `--text-primary`   | line-height: 1.5                   |
| Skill tags           | 11px   | 500    | `--tag-text`       | —                                  |
| Contact info         | 11px   | 400    | `--text-secondary` | with inline SVG icon               |

**Rules**
- Uppercase only for: section headings, target role subtitle
- Sentence case everywhere else
- Line-height: 1.5 for body, 1.3 for headings
- No text larger than 26px. No text smaller than 10px.
- No italic except for degree names (optional)
- If the chosen font doesn't ship a required weight, map to the nearest available weight

---

## Spacing

All spacing derived from a **4pt base unit** (tighter than 8pt — CVs need density).

| Token    | Value | Use                                                    |
|----------|-------|--------------------------------------------------------|
| `--sp-1` | 4px   | Inline gaps, tag padding                               |
| `--sp-2` | 8px   | Between list items, tight groups, icon-to-text gap     |
| `--sp-3` | 12px  | Between sub-sections within a role                     |
| `--sp-4` | 16px  | Between roles, between section content and next heading|
| `--sp-5` | 20px  | Between major sections                                 |
| `--sp-6` | 24px  | Header bottom margin, sidebar padding                  |

```css
:root {
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 20px;
  --sp-6: 24px;
}
```

---

## Layout

**Two-column layout** — colored sidebar (left) + main content (right).

| Region  | Width | Content                                              |
|---------|-------|------------------------------------------------------|
| Sidebar | ~30%  | Contact (with icons), Skills, Education, Languages   |
| Main    | ~70%  | Header (name + title), Summary, Experience, Projects |

```css
.cv {
  display: flex;
  font-family: var(--font-family);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg);
}

.cv__sidebar {
  width: 30%;
  flex-shrink: 0;
  background: var(--sidebar-bg);
  padding: var(--sp-6);
  border-right: 3px solid var(--accent);
}

.cv__main {
  flex: 1;
  min-width: 0;
  padding: var(--sp-6);
}
```

**Alternative: single-column layout** — for roles with very dense project descriptions. Same spacing rules apply. Header spans full width, content flows top-to-bottom. No sidebar background — use accent left-border on section headings instead.

**Reading order**: Name → Title → Summary → Experience (most recent first) → Skills → Education

---

## Icons

Use **inline SVGs** to keep everything in a single file. Icons appear next to contact info items and optionally next to sidebar section headings.

**Icon rules**
- Size: 14px × 14px (contact items), 16px × 16px (section headings, optional)
- Color: `currentColor` (inherits from parent, typically `--accent` or `--text-muted`)
- Stroke-based, 1.5px stroke width, no fill — clean line style
- Vertically centered with text via `vertical-align: middle`
- Gap between icon and text: `var(--sp-2)` (8px)

**Required icons (contact section):**

| Item     | Icon description      |
|----------|-----------------------|
| Email    | Envelope outline      |
| Phone    | Phone handset outline |
| Location | Map pin outline       |
| LinkedIn | LinkedIn logo outline |
| GitHub   | GitHub logo outline   |
| Website  | Globe outline         |

```html
<!-- Email -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/>
</svg>

<!-- Phone -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
</svg>

<!-- Map pin -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
</svg>

<!-- LinkedIn -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
</svg>

<!-- GitHub -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
</svg>

<!-- Globe (website/portfolio) -->
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
</svg>
```

---

## Components

### Header

The candidate name and target role sit at the top of the main column.

```html
<header class="header">
  <h1 class="header__name">First Last</h1>
  <p class="header__title">Target Role Title</p>
</header>
```

```css
.header { margin-bottom: var(--sp-6); }

.header__name {
  font-size: 26px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
  margin: 0;
}

.header__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: var(--sp-1) 0 0 0;
}
```

### Contact Info

Lives in the sidebar. Each item has an inline SVG icon followed by text.

```html
<div class="contact">
  <div class="contact__item">
    <svg class="contact__icon" ...>...</svg>
    email@example.com
  </div>
  <!-- more items -->
</div>
```

```css
.contact__item {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.6;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-1);
}

.contact__icon {
  flex-shrink: 0;
  color: var(--accent);
}

.contact__item a {
  color: var(--accent);
  text-decoration: none;
}
```

### Section Heading — Main Column

Uppercase label with a thick accent underline.

```html
<h2 class="section-heading">Experience</h2>
```

```css
.section-heading {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  border-bottom: 2px solid var(--accent);
  padding-bottom: var(--sp-1);
  margin: 0 0 var(--sp-4) 0;
}
```

### Section Heading — Sidebar

```html
<h2 class="sidebar-heading">Skills</h2>
```

```css
.sidebar-heading {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--sidebar-heading);
  border-bottom: 2px solid var(--accent);
  padding-bottom: var(--sp-1);
  margin: 0 0 var(--sp-3) 0;
}
```

### Experience Entry

Each role is an `<article>` with a title line, company/date line, and bullet points.

```html
<article class="role">
  <div class="role__header">
    <h3 class="role__title">Role Title</h3>
    <span class="role__company">Company Name</span>
    <span class="role__date">Mon YYYY — Mon YYYY</span>
  </div>
  <ul class="role__bullets">
    <li>Achievement with quantifiable outcome.</li>
  </ul>
</article>
```

```css
.role { margin-bottom: var(--sp-4); }

.role__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--sp-2);
  margin-bottom: var(--sp-2);
}

.role__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.role__company {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.role__date {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: auto;
}

.role__bullets {
  padding-left: 16px;
  margin: 0;
}

.role__bullets li {
  margin-bottom: var(--sp-1);
  font-size: 12px;
  line-height: 1.5;
}
```

**Content rules for bullets**
- 3–6 bullets per role. Fewer for older/shorter roles.
- Start each bullet with a strong verb (Led, Built, Designed, Migrated, Reduced).
- Include quantifiable outcomes when available (%, time saved, revenue impact).
- Max ~120 characters per bullet. Two lines is acceptable, three is too long.

### Skills

Compact tag layout. Grouped by category. Sits in the sidebar.

```html
<div class="skills">
  <div class="skills__group">
    <h4 class="skills__label">Languages</h4>
    <div class="skills__tags">
      <span class="tag">TypeScript</span>
      <span class="tag">Python</span>
    </div>
  </div>
</div>
```

```css
.skills__group { margin-bottom: var(--sp-3); }

.skills__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  margin: 0 0 var(--sp-1) 0;
}

.skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-1);
}

.tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--tag-text);
  background: var(--tag-bg);
  padding: 2px 8px;
  border-radius: 3px;
  border: 1px solid var(--tag-border);
  white-space: nowrap;
}
```

### Education

Compact. Degree, institution, year. Optional GPA or honors.

```html
<article class="education">
  <h3 class="education__degree">BSc Computer Science</h3>
  <div class="education__school">University Name</div>
  <div class="education__meta">2018 — Honors</div>
</article>
```

```css
.education__degree {
  font-size: 13px;
  font-weight: 600;
  margin: 0;
}

.education__school {
  font-size: 12px;
  color: var(--text-secondary);
}

.education__meta {
  font-size: 11px;
  color: var(--text-muted);
}
```

### Summary (optional)

A 2–3 sentence professional summary. Tailored to the target job. Sits at the top of the main column, below the header.

```html
<section class="summary">
  <h2 class="section-heading">Profile</h2>
  <p class="summary__text">...</p>
</section>
```

```css
.summary__text {
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}
```

**Content rules**
- Max 3 sentences / 50 words
- Mention: years of experience, core tech, 1–2 differentiators
- Tailor to the job description — mirror their language

---

## Section Order

**Sidebar** (top to bottom):
1. Contact (with icons)
2. Skills
3. Education
4. Languages (if relevant)

**Main column** (top to bottom):
1. Header (name + title)
2. Summary
3. Experience (reverse chronological)
4. Projects (optional — only if the job values side projects)

---

## Content Tailoring Rules

When generating a CV for a specific job description:

1. **Title** — Match the job title from the posting
2. **Summary** — Mirror 2–3 keywords from the job description
3. **Experience bullets** — Prioritize achievements that match required skills. Lead with the most relevant bullet.
4. **Skills** — List skills mentioned in the job description first. Omit irrelevant skills to reduce noise.
5. **Section order** — If the job emphasizes projects over employment history, promote the Projects section.
6. **Bullet count** — Most recent role: 4–6 bullets. Previous roles: 2–4. Oldest/internship: 1–2.

---

## Anti-Patterns

**Never use:**
- Skill progress bars or percentage indicators (dishonest and meaningless)
- Profile photos (bias risk, ATS issues, wastes space)
- Multiple accent colors (one hue, multiple tints only)
- Justified text (creates uneven spacing)
- Tables for layout (breaks ATS parsing)
- Decorative shadows or gradients
- "References available upon request" (implicit, wastes a line)
- Objective statements (use Summary instead)
- Hobbies/interests (unless directly relevant to the role)
- External icon libraries (Font Awesome, etc.) — use inline SVGs only

**Content anti-patterns:**
- Listing every technology ever touched — curate for the role
- Passive voice ("Was responsible for...") — use active verbs
- Job descriptions instead of achievements — show impact, not duties
- Walls of text — if a bullet needs 3 lines, split or rewrite

---

## Print & PDF Checklist

Before exporting:
- [ ] Fits within 1–2 pages (ideally 1 for < 5 years experience)
- [ ] No content cut off at page breaks
- [ ] All links are full URLs (no "click here")
- [ ] Name and title visible without scrolling
- [ ] Consistent spacing — no orphaned headings at page bottom
- [ ] Font loads correctly (fallback is acceptable)
- [ ] No browser UI elements in print output
- [ ] Background graphics enabled for sidebar and accent elements
- [ ] Icons render correctly in print (inline SVG, not font icons)
