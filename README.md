# CV Generator

An agent-driven CV generator powered by Claude Code. It guides you through every step — from raw career data to a polished, job-tailored HTML/PDF resume.

## How It Works

1. **Onboard** — The agent interviews you about your experience, education, and personal info, then saves structured Markdown files in `data/`.
2. **Generate** — Paste a job description, and the agent produces a tailored, single-file HTML resume optimized for that role.
3. **Iterate** — Review in the browser, request changes conversationally, and export to PDF when satisfied.

The agent tailors aggressively — it selects, reorders, and rewrites your experience to match each job description rather than dumping everything onto the page.

## Getting Started

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed and authenticated

### Setup

```bash
git clone https://github.com/KubaC701/cv-generator.git
cd cv-generator
```

Open Claude Code and say **"Help me set up my data"** — the agent will walk you through creating your profile interactively. Check `data-example/` for the expected file format.

### Generate a CV

Paste a job description (or provide a company + role) and say:

> "Generate a CV for this role"

The agent will analyze the job, select relevant experience, and produce a self-contained HTML file in `output/`. Open it in a browser, review, request changes, and print to PDF when ready.

## Project Structure

```
data/                  # Your personal data (gitignored)
  personal_info.md     # Name, contact details, links
  education.md         # Degrees, institutions, dates
  values.md            # (optional) Professional values
  experience/
    <company>.md       # One file per role
data-example/          # Reference format examples
output/                # Generated CVs (gitignored)
style-guide.md         # Visual + structural rules for generation
CLAUDE.md              # Agent workflow instructions
```

## Output

Each generated CV is a single `.html` file — no external CSS, no JavaScript, no images. Just HTML + inline CSS + inline SVG icons + one Google Fonts import. Export to PDF via `Cmd/Ctrl+P` → Save as PDF (enable background graphics).

## License

MIT
