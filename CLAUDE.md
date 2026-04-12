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
  extras/                       # Anything beyond experience & education (see below)
    <item-slug>.md              # Each file self-describes its type
  <custom-folder>/              # Users can create their own folders if they have many items
    <item-slug>.md              #   e.g., projects/, certifications/, speaking/
data-example/                   # Reference examples showing the expected file format
  personal_info.md
  education.md
  experience/
    acme-corp.md
  extras/
    side-project.md             # Type: Project
    tech-meetup.md              # Type: Speaking
    aws-cert.md                 # Type: Certification
    volunteer-mentoring.md      # Type: Volunteer
output/                         # Generated CVs (gitignored)
  cv-<target>-<date>.html
  cv-<target>-<date>.pdf
scripts/
  generate-pdf.mjs              # Puppeteer-based validation & PDF generation
package.json                    # npm scripts: pdf, validate
style-guide.md                  # Visual & technical rules (layout, typography, colors, print)
content-guide.md                # Content rules (bullets, tailoring, quantification, anti-patterns)
CLAUDE.md                       # This file — agent workflow guide
```

New users: look at `data-example/` to see the expected file format, then run the onboarding workflow below to create your own `data/` files interactively.

## Workflow Overview

There are two main workflows:
- **Onboarding** (new user, no data yet) — always asks if the user has a target job first; if yes, the entire onboarding is steered by that job (preferred path); if not, falls back to generic profile creation
- **Generation** (data exists, user wants a CV for a specific job)

---

## Workflow 1: Onboarding a New User

When `data/` is empty or missing files, the agent walks the user through creating their profile. This is interactive and conversational — do not dump a form.

### Step 0 — Analyze Target Job (preferred path)

Analyzing a target job before onboarding produces better data with less effort. **Always start here.**

**When to trigger:** Always — this is the default first step. If the user provides a job description upfront, use it. If they don't, ask:

> "Before we start building your profile — do you already have a specific job offer or description you're targeting? If so, share it and I'll tailor my questions to what matters most for that role. If not, no problem — we'll do a general setup."

If the user has no job in mind, acknowledge it and proceed with generic onboarding (Step 1). Don't push — it's a quick yes/no.

**What to do:**
1. Read the job description and extract the same analysis as Workflow 2, Step 1:
   - Target title, required/preferred skills, key responsibilities, company context, keywords
2. Save this analysis internally (do not create an output file yet — there's no data to generate from).
3. Tell the user you've analyzed the job and briefly summarize what the role emphasizes (e.g., "This role focuses heavily on distributed systems and Go — I'll make sure to dig into those areas when we talk about your experience.").

**How this shapes subsequent steps:**
- **Personal Info** — no change (always the same questions).
- **Experience** — this is where the biggest impact is. See Step 2 below for details.
- **Education** — if the job requires specific credentials or coursework, ask about those specifically.

**Important:** The goal is to focus the conversation, not to limit the data. Still capture the user's full career — but spend more interview time on the roles, skills, and achievements that match the target job. The data files should be comprehensive enough to reuse for other jobs later.

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
2. For each role, conduct a brief interview — ask about achievements, technologies, team size, and impact. Focus on *what changed* because of the user's work, not what their job description said.
3. Push for specifics and numbers: "You mentioned improving performance — do you have metrics? Lighthouse scores, load times, dollar amounts, team size?" See `content-guide.md` → **Quantifying Impact** for the full list of metric proxies (scale, time, comparison, scope) when hard numbers aren't available.
4. Apply the **"so what?" test** from `content-guide.md` to each achievement the user describes. If their answer sounds like a duty ("I managed deployments"), dig for the result ("What improved because of how you managed them?").
5. Write the file only when you have enough detail to generate strong CV bullets later — meaning each key achievement has a clear action, context, and impact.

**If a target job was analyzed in Step 0**, adapt the interview:
- **Prioritize relevant roles.** If the user lists 5 past positions and 2 clearly align with the target job, interview those first and in more depth. Still cover the others, but don't spend 10 questions on an unrelated internship.
- **Ask job-specific follow-ups.** If the job requires "experience leading cross-functional teams," ask about leadership and collaboration for each relevant role. If it wants "CI/CD pipeline experience," probe for that specifically.
- **Surface hidden matches.** The user might not realize their work is relevant. If the job wants "event-driven architecture" and the user mentions Kafka in passing, dig in: "You mentioned Kafka — can you tell me more about that system? What scale was it running at?"
- **Don't over-filter.** Capture all roles and achievements — the data files are the user's career base, not a single-job snapshot. But allocate interview effort proportionally to relevance.

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

### Step 4 — Extras (optional but encouraged)

This is where everything beyond work experience and education lives. The `extras/` folder (or custom folders — whatever the user prefers) can hold anything that strengthens a CV. **Actively encourage users to share more** — people often undervalue things that can make a real difference on a CV.

**Examples of what belongs here:**
- **Projects** — hackathons, side projects, open source contributions, university projects
- **Speaking** — conference talks, meetup presentations, podcast appearances
- **Certifications** — AWS, Google Cloud, Scrum Master, language proficiency certificates
- **Volunteering** — mentoring, community organizing, NGO work, coaching
- **Publications** — blog posts, research papers, technical articles
- **Awards & competitions** — hackathon prizes, academic honors, industry recognition
- **Teaching** — workshops led, courses created, university tutoring

**How to gather:** After covering experience, ask an open question:

> "Beyond your jobs, is there anything else that shows who you are professionally? Side projects, talks, certifications, volunteering, competitions, publications — anything you're proud of or that's relevant to the roles you target?"

If a target job was analyzed in Step 0, prompt for specifics: "The role mentions [X] — do you have any projects, certifications, or other work that demonstrates that?"

**File organization:**
- Few items (1-3) → put them in `data/extras/`
- Many items in one category (3+) → give it its own folder (e.g., `data/projects/`, `data/certifications/`)
- The agent reads everything in `data/` recursively, so folder names don't matter — file content does

**File format:** Each file self-describes its type. The structure adapts to the content:

```markdown
# Item Name

