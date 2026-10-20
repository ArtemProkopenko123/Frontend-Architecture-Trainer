# Frontend architecture trainer

Interactive RU/EN trainer for senior frontend architecture interviews, with Polish available as a beta that falls back to English where translation is incomplete. It is a **reasoning drill**, not a React encyclopedia: you rehearse context → options → choice → cost → evolution, timed RADIO rounds, topic rooms, and your project story.

Opinionated stack in the samples: React, TypeScript, TanStack Query, Zustand, Vite / Next. That is a sample of thought, not the only correct architecture. Personal drafts stay in this browser (`localStorage`). There is no account and no LLM.

Canon wording lives in [`Архитектура фронтенда подготовка к Senior-собеседованию.md`](./Архитектура%20фронтенда%20подготовка%20к%20Senior-собеседованию.md).

## 7-day path

| Day | What |
| --- | --- |
| 1 | Answer frame (pipeline start) |
| 2 | Constructor: two different contexts |
| 3 | Rooms: structure + state |
| 4 | Rooms: rendering + API + performance |
| 5 | RADIO: news feed with the 45-minute timer |
| 6 | Your project story (prep) |
| 7 | Full run: pipeline script + one RADIO case |

Open the **Guide** tab in the app, or `?mode=guide`.

## Local run

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

Static output is `dist/`. Deploy that folder to Vercel, Netlify, or GitHub Pages. If the site is served from a subpath (GitHub Pages project site), set Vite `base` in `vite.config.ts` before building.

## License

MIT. See `LICENSE`.
