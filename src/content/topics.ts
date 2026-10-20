import { edge, node, t } from './diagram'
import { TEXTBOOK } from './textbook'
import type { Topic, TopicId } from './types'

export const TOPIC_ORDER: TopicId[] = [
  'structure',
  'state',
  'rendering',
  'api',
  'scale',
  'perf',
  'reliability',
  'security',
  'leadership',
]

export const TOPICS: Record<TopicId, Topic> = {
  structure: {
    id: 'structure',
    title: t('Структура кода и модульность', 'Code structure and modularity', 'Struktura kodu i modularność'),
    thesis: t(
      'Структура папок вторична, главное — границы модулей и направление зависимостей. Группируй код по фичам и бизнес-доменам, а не по техническим типам, и проверяй правила импортов автоматически.',
      'Folder layout is secondary; what matters is module boundaries and dependency direction. Group by features and domains, not by technical type, and enforce import rules automatically.', 'Układ folderów jest wtórny; liczą się granice modułów i kierunek zależności. Grupuj kod według funkcji i domen, nie typów technicznych, i egzekwuj reguły importów automatycznie.',
    ),
    ...TEXTBOOK.structure,
    rows: [
      {
        label: t('By type', 'By type'),
        body: t(
          'Группировка по техническому типу (`components/`, `hooks/`, `utils/`). Подходит маленьким проектам и прототипам. Цена: фича размазана по проекту, при росте всё связано со всем.',
          'Group by technical type (`components/`, `hooks/`, `utils/`). Fits small projects and prototypes. Cost: a feature is smeared across the repo, and everything couples as it grows.',
        ),
      },
      {
        label: t('Feature-based', 'Feature-based'),
        body: t(
          'Всё про фичу лежит рядом (`features/cart/…`). Подходит средним проектам и большинству продуктов. Нужно правило, где живёт общий код.',
          'Everything for a feature lives together (`features/cart/…`). Fits mid-size projects and most products. You still need a rule for shared code.',
        ),
      },
      {
        label: t('Feature-Sliced Design', 'Feature-Sliced Design'),
        body: t(
          'Слои `app → pages → widgets → features → entities → shared`, импорт только вниз, публичный API у слайса. Для крупных проектов и нескольких команд. Цена: порог входа и споры «это feature или entity?».',
          'Layers `app → pages → widgets → features → entities → shared`, import only downwards, public API per slice. For large projects and several teams. Cost: onboarding cost and “is this a feature or an entity?” debates.',
        ),
      },
      {
        label: t('Clean / Hexagonal', 'Clean / Hexagonal'),
        body: t(
          'Домен и use cases не зависят от React и транспорта. Для сложной клиентской логики (финансы, редакторы, офлайн). Много boilerplate, избыточно для CRUD-форм.',
          'Domain and use cases do not depend on React or transport. For complex client logic (finance, editors, offline). Lots of boilerplate; too much for CRUD forms.',
        ),
      },
    ],
    followUps: [
      t(
        'Публичный API модуля: наружу только index, deep imports запрещены линтером; внутреннее рефакторится свободно.',
        'A module public API: only the index is exported, deep imports are lint-banned; internals can be refactored freely.',
      ),
      t(
        'Циклы: однонаправленные слои, общее вниз в shared/entities, фичи встречаются на page/widget или через события; проверка madge / import/no-cycle.',
        'Cycles: one-way layers, shared code goes down to shared/entities, features meet at page/widget or via events; check with madge / import/no-cycle.',
      ),
      t(
        'Бизнес-логика вне UI: тонкие компоненты, хуки и чистые функции; container/presentational сегодня — useCheckout() + глупый CheckoutView.',
        'Keep business logic out of UI: thin components, hooks and pure functions; container/presentational today is useCheckout() plus a dumb CheckoutView.',
      ),
      t(
        'Общие компоненты: примитивы без бизнеса — дизайн-система/shared/ui; с бизнесом — entities. Rule of three: не выносить, пока нет 2–3 потребителей.',
        'Shared components: primitives without business meaning go to the design system/shared/ui; with business meaning, to entities. Rule of three: do not extract until there are 2–3 consumers.',
      ),
      t(
        'SOLID во фронте: SRP, Open/Closed через композицию и children/render props, Dependency Inversion через передачу API-клиента.',
        'SOLID on the frontend: SRP, Open/Closed via composition and children/render props, Dependency Inversion by injecting the API client.',
      ),
      t(
        'Prop drilling: сначала композиция через children, затем контекст для редких данных, стор — для частого общего состояния. Контекст — доставка, не стейт-менеджер.',
        'Prop drilling: composition via children first, then context for rare data, a store for frequently changing shared state. Context is delivery, not a state manager.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'page',
          'ui',
          t('Page / widget', 'Page / widget'),
          t('Композиция фич сверху; фичи не импортируют друг друга напрямую.', 'Compose features from above; features do not import each other directly.'),
          t('Прямой импорт фичи в фичу — путь к циклам.', 'Feature-to-feature imports are how cycles start.'),
          t('Где проходит публичный API слайса?', 'Where does the slice public API sit?'),
        ),
        node(
          'feature',
          'app',
          t('Feature module', 'Feature module'),
          t('Компоненты, хуки, API и тесты фичи лежат вместе.', 'The feature’s components, hooks, API and tests live together.'),
          t('Группировка by type, пока проект маленький.', 'By-type folders while the project is tiny.'),
          t('Что торчит из index.ts и что линтер считает deep import?', 'What does index.ts export, and what does the linter treat as a deep import?'),
        ),
        node(
          'shared',
          'ui',
          t('shared / entities', 'shared / entities'),
          t('Общее уходит вниз по слоям, не вверх.', 'Shared code moves down the layers, never up.'),
          t('Дублирование до второго-третьего потребителя (rule of three).', 'Duplication until the second or third consumer (rule of three).'),
          t('Это примитив UI или сущность с бизнесом?', 'Is this a UI primitive or an entity with business meaning?'),
        ),
        node(
          'boundaries',
          'ci',
          t('eslint-plugin-boundaries', 'eslint-plugin-boundaries'),
          t('Правило «импортировать только вниз» иначе разъедется за полгода.', 'The “import only downwards” rule erodes within six months without automation.'),
          t('Nx module boundaries в монорепо.', 'Nx module boundaries in a monorepo.'),
          t('Что именно падает в CI при цикле или deep import?', 'What fails in CI on a cycle or a deep import?'),
        ),
      ],
      edges: [
        edge('page', 'feature', t('только вниз', 'downwards only')),
        edge('feature', 'shared', t('только вниз', 'downwards only')),
        edge('boundaries', 'page', t('lint', 'lint')),
        edge('boundaries', 'feature', t('lint', 'lint')),
      ],
    },
  },
  state: {
    id: 'state',
    title: t('Управление состоянием', 'State management', 'Zarządzanie stanem'),
    thesis: t(
      'Состояние бывает разных видов, и у каждого своё место. Большинство «глобального стейта» на самом деле — кэш серверных данных, и ему место в TanStack Query или RTK Query, а не в Redux.',
      'There are several kinds of state, and each has a place. Most “global state” is actually a server-data cache and belongs in TanStack Query or RTK Query, not in Redux.', 'Stan bywa różnego rodzaju i każdy ma swoje miejsce. Większość „globalnego stanu” to tak naprawdę cache danych serwera i należy do TanStack Query albo RTK Query, nie do Redux.',
    ),
    ...TEXTBOOK.state,
    rows: [
      {
        label: t('Серверное', 'Server', 'Serwerowe'),
        body: t(
          'Списки, профиль, заказы — TanStack Query / RTK Query / SWR: кэш, дедупликация, фоновое обновление.',
          'Lists, profile, orders — TanStack Query / RTK Query / SWR: cache, deduplication, background refresh.',
        ),
      },
      {
        label: t('URL', 'URL'),
        body: t(
          'Фильтры, сортировка, пагинация, открытая вкладка — search params роутера: ссылкой можно поделиться, работает «назад».',
          'Filters, sort, pagination, the open tab — router search params: shareable links, Back works.',
        ),
      },
      {
        label: t('Локальное UI', 'Local UI', 'Lokalne UI'),
        body: t(
          'Открыт ли dropdown, ввод в поле — useState / useReducer в компоненте.',
          'Dropdown open, field input — useState / useReducer in the component.',
        ),
      },
      {
        label: t('Формы', 'Forms', 'Formularze'),
        body: t('Значения, валидация, dirty/touched — React Hook Form + Zod.', 'Values, validation, dirty/touched — React Hook Form + Zod.'),
      },
      {
        label: t('Глобальное клиентское', 'Global client', 'Globalne klienckie'),
        body: t(
          'Тема, корзина до оформления, сессия, сложный редактор — Zustand / Redux Toolkit / Jotai; редко меняющееся — Context.',
          'Theme, cart before checkout, session, a complex editor — Zustand / Redux Toolkit / Jotai; rarely changing data — Context.',
        ),
      },
      {
        label: t('Производное', 'Derived', 'Pochodne'),
        body: t(
          'Сумма корзины, отфильтрованный список — не хранить, вычислять (useMemo, селекторы).',
          'Cart total, a filtered list — do not store, compute (useMemo, selectors).',
        ),
      },
    ],
    followUps: [
      t(
        'Context — доставка значения, не стор: любое изменение перерендеривает потребителей, поэтому он для темы, локали, DI. Zustand — мало boilerplate. Redux Toolkit — строгий поток и DevTools для большой команды. Jotai/Recoil — атомы для редакторов и канвасов.',
        'Context delivers a value, it is not a store: any change re-renders consumers, so it is for theme, locale, DI. Zustand is low boilerplate. Redux Toolkit is a strict flow and DevTools for a large team. Jotai/Recoil are atoms for editors and canvases.',
      ),
      t(
        'Лишние ререндеры: селекторы на минимальный срез, раздельные контексты, не класть производные в стор, мемоизация строк и виртуализация.',
        'Extra re-renders: subscribe via selectors to a minimal slice, split contexts, do not put derived data in the store, memoize rows and virtualise.',
      ),
      t(
        'Синхронизация: между вкладками BroadcastChannel или storage; с сервером WebSocket/SSE обновляют кэш Query (setQueryData) или инвалидируют ключи.',
        'Sync: BroadcastChannel or storage between tabs; WebSocket/SSE update the Query cache (setQueryData) or invalidate keys.',
      ),
      t(
        'Нормализация в Redux нужна, если сущность в нескольких местах (createEntityAdapter). В Query обычно достаточно инвалидации ключей; сильная связность — довод за Apollo/urql graphcache.',
        'Normalisation in Redux is needed when an entity appears in several places (createEntityAdapter). In Query, invalidating keys is usually enough; heavy interlinking is an argument for Apollo/urql graphcache.',
      ),
      t(
        'Query keys: фабрика на фичу (orderKeys.list(filters), orderKeys.detail(id)); хуки useOrders() прячут детали от компонентов.',
        'Query keys: a per-feature factory (orderKeys.list(filters), orderKeys.detail(id)); useOrders() hides details from components.',
      ),
    ],
    redFlag: t(
      'Всё кладу в Redux, включая данные с сервера и состояние инпутов.',
      'Put everything in Redux, including server data and input state.',
    ),
    diagram: {
      nodes: [
        node(
          'query',
          'query',
          t('TanStack Query', 'TanStack Query'),
          t('Серверные данные — кэш: загрузка, дедупликация, рефетч, инвалидация.', 'Server data is a cache: loading, deduplication, refetch, invalidation.'),
          t('RTK Query или SWR решают ту же задачу.', 'RTK Query or SWR do the same job.'),
          t('Как инвалидируете связанные ключи после мутации?', 'How do you invalidate related keys after a mutation?'),
        ),
        node(
          'url',
          'browser',
          t('URL search params', 'URL search params'),
          t('Фильтры и пагинация переживают перезагрузку и шарятся ссылкой.', 'Filters and pagination survive reload and are shareable as a link.'),
          t('Локальный стор, если шаринг не нужен.', 'A local store if sharing is not needed.'),
          t('Где нормализуете пустые query params?', 'Where do you normalise empty query params?'),
        ),
        node(
          'local',
          'ui',
          t('useState / forms', 'useState / forms'),
          t('Локальный UI и формы не обязаны жить в глобальном сторе.', 'Local UI and forms do not belong in a global store.'),
          t('useReducer, если переходов много.', 'useReducer when there are many transitions.'),
          t('Почему инпут в Redux — красный флаг?', 'Why is an input in Redux a red flag?'),
        ),
        node(
          'zustand',
          'store',
          t('Zustand / Redux', 'Zustand / Redux'),
          t('Остаток клиентского глобального состояния обычно мал.', 'The leftover global client state is usually small.'),
          t('Redux Toolkit, когда клиентской логики много и нужны строгие паттерны.', 'Redux Toolkit when there is a lot of client logic and the team wants strict patterns.'),
          t('Что осталось в сторе после того, как сервер уехал в Query, а фильтры — в URL?', 'What is left in the store once the server is in Query and filters are in the URL?'),
        ),
      ],
      edges: [
        edge('query', 'local', t('хуки данных', 'data hooks', 'hooki danych')),
        edge('url', 'local', t('фильтры', 'filters')),
        edge('zustand', 'local', t('узкий клиентский срез', 'thin client slice')),
      ],
    },
  },
  rendering: {
    id: 'rendering',
    title: t('Рендеринг: CSR, SSR, SSG, ISR, RSC', 'Rendering: CSR, SSR, SSG, ISR, RSC', 'Rendering: CSR, SSR, SSG, ISR, RSC'),
    thesis: t(
      'Стратегию рендеринга выбирают по странице, а не по проекту: маркетинг — статика, каталог — ISR/SSR, личный кабинет — CSR. Главные критерии: SEO, свежесть данных, персонализация, стоимость серверов.',
      'Pick a rendering strategy per page, not per project: marketing is static, catalogue is ISR/SSR, the account area is CSR. The main criteria are SEO, data freshness, personalisation and server cost.', 'Strategię renderingu wybiera się per strona, nie per projekt: marketing — statyka, katalog — ISR/SSR, konto — CSR. Główne kryteria: SEO, świeżość danych, personalizacja, koszt serwerów.',
    ),
    ...TEXTBOOK.rendering,
    rows: [
      {
        label: t('CSR (SPA)', 'CSR (SPA)'),
        body: t(
          'Пустой HTML + JS в браузере. Плюсы: дешёвый CDN, простота, быстрая навигация после загрузки. Минусы: медленный первый показ, слабое SEO, зависимость от JS. Админки и дашборды за логином.',
          'Empty HTML plus JS in the browser. Pros: cheap CDN, simplicity, fast navigation after load. Cons: slow first paint, weak SEO, JS dependency. Admin and logged-in dashboards.',
        ),
      },
      {
        label: t('SSR', 'SSR'),
        body: t(
          'HTML на каждый запрос. Быстрый первый контент, SEO, персонализация. Цена: нагрузка на сервер, TTFB, hydration и окружение без window. Публичные страницы со свежими/персональными данными.',
          'HTML on every request. Fast first content, SEO, personalisation. Cost: server load, TTFB, hydration and no window on the server. Public pages with fresh or personal data.',
        ),
      },
      {
        label: t('SSG', 'SSG'),
        body: t(
          'HTML на билде. Максимально быстро и дёшево на CDN. Данные устаревают до следующего билда; тысячи страниц удлиняют билд. Лендинги, документация, блог.',
          'HTML at build time. Fastest and cheapest on a CDN. Data goes stale until the next build; thousands of pages slow the build. Landings, docs, blog.',
        ),
      },
      {
        label: t('ISR', 'ISR'),
        body: t(
          'SSG плюс фоновая перегенерация по времени или событию: скорость статики и относительная свежесть. Возможна устаревшая версия, сложнее кэш. Каталоги и карточки товаров.',
          'SSG plus background regeneration on a timer or event: static speed with acceptable freshness. A stale version is possible, cache debugging is harder. Catalogues and product pages.',
        ),
      },
      {
        label: t('RSC', 'RSC'),
        body: t(
          'Часть компонентов только на сервере, их JS не в бандле. Меньше JS, данные без API-слоя, streaming. Новая модель, граница "use client", привязка к фреймворку. Next.js App Router с большим объёмом контента.',
          'Some components run only on the server; their JS never ships. Less JS, data without an API layer, streaming. New mental model, "use client" boundary, framework lock-in. Next.js App Router with a lot of content.',
        ),
      },
    ],
    followUps: [
      t(
        'Hydration: клиент оживляет серверный HTML. Проблемы — страница «готова», но не кликается (INP/TBT), mismatch (даты, random, window), весь JS всё равно качается. Лечение: streaming + Suspense, острова (Astro), RSC.',
        'Hydration: the client wakes server HTML. Problems — the page looks ready but does not click (INP/TBT), mismatch (dates, random, window), all JS still downloads. Fix: streaming plus Suspense, islands (Astro), RSC.',
      ),
      t(
        'Streaming SSR: оболочка сразу, медленные блоки в Suspense догружаются. TTFB и FCP лучше, один медленный запрос не блокирует страницу.',
        'Streaming SSR: the shell first, slow blocks inside Suspense follow. TTFB and FCP improve; one slow request does not block the page.',
      ),
      t(
        'RSC vs SSR: SSR — способ получить HTML, компоненты всё равно гидратируются. RSC — тип компонентов, которые никогда не выполняются на клиенте. Их используют вместе.',
        'RSC vs SSR: SSR is how you get HTML; components still hydrate. RSC is a component type that never runs on the client. They are used together.',
      ),
      t(
        'Ускорить TTFB: кэш CDN/edge для неперсонального, параллельная загрузка данных, streaming, персонализация в островах.',
        'Faster TTFB: CDN/edge cache for non-personal parts, parallel data loading, streaming, personalisation in islands.',
      ),
      t(
        'Островная архитектура: статический HTML и независимые интерактивные острова (Astro). Хорошо для контентных сайтов с малым интерактом.',
        'Islands: static HTML plus independently hydrated islands (Astro). Good for content sites with little interactivity.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'cdn',
          'cdn',
          t('CDN / SSG / ISR', 'CDN / SSG / ISR'),
          t('Статика и фоновая перегенерация, когда данные меняются нечасто.', 'Static files and background regeneration when data changes infrequently.'),
          t('SSR на каждый запрос, если данные персональные и свежие.', 'SSR on every request when data is personal and fresh.'),
          t('Какой stale-window вы готовы отдать каталогу?', 'What stale window will you accept for the catalogue?'),
        ),
        node(
          'ssr',
          'app',
          t('SSR / RSC', 'SSR / RSC'),
          t('Сервер даёт HTML и, в RSC, компоненты без клиентского JS.', 'The server produces HTML and, with RSC, components with no client JS.'),
          t('CSR, если страница за логином и SEO не важно.', 'CSR if the page is behind login and SEO does not matter.'),
          t('Где проходит граница "use client"?', 'Where is the "use client" boundary?'),
        ),
        node(
          'csr',
          'browser',
          t('CSR / hydration', 'CSR / hydration'),
          t('Клиент рисует SPA или оживляет SSR HTML.', 'The client paints the SPA or hydrates SSR HTML.'),
          t('Острова, если интерактива мало.', 'Islands if there is little interactivity.'),
          t('Как ловите hydration mismatch в CI?', 'How do you catch a hydration mismatch in CI?'),
        ),
      ],
      edges: [
        edge('cdn', 'csr', t('статика', 'static')),
        edge('ssr', 'csr', t('HTML + hydrate', 'HTML + hydrate')),
        edge('ssr', 'cdn', t('ISR revalidate', 'ISR revalidate')),
      ],
    },
  },
  api: {
    id: 'api',
    title: t('Слой данных и API', 'Data layer and API', 'Warstwa danych i API'),
    thesis: t(
      'Компоненты не должны знать про fetch, URL и формат ответа сервера. Между ними — слой API с типизированным клиентом, маппингом DTO в доменные модели и единой обработкой ошибок.',
      'Components must not know about fetch, URLs or the server response shape. Between them sits an API layer with a typed client, DTO-to-domain mapping and unified error handling.', 'Komponenty nie powinny znać fetch, URL-i i kształtu odpowiedzi serwera. Między nimi jest warstwa API z typowanym klientem, mapowaniem DTO na modele domenowe i jednolitą obsługą błędów.',
    ),
    ...TEXTBOOK.api,
    rows: [
      {
        label: t('Транспорт', 'Transport', 'Transport'),
        body: t(
          'Один HTTP-клиент: базовый URL, авторизация, refresh, ретраи, таймауты, AbortController, корреляционный ID.',
          'One HTTP client: base URL, auth, refresh, retries, timeouts, AbortController, correlation id.',
        ),
      },
      {
        label: t('API-модули', 'API modules', 'Moduły API'),
        body: t(
          'Модули по доменам (ordersApi.getList); типы из OpenAPI/GraphQL; Zod и маппинг DTO → модель фронта.',
          'Domain modules (ordersApi.getList); types from OpenAPI/GraphQL; Zod and DTO → frontend model mapping.',
        ),
      },
      {
        label: t('Хуки данных', 'Data hooks', 'Hooki danych'),
        body: t(
          'useOrders(filters) на TanStack Query: кэш, статусы, инвалидация. Компоненты используют только этот уровень.',
          'useOrders(filters) on TanStack Query: cache, statuses, invalidation. Components use only this level.',
        ),
      },
      {
        label: t('REST', 'REST'),
        body: t(
          'Просто, HTTP-кэш, понятен всем. Цена: over/under-fetching и каскады для сложных экранов.',
          'Simple, HTTP cache, everyone knows it. Cost: over/under-fetching and waterfalls on complex screens.',
        ),
      },
      {
        label: t('GraphQL', 'GraphQL'),
        body: t(
          'Клиент берёт нужные поля, одна схема, нормализованный кэш. Сложнее CDN-кэш, риск тяжёлых запросов, нужна культура схемы.',
          'The client takes the fields it needs, one schema, normalised cache. Harder CDN cache, heavy-query risk, schema culture required.',
        ),
      },
      {
        label: t('BFF', 'BFF'),
        body: t(
          'Агрегация под экран, скрывает микросервисы, токены на сервере. Цена — ещё один сервис у фронтенд-команды.',
          'Aggregation for the screen, hides microservices, tokens stay on the server. Cost: another service for the frontend team.',
        ),
      },
    ],
    followUps: [
      t(
        'Ошибки: сеть (backoff), 401 (refresh затем логин), 403/404 (понятный UI), 5xx (ретрай + fallback), валидация к полям. Error boundaries маршрута и виджета. Логи — Sentry с контекстом.',
        'Errors: network (backoff), 401 (refresh then login), 403/404 (clear UI), 5xx (retry plus fallback), validation on fields. Route and widget error boundaries. Logs go to Sentry with context.',
      ),
      t(
        'Optimistic update: UI до ответа, откат при ошибке (onMutate → snapshot → onError → onSettled). Хорошо для лайка, чекбокса, DnD. Плохо для платежей.',
        'Optimistic update: UI before the response, rollback on error (onMutate → snapshot → onError → onSettled). Good for like, checkbox, DnD. Bad for payments.',
      ),
      t(
        'Гонки: AbortController / отмена по ключу Query, debounce поиска, игнор ответа не для текущих параметров, идемпотентность мутаций.',
        'Races: AbortController / Query key cancellation, search debounce, ignore a response that is not for current params, idempotent mutations.',
      ),
      t(
        'Polling — просто и редко; SSE — односторонний поток по HTTP для уведомлений; WebSocket — двусторонний канал (чаты, collab) с реконнектом, heartbeat и догоном событий.',
        'Polling is simple and infrequent; SSE is a one-way HTTP stream for notifications; WebSocket is two-way (chats, collab) with reconnect, heartbeat and event catch-up.',
      ),
      t(
        'Пагинация: cursor для бесконечных лент (стабильна при вставках), offset для таблиц со страницами; useInfiniteQuery + виртуализация.',
        'Pagination: cursor for infinite feeds (stable under inserts), offset for numbered tables; useInfiniteQuery plus virtualisation.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'ui',
          'ui',
          t('Component', 'Component'),
          t('Не знает про HTTP, URL и DTO — только хук данных.', 'Does not know HTTP, URLs or DTOs — only a data hook.'),
          t('Прямой fetch в useEffect — это и есть антипаттерн слоя.', 'A raw fetch in useEffect is the layer antipattern.'),
          t('Что тестируете в компоненте, если сеть мокается на хуке?', 'What do you test in the component if the network is mocked at the hook?'),
        ),
        node(
          'hooks',
          'query',
          t('Query hooks', 'Query hooks'),
          t('Кэш, статусы, инвалидация; компоненты живут только здесь.', 'Cache, statuses, invalidation; components live only here.'),
          t('Ручной стор серверных данных — обычно хуже готового Query.', 'A hand-rolled store of server data is usually worse than Query.'),
          t('Как устроена фабрика query keys на фичу?', 'How is the per-feature query-key factory shaped?'),
        ),
        node(
          'modules',
          'app',
          t('Domain API modules', 'Domain API modules'),
          t('Типы из OpenAPI, Zod, маппинг DTO в модель фронта.', 'Types from OpenAPI, Zod, DTO mapped to the frontend model.'),
          t('GraphQL-документы, если схема уже есть.', 'GraphQL documents if a schema already exists.'),
          t('Где правите переименование поля на бэкенде?', 'Where do you fix a renamed backend field?'),
        ),
        node(
          'transport',
          'api',
          t('HTTP transport', 'HTTP transport'),
          t('Auth, retry, timeout, AbortController, correlation id.', 'Auth, retry, timeout, AbortController, correlation id.'),
          t('BFF, если экран собирает каскад сервисов.', 'A BFF if the screen fans out to many services.'),
          t('Кто обновляет access-токен при 401?', 'Who refreshes the access token on 401?'),
        ),
      ],
      edges: [
        edge('ui', 'hooks', t('только хуки', 'hooks only')),
        edge('hooks', 'modules', t('доменный вызов', 'domain call')),
        edge('modules', 'transport', t('HTTP', 'HTTP')),
      ],
    },
  },
  scale: {
    id: 'scale',
    title: t('Масштабирование: монорепо, микрофронтенды, дизайн-система', 'Scale: monorepo, micro-frontends, design system', 'Skala: monorepo, mikrofrontendy, design system'),
    thesis: t(
      'Микрофронтенды решают организационную проблему (независимые команды и релизы), а не техническую. Если команд меньше 3–4 и они не мешают друг другу, модульный монолит в монорепо почти всегда дешевле.',
      'Micro-frontends solve an organisational problem (independent teams and releases), not a technical one. If you have fewer than 3–4 teams and they do not block each other, a modular monolith in a monorepo is almost always cheaper.', 'Mikrofrontendy rozwiązują problem organizacyjny (niezależne zespoły i releasy), nie techniczny. Jeśli zespołów jest mniej niż 3–4 i nie blokują się nawzajem, modularny monolit w monorepo jest prawie zawsze tańszy.',
    ),
    ...TEXTBOOK.scale,
    rows: [
      {
        label: t('Build-time (npm)', 'Build-time (npm)'),
        body: t(
          'Части как пакеты, один бандл. Просто, но нет независимого деплоя — по сути не микрофронтенды.',
          'Parts published as packages, one bundle. Simple, but no independent deploy — not really micro-frontends.',
        ),
      },
      {
        label: t('Module Federation', 'Module Federation'),
        body: t(
          'Shell грузит remote в рантайме, shared-зависимости. Независимый деплой, общий React. Сложная конфигурация и рантайм-ошибки версий.',
          'The shell loads remotes at runtime with shared deps. Independent deploy, shared React. Complex config and runtime version errors.',
        ),
      },
      {
        label: t('Сервер / edge routing', 'Server / edge routing'),
        body: t(
          'Разные приложения на /shop и /account. Максимальная изоляция, просто. Полная перезагрузка между частями, дублирование layout.',
          'Different apps on /shop and /account. Maximum isolation, simple. Full reload between parts, duplicated layout.',
        ),
      },
      {
        label: t('iframe', 'iframe'),
        body: t(
          'Полная изоляция CSS/JS. Цена: UX, доступность, postMessage.',
          'Full CSS/JS isolation. Cost: UX, accessibility, postMessage.',
        ),
      },
      {
        label: t('Web Components', 'Web Components'),
        body: t(
          'Custom elements, не зависят от фреймворка. Сложности со стилями, SSR и передачей данных.',
          'Custom elements, framework-agnostic. Pain with styles, SSR and passing data.',
        ),
      },
    ],
    followUps: [
      t(
        'Сначала модульный монолит в монорепо с границами и CODEOWNERS — 80% пользы. Если MFE, то общий shell, общая дизайн-система и строгий контракт. Коммуникация — URL, события или тонкий контракт, без чужих импортов и общего глобального стора.',
        'Start with a modular monolith in a monorepo with boundaries and CODEOWNERS — 80% of the value. If MFE, then a shared shell, shared design system and a strict contract. Talk via URL, events or a thin contract, no foreign imports and no shared global store.',
      ),
      t(
        'Монорепо на Nx/Turborepo: атомарные изменения библиотеки и потребителей, единые версии, общий CI; нужны affected-сборки и remote cache. Полирепо — когда циклы команд действительно независимы.',
        'Monorepo with Nx/Turborepo: atomic library-plus-consumer changes, one dependency set, one CI; you need affected builds and a remote cache. Polyrepo when team cycles are genuinely independent.',
      ),
      t(
        'Дизайн-система: токены из Figma (Style Dictionary) → примитивы на Radix/React Aria → композиционный API → Storybook и Chromatic → semver/codemods → ownership вклада.',
        'Design system: tokens from Figma (Style Dictionary) → primitives on Radix/React Aria → compositional API → Storybook and Chromatic → semver/codemods → contribution ownership.',
      ),
      t(
        'Runtime CSS-in-JS плохо с RSC и стоит производительности; чаще CSS Modules, Tailwind или zero-runtime (vanilla-extract, Panda).',
        'Runtime CSS-in-JS fights RSC and costs performance; CSS Modules, Tailwind or zero-runtime (vanilla-extract, Panda) are more common now.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'monolith',
          'app',
          t('Modular monolith', 'Modular monolith'),
          t('Жёсткие границы и CODEOWNERS закрывают 80% орг-боли без MFE.', 'Strict boundaries and CODEOWNERS cover 80% of the org pain without MFE.'),
          t('MFE, когда команды реально блокируют релизы друг друга.', 'MFE when teams actually block each other’s releases.'),
          t('Какой сигнал заставил бы вас всё же резать на микрофронтенды?', 'What signal would still make you split into micro-frontends?'),
        ),
        node(
          'mono',
          'ci',
          t('Nx / Turborepo', 'Nx / Turborepo'),
          t('Атомарные PR, affected CI, remote cache.', 'Atomic PRs, affected CI, remote cache.'),
          t('Полирепо при независимых циклах поставки.', 'Polyrepo when delivery cycles are independent.'),
          t('Что будет с CI без affected и кэша?', 'What happens to CI without affected builds and a cache?'),
        ),
        node(
          'shell',
          'mfe',
          t('MFE shell', 'MFE shell'),
          t('Общий shell, дизайн-система и контракт, если независимый деплой обязателен.', 'Shared shell, design system and contract if independent deploy is mandatory.'),
          t('Edge routing по путям без runtime composition.', 'Edge routing by path without runtime composition.'),
          t('Как части общаются без общего глобального стора?', 'How do parts communicate without a shared global store?'),
        ),
        node(
          'ds',
          'ui',
          t('Design system', 'Design system', 'Design system'),
          t('Токены, примитивы, Storybook — общая поверхность даже при MFE.', 'Tokens, primitives, Storybook — a shared surface even with MFE.'),
          t('Копипаст примитивов, пока потребителей мало.', 'Copied primitives while there are few consumers.'),
          t('Кто принимает новый компонент в систему?', 'Who accepts a new component into the system?'),
        ),
      ],
      edges: [
        edge('monolith', 'mono', t('пакеты', 'packages')),
        edge('shell', 'ds', t('общий UI', 'shared UI')),
        edge('monolith', 'ds', t('потребляет', 'consumes')),
        edge('shell', 'monolith', t('когда орг-боль выросла', 'when org pain grew')),
      ],
    },
  },
  perf: {
    id: 'perf',
    title: t('Производительность', 'Performance', 'Wydajność'),
    thesis: t(
      'Ответ senior-уровня начинается с измерения, а не с useMemo: сначала метрики реальных пользователей (RUM), затем профилирование, затем точечные исправления и бюджет в CI, чтобы не откатиться.',
      'A senior answer starts with measurement, not useMemo: real-user metrics (RUM) first, then profiling, then targeted fixes and a CI budget so it does not regress.', 'Odpowiedź na poziomie seniora zaczyna się od pomiaru, nie od useMemo: najpierw metryki prawdziwych użytkowników (RUM), potem profilowanie, potem punktowe poprawki i budżet w CI, żeby się nie cofnęło.',
    ),
    ...TEXTBOOK.perf,
    rows: [
      {
        label: t('LCP ≤ 2,5 с', 'LCP ≤ 2.5 s'),
        body: t(
          'Когда отрисован главный контент. Частые причины: медленный TTFB, тяжёлое hero, рендер только после JS. Лечение: SSR/SSG, fetchpriority="high" и preload, AVIF/WebP, CDN.',
          'When the main content paints. Common causes: slow TTFB, heavy hero, render only after JS. Fix: SSR/SSG, fetchpriority="high" and preload, AVIF/WebP, CDN.',
        ),
      },
      {
        label: t('INP ≤ 200 мс', 'INP ≤ 200 ms'),
        body: t(
          'Задержка отклика. Причины: длинные задачи, тяжёлые ререндеры, hydration. Лечение: дробить задачи, useTransition/useDeferredValue, виртуализация, Web Workers.',
          'Input delay. Causes: long tasks, heavy re-renders, hydration. Fix: split tasks, useTransition/useDeferredValue, virtualisation, Web Workers.',
        ),
      },
      {
        label: t('CLS ≤ 0,1', 'CLS ≤ 0.1'),
        body: t(
          'Сдвиги вёрстки. Причины: изображения без размеров, баннеры, шрифты. Лечение: width/height или aspect-ratio, резерв места, font-display и preload шрифтов.',
          'Layout shift. Causes: images without dimensions, banners, fonts. Fix: width/height or aspect-ratio, reserved space, font-display and font preload.',
        ),
      },
    ],
    followUps: [
      t(
        'Бандл: visualizer, route splitting и React.lazy, tree shaking, замена moment на date-fns, dynamic import редких фич, size-limit в CI.',
        'Bundle: visualizer, route splitting and React.lazy, tree shaking, moment → date-fns, dynamic import of rare features, size-limit in CI.',
      ),
      t(
        'Ререндеры: Profiler и Highlight updates. Лечение — colocation стейта, children, селекторы, memo точечно по профайлеру. React Compiler снижает нужду в ручном useMemo.',
        'Re-renders: Profiler and Highlight updates. Fix with state colocation, children, selectors, memo only from the profiler. React Compiler reduces hand-written useMemo.',
      ),
      t(
        '10 000 строк: виртуализация (TanStack Virtual, react-window), серверная пагинация/infinite scroll, мемоизация строк, стабильные key.',
        '10 000 rows: virtualisation (TanStack Virtual, react-window), server pagination/infinite scroll, memoized rows, stable keys.',
      ),
      t(
        'Ресурсы: preconnect, preload шрифтов и hero, lazy картинок ниже fold, immutable hash-кэш, Brotli, CDN, prefetch маршрута по hover.',
        'Assets: preconnect, preload fonts and hero, lazy images below the fold, immutable hash cache, Brotli, CDN, prefetch the next route on hover.',
      ),
      t(
        'Тяжёлые вычисления: Web Worker (Comlink), requestIdleCallback, scheduler.yield() для длинных задач.',
        'Heavy compute: Web Worker (Comlink), requestIdleCallback, scheduler.yield() for long tasks.',
      ),
    ],
    redFlag: t(
      'Оборачиваю всё в useMemo и useCallback без упоминания измерений.',
      'Wrap everything in useMemo and useCallback with no mention of measurement.',
    ),
    diagram: {
      nodes: [
        node(
          'rum',
          'browser',
          t('RUM / CWV', 'RUM / CWV'),
          t('Сначала полевые LCP, INP, CLS, потом гипотеза.', 'Field LCP, INP, CLS first, then a hypothesis.'),
          t('Только лабораторный Lighthouse без RUM — слепое пятно.', 'Lab-only Lighthouse without RUM is a blind spot.'),
          t('Какая метрика плохая у реальных пользователей и на каких страницах?', 'Which metric is bad for real users, and on which pages?'),
        ),
        node(
          'profile',
          'app',
          t('Profiler / Performance', 'Profiler / Performance'),
          t('Диагностика ререндеров и длинных задач после RUM.', 'Diagnose re-renders and long tasks after RUM.'),
          t('Догадки про useMemo без профайлера.', 'Guessing at useMemo without a profiler.'),
          t('Это LCP, INP или CLS — и почему именно эта?', 'Is it LCP, INP or CLS — and why that one?'),
        ),
        node(
          'cdn',
          'cdn',
          t('CDN / assets', 'CDN / assets'),
          t('Hero, шрифты, Brotli, hash-кэш — типичный рычаг LCP/CLS.', 'Hero, fonts, Brotli, hash cache — a typical LCP/CLS lever.'),
          t('SSR, если TTFB, а не картинка, держит LCP.', 'SSR if TTFB, not the image, holds LCP.'),
          t('Что preload, а что оставляете lazy?', 'What do you preload, and what stays lazy?'),
        ),
        node(
          'budget',
          'ci',
          t('CI budget', 'CI budget'),
          t('Size-limit и Lighthouse в CI, чтобы исправление не откатилось.', 'Size-limit and Lighthouse in CI so the fix does not regress.'),
          t('Ручной аудит раз в квартал — поздно.', 'A quarterly manual audit is too late.'),
          t('Какой порог ломает сборку?', 'Which threshold fails the build?'),
        ),
      ],
      edges: [
        edge('rum', 'profile', t('какая метрика', 'which metric')),
        edge('profile', 'cdn', t('LCP / CLS', 'LCP / CLS')),
        edge('profile', 'budget', t('закрепить', 'lock in')),
        edge('cdn', 'budget', t('размер / Lighthouse', 'size / Lighthouse')),
      ],
    },
  },
  reliability: {
    id: 'reliability',
    title: t('Надёжность: тесты, ошибки, наблюдаемость, релизы', 'Reliability: tests, errors, observability, releases', 'Niezawodność: testy, błędy, obserwowalność, releasy'),
    thesis: t(
      'Надёжный фронтенд — это не 100% покрытия, а быстрое обнаружение проблем и дешёвый откат: осмысленные тесты, мониторинг ошибок и метрик, релизы за feature flags.',
      'A reliable frontend is not 100% coverage; it is fast detection and a cheap rollback: meaningful tests, error and metric monitoring, releases behind feature flags.', 'Niezawodny frontend to nie 100% pokrycia, tylko szybkie wykrycie problemów i tani rollback: sensowne testy, monitoring błędów i metryk, releasy za feature flags.',
    ),
    ...TEXTBOOK.reliability,
    rows: [
      {
        label: t('Testing trophy', 'Testing trophy'),
        body: t(
          'Основной объём — интеграционные тесты Testing Library глазами пользователя, сеть — MSW. Unit — чистая логика. E2E Playwright — мало, только критичные сценарии. Плюс strict TypeScript и ESLint. Покрытие — индикатор, не цель.',
          'Most effort: Testing Library integration tests through the user’s eyes, network via MSW. Unit tests for pure logic. Playwright e2e — few, critical flows only. Plus strict TypeScript and ESLint. Coverage is a signal, not a goal.',
        ),
      },
      {
        label: t('Flaky e2e', 'Flaky e2e'),
        body: t(
          'Ждать состояния, не таймауты; изолированные данные; getByRole / data-testid; карантин со владельцем; трейсы и видео при падении.',
          'Wait for states, not timeouts; isolated data; getByRole / data-testid; quarantine with an owner; traces and video on failure.',
        ),
      },
      {
        label: t('Ошибки в UI', 'UI errors', 'Błędy w UI'),
        body: t(
          'Error boundaries на приложении, маршруте и виджете с fallback и «повторить»; onerror/unhandledrejection; Query throwOnError выборочно; Sentry с source maps и релизом.',
          'Error boundaries at app, route and widget with fallback and retry; onerror/unhandledrejection; Query throwOnError selectively; Sentry with source maps and release.',
        ),
      },
      {
        label: t('Прод-сигналы', 'Prod signals', 'Sygnały z produkcji'),
        body: t(
          'Sentry-алерты на всплеск; RUM и CWV по релизам; воронка как ранний сигнал бага; синтетика критичных сценариев; дашборды по версиям.',
          'Sentry alerts on a spike; RUM and CWV by release; funnel as an early bug signal; synthetics on critical flows; dashboards by version.',
        ),
      },
      {
        label: t('Выкат', 'Rollout', 'Wdrożenie'),
        body: t(
          'Feature flags: деплой ≠ релиз, процент, мгновенное выключение. Preview на PR, canary, immutable CDN и переключение версии. У флага — владелец и срок жизни.',
          'Feature flags: deploy ≠ release, percentage, instant off. Preview per PR, canary, immutable CDN and version switch. Each flag has an owner and a lifetime.',
        ),
      },
    ],
    followUps: [
      t(
        'Старая вкладка: hashed assets живут на CDN; ошибку чанка ловим и мягко перезагружаем; опционально «доступна новая версия»; API обратно совместим на переход.',
        'Stale tab: hashed assets stay on the CDN; catch a chunk load error and reload gently; optional “new version available”; API stays backward compatible during the transition.',
      ),
      t(
        'CI: типы → линтеры границ → unit/integration → сборка + size-limit → e2e на preview → Lighthouse CI; affected-only и remote cache в монорепо.',
        'CI: types → boundary linters → unit/integration → build plus size-limit → e2e on preview → Lighthouse CI; affected-only and remote cache in a monorepo.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'static',
          'ci',
          t('TS + ESLint', 'TS + ESLint'),
          t('Бесплатный класс ошибок: типы и границы модулей.', 'A free class of bugs: types and module boundaries.'),
          t('Только e2e без статики — дорого и дыряво.', 'E2e only, without static checks, is expensive and leaky.'),
          t('Что ещё кроме тестов ломает пайплайн?', 'Besides tests, what else fails the pipeline?'),
        ),
        node(
          'integration',
          'ui',
          t('Testing Library + MSW', 'Testing Library + MSW'),
          t('Основной объём trophy: поведение глазами пользователя.', 'The bulk of the trophy: behaviour through the user’s eyes.'),
          t('Мелкие enzyme-снимки реализации — хрупко.', 'Tiny enzyme snapshots of implementation are brittle.'),
          t('Почему мокаете сеть на MSW, а не в компоненте?', 'Why mock the network with MSW rather than inside the component?'),
        ),
        node(
          'e2e',
          'ci',
          t('Playwright critical', 'Playwright critical'),
          t('Мало сценариев: логин, оплата, checkout — они медленные и хрупкие.', 'Few flows: login, payment, checkout — they are slow and flaky.'),
          t('Полное UI-покрытие e2e не масштабируется.', 'Full UI coverage in e2e does not scale.'),
          t('Как карантините flaky-тест со владельцем и сроком?', 'How do you quarantine a flaky test with an owner and a deadline?'),
        ),
        node(
          'flags',
          'app',
          t('Feature flags', 'Feature flags'),
          t('Деплой отделён от релиза, откат — выключатель, не revert всего CDN.', 'Deploy is split from release; rollback is a switch, not a full CDN revert.'),
          t('Canary без флагов, если изменение чисто инфраструктурное.', 'Canary without flags if the change is purely infrastructural.'),
          t('Кто владеет флагом и когда его удаляют?', 'Who owns the flag, and when is it deleted?'),
        ),
      ],
      edges: [
        edge('static', 'integration', t('дешёвые проверки', 'cheap checks')),
        edge('integration', 'e2e', t('узкий e2e', 'narrow e2e')),
        edge('e2e', 'flags', t('безопасный выкат', 'safe rollout')),
      ],
    },
  },
  security: {
    id: 'security',
    title: t('Безопасность фронтенда', 'Frontend security', 'Bezpieczeństwo frontendu'),
    thesis: t(
      'Фронтенду нельзя доверять — любая проверка на клиенте нужна для UX, а безопасность обеспечивает сервер. Задача фронта — не открыть дыр: XSS, утечки токенов, уязвимые зависимости.',
      'Never trust the frontend — any client check is for UX; the server enforces security. The frontend job is not to open holes: XSS, token leaks, vulnerable dependencies.', 'Frontendowi nie można ufać — każda kontrola na kliencie jest dla UX, bezpieczeństwo egzekwuje serwer. Zadanie frontu to nie otworzyć dziur: XSS, wycieki tokenów, podatne zależności.',
    ),
    ...TEXTBOOK.security,
    rows: [
      {
        label: t('XSS', 'XSS'),
        body: t(
          'Внедрение чужого JS. Защита: экранирование React по умолчанию, DOMPurify, CSP с nonce, Trusted Types. Опасны dangerouslySetInnerHTML, javascript: ссылки и сторонние скрипты.',
          'Injected JS. Defence: React escaping by default, DOMPurify, CSP with nonce, Trusted Types. Risky: dangerouslySetInnerHTML, javascript: links and third-party scripts.',
        ),
      },
      {
        label: t('CSRF', 'CSRF'),
        body: t(
          'Запрос от имени пользователя с чужого сайта. SameSite-cookie, CSRF-токены, проверка Origin.',
          'A request as the user from another site. SameSite cookie, CSRF tokens, Origin check.',
        ),
      },
      {
        label: t('Кража токенов', 'Token theft', 'Kradzież tokenów'),
        body: t(
          'Токен читается скриптом. httpOnly cookie, короткоживущий access + refresh-ротация, BFF. localStorage доступен любому скрипту: одна XSS = кража JWT.',
          'A script can read the token. httpOnly cookie, short-lived access plus refresh rotation, BFF. localStorage is visible to any script: one XSS equals a stolen JWT.',
        ),
      },
      {
        label: t('Clickjacking', 'Clickjacking'),
        body: t(
          'Сайт в невидимом iframe. frame-ancestors в CSP, X-Frame-Options.',
          'The site in a hidden iframe. frame-ancestors in CSP, X-Frame-Options.',
        ),
      },
      {
        label: t('Supply chain', 'Supply chain'),
        body: t(
          'Вредоносный или уязвимый npm-пакет. lockfile, npm audit / Snyk / Dependabot, минимум зависимостей, SRI для CDN-скриптов.',
          'A malicious or vulnerable npm package. lockfile, npm audit / Snyk / Dependabot, few dependencies, SRI for CDN scripts.',
        ),
      },
      {
        label: t('Утечка секретов', 'Secret leaks', 'Wyciek sekretów'),
        body: t(
          'API-ключи в бандле. Все NEXT_PUBLIC_ / VITE_ переменные считать публичными; секреты только на сервере.',
          'API keys in the bundle. Treat every NEXT_PUBLIC_ / VITE_ variable as public; secrets stay on the server.',
        ),
      },
    ],
    followUps: [
      t(
        'JWT в localStorage или cookie: localStorage читает любой скрипт; httpOnly cookie недоступна JS, но нужна защита от CSRF (SameSite). Оптимально BFF / сессионная cookie, токены к API на сервере.',
        'JWT in localStorage vs cookie: localStorage is readable by any script; httpOnly cookies are hidden from JS but need CSRF defence (SameSite). Best: BFF / session cookie, API tokens stay on the server.',
      ),
      t(
        'CORS — механизм браузера, который разрешает или запрещает чтение ответа с другого origin. Это не защита сервера: curl CORS не ограничивает.',
        'CORS is a browser mechanism that allows or blocks reading a cross-origin response. It is not server protection: curl is not limited by CORS.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'browser',
          'browser',
          t('Browser', 'Browser', 'Przeglądarka'),
          t('Клиент контролирует злоумышленник: проверки на клиенте — UX, не безопасность.', 'An attacker controls the client: client checks are UX, not security.'),
          t('Слепая вера в скрытые поля формы.', 'Blind trust in hidden form fields.'),
          t('Что останется безопасным, если XSS исполнит любой JS?', 'What stays safe if XSS can run arbitrary JS?'),
        ),
        node(
          'csp',
          'app',
          t('CSP + DOMPurify', 'CSP + DOMPurify'),
          t('XSS: санитизация HTML и строгий CSP с nonce / Trusted Types.', 'XSS: sanitise HTML and a strict CSP with nonce / Trusted Types.'),
          t('Только экранирование React, если HTML из CMS нет.', 'React escaping alone if there is no CMS HTML.'),
          t('Какой nonce/hash у инлайна и кто его выдаёт?', 'Which nonce/hash covers inline script, and who issues it?'),
        ),
        node(
          'bff',
          'bff',
          t('BFF / httpOnly', 'BFF / httpOnly'),
          t('Токены не в localStorage: сессия на сервере или httpOnly SameSite cookie.', 'Tokens not in localStorage: server session or httpOnly SameSite cookie.'),
          t('Короткоживущий JWT в памяти вкладки плюс refresh-ротация.', 'A short-lived JWT in tab memory plus refresh rotation.'),
          t('Как закрываете CSRF при cookie-сессии?', 'How do you close CSRF on a cookie session?'),
        ),
        node(
          'api',
          'api',
          t('Server authz', 'Server authz'),
          t('Авторизация и валидация всегда дублируются на сервере.', 'Authorisation and validation are always enforced on the server too.'),
          t('«Секретный» клиентский флаг роли — не защита.', 'A “secret” client role flag is not protection.'),
          t('Почему CORS не заменяет проверку Origin/сессии на API?', 'Why does CORS not replace Origin/session checks on the API?'),
        ),
      ],
      edges: [
        edge('browser', 'csp', t('XSS поверхность', 'XSS surface')),
        edge('browser', 'bff', t('без токена в JS', 'no token in JS')),
        edge('bff', 'api', t('серверная сессия', 'server session')),
      ],
    },
  },
  leadership: {
    id: 'leadership',
    title: t('Процесс и лидерство', 'Process and leadership', 'Proces i przywództwo'),
    thesis: t(
      'От senior ждут не только хороших решений, но и умения провести их через команду: зафиксировать, согласовать, внедрить постепенно и не остановить при этом продукт.',
      'A senior is expected not only to pick good solutions but to carry them through the team: write them down, align, roll them out gradually, and keep the product shipping.', 'Od seniora oczekuje się nie tylko dobrych decyzji, ale też przeprowadzenia ich przez zespół: zapisać, uzgodnić, wdrożyć stopniowo i nie zatrzymać przy tym produktu.',
    ),
    ...TEXTBOOK.leadership,
    rows: [
      {
        label: t('ADR / RFC', 'ADR / RFC'),
        body: t(
          'Значимые решения — ADR: контекст, варианты, решение, последствия. Крупное — RFC и фидбек команд, часто с прототипом. Не голосование, а аргументы и владелец. ADR в репозитории, чтобы через год было ясно почему.',
          'Significant decisions are ADRs: context, options, decision, consequences. Larger changes start as an RFC with team feedback, often a prototype. Not a vote — arguments and an owner. ADRs live in the repo so a year later the why is clear.',
        ),
      },
      {
        label: t('Техдолг', 'Tech debt', 'Dług techniczny'),
        body: t(
          'Сначала видимость: реестр с влиянием на фичи и баги. Приоритет impact/cost, доля 15–20% спринта или бойскаут рядом с фичей. Бизнесу — на его языке: «корзина дороже на 2–3 дня».',
          'Visibility first: a register of impact on features and bugs. Prioritise impact/cost, a steady 15–20% of the sprint or boy-scout work next to a feature. Explain in business terms: “checkout costs two or three extra days”.',
        ),
      },
      {
        label: t('Миграция', 'Migration', 'Migracja'),
        body: t(
          'Обоснование и метрики успеха; strangler fig без большого переписывания; codemods и линтер на старый паттерн; счётчик в CI; флаги и rollout; срок и владелец, иначе «80%» живёт годами.',
          'Rationale and success metrics; strangler fig, no big-bang rewrite; codemods and a lint ban on the old pattern; a CI counter; flags and rollout; a deadline and an owner, or the “80% done” migration lives for years.',
        ),
      },
      {
        label: t('Качество в команде', 'Team quality', 'Jakość w zespole'),
        body: t(
          'Автоматизация вместо договорённостей: линтеры, форматтер, границы, типы в CI; гайдлайны и генераторы фич; ревью про дизайн, не про стиль; CODEOWNERS; онбординг и парное.',
          'Automation instead of honour agreements: linters, formatter, boundaries, types in CI; guidelines and feature generators; review for design, not style; CODEOWNERS; onboarding and pairing.',
        ),
      },
      {
        label: t('Ошибочное решение', 'A wrong decision', 'Błędna decyzja'),
        body: t(
          'STAR: неверная предпосылка, как заметили, как исправили, какой вывод. Не перекладывать вину. We adopted X because Y; six months in, Z; proposed W; lesson — pilot before committing the codebase.',
          'STAR: the wrong assumption, how you noticed, how you fixed it, the lesson. Do not blame others. We adopted X because Y; six months in, Z; proposed W; lesson — pilot before committing the codebase.',
        ),
      },
    ],
    followUps: [
      t(
        'Лучшей архитектуры нет — есть подходящая под контекст. Стартап из трёх человек: простая feature-based и минимум абстракций. Двадцать человек в пяти командах: жёсткие границы, монорепо, дизайн-система. Дешёвыми должны быть частые изменения.',
        'There is no best architecture — only one that fits. A three-person startup: simple feature-based, few abstractions. Twenty people in five teams: strict boundaries, monorepo, design system. Frequent changes should be the cheap ones.',
      ),
      t(
        'На ранней стадии чрезмерная архитектура вредит, но минимальные правила (границы, типы, тесты критичных путей) окупаются за месяцы — evolutionary architecture.',
        'Early on, too much architecture hurts, but minimal rules (boundaries, types, tests of critical paths) pay off within months — evolutionary architecture.',
      ),
      t(
        'Переписать с нуля почти никогда: риск, остановка продукта, потеря исправлений. Strangler fig с измеримыми целями.',
        'A full rewrite almost never: risk, product halt, lost fixes. Strangler fig with measurable goals.',
      ),
      t(
        'Несогласная технология команды: аргументы с данными, критерии пересмотра — и disagree and commit.',
        'The team picked a tech you dislike: argue with data, agree review criteria — then disagree and commit.',
      ),
    ],
    redFlag: t(
      'Ответ начинается с библиотек; «всегда/никогда» без контекста; нет trade-off; не видно вклада или команды; обвинения коллег; нет метрик своего продукта.',
      'The answer starts with libraries; “always/never” with no context; no trade-off; no personal contribution or no team; blaming colleagues; no metrics from your product.',
    ),
    diagram: {
      nodes: [
        node(
          'rfc',
          'ui',
          t('RFC + prototype', 'RFC + prototype'),
          t('Крупное изменение сначала обсуждается с затронутыми командами.', 'A large change is discussed with affected teams first.'),
          t('Сразу ADR без фидбека — для локального решения.', 'Jump straight to an ADR for a local decision.'),
          t('Кто из команд обязан ответить на RFC?', 'Which teams must reply to the RFC?'),
        ),
        node(
          'adr',
          'store',
          t('ADR in repo', 'ADR in repo'),
          t('Контекст, варианты, решение, последствия и владелец живут рядом с кодом.', 'Context, options, decision, consequences and owner live next to the code.'),
          t('Confluence без связи с PR быстро устаревает.', 'Confluence with no PR link goes stale fast.'),
          t('При каком сигнале ADR пересматривают?', 'What signal triggers revisiting the ADR?'),
        ),
        node(
          'strangler',
          'app',
          t('Strangler fig', 'Strangler fig'),
          t('Новое пишем по-новому, старое вытесняем; линтер запрещает старый паттерн.', 'New code follows the new path, old code is displaced; lint bans the old pattern.'),
          t('Большое переписывание — почти всегда ошибка.', 'A big-bang rewrite is almost always a mistake.'),
          t('Какая метрика в CI показывает, что миграция не зависла на 80%?', 'Which CI metric shows the migration is not stuck at 80%?'),
        ),
        node(
          'ci',
          'ci',
          t('CI + CODEOWNERS', 'CI + CODEOWNERS'),
          t('Правила автоматизированы, иначе живут, пока автор в команде.', 'Rules are automated, or they live only while the author stays.'),
          t('Только code review без линтеров границ.', 'Code review only, with no boundary linters.'),
          t('Как онбординг находит ADR и шаблон фичи за минуты?', 'How does onboarding find the ADR and the feature generator in minutes?'),
        ),
      ],
      edges: [
        edge('rfc', 'adr', t('решение', 'decision')),
        edge('adr', 'strangler', t('внедрение', 'rollout')),
        edge('strangler', 'ci', t('запрет старого', 'ban the old')),
        edge('ci', 'adr', t('пересмотр', 'revisit')),
      ],
    },
  },
}

export function getTopic(id: TopicId): Topic {
  return TOPICS[id]
}
