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
- [Node.js](https://nodejs.org/) (for automated PDF generation and validation)

### Setup

```bash
git clone https://github.com/KubaC701/cv-generator.git
cd cv-generator
npm install
```

Open Claude Code and say **"Help me set up my data"** — the agent will walk you through creating your profile interactively. Check `data-example/` for the expected file format.

### Generate a CV

Paste a job description (or provide a company + role) and say:

> "Generate a CV for this role"

The agent will analyze the job, select relevant experience, and produce a self-contained HTML file in `output/`. It automatically validates the page fit and generates a print-ready PDF — no manual browser printing needed.

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
scripts/
  generate-pdf.mjs     # Puppeteer-based validation & PDF generation
  photo-to-base64.mjs  # Convert a photo to base64 data URI
style-guide.md         # Visual & structural rules for generation
content-guide.md       # Content rules (bullets, tailoring, quantification)
CLAUDE.md              # Agent workflow instructions
```

## Output

Each generated CV is a single `.html` file — no external CSS, no JavaScript, no images. Just HTML + inline CSS + inline SVG icons + one Google Fonts import.

PDF generation is automated via Puppeteer. The agent runs `npm run validate` to check page fit and `npm run pdf` to produce a print-ready PDF with correct margins and background graphics — no manual browser configuration required.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run validate <file>` | Check if HTML content fits on a single A4 page |
| `npm run pdf <file>` | Validate + generate a print-ready PDF |
| `npm run photo <path>` | Convert an image to a base64 data URI for embedding |

## License

MIT