**Type:** Project | Speaking | Certification | Volunteer | Publication | Award | Teaching
**Date:** Month Year (or "Active" / "Expires Month Year" for certifications)

## Overview

What it is, why it matters.

## Key Details

- Relevant highlights, outcomes, or skills demonstrated.
- Adapt these sections to what makes sense for the type.
```

See `data-example/extras/` for concrete examples of different types.

### Step 5 — Values (optional)

If the user wants to share their professional values or working style, create `data/values.md`. This helps the agent tailor the summary and tone of the CV. Don't push for this — it's only if the user brings it up.

### Onboarding complete

Once the data files exist, confirm with the user and explain they can now generate CVs by providing a job description.

**If a target job was analyzed in Step 0:** Transition directly into Workflow 2 (Generation) — don't make the user paste the job description again. You already have the analysis. Say something like: "Your profile is set up. Since you already shared the [Company/Role] job description, want me to generate the CV now?"

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

### Step 2 — Design direction

Have a brief conversation about visual style. Don't offer a menu of presets — ask open-ended questions:

> "What kind of vibe should the CV have? Think about the role and company — is it a creative studio, a corporate bank, a startup? Any colors, fonts, or styles you're drawn to? Want a photo included?"

Use their answers (and the industry context from Step 1) to craft a unique design. See `style-guide.md` for layout archetypes, typography guidance, and design principles — but don't default to a template. Each CV should feel intentionally designed for this person and role.

### Step 3 — Read user data

Read all `.md` files in `data/` recursively. The required files are:
- `personal_info.md`
- `education.md`
- All files in `experience/`

Everything else is optional — `values.md`, `extras/`, and any user-created folders (e.g., `projects/`, `certifications/`). Read whatever exists.

### Step 4 — Curate content

Follow `content-guide.md` for all content decisions. Based on the job analysis and user data:
1. Pick the most relevant achievements for each role
2. Rewrite bullets using the **Action → What → Impact** formula; apply the "so what?" test to each
3. Order skills to match the job's priorities (front-load keywords from the job description)
4. Draft a tailored 2–3 sentence summary
5. Decide section order (experience-first vs. projects-first)
6. **Extras** — include projects, certifications, speaking, volunteering, publications, or any other data from the user's extras when they strengthen the application. Projects are especially valuable for emerging tech (AI, ML) or when job titles undersell capabilities. Certifications signal validated expertise. Speaking signals thought leadership. Volunteering signals leadership and values. Pick what's relevant to the target role — don't include everything.

### Step 5 — Generate HTML

Produce a single self-contained `.html` file. Follow all hard constraints and design principles from `style-guide.md`. Key reminders:
- **Single A4 page by default** — content must fit the `.cv` container. Err on fewer bullets; the validation step will confirm fit.
- **Unique design** — don't reuse the same layout, font, or color scheme across different CVs. Each design should reflect the user's industry, personality, and the role they're targeting.

Save to: `output/cv-<target>-<YYYY-MM-DD>.html`

Where `<target>` is a short slug derived from the company or role (e.g., `google`, `senior-fe`, `healthcare-ai`).

### Step 6 — Validate page fit

After generating the HTML, **always** run the validation script:

```bash
npm run validate output/cv-<target>-<date>.html
```

Follow the **Generate → Validate → Adjust** loop described in `style-guide.md` → Page Fit. Target: 3–15mm of remaining vertical space. The script exits with code 1 on overflow — content must fit before proceeding.

### Step 7 — Review loop

Tell the user the file is ready and suggest they open it in a browser. Apply any requested changes to the same file, then re-validate after each change. Common requests:
- Adjust bullet emphasis or wording
- Add/remove a role or project
- Change the style or colors
- Fix spacing or page fit issues

When the user is satisfied, generate the final PDF:

```bash
npm run pdf output/cv-<target>-<date>.html
```

This runs validation and (if content fits) produces a print-ready PDF alongside the HTML file.

---

## Rules for the Agent

1. **Never fabricate data.** Every claim on the CV must come from the user's data files. If data is insufficient, ask the user — don't invent metrics or responsibilities.
2. **Tailor aggressively.** A good CV is not a dump of everything. Cut ruthlessly to fit a single A4 page (default). The job description decides what stays. Two pages only when explicitly requested or clearly justified for 10+ year careers — and even then, content must be deliberately allocated across pages (see style-guide.md → Two-Page CVs).
3. **Respect the guides.** Follow `style-guide.md` for visual/technical constraints and `content-guide.md` for content quality. Improvise layout, typography, and color within those guardrails — each CV should be a unique design.
4. **One file = one output.** The HTML file is self-contained. No external CSS, no JS, no external images. Just HTML + inline CSS + inline SVGs + one Google Fonts link. Photos are embedded as base64 data URIs.
5. **Ask, don't assume.** When data is ambiguous or missing, ask the user. When visual preferences are unclear, offer choices.
6. **Keep data files updated.** If the user shares new information during generation (e.g., "actually I got promoted to senior"), update the relevant data file too — not just the CV output.

---

## Quick Reference: Common Commands

| User says                        | Agent does                                           |
|----------------------------------|------------------------------------------------------|
| "Generate a CV for [job link/description]" | Run Workflow 2                              |
| "Help me set up my data"         | Run Workflow 1 (ask about target job first)           |
| "I want to apply to [job] — help me get started" | Run Workflow 1 with Step 0 → then Workflow 2 |
| "Add my experience at [company]" | Interview about that role → create experience file   |
| "Change the style to something warmer" | Redesign with warmer colors/fonts in the generated HTML |
| "Make it fit one page"           | Reduce bullets, tighten content, regenerate          |
| "Add my hackathon project"           | Interview about the project → create extras file  |
| "I gave a talk at [event]"           | Create extras file (Type: Speaking)               |
| "I have an AWS certification"        | Create extras file (Type: Certification)          |
| "I volunteer at [org]"              | Create extras file (Type: Volunteer)              |
| "Update my data — I got a new role" | Update relevant data file                         |
