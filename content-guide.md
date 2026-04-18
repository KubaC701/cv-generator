# CV Generator — Content Guide

## Purpose

This guide defines **what goes on the CV and how to write it**. It applies at two stages: during **onboarding** (when interviewing the user about their career) and during **generation** (when turning raw data into polished CV content).

The visual side — layout, colors, typography, print rules — lives in `style-guide.md`. This file is purely about content quality.

---

## The Bullet Formula

Every bullet follows: **Action → What → Impact.**

> **[Strong verb]** + [what you did, with enough context] + [measurable result or outcome]

| Weak | Strong |
|------|--------|
| Was responsible for database management | Migrated 12 PostgreSQL databases to Aurora, cutting query latency by 40% |
| Helped improve the onboarding process | Redesigned onboarding flow, reducing new-user drop-off from 60% to 23% |
| Worked on frontend features | Built real-time collaborative editor used by 15k daily active users |
| Managed a team of developers | Led 8-person team shipping a payments platform processing $2M/month |

**The "so what?" test.** After writing each bullet, ask: *so what?* If the answer isn't in the bullet, it needs a result clause. "Built a dashboard" → so what? → "Built a dashboard that cut manual reporting by 6 hours/week."

---

## Quantifying Impact

Not everything has a clean percentage. When hard metrics aren't available, use proxies:

- **Scale**: users, requests/sec, records, team size, budget managed
- **Time**: hours saved per week, delivery speed, response time reduction
- **Comparison**: "3× faster than previous system", "first in company to..."
- **Scope**: markets, countries, product lines, departments affected

If you truly have no numbers, emphasize the *nature* of the change: "Eliminated a recurring production incident" beats "Fixed bugs." Show the change, not the task.

**During onboarding**, when the user can't provide metrics, prompt specifically: *"Do you have numbers for that — Lighthouse scores, load times, dollar amounts, team size?"*

---

## Bullet Writing Rules

- 3–6 bullets per role. Fewer for older/shorter roles. Most recent role gets the most.
- Start with a strong verb: Led, Built, Designed, Migrated, Reduced, Shipped, Automated.
- Max ~120 characters per bullet. If it wraps beyond 2 lines at body font size, split or rewrite.
- **Past tense** for completed roles. **Present simple** for current role ("Build", not "Building").
- No first-person pronouns (I, me, my). Drop the subject entirely.
- **One achievement per bullet.** Don't chain unrelated things with "and."
- Active voice only. Never "Was responsible for..." — say what you did.

---

## Tailoring to the Job

Tailoring is the single highest-impact thing you can do. A CV is a pitch for a specific role, not a career biography.

1. **Extract keywords** from the job description — required skills, responsibilities, valued traits. Note the *order* they appear in (earlier = higher priority to the employer).
2. **Mirror their language.** If the job says "distributed systems at scale," use that exact phrase — not "big backend systems." ATS and recruiters both scan for keyword matches.
3. **Reorder bullets within each role** to lead with the most relevant achievement. Don't always default to chronological within a role.
4. **Front-load skills** for the job. If they want Python and you list 8 languages, Python comes first.
5. **Trim aggressively.** An impressive bullet that's irrelevant to this job competes for space with bullets that match. Cut it.
6. **Surface hidden matches.** The user may not realize their work is relevant. If the job wants "event-driven architecture" and the data mentions Kafka in passing, feature it prominently.

---

## Summary

- 2–3 sentences, max ~50 words.
- Structure: [Years of experience] + [core domain] + [1–2 differentiators] + [what you bring to this role].
- Tailored to the target job — mirror their language and priorities.
- Avoid generic filler: "passionate professional seeking challenging opportunities" says nothing. Be specific about *what* you do and *what separates you.*

---

## Skills

- Grouped by category (Languages, Frameworks, Tools, etc.)
- Ordered by relevance to the target job — most relevant first.
- Curated — omit skills irrelevant to the role. Listing everything dilutes impact.
- Displayed as compact tags or inline lists.
- Only include skills you could speak to confidently in an interview.

---

## Education

- Reverse chronological. Degree, institution, graduation year.
- Include grades or honors only if strong or if the job explicitly asks. Omit mediocre grades — silence is neutral, a weak number is negative.
- Relevant coursework, thesis, or honors — only when they directly support the target role.
- For experienced professionals (5+ years), education is a footnote: 1–2 lines. Let experience do the talking.

---

## Section Order

Decide based on what's strongest for this candidate and role:
- **Experience-first** (default): Name → Title → Summary → Experience → Skills → Education
- **Skills-first**: When the role is highly technical and skills are the primary filter
- **Projects-first**: When side projects or portfolio pieces are more impressive than employment history

Contact info placement depends on the layout — sidebar, header row, or footer.

---

## Things to Omit

- Age, date of birth, marital status, religion, nationality (unless visa-relevant)
- "References available upon request" (assumed; wastes a line)
- Hobbies/interests (unless directly relevant — e.g., open-source contributions for a dev role)
- Every job you've ever had — keep what's relevant or shows transferable skills
- Objective statements — the summary replaces this

**Include non-paid work.** Volunteer roles, open-source contributions, class projects, and hackathons count as experience if they demonstrate relevant skills. What matters is what you did, not whether you were paid for it.
- Photos on US-targeted CVs (standard in Europe, avoid in the US unless the user requests it)

---

## Content Anti-Patterns

- **Duties instead of achievements** — "Responsible for managing deployments" describes the job; "Automated deployments, reducing release time from 2 hours to 8 minutes" describes *you*
- **Missing the result clause** — every bullet needs a "so what?" ending. Impact is what separates a strong CV from a list of tasks
- **Listing every technology ever touched** — curate for the role. A shorter, targeted list signals judgment
- **Untailored content** — a CV sent identically to 20 jobs will underperform a version tailored to each. At minimum, reorder bullets and skills per job
- **Filler words and generic claims** — "excellent communicator", "team player", "passionate" — these are noise. Show, don't tell: the achievements *demonstrate* the traits
- **Inconsistent tense** — past tense for completed roles, present simple for current. Mixing tenses looks careless
- **Walls of text** — if a bullet wraps beyond 2 lines, split or rewrite. Recruiters skip dense blocks
