# CV Generator

An agent-driven CV generator. The agent guides the user through every step — from raw career data to a polished, job-tailored HTML/PDF resume.

## Project Structure

```
data/                           # User's personal data (gitignored — each user creates their own)
  personal_info.md              # Name, email, phone, location, links
  education.md                  # Degrees, institutions, dates, honors
  values.md                     # (optional) Personal/professional values
  experience/
    <company-slug>.md           # One file per employer/role
data-example/                   # Reference examples showing the expected file format
  personal_info.md
  education.md
  experience/
    acme-corp.md
output/                         # Generated CVs (gitignored)
  cv-<target>-<date>.html
style-guide.md                  # Structural + visual rules for CV generation
CLAUDE.md                       # This file — agent workflow guide
```

New users: look at `data-example/` to see the expected file format, then run the onboarding workflow below to create your own `data/` files interactively.

## Workflow Overview

There are two main workflows: **onboarding** (new user, no data yet) and **generation** (data exists, user wants a CV for a specific job).

---

## Workflow 1: Onboarding a New User

When `data/` is empty or missing files, the agent walks the user through creating their profile. This is interactive and conversational — do not dump a form.

### Step 1 — Personal Info

Ask for and create `data/personal_info.md`:

```markdown
# Personal Details

- **Name:** Full Name
- **Email:** email@example.com
- **Phone:** +1234567890
- **Location:** City, Country
- **LinkedIn:** [Profile](https://linkedin.com/in/handle)
- **GitHub:** [Profile](https://github.com/handle)
- **Website:** https://example.com
```

Only include fields the user provides. Don't push for optional ones.

### Step 2 — Experience

This is the most important and time-intensive step. For each role, create a file in `data/experience/<company-slug>.md`.

**How to gather data:**
1. Ask the user for their work history (company names, roles, dates).
2. For each role, conduct a brief interview — ask about responsibilities, achievements, technologies, team size, and impact.
3. Push for specifics and numbers: "You mentioned improving performance — do you have metrics? Lighthouse scores, load times, conversion rates?"
4. Write the file only when you have enough detail to generate strong CV bullets later.

**File format:**

```markdown
# Company Name

**Role:** Job Title
**Dates:** Month Year - Month Year (or "present")

## Overview

2-3 sentences about what the company does and the user's general responsibilities.

## Key Achievements

- Achievement with quantifiable impact where possible.
- Another achievement.

## Skills & Technologies

- **Languages:** TypeScript, Python
- **Frameworks:** React, Next.js

## Projects

### Project Name
- **Goal:** What problem it solved
- **Role:** What the user specifically did
- **Outcome:** Measurable result
```

The sections above are guidelines, not rigid requirements. Adapt to what the user provides. A freelancer might have many short projects. A long-tenured engineer might have deep detail on 2-3 key initiatives.

### Step 3 — Education

Create `data/education.md`. Keep it brief — education matters less with experience.

```markdown
# Education

## Institution Name
**Degree** (Year — Year)

Details if notable (honors, thesis, relevant coursework).
```

### Step 4 — Values (optional)

If the user wants to share their professional values or working style, create `data/values.md`. This helps the agent tailor the summary and tone of the CV. Don't push for this unless the user brings it up.

### Onboarding complete

Once the data files exist, confirm with the user and explain they can now generate CVs by providing a job description.

---

## Workflow 2: Generating a CV

When the user provides a job description (or a company + role name), the agent generates a tailored CV.

### Step 1 — Analyze the job

Read the job description and extract:
- Target title
- Required skills and preferred skills
- Key responsibilities
- Company context and industry
- Any specific keywords that should appear on the CV

### Step 2 — Select a theme

If the user hasn't stated a visual preference, ask briefly:

> "Any preference for the visual style? Modern and colorful, classic and professional, or minimal and clean?"

If they don't care, default to **Minimal Slate** — it's safe for any industry.

See `style-guide.md` → Theme System for available themes and how to create custom ones.

### Step 3 — Read user data

Read all files in `data/`:
- `personal_info.md`
- `education.md`
- `values.md` (if it exists)
- All files in `data/experience/`

### Step 4 — Curate content

Based on the job analysis and user data:
1. Pick the most relevant achievements for each role
2. Rewrite bullets to emphasize skills from the job description
3. Order skills to match the job's priorities
4. Draft a tailored 2-3 sentence summary
5. Decide section order (experience-first vs. projects-first)

### Step 5 — Generate HTML

Produce a single `.html` file following `style-guide.md` exactly:
- All CSS in a single `<style>` block using the chosen theme's variables
- Semantic HTML with the documented class names
- Inline SVG icons (no external dependencies)
- Google Fonts import for the theme's font

Save to: `output/cv-<target>-<YYYY-MM-DD>.html`

Where `<target>` is a short slug derived from the company or role (e.g., `google`, `senior-fe`, `healthcare-ai`).

### Step 6 — Review loop

Tell the user the file is ready and suggest they open it in a browser. Apply any requested changes to the same file. Common requests:
- Adjust bullet emphasis or wording
- Add/remove a role or project
- Change the theme or colors
- Fix page break issues

When the user is satisfied, they export to PDF via browser print (Cmd/Ctrl+P → Save as PDF, with background graphics enabled).

---

## Rules for the Agent

1. **Never fabricate data.** Every claim on the CV must come from the user's data files. If data is insufficient, ask the user — don't invent metrics or responsibilities.
2. **Tailor aggressively.** A good CV is not a dump of everything. Cut ruthlessly to fit 1-2 pages. The job description decides what stays.
3. **Respect the style guide.** Follow `style-guide.md` for all structural and visual decisions. Don't improvise layout or spacing.
4. **One file = one output.** The HTML file is self-contained. No external CSS, no JS, no images. Just HTML + inline CSS + inline SVGs + one Google Fonts link.
5. **Ask, don't assume.** When data is ambiguous or missing, ask the user. When visual preferences are unclear, offer choices.
6. **Keep data files updated.** If the user shares new information during generation (e.g., "actually I got promoted to senior"), update the relevant data file too — not just the CV output.

---

## Quick Reference: Common Commands

| User says                        | Agent does                                           |
|----------------------------------|------------------------------------------------------|
| "Generate a CV for [job link/description]" | Run Workflow 2                              |
| "Help me set up my data"         | Run Workflow 1                                       |
| "Add my experience at [company]" | Interview about that role → create experience file   |
| "Change the theme to something warmer" | Update theme variables in the generated HTML    |
| "Make it fit one page"           | Reduce bullets, tighten content, regenerate          |
| "Update my data — I got a new role" | Update relevant data file                         |
