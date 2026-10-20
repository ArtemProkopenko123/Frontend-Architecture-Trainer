# Publishable Trainer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing bilingual trainer into a publishable textbook-trainer: study path, full answer cards, search, rubric, export, shareable constructor URL, license and static deploy — without LLM, auth, or extra architecture profiles.

**Architecture:** Keep Vite + React 19 + Zustand + xyflow. Canon wording lives in `Архитектура фронтенда подготовка к Senior-собеседованию.md`. New behaviour is pure engines under `src/engine/` plus content under `src/content/`. UI features consume those functions; the store only holds session flags and URL sync.

**Tech Stack:** Vite, React 19, TypeScript, Zustand, @xyflow/react, Vitest. Deploy as static files.

## Global Constraints

- No LLM, no paid APIs, no backend, no auth.
- Exactly four profiles: `csr_spa`, `ssg_isr`, `ssr_app`, `mfe`.
- All user-facing copy is `Localized` `{ ru: string; en: string }`.
- Do not invent doctrine; port from the markdown canon.
- Constructor completeness = `isSessionComplete()` over all `CONTEXT_QUESTIONS`.
- Tests: `npx vitest run` and `npx tsc --noEmit`. UI changes: exercise in the browser.
- Do not commit unless the user asks; plan steps that say Commit are optional.

## File map

| File | Responsibility |
| --- | --- |
| `src/content/types.ts` | Shared types: `GuideDay`, `AnswerCard`, `Topic` extras, `RubricItem` |
| `src/content/guide.ts` | 7-day curriculum + deep links |
| `src/content/rubric.ts` | Five senior-signal checklist items |
| `src/content/topics.ts` | Add `checks`, `structure`, `sample`, `cards` per topic |
| `src/engine/search.ts` | Build searchable records, filter by query + locale |
| `src/engine/exportMarkdown.ts` | Build one markdown document from session |
| `src/engine/contextUrl.ts` | Compact encode/decode of `SessionContext` |
| `src/store/sessionStore.ts` | `mode: 'guide'`, rubric map, `ctx` URL param |
| `src/features/guide/GuidePanel.tsx` | 7-day list |
| `src/features/topics/TopicsPanel.tsx` | Answer cards + search hit navigation |
| `src/features/shell/AppShell.tsx` | Guide tab, search field |
| `src/features/wizard/Wizard.tsx` | Rubric on rehearse, export, copy link |
| `src/features/radio/RadioWizard.tsx` | Rubric on last step, extra spotlight |
| `README.md`, `LICENSE` | Publish shell |
| `index.html` / `vite.config.ts` | Title, base path if GitHub Pages |

---

### Task 1: Guide curriculum (content + mode)

**Files:**
- Create: `src/content/guide.ts`
- Create: `src/content/guide.test.ts`
- Modify: `src/content/types.ts` (`AppMode` add `'guide'`)
- Modify: `src/store/sessionStore.ts` (`MODES`, `syncUrl` `mode=guide`)
- Modify: `src/i18n/ui.ts` (`modes.guide`, `guideSubtitle`)
- Create: `src/features/guide/GuidePanel.tsx`
- Modify: `src/features/shell/AppShell.tsx` (tab + panel; hide diagram empty state or show canon pipeline diagram)

**Interfaces:**
- Produces:

```ts
export type GuideDayId = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7'

export type GuideLink = {
  mode: AppMode
  step?: SessionStep
  topicId?: TopicId
  radioCaseId?: RadioCaseId
  prepSection?: PrepSection
}

export type GuideDay = {
  id: GuideDayId
  day: number
  title: Localized
  doneWhen: Localized
  link: GuideLink
}

export const GUIDE_DAYS: GuideDay[]
export function hrefForGuideLink(link: GuideLink): string
```

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { GUIDE_DAYS, hrefForGuideLink } from './guide'

