import { t } from './diagram'
import type { AnswerCard, Localized, TopicId } from './types'

export type TopicTextbook = {
  checks: Localized
  structure: Localized[]
  sample: Localized
  cards: AnswerCard[]
}

function card(
  id: string,
  title: Localized,
  checks: Localized,
  structure: Localized[],
  sample: Localized,
): AnswerCard {
  return { id, title, checks, structure, sample }
}

export const TEXTBOOK: Record<TopicId, TopicTextbook> = {
  structure: {
    checks: t(
      'Знаешь ли подходы к структуре и понимаешь, когда какой уместен. Архитектура — границы и направление зависимостей, не «красивые папки».',
      'Do you know the structure approaches and when each fits. Architecture is boundaries and dependency direction, not pretty folders.',
    ),
    structure: [
      t('Определение цели: дешёвое локальное изменение.', 'Define the goal: a cheap, local change.'),
      t('Сравнить by type / feature-based / FSD / Clean.', 'Compare by type / feature-based / FSD / Clean.'),
      t('Сказать, как правило автоматизируешь (lint, CI).', 'Say how you automate the rule (lint, CI).'),
    ],
    sample: t(
      'По умолчанию организую код по фичам: всё, что относится к фиче, лежит вместе, наружу — публичный API через index. Для больших проектов беру FSD или облегчённую версию со слоями «импортировать только вниз». Правило автоматизирую — eslint-plugin-boundaries или Nx module boundaries, иначе через полгода оно разъедется. Clean Architecture целиком тяну только там, где на клиенте реально сложная доменная логика.',
      'By default I organise code by feature: everything a feature needs lives together, and only a public API is exposed through an index file. For larger projects I use Feature-Sliced Design or a lighter version: layers where you can only import downwards. I always enforce that with eslint-plugin-boundaries or Nx module boundaries — otherwise it erodes within six months. I only bring in full Clean Architecture where the client has genuinely complex domain logic.',
    ),
    cards: [
      card(
        'public-api',
        t('Публичный API модуля', 'Module public API', 'Publiczne API modułu'),
        t('Понимаешь, зачем прятать внутренности слайса.', 'You know why a slice’s internals stay hidden.'),
        [
          t('Что экспортирует index.', 'What the index exports.'),
          t('Почему deep import запрещён линтером.', 'Why a deep import is lint-banned.'),
        ],
        t(
          'Модуль экспортирует только то, что нужно снаружи. Внутреннее рефакторится свободно; deep imports вроде features/cart/ui/Button запрещены линтером.',
          'A module exports only what outsiders need. Internals can be refactored freely; deep imports like features/cart/ui/Button are lint-banned.',
        ),
      ),
      card(
        'cycles',
        t('Циклические зависимости', 'Circular dependencies', 'Zależności cykliczne'),
        t('Умеешь разорвать цикл слоями, а не «пока забил».', 'You can break a cycle with layers, not by ignoring it.'),
        [
          t('Однонаправленные слои.', 'One-way layers.'),
          t('Общее уходит вниз; фичи встречаются выше или через события.', 'Shared code goes down; features meet above or via events.'),
        ],
        t(
          'Однонаправленные слои; общий код уходит вниз в shared/entities; взаимодействие фич — через композицию на page/widget или события, не прямой импорт. Проверка: madge --circular, import/no-cycle.',
          'One-way layers; shared code goes down to shared/entities; features meet at page/widget composition or via events, not a direct import. Check with madge --circular and import/no-cycle.',
        ),
      ),
      card(
        'logic-vs-ui',
        t('Бизнес-логика вне UI', 'Business logic out of UI', 'Logika biznesowa poza UI'),
        t('Можно ли протестировать логику без рендера.', 'Can the logic be tested without rendering.'),
        [
          t('Тонкие компоненты.', 'Thin components.'),
          t('Хуки и чистые функции.', 'Hooks and pure functions.'),
        ],
        t(
          'Компоненты остаются тонкими: логика в хуках, чистых функциях и сервисах. Container/presentational сегодня — useCheckout() плюс глупый CheckoutView.',
          'Components stay thin: logic lives in hooks, pure functions and services. Container/presentational today is useCheckout() plus a dumb CheckoutView.',
        ),
      ),
      card(
        'solid',
        t('SOLID во фронтенде', 'SOLID on the frontend', 'SOLID na froncie'),
        t('Не перечисляешь все пять букв вхолостую.', 'You do not recite all five letters for their own sake.'),
        [
          t('SRP и композиция вместо boolean-пропсов.', 'SRP and composition instead of boolean props.'),
          t('DI через передачу API-клиента.', 'DI by injecting the API client.'),
        ],
        t(
          'Показываю два-три принципа на React: SRP, Open/Closed через children и render props, Dependency Inversion — API-клиент в аргументах или контексте, это упрощает тесты.',
          'I show two or three principles on React: SRP, Open/Closed via children and render props, Dependency Inversion by injecting the API client so tests stay easy.',
        ),
      ),
    ],
  },
  state: {
    checks: t(
      'Различаешь виды состояния и не кладёшь серверный кэш в Redux по привычке.',
      'You distinguish kinds of state and do not dump the server cache into Redux out of habit.',
    ),
    structure: [
      t('Чей источник правды: сервер, URL, компонент, форма, клиент.', 'Who owns the truth: server, URL, component, form, client.'),
      t('Почему Query, а не глобальный стор.', 'Why Query, not a global store.'),
      t('Когда всё же Zustand или Redux Toolkit.', 'When Zustand or Redux Toolkit still wins.'),
    ],
    sample: t(
      'Я начинаю с вопроса, чьё это состояние. Если источник правды — сервер, это кэш, и им управляет TanStack Query. Если должно переживать перезагрузку и шариться ссылкой — URL. Всё, что нужно одному компоненту, локально. Под глобальный стор остаётся мало — хватает Zustand. Redux Toolkit беру, когда клиентской логики много, команде нужны строгие паттерны и time-travel DevTools.',
      'I start by asking who owns the state. If the source of truth is the server, it is a cache, and TanStack Query manages it. If it should survive a reload and be shareable via a link, it goes in the URL. Anything one component needs stays local. What is left for a global store is usually small, and Zustand covers it. I reach for Redux Toolkit when there is a lot of client-side logic, a big team that wants strict patterns, and time-travel DevTools.',
    ),
    cards: [
      card(
        'redux-vs-zustand',
        t('Redux vs Zustand vs Context', 'Redux vs Zustand vs Context'),
        t('Context — не стор.', 'Context is not a store.', 'Context to nie store.'),
        [
          t('Context для редких значений.', 'Context for rarely changing values.'),
          t('Zustand vs Redux Toolkit по команде и объёму логики.', 'Zustand vs Redux Toolkit by team and logic volume.'),
        ],
        t(
          'Context — механизм передачи: любое изменение перерендеривает потребителей, поэтому он для темы, локали, DI. Zustand — минимальный API и селекторы. Redux Toolkit — строгий поток, middleware, DevTools; цена — церемонии.',
          'Context is a delivery mechanism: any change re-renders consumers, so it fits theme, locale, DI. Zustand is a small API with selectors. Redux Toolkit is a strict flow, middleware and DevTools; the cost is ceremony.',
        ),
      ),
      card(
        'rerenders',
        t('Лишние ререндеры', 'Extra re-renders', 'Zbędne rerendery'),
        t('Лечишь причину, а не обкладываешь memo.', 'You fix the cause, not wrap everything in memo.'),
        [
          t('Селекторы на минимальный срез.', 'Selectors for the smallest slice.'),
          t('Не класть производные в стор.', 'Do not store derived data.'),
        ],
        t(
          'Подписываться через селекторы; разделять контексты по частоте изменений; не класть в стор производные; для списков — мемоизация строк и виртуализация.',
          'Subscribe through selectors; split contexts by change frequency; do not put derived data in the store; for lists use row memoisation and virtualisation.',
        ),
      ),
      card(
        'query-keys',
        t('Query keys', 'Query keys'),
        t('Ключи позволяют точечную инвалидацию.', 'Keys allow precise invalidation.'),
        [
          t('Фабрика ключей на фичу.', 'A per-feature key factory.'),
          t('Хук прячет детали от UI.', 'A hook hides details from the UI.'),
        ],
        t(
          'Фабрика ключей на фичу: orderKeys.list(filters), orderKeys.detail(id). Иерархия инвалидирует точечно или целиком; useOrders() прячет это от компонентов.',
          'A per-feature key factory: orderKeys.list(filters), orderKeys.detail(id). Hierarchy invalidates one entry or the whole tree; useOrders() hides that from components.',
        ),
      ),
    ],
  },
  rendering: {
    checks: t(
      'Выбираешь стратегию по странице: SEO, свежесть, персонализация, стоимость серверов — не «у нас везде Next».',
      'You pick a strategy per page: SEO, freshness, personalisation, server cost — not “we use Next everywhere”.',
    ),
    structure: [
      t('CSR / SSR / SSG / ISR / RSC — плюс, минус, когда.', 'CSR / SSR / SSG / ISR / RSC — plus, minus, when.'),
      t('Цена hydration и сервер в критическом пути.', 'The cost of hydration and the server on the critical path.'),
      t('Постраничный выбор, не догмат на репозиторий.', 'A per-page choice, not a repo dogma.'),
    ],
    sample: t(
      'Я выбираю рендеринг постранично. Если страница за логином и SEO не важно — CSR достаточно. Если важны SEO и быстрый первый показ — SSR или статика; когда данные меняются нечасто, ISR даёт скорость статики. В App Router по умолчанию серверные компоненты, клиентские — только где нужна интерактивность. Цена SSR: hydration и сервер в критическом пути.',
      'I choose rendering per page. If a page is behind a login and SEO does not matter, CSR is enough. If SEO and fast first paint matter, SSR or static; when data changes infrequently, ISR gives static speed. With the App Router I default to Server Components and Client Components only where I need interactivity. SSR costs hydration time and puts the server on the critical path.',
    ),
    cards: [
      card(
        'hydration',
        t('Hydration', 'Hydration'),
        t('Понимаешь mismatch и «красиво, но не кликается».', 'You know mismatch and “it looks ready but does not click”.'),
        [
          t('Что hydration делает.', 'What hydration does.'),
          t('Mismatch, INP, streaming, острова, RSC.', 'Mismatch, INP, streaming, islands, RSC.'),
        ],
        t(
          'Клиентский React оживляет серверный HTML. Проблемы: страница выглядит готовой, но не отвечает; hydration mismatch (даты, Math.random, window); весь JS всё равно качается. Лечение: streaming с Suspense, острова, RSC.',
          'Client React hydrates server HTML. Problems: the page looks ready but does not respond; hydration mismatch (dates, Math.random, window); all the JS still downloads. Fixes: streaming with Suspense, islands, RSC.',
        ),
      ),
      card(
        'streaming',
        t('Streaming SSR', 'Streaming SSR'),
        t('Медленный кусок не блокирует оболочку.', 'A slow chunk must not block the shell.'),
        [
          t('HTML частями.', 'HTML in chunks.'),
          t('Suspense вокруг медленных блоков.', 'Suspense around slow blocks.'),
        ],
        t(
          'Сервер отдаёт HTML частями: оболочка сразу, медленные блоки внутри Suspense догружаются. TTFB и FCP лучше, один медленный запрос не блокирует страницу.',
          'The server sends HTML in chunks: the shell first, slow blocks inside Suspense later. TTFB and FCP improve; one slow request does not block the page.',
        ),
      ),
      card(
        'rsc-vs-ssr',
        t('RSC vs SSR', 'RSC vs SSR'),
        t('Не путаешь способ получить HTML с типом компонента.', 'You do not confuse how you get HTML with the component type.'),
        [
          t('SSR — HTML на сервере, гидратация всё равно есть.', 'SSR is HTML on the server; hydration still happens.'),
          t('RSC не выполняется на клиенте и не в бандле.', 'RSC never runs on the client and is not in the bundle.'),
        ],
        t(
          'SSR — способ получить HTML на сервере; компоненты всё равно гидратируются. RSC — компоненты, которые никогда не выполняются на клиенте. Их используют вместе.',
          'SSR is a way to get HTML on the server; those components still hydrate. RSC are components that never run on the client. You use them together.',
        ),
      ),
    ],
  },
  api: {
    checks: t(
      'Компоненты не знают про fetch. Есть транспорт, доменные модули и хуки Query.',
      'Components do not know about fetch. There is transport, domain modules and Query hooks.',
    ),
    structure: [
      t('Транспорт: auth, retry, AbortController.', 'Transport: auth, retry, AbortController.'),
      t('API-модули и генерация типов.', 'API modules and generated types.'),
      t('Хуки данных для UI.', 'Data hooks for the UI.'),
    ],
    sample: t(
      'Компоненты у меня не знают про HTTP. Есть транспорт с авторизацией, ретраями и ошибками, над ним — API-модули по доменам с типами из OpenAPI, и уже над ними — хуки TanStack Query. Ответы маппятся в модели фронта. Генерация типов ловит расхождение контракта в CI.',
      'My components do not know about HTTP. There is a transport layer for auth, retries and errors; above it, domain API modules with types generated from OpenAPI; on top, TanStack Query hooks. Server responses map to frontend models. Generated types catch contract drift in CI.',
    ),
    cards: [
      card(
        'rest-gql-bff',
        t('REST, GraphQL или BFF', 'REST, GraphQL or BFF'),
        t('Выбор по экрану и числу клиентов, не по моде.', 'Choose by screen and number of clients, not by fashion.'),
        [
          t('REST — просто и HTTP-кэш.', 'REST — simple and HTTP cache.'),
          t('BFF — агрегация и токены не в браузере.', 'BFF — aggregation and tokens stay off the browser.'),
        ],
        t(
          'Если экран собирает данные из многих сервисов, я за BFF: один запрос с клиента, агрегация на сервере, токены не в браузере. GraphQL оправдан, когда много клиентов с разными потребностями и команда готова вкладываться в схему.',
          'If a screen pulls from many services, I go BFF: one client request, aggregation on the server, tokens never in the browser. GraphQL pays off when many clients need different shapes and the team will invest in the schema.',
        ),
      ),
      card(
        'errors',
        t('Ошибки', 'Errors', 'Błędy'),
        t('Разные классы ошибок — разный UX и ретрай.', 'Different error classes get different UX and retry.'),
        [
          t('Сеть, 401, 403/404, 5xx, валидация.', 'Network, 401, 403/404, 5xx, validation.'),
          t('Error boundary на маршрут и виджет.', 'Error boundary per route and widget.'),
        ],
        t(
          'Сеть — ретрай с backoff; 401 — refresh затем логин; 403/404 — понятное сообщение; 5xx — ретрай и fallback; валидация — к полям. Boundaries на маршруте и виджете. Всё в Sentry с контекстом.',
          'Network — retry with backoff; 401 — refresh then login; 403/404 — a clear message; 5xx — retry and fallback; validation — field-level. Boundaries on the route and widget. Everything to Sentry with context.',
        ),
      ),
      card(
        'optimistic',
        t('Optimistic update', 'Optimistic update'),
        t('Знаешь, где откат обязателен и где нельзя врать UI.', 'You know where rollback is required and where you must not lie in the UI.'),
        [
          t('onMutate → снапшот → onError откат.', 'onMutate → snapshot → onError rollback.'),
          t('Не для платежей.', 'Not for payments.'),
        ],
        t(
          'Обновляем UI до ответа и откатываем при ошибке. Хорошо для лайка, чекбокса, перетаскивания. Плохо для платежей и необратимых операций.',
          'Update the UI before the response and roll back on error. Good for likes, checkboxes, drag. Bad for payments and irreversible actions.',
        ),
      ),
      card(
        'realtime-protocol',
        t('Polling, SSE или WebSocket', 'Polling, SSE or WebSocket'),
        t('Протокол по направлению данных и цене.', 'Pick the protocol by data direction and cost.'),
        [
          t('Polling — редко.', 'Polling — rare updates.'),
          t('SSE — поток с сервера. WebSocket — двусторонний.', 'SSE — server stream. WebSocket — two-way.'),
        ],
        t(
          'Polling прост для редких обновлений. SSE — односторонний поток по HTTP с авто-реконнектом. WebSocket — низкая задержка для чата; нужен heartbeat, реконнект и догрузка пропущенных событий.',
          'Polling is simple for rare updates. SSE is a one-way HTTP stream with auto-reconnect. WebSocket is low-latency for chat; you need heartbeat, reconnect and catch-up of missed events.',
        ),
      ),
    ],
  },
  scale: {
    checks: t(
      'Не поддаёшься хайпу микрофронтендов и называешь организационную цену.',
      'You do not follow micro-frontend hype and you name the organisational cost.',
    ),
    structure: [
      t('MFE решают организацию, не технику.', 'MFEs solve organisation, not a technical itch.'),
      t('Сначала модульный монолит и CODEOWNERS.', 'A modular monolith and CODEOWNERS first.'),
      t('Если MFE — shell, дизайн-система, контракт.', 'If MFE — shell, design system, contract.'),
    ],
    sample: t(
      'Микрофронтенды — про организацию: команды блокируют релизы, разные циклы поставки или миграция легаси. Цена: дубли зависимостей, рассинхрон React и дизайн-системы, сложнее стейт, роутинг, e2e и локальная разработка. Сначала модульный монолит в монорепо с границами и CODEOWNERS. Если всё же MFE — общий shell, дизайн-система и строгий контракт.',
      'Micro-frontends are organisational: teams block releases, delivery cycles differ, or you migrate legacy. The cost is duplicated dependencies, React and design-system drift, harder state, routing, e2e and local dev. First try a modular monolith in a monorepo with boundaries and CODEOWNERS. If you still go MFE — a shared shell, design system and a strict contract.',
    ),
    cards: [
      card(
        'when-mfe',
        t('Когда нужны микрофронтенды', 'When micro-frontends are needed', 'Kiedy potrzebne są mikrofrontendy'),
        t('Не предлагаешь MFE команде из трёх человек.', 'You do not propose MFEs to a three-person team.'),
        [
          t('Независимые релизы и блокировки.', 'Independent releases and blocking.'),
          t('Цена бандла, версий, e2e.', 'Cost of bundle, versions, e2e.'),
        ],
        t(
          'Нужны, когда несколько команд блокируют друг друга на релизах, у частей разные циклы или нужна поэтапная миграция. Иначе модульный монолит даёт 80% пользы дешевле.',
          'You need them when teams block each other on releases, parts have different cycles, or you migrate incrementally. Otherwise a modular monolith gets 80% of the benefit cheaper.',
        ),
      ),
      card(
        'monorepo',
        t('Монорепо или полирепо', 'Monorepo or polyrepo', 'Monorepo czy polirepo'),
        t('Монорепо без affected-сборок не масштабируется.', 'A monorepo without affected builds does not scale.'),
        [
          t('Атомарные изменения библиотеки и потребителей.', 'Atomic library and consumer changes.'),
          t('Affected + remote cache.', 'Affected + remote cache.'),
        ],
        t(
          'Для фронта с общими пакетами я за Nx или Turborepo: атомарные изменения, единые версии, общий CI. Чтобы жило — affected-сборки и удалённый кэш. Полирепо — когда циклы команд действительно независимы.',
          'For a frontend with shared packages I want Nx or Turborepo: atomic changes, one dependency version, one CI. To live it needs affected builds and a remote cache. Polyrepo when team cycles are genuinely independent.',
        ),
      ),
      card(
        'design-system',
        t('Дизайн-система', 'Design system', 'Design system'),
        t('Токены, headless, ownership, semver — не «папка buttons».', 'Tokens, headless, ownership, semver — not a buttons folder.'),
        [
          t('Токены из Figma в CSS-переменные.', 'Tokens from Figma to CSS variables.'),
          t('Примитивы на Radix/React Aria, Storybook, semver.', 'Primitives on Radix/React Aria, Storybook, semver.'),
        ],
        t(
          'Токены как источник правды, примитивы на headless-основе ради a11y, композиционный API, Storybook и визуальные регрессии, semver и процесс вклада. Runtime CSS-in-JS плохо с RSC.',
          'Tokens as source of truth, headless primitives for a11y, a compositional API, Storybook and visual regression, semver and a contribution process. Runtime CSS-in-JS fights RSC.',
        ),
      ),
    ],
  },
  perf: {
    checks: t(
      'Начинаешь с измерения, не с useMemo. Знаешь LCP, INP, CLS.',
      'You start with measurement, not useMemo. You know LCP, INP, CLS.',
    ),
    structure: [
      t('RUM → профиль → точечный фикс → бюджет в CI.', 'RUM → profile → targeted fix → CI budget.'),
      t('Метрика и её причина.', 'The metric and its cause.'),
      t('Как не откатиться.', 'How it will not regress.'),
    ],
    sample: t(
      'Сначала измеряю: Core Web Vitals с реальных пользователей, Lighthouse и Performance, React Profiler для ререндеров. Затем какая метрика плохая и почему — у LCP, INP и CLS разные причины. После фикса закрепляю бюджетом в CI.',
      'First I measure: Core Web Vitals from real users, Lighthouse and Performance, React Profiler for re-renders. Then which metric is bad and why — LCP, INP and CLS have different causes. After the fix I lock it with a CI budget.',
    ),
    cards: [
      card(
        'measure-first',
        t('Сначала измерить', 'Measure first'),
        t('Красный флаг — «оборачиваю всё в useMemo».', 'Red flag: “I wrap everything in useMemo”.'),
        [
          t('RUM и лабораторные метрики.', 'RUM and lab metrics.'),
          t('Бюджет бандла и Lighthouse в CI.', 'Bundle and Lighthouse budgets in CI.'),
        ],
        t(
          'web-vitals или RUM, Lighthouse, Performance, React Profiler. Потом причина конкретной метрики. Бюджет: size-limit и Lighthouse ломают сборку при регрессии.',
          'web-vitals or RUM, Lighthouse, Performance, React Profiler. Then the cause of the specific metric. Budget: size-limit and Lighthouse fail the build on regression.',
        ),
      ),
      card(
        'bundle',
        t('Размер бандла', 'Bundle size'),
        t('Анализ до угадывания.', 'Analyse before guessing.'),
        [
          t('Visualizer, split, lazy, tree shaking.', 'Visualizer, split, lazy, tree shaking.'),
          t('Замена тяжёлых библиотек.', 'Replace heavy libraries.'),
        ],
        t(
          'Смотрю rollup-plugin-visualizer, режу по маршрутам и React.lazy, tree shaking, moment → date-fns, динамический импорт редких фич, budget в CI.',
          'I look at rollup-plugin-visualizer, split by route and React.lazy, tree-shake, replace moment with date-fns, dynamic-import rare features, budget in CI.',
        ),
      ),
      card(
        'list-10k',
        t('Список из 10 000 строк', 'A list of 10,000 rows'),
        t('Не рендеришь DOM на все строки.', 'You do not render DOM for every row.'),
        [
          t('Виртуализация.', 'Virtualisation.'),
          t('Серверная пагинация.', 'Server pagination.'),
        ],
        t(
          'Виртуализация (TanStack Virtual, react-window): рендерятся видимые строки. Плюс пагинация на сервере, мемоизация строк, стабильные key.',
          'Virtualisation (TanStack Virtual, react-window): only visible rows render. Plus server pagination, memoised rows, stable keys.',
        ),
      ),
    ],
  },
  reliability: {
    checks: t(
      'Не путаешь покрытие с надёжностью. Умеешь дешёвый откат.',
      'You do not confuse coverage with reliability. You know a cheap rollback.',
    ),
    structure: [
      t('Testing trophy: интеграция + мало e2e.', 'Testing trophy: integration + few e2e.'),
      t('Наблюдаемость и флаги.', 'Observability and flags.'),
      t('CI как ворота качества.', 'CI as the quality gate.'),
    ],
    sample: t(
      'Держусь testing trophy: основной объём — интеграционные тесты Testing Library глазами пользователя, сеть через MSW. Unit — чистая логика. E2E Playwright только на логин, оплату, чекаут. Плюс strict TypeScript и ESLint. Покрытие — индикатор, не цель.',
      'I follow the testing trophy: most effort is Testing Library integration tests the way a user sees the UI, network mocked with MSW. Unit tests for pure logic. Playwright e2e only for login, payment, checkout. Plus strict TypeScript and ESLint. Coverage is a signal, not a goal.',
    ),
    cards: [
      card(
        'flaky-e2e',
        t('Flaky e2e', 'Flaky e2e'),
        t('Не лечишь флаки sleep(3000).', 'You do not fix flakes with sleep(3000).'),
        [
          t('Ждать состояния, не таймауты.', 'Wait for state, not timeouts.'),
          t('Стабильные селекторы и карантин.', 'Stable selectors and quarantine.'),
        ],
        t(
          'Auto-waiting Playwright, изолированные данные, getByRole и data-testid, карантин со владельцем, трейсы при падении.',
          'Playwright auto-waiting, isolated data, getByRole and data-testid, quarantine with an owner, traces on failure.',
        ),
      ),
      card(
        'flags',
        t('Безопасный выкат', 'Safe rollout'),
        t('Деплой отделён от релиза.', 'Deploy is separated from release.'),
        [
          t('Feature flags, canary, откат CDN.', 'Feature flags, canary, CDN rollback.'),
          t('У флага есть владелец и срок жизни.', 'A flag has an owner and an expiry.'),
        ],
        t(
          'Feature flags: деплой отдельно от релиза, процент пользователей, мгновенное выключение. Preview на PR, canary, immutable-сборки на CDN. Флаги чистить.',
          'Feature flags: deploy separate from release, a percentage of users, instant kill. Preview per PR, canary, immutable CDN builds. Flags must be cleaned up.',
        ),
      ),
      card(
        'ci',
        t('CI пайплайн', 'CI pipeline'),
        t('Порядок ворот и скорость монорепо.', 'Gate order and monorepo speed.'),
        [
          t('Типы → lint границ → тесты → сборка + size-limit → e2e → Lighthouse.', 'Types → boundary lint → tests → build + size-limit → e2e → Lighthouse.'),
          t('Affected и remote cache.', 'Affected and remote cache.'),
        ],
        t(
          'Типы, линтеры включая границы модулей, unit/integration, сборка и size-limit, e2e на preview, Lighthouse CI. В монорепо — affected-only и удалённый кэш.',
          'Types, linters including module boundaries, unit/integration, build and size-limit, e2e on preview, Lighthouse CI. In a monorepo — affected-only and a remote cache.',
        ),
      ),
    ],
  },
  security: {
    checks: t(
      'Клиенту не доверяешь. XSS, токены, CSP — не «у нас https».',
      'You do not trust the client. XSS, tokens, CSP — not “we have https”.',
    ),
    structure: [
      t('Сервер дублирует авторизацию и валидацию.', 'The server duplicates auth and validation.'),
      t('XSS: экранирование, DOMPurify, CSP.', 'XSS: escaping, DOMPurify, CSP.'),
      t('Токены не в localStorage.', 'Tokens not in localStorage.'),
    ],
    sample: t(
      'Клиент контролирует злоумышленник, поэтому авторизация и валидация дублируются на сервере. На фронте главное XSS: React экранирует, но опасны dangerouslySetInnerHTML и сторонние скрипты — DOMPurify и строгий CSP. Токены не в localStorage: httpOnly cookie с SameSite или BFF. Плюс аудит зависимостей в CI.',
      'I assume the client is attacker-controlled, so auth and validation are enforced on the server too. On the frontend the main concern is XSS: React escapes, but dangerouslySetInnerHTML and third-party scripts are risky — DOMPurify and a strict CSP. I do not keep tokens in localStorage: httpOnly SameSite cookies or a BFF. Plus dependency auditing in CI.',
    ),
    cards: [
      card(
        'xss',
        t('XSS', 'XSS'),
        t('Знаешь, где React не спасает.', 'You know where React does not save you.'),
        [
          t('dangerouslySetInnerHTML, javascript:-ссылки.', 'dangerouslySetInnerHTML, javascript: links.'),
          t('CSP с nonce, Trusted Types.', 'CSP with nonce, Trusted Types.'),
        ],
        t(
          'React экранирует вывод, но HTML из CMS, markdown и виджеты — зона XSS. Санитизация DOMPurify, CSP с nonce, без eval.',
          'React escapes output, but CMS HTML, markdown and widgets are XSS land. Sanitise with DOMPurify, CSP with nonce, no eval.',
        ),
      ),
      card(
        'tokens',
        t('JWT в localStorage или cookie', 'JWT in localStorage or cookie'),
        t('XSS + localStorage = украденный токен.', 'XSS + localStorage = a stolen token.'),
        [
          t('httpOnly недоступен скрипту.', 'httpOnly is not script-readable.'),
          t('CSRF: SameSite или токен.', 'CSRF: SameSite or a token.'),
        ],
        t(
          'localStorage читает любой скрипт. httpOnly cookie скрипту недоступна, но нужна защита CSRF. Оптимально BFF: токены к API остаются на сервере.',
          'Any script can read localStorage. An httpOnly cookie is not script-readable but needs CSRF protection. Best is a BFF: API tokens stay on the server.',
        ),
      ),
      card(
        'cors',
        t('CORS', 'CORS'),
        t('Не считаешь CORS защитой сервера.', 'You do not treat CORS as server security.'),
        [
          t('Браузер решает, можно ли прочитать ответ.', 'The browser decides whether the response can be read.'),
          t('curl CORS не ограничивает.', 'curl is not limited by CORS.'),
        ],
        t(
          'CORS — механизм браузера: разрешить или запретить чтение ответа с другого origin. Это не защита API: запрос из curl CORS не останавливает.',
          'CORS is a browser mechanism: allow or deny reading a cross-origin response. It is not API protection: a curl request is not stopped by CORS.',
        ),
      ),
    ],
  },
  leadership: {
    checks: t(
      'Умеешь провести решение через команду: ADR, долг, миграция, ошибка без обвинений.',
      'You can carry a decision through the team: ADR, debt, migration, a mistake without blame.',
    ),
    structure: [
      t('ADR: контекст, варианты, решение, цена.', 'ADR: context, options, decision, cost.'),
      t('Долг видимый и в языке бизнеса.', 'Debt made visible in business language.'),
      t('Миграция strangler fig, не большое переписывание.', 'Strangler-fig migration, not a rewrite.'),
    ],
    sample: t(
      'Значимые решения оформляю как ADR: контекст, варианты, решение и последствия. Для крупных изменений — RFC и обратная связь, часто с прототипом. Решение не голосованием, у него есть владелец. ADR в репозитории, через год понятно почему так, и его можно пересмотреть.',
      'I document significant decisions as ADRs: context, options, the decision and consequences. For larger changes I write an RFC and gather feedback, often with a prototype. Decisions are not votes, and each has an owner. ADRs live in the repo, so a year later it is clear why, and they can be revisited.',
    ),
    cards: [
      card(
        'adr',
        t('Как принимаете решения', 'How you make decisions'),
        t('Есть артефакт, не Slack-тред.', 'There is an artefact, not a Slack thread.'),
        [
          t('ADR в репозитории.', 'ADR in the repo.'),
          t('Владелец и критерии пересмотра.', 'An owner and revisit criteria.'),
        ],
        t(
          'ADR: контекст, рассмотренные варианты, решение, последствия. Крупное — RFC. Не голосование, а аргументы. Лежит рядом с кодом.',
          'ADR: context, options considered, decision, consequences. Large change — RFC. Arguments, not a vote. It lives next to the code.',
        ),
      ),
      card(
        'tech-debt',
        t('Техдолг', 'Tech debt', 'Dług techniczny'),
        t('Объясняешь долг как замедление фич, не как «надо бы отрефакторить».', 'You explain debt as slowed features, not “we should refactor”.'),
        [
          t('Реестр с влиянием.', 'A register with impact.'),
          t('Доля спринта или бойскаут рядом с фичей.', 'A sprint share or boy-scout next to the feature.'),
        ],
        t(
          'Долг видимый: реестр с оценкой, как он замедляет фичи. Приоритет по влиянию и стоимости. С продуктом — 15–20% спринта или рефакторинг в той же области. Бизнесу: эта часть добавляет два дня к каждой фиче корзины.',
          'Make debt visible: a register of how it slows features. Prioritise by impact versus cost. With product: 15–20% of a sprint or refactor in the same area. To the business: this part adds two days to every checkout feature.',
        ),
      ),
      card(
        'migration',
        t('Большая миграция', 'A large migration'),
        t('Нет «перепишем с нуля за квартал».', 'No “we rewrite from scratch this quarter”.'),
        [
          t('Метрика успеха.', 'A success metric.'),
          t('Strangler fig, codemod, счётчик в CI, владелец.', 'Strangler fig, codemod, a CI counter, an owner.'),
        ],
        t(
          'Обоснование и метрика. Новое пишем по-новому, старое мигрируем. Codemod и линтер запрещают старый паттерн. Счётчик файлов в CI. Флаги для риска. Срок и владелец, иначе два подхода живут годами.',
          'A reason and a metric. Write new code the new way, migrate the old. A codemod and a lint ban on the old pattern. A file counter in CI. Flags for risk. A deadline and an owner, or two approaches live for years.',
        ),
      ),
      card(
        'wrong-decision',
        t('Ошибочное решение', 'A wrong decision', 'Błędna decyzja'),
        t('STAR без обвинения коллег.', 'STAR without blaming colleagues.'),
        [
          t('Неверная предпосылка.', 'The wrong assumption.'),
          t('Как заметили, что сделали, какой вывод.', 'How you noticed, what you did, the lesson.'),
        ],
        t(
          'We adopted X because we expected Y. Six months in we saw Z — build times doubled. I proposed rolling back part of it and introducing W. The lesson is to validate assumptions with a small pilot.',
          'We adopted X because we expected Y. Six months in we saw Z — build times doubled. I proposed rolling back part of it and introducing W. The lesson is to validate assumptions with a small pilot.',
        ),
      ),
    ],
  },
}
