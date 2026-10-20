# Publishable Frontend Architecture Trainer — Design

Date: 2026-10-20  
Source of wording: `Архитектура фронтенда подготовка к Senior-собеседованию.md`

## Problem

The app is already a working bilingual trainer (pipeline, RADIO, topic rooms, prep). It is not yet a product other people can pick up: no README/license/deploy, no study path, rooms compress the textbook into theses, and there is no way to judge or take an answer away.

## Product

A **reasoning trainer**, not a React encyclopedia. Success: a stranger can follow a 7-day path, rehearse out loud, and leave with a markdown pack (project story + architecture script + RADIO notes). Positioning on the first screen: React + TypeScript + TanStack Query + Zustand + Next/Vite; this is a sample of thought, not the only correct architecture.

## Out of scope (explicit)

- LLM / paid APIs
- Auth, accounts, cloud sync
- Vue / Angular / mobile native tracks
- More than four architecture profiles (`csr_spa`, `ssg_isr`, `ssr_app`, `mfe`)
- Twenty constructor profiles; keep constraint notes + diagram extras instead

## Modes (keep)

| Mode | Job |
| --- | --- |
| Pipeline | Constructor: 12 context questions → 2–3 options → choice → cost → evolution → spoken script |
| RADIO | 45-min system design drill + timer + local voice |
| Rooms | Textbook by topic, with full answer cards |
| Prep | Personal story, tricks, flags, questions to them, checklist |
| Guide (new) | 7-day path that deep-links into the four modes |

## Functional scope

### Wave A — Publishable shell

- MIT license for code; content attributed to Artem Prokopenko; disclaimer on start
- README: what it is, stack opinion, 7-day how-to, local run, deploy
- Static deploy (GitHub Pages or Vercel), `base` compatible with a subpath if needed
- First-run guide blurb + link to Guide mode

### Wave B — Textbook in the app

- Topic rooms: `checks` (what they look for), `structure` (answer beats), `sample` (RU/EN paragraph from the markdown), existing rows/follow-ups/red flags stay
- Optional nested `cards[]` for related questions inside a topic (public API, hydration, BFF, …)
- Client search over prompts, samples, RADIO titles, trick questions
- Pipeline start: 7-day pointer; options step already shows constructor notes (done)

### Wave C — Feedback without LLM

- Rubric on pipeline rehearse and RADIO last step: five yes/no items matching senior signals (context before libraries, 2–3 options, trade-off, evolution, numbers/ownership)
- Export: one markdown blob (story + recommended script + notes + rubric) downloadable in the browser
- Share constructor: serialize completed `SessionContext` + selected profile into the URL (`ctx` query param)

### Wave D — Coverage and fitness for strangers

- RADIO spotlight cases already listed in the markdown table become first-class cases or stay as spotlight cards that open a requirements checklist (collaborative editor, shop, file upload, video, kanban, calendar, data table)
- Two extra timed drills are enough for v1 beyond the existing four (feed, autocomplete, chat, dashboard); the rest stay spotlight
- Mobile: single column, diagram below or behind a toggle; stepper must not overflow
- Trainer a11y: named groups, focus on step change, diagram nodes keyboard-reachable

## Data rules

- All user-facing strings: `Localized` `{ ru, en }`
- Canon copy comes from the markdown; do not invent a second doctrine
- Prep + rubric checks persist in `localStorage` under existing `fe-arch-trainer-prep` (extend payload, version the JSON)
- Constructor context is URL-shareable; do not put story text in the URL

## Architecture

Keep Vite + React + Zustand + xyflow + Vitest. New pure modules:

- `src/content/guide.ts` — 7-day curriculum
- `src/content/rubric.ts` — rubric items
- `src/engine/search.ts` — index + filter
- `src/engine/exportMarkdown.ts` — markdown builder
- `src/engine/contextUrl.ts` — encode/decode context

UI stays in `src/features/*`. No new backend.

## Success criteria

- Cold visitor understands what to do in one screen
- `npm run build` and `npm test` pass
- A completed pipeline session is restorable from a copied URL
- Search finds “hydration” and “ADR” in the current locale
- Export file opens as readable markdown in any editor
- License and README exist; app is deployable as static files