describe('guide', () => {
  it('has seven consecutive days with bilingual copy and a deep link', () => {
    expect(GUIDE_DAYS.map((d) => d.day)).toEqual([1, 2, 3, 4, 5, 6, 7])
    for (const day of GUIDE_DAYS) {
      expect(day.title.ru.length).toBeGreaterThan(0)
      expect(day.title.en.length).toBeGreaterThan(0)
      expect(day.doneWhen.ru.length).toBeGreaterThan(0)
      expect(hrefForGuideLink(day.link)).toMatch(/^\?mode=/)
    }
  })

  it('points day 1 at pipeline start and day 3 at a topic room', () => {
    expect(hrefForGuideLink(GUIDE_DAYS[0].link)).toBe('?mode=pipeline&step=start')
    expect(GUIDE_DAYS[2].link.mode).toBe('topics')
    expect(GUIDE_DAYS[2].link.topicId).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/content/guide.test.ts`  
Expected: FAIL — module not found

- [ ] **Step 3: Implement guide content and href helper**

Days (copy may be tightened, meaning must stay):

| Day | Title (ru) | Link |
| --- | --- | --- |
| 1 | Каркас ответа | pipeline / start |
| 2 | Конструктор: прогнать 2 контекста | pipeline / context |
| 3 | Комната: структура + состояние | topics / structure |
| 4 | Комната: рендеринг + API + perf | topics / rendering |
| 5 | RADIO: лента с таймером | radio / feed |
| 6 | Рассказ о своём проекте | prep / story |
| 7 | Полный прогон: пайплайн + RADIO | pipeline / start |

```ts
export function hrefForGuideLink(link: GuideLink): string {
  const params = new URLSearchParams()
  params.set('mode', link.mode)
  if (link.step) params.set('step', link.step)
  if (link.topicId) params.set('topic', link.topicId)
  if (link.radioCaseId) params.set('case', link.radioCaseId)
  if (link.prepSection) params.set('prep', link.prepSection)
  return `?${params.toString()}`
}
```

`GuidePanel`: list of 7 cards; primary button calls `setMode` + the matching setter (`setStep` / `setTopicId` / `setRadioCase` / `setPrepSection`) rather than a full page reload.

Add `'guide'` to `AppMode` and `MODES`. `syncUrl` for guide: `mode=guide`, delete other mode params.

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/content/guide.test.ts`  
Expected: PASS

- [ ] **Step 5: Browser**

Open `/?mode=guide`. Seven days visible. Click day 5 → RADIO feed. RU/EN toggle still works.

---

### Task 2: Topic answer cards (textbook in rooms)

**Files:**
- Modify: `src/content/types.ts` (`AnswerCard`, `Topic`)
- Modify: `src/content/topics.ts`
- Modify: `src/content/topics.test.ts`
- Modify: `src/features/topics/TopicsPanel.tsx`
- Modify: `src/i18n/ui.ts` (`topicChecks`, `topicStructure`, `topicSample`, `topicRelated`)

**Interfaces:**
- Produces:

```ts
export type AnswerCard = {
  id: string
  title: Localized
  checks: Localized
  structure: Localized[]
  sample: Localized
}

export type Topic = {
  id: TopicId
  title: Localized
  thesis: Localized
  checks: Localized
  structure: Localized[]
  sample: Localized
  rows: TopicRow[]
  followUps: Localized[]
  cards: AnswerCard[]
  redFlag?: Localized
  diagram?: DiagramSpec
}
```

Port `checks` / `structure` / `sample` from the matching markdown section. `sample` is the existing RU/EN blockquote, not a new invention.

Minimum cards per topic (ids stable — search and tests depend on them):

- `structure`: `public-api`, `cycles`, `logic-vs-ui`, `solid`
- `state`: `redux-vs-zustand`, `rerenders`, `query-keys`
- `rendering`: `hydration`, `streaming`, `rsc-vs-ssr`
- `api`: `rest-gql-bff`, `errors`, `optimistic`, `realtime-protocol`
- `scale`: `when-mfe`, `monorepo`, `design-system`
- `perf`: `bundle`, `list-10k`, `measure-first`
- `reliability`: `flaky-e2e`, `flags`, `ci`
- `security`: `xss`, `tokens`, `cors`
- `leadership`: `adr`, `tech-debt`, `migration`, `wrong-decision`

- [ ] **Step 1: Failing catalogue test**

```ts
it('every topic has checks, structure, sample and at least one related card', () => {
  for (const id of TOPIC_ORDER) {
    const topic = TOPICS[id]
    expect(topic.checks.ru.length).toBeGreaterThan(20)
    expect(topic.structure.length).toBeGreaterThan(2)
    expect(topic.sample.ru.length).toBeGreaterThan(40)
    expect(topic.sample.en.length).toBeGreaterThan(40)
    expect(topic.cards.length).toBeGreaterThan(0)
    for (const card of topic.cards) {
      expect(card.sample.ru.length).toBeGreaterThan(20)
      expect(card.sample.en.length).toBeGreaterThan(20)
    }
  }
})
```

- [ ] **Step 2: Run to see fail** (missing fields)

- [ ] **Step 3: Fill content from markdown; render in `TopicsPanel`**

Order on screen: title → thesis → **Что проверяют** → **Структура ответа** (ol) → **Образец** (blockquote `.script`) → existing rows → related cards (same three blocks) → follow-ups → red flag.

- [ ] **Step 4:** `npx vitest run src/content/topics.test.ts` PASS; browser: open structure room, switch EN, sample swaps language.

---

### Task 3: Search index

**Files:**
- Create: `src/engine/search.ts`
- Create: `src/engine/search.test.ts`
- Modify: `src/features/shell/AppShell.tsx` or new `src/features/search/SearchBox.tsx`
- Modify: `src/i18n/ui.ts` (`searchPlaceholder`, `searchEmpty`)
- Modify: `src/store/sessionStore.ts` if selecting a search hit needs `selectedCardId` — prefer navigating via existing setters + `location.hash = card.id` instead of new store fields.

**Interfaces:**
- Produces:

```ts
export type SearchHitKind = 'topic' | 'card' | 'radio' | 'trick' | 'guide'

export type SearchHit = {
  id: string
  kind: SearchHitKind
  title: Localized
  haystack: Localized
  href: string
}

export function buildSearchIndex(): SearchHit[]
export function filterSearchHits(hits: SearchHit[], query: string, locale: Locale): SearchHit[]
```

Haystack = title + sample/body concatenated. Filter: trim, case-insensitive, both locales always matched so a Russian user can type `hydration`. Empty query → `[]` (do not dump the whole catalogue).

- [ ] **Step 1: Test**

```ts
it('finds hydration from the rendering topic', () => {
  const hits = filterSearchHits(buildSearchIndex(), 'hydration', 'en')
  expect(hits.some((h) => h.id.includes('hydration') || h.href.includes('rendering'))).toBe(true)
})

it('returns nothing for empty or 1-char queries', () => {
  expect(filterSearchHits(buildSearchIndex(), ' ', 'ru')).toEqual([])
  expect(filterSearchHits(buildSearchIndex(), 'a', 'ru')).toEqual([])
})
```

- [ ] **Step 2–4:** implement, pass tests, add a search input in the topbar (desktop) / under subtitle (narrow). Clicking a hit sets mode/topic and scrolls to `#${card.id}`.

Min query length: 2.

---

### Task 4: Shareable constructor URL

**Files:**
- Create: `src/engine/contextUrl.ts`
- Create: `src/engine/contextUrl.test.ts`
- Modify: `src/store/sessionStore.ts` (`contextFromUrl`, write `ctx` when complete)
- Modify: `src/features/wizard/Wizard.tsx` (copy-link on options/rehearse)

**Interfaces:**
- Produces:

```ts
export function encodeContext(ctx: SessionContext, profileId?: ProfileId | null): string
export function decodeContext(raw: string): { context: Partial<SessionContext>; profileId: ProfileId | null }
```

Encoding: `URLSearchParams` with short keys to keep the URL small, e.g. `ts=11+&tc=4+&pr=admin&seo=none&…&p=csr_spa`, then `encodeURIComponent` as a single `ctx` query value **or** flatten those keys onto the main search params. Prefer **flat keys prefixed with `c.`** (`c.teamSize=1-3`) so the URL stays human-readable and `history.replaceState` can merge them.

Unknown keys ignored. Invalid enum values ignored. `decodeContext` never throws.

- [ ] **Step 1: Test round-trip**

```ts
const ctx = base({ teamsCount: '4+', liveUpdates: 'needed' })
const raw = encodeContext(ctx, 'ssr_app')
const decoded = decodeContext(raw)
expect(decoded.context.teamsCount).toBe('4+')
expect(decoded.context.liveUpdates).toBe('needed')
expect(decoded.profileId).toBe('ssr_app')
expect(decodeContext('%zz').context).toEqual({})
```

Use the same `base()` helper as `recommend.test.ts` (copy into this test file; do not import from the other test).

- [ ] **Step 2–4:** wire `sessionStore` initial `context` from URL; on `setContextField` / `setSelectedProfileId` / `goNext` when complete, persist `c.*` keys. Button «Скопировать ссылку» copies `location.href`. Browser: fill context, copy, open in new tab, options + diagram restore.

---

### Task 5: Rubric (self-assessment)

**Files:**
- Create: `src/content/rubric.ts`
- Create: `src/content/rubric.test.ts`
- Modify: `src/store/sessionStore.ts` (persist `rubric: Record<string, boolean>` in the prep localStorage payload with `v: 2`)
- Create: `src/features/prep/RubricList.tsx` (shared)
- Modify: `src/features/wizard/Wizard.tsx` (rehearse step)
- Modify: `src/features/radio/RadioWizard.tsx` (optimizations step)

**Interfaces:**
- Produces:

```ts
export type RubricItem = { id: string; label: Localized }

export const RUBRIC: RubricItem[] = [
  { id: 'context', label: { ru: 'Назвал ограничения до библиотек', en: 'Named constraints before libraries' } },
  { id: 'options', label: { ru: 'Дал 2–3 варианта, не один любимый стек', en: 'Gave 2–3 options, not one favourite stack' } },
  { id: 'cost', label: { ru: 'Сам назвал цену решения', en: 'Named the trade-off without a prompt' } },
  { id: 'evolution', label: { ru: 'Сказал, при каком сигнале пересмотрит', en: 'Said what signal would make them revisit it' } },
  { id: 'evidence', label: { ru: 'Опёрся на цифры или свой вклад', en: 'Used numbers or personal ownership' } },
]
```

Storage shape:

```ts
type PrepPayloadV2 = {
  v: 2
  checklist: Record<string, boolean>
  story: Record<string, string>
  rubric: Record<string, boolean>
}
```

Old payloads without `v` still load; missing `rubric` → `{}`.

- [ ] **Step 1:** test five stable ids; test `loadPrep` migration (put this next to existing prep storage helpers — if they are private in the store, extract `src/engine/prepStorage.ts` in this task).

- [ ] **Step 2–4:** checkboxes; not a gate (user can finish without ticking). Browser: tick two, reload, ticks remain.

---

### Task 6: Markdown export

**Files:**
- Create: `src/engine/exportMarkdown.ts`
- Create: `src/engine/exportMarkdown.test.ts`
- Modify: `src/features/wizard/Wizard.tsx` and `src/features/prep/PrepPanel.tsx` (download button)
- Modify: `src/i18n/ui.ts` (`exportMd`)

**Interfaces:**
- Produces:

```ts
export type ExportInput = {
  locale: Locale
  story: Record<string, string>
  context: Partial<SessionContext>
  profileId: ProfileId | null
  script: string
  notes: Localized[]
  rubric: Record<string, boolean>
}

export function buildExportMarkdown(input: ExportInput): string
export function exportFilename(locale: Locale): string
```

Markdown skeleton (headings in `locale`):

```
# Frontend architecture drill

## Project story
### 1. Product and scale
(body or _empty_)

## Constructor
- teamSize: …
- recommended: CSR SPA on Vite

## Spoken script
(script)

## How this changes the choice
- notes

## Rubric
- [x] Named constraints…
```

`exportFilename`: `architecture-drill-ru.md` / `architecture-drill-en.md`.

Download via `Blob` + temporary `<a download>` in a 10-line `downloadText(filename, text)` helper in `src/engine/download.ts` (no test needed beyond export content).

- [ ] **Step 1:** test contains story text, profile title, `[x]` for ticked rubric ids, and does not contain `undefined`.

- [ ] **Step 2–4:** implement; browser: export after pipeline rehearse, open file, both languages.

---

### Task 7: RADIO coverage (spotlight → usable drills)

**Files:**
- Modify: `src/content/types.ts` (`RadioCaseId` union)
- Modify: `src/content/radio.ts`
- Modify: `src/content/radio.test.ts`
- Modify: `src/store/sessionStore.ts` (`CASE_SET`)
- Modify: `src/features/radio/RadioWizard.tsx`

Keep the four detailed cases. Add **two** full cases only:

- `shop` — catalogue: SSR/ISR, filters in URL, guest cart, payment out of scope
- `kanban` — board: optimistic order, fractional indexing, realtime, a11y of drag

Leave the rest of `SPOTLIGHT_TASKS` as short cards (collaborative editor, upload, video, calendar, table) that do not add a 45-min script.

Each new case must have `requirements`, `architecture`, `data`, `api`, `optimizations` arrays (min 3 items each) and a `diagram` with a `query` node.

- [ ] **Step 1:** catalogue test: `getRadioCase('shop')` and `getRadioCase('kanban')` exist; each diagram has `kind === 'query'`.

- [ ] **Step 2–4:** implement from markdown table + RADIO template; browser: pick shop, walk all RADIO steps, timer still starts.

---

### Task 8: Publish shell (README, license, deploy, disclaimer)

**Files:**
- Create: `LICENSE` (MIT, copyright 2026 Artem Prokopenko)
- Create: `README.md`
- Modify: `src/i18n/ui.ts` and pipeline start in `Wizard.tsx` (disclaimer + link to guide)
- Modify: `index.html` title/description
- Modify: `package.json` `"private": true` may stay; add `"license": "MIT"`
- Modify: `vite.config.ts` only if Pages subpath is chosen (`base: '/Architecture-Front-End/'`)

README must include: one-paragraph pitch, opinionated stack, 7-day table (mirror `GUIDE_DAYS`), `npm i && npm run dev`, `npm test`, `npm run build`, how to deploy static `dist/`, link to the markdown canon, disclaimer.

Start screen extra paragraph:

RU: «Это образец рассуждения под React/TS, не единственно верная архитектура. Личные черновики живут только в этом браузере.»

- [ ] **Step 1:** no unit test. Verify `LICENSE` contains `MIT License` and README contains `npm run dev`.

- [ ] **Step 2:** `npm run build` succeeds.

- [ ] **Step 3:** Browser start screen shows disclaimer and a control that opens Guide.

Deploy is a human step after push: Vercel (root `dist`, `npm run build`) or GitHub Pages with `base` set. Document both in README; do not add GitHub Actions in this task unless the user asks.

---

### Task 9: Layout and trainer a11y

**Files:**
- Modify: `src/index.css`
- Modify: `src/features/shell/AppShell.tsx`
- Modify: `src/features/diagram/SystemDiagram.tsx` / `ArchNode.tsx` as needed

Requirements:

- Viewport `width < 900px`: one column; diagram in a `<details>` “Схема” below the main column (default closed on mobile, open on desktop).
- Mode toggle and stepper wrap; no horizontal page scroll.
- Search field has a visible label (not placeholder-only).
- On step/mode change, move focus to the main `h2`.
- Diagram nodes are `<button>` (already) and remain in tab order.

- [ ] **Step 1:** no engine test. Browser: 390×844 and 1280×800; pipeline context, RADIO pick, guide, search.

- [ ] **Step 2:** keyboard-only: tab to a diagram node, Enter opens the why/alt/follow-up panel, Escape closes it.

---

## Order and dependencies

```
Task 1 Guide
Task 2 Topic cards  → Task 3 Search
Task 4 URL ctx      → Task 6 Export (uses restored session)
Task 5 Rubric       → Task 6 Export
Task 7 RADIO cases  (independent after Task 1)
Task 8 Publish shell (can start anytime; finish after Guide copy exists)
Task 9 Layout/a11y  last so it covers new chrome
```

## Done when

- Guide is a first-class mode with seven days.
- Every topic room has checks + structure + RU/EN sample + related cards.
- Search finds canon terms (`hydration`, `ADR`, `BFF`).
- Constructor round-trips through the URL.
- Rubric persists; export downloads markdown.
- Shop + kanban RADIO cases exist; remaining spotlights stay cards.
- README + LICENSE + disclaimer exist; `npm run build` and `npm test` pass.
- Narrow viewport does not clip the stepper; diagram is reachable from the keyboard.

## Explicitly not in this plan

LLM review of answers, user accounts, extra profiles, Vue/Angular tracks, PDF print stylesheet, GitHub Actions CI (add later if the repo is public).
