import { edge, node, t } from './diagram'
import type { ArchitectureProfile, ProfileId } from './types'

const queryNode = node(
  'query',
  'query',
  t('TanStack Query', 'TanStack Query'),
  t(
    'Серверные данные — это кэш, не глобальный стор: загрузка, дедупликация, рефетч и инвалидация живут в Query.',
    'Server data is a cache, not a global store: loading, deduplication, refetch and invalidation live in Query.',
  ),
  t(
    'RTK Query или SWR решают ту же задачу; серверный кэш — не место для Redux.',
    'RTK Query or SWR solve the same job; server cache does not belong in Redux.',
  ),
  t(
    'Как инвалидируете связанные ключи после мутации и где живёт URL-состояние фильтров?',
    'How do you invalidate related keys after a mutation, and where do filter URL params live?',
  ),
)

const apiNode = node(
  'api',
  'api',
  t('HTTP API / OpenAPI', 'HTTP API / OpenAPI'),
  t(
    'Компоненты не знают про HTTP: транспорт, доменные модули и сгенерированные типы отделены от UI.',
    'Components do not know about HTTP: transport, domain modules and generated types sit below the UI.',
  ),
  t('GraphQL, если много клиентов с разными формами данных и команда готова вести схему.', 'GraphQL when many clients need different shapes and the team will own the schema.'),
  t('Где маппятся DTO в модели фронта и кто ловит расхождение контракта в CI?', 'Where are DTOs mapped to frontend models, and how does CI catch contract drift?'),
)

const ciNode = node(
  'ci',
  'ci',
  t('CI / CDN-выкладка', 'CI / CDN deploy'),
  t('Сборка, линтеры границ модулей и выкладка артефакта — часть архитектуры, не «потом».', 'Build, module-boundary lint and shipping the artefact are architecture, not an afterthought.'),
  t('Отдельные пайплайны на команду, если релизы действительно независимы.', 'Per-team pipelines if releases are genuinely independent.'),
  t('Что именно проверяет CI кроме тестов: границы модулей, типы OpenAPI, бюджет бандла?', 'Besides tests, what does CI enforce — module boundaries, OpenAPI types, bundle budget?'),
)

export const PROFILES: Record<ProfileId, ArchitectureProfile> = {
  csr_spa: {
    id: 'csr_spa',
    title: t('CSR SPA на Vite', 'CSR SPA on Vite'),
    summary: t(
      'Клиентский SPA: дешёвый CDN-хостинг, структура по фичам, серверные данные в Query и чуть Zustand.',
      'Client-rendered SPA: cheap CDN hosting, feature-based structure, server data in Query and a little Zustand.',
    ),
    rendering: t(
      'CSR: пустой HTML + JS рендерит в браузере. Страницы за логином, SEO не важно — этого достаточно и это дёшево.',
      'CSR: empty HTML plus JS renders in the browser. Logged-in pages where SEO does not matter — enough, and cheap.',
    ),
    structure: t(
      'По умолчанию код по фичам: компоненты, хуки, API и тесты рядом, наружу — публичный API через index-файл. Если команд 2–3 или 4+, усиливаю до FSD или облегчённых слоёв с правилом «импортировать только вниз» и eslint-plugin-boundaries.',
      'By default organise by feature: components, hooks, API and tests live together with a public index. With 2–3 or 4+ teams, move to FSD or a lighter layered variant with downward-only imports enforced by eslint-plugin-boundaries.',
    ),
    repo: t(
      'Одно Vite + React + TypeScript приложение, статика на CDN. Монорепо не обязателен, пока нет нескольких приложений и общей дизайн-системы.',
      'A single Vite + React + TypeScript app, static files on a CDN. A monorepo is optional until there are several apps and a shared design system.',
    ),
    state: t(
      'Серверные данные — TanStack Query. Глобального клиентского состояния мало, его хватает Zustand. Фильтры и пагинация — в URL. Redux не используем как кэш сервера.',
      'Server data lives in TanStack Query. Little global client state sits in Zustand. Filters and pagination live in the URL. Redux is not the server cache.',
    ),
    why: t(
      'Админка и B2B за логином не нуждаются в SSR: нет SEO-требования, а CDN-хостинг и простая навигация после загрузки дешевле серверного рендера.',
      'Admin and logged-in B2B do not need SSR: no SEO requirement, and CDN hosting plus fast client navigation is cheaper than a render server.',
    ),
    tradeoffs: [
      t(
        'Цена — медленный первый показ, слабое SEO и зависимость от JS: пустой HTML, пока бандл не выполнится.',
        'The trade-off is a slow first paint, weak SEO and a JS dependency: empty HTML until the bundle runs.',
      ),
      t(
        'BFF не обязателен: если экраны не собирают каскад из микросервисов, лишний Node-слой только увеличивает стоимость.',
        'A BFF is not required: if screens do not fan out to many microservices, an extra Node layer only adds cost.',
      ),
    ],
    evolution: [
      t(
        'Если появится публичный маркетинг с критичным SEO — вынесу эти маршруты в SSG/ISR, кабинет оставлю CSR.',
        'If public marketing with critical SEO appears, I would extract those routes to SSG/ISR and keep the app CSR.',
      ),
      t(
        'Сигнал пересмотра: LCP кабинета неприемлем даже после code splitting, или данные нужно отдавать ботам.',
        'Revisit when dashboard LCP stays poor even after code splitting, or when bots must see the HTML.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'browser',
          'browser',
          t('Браузер', 'Browser'),
          t('Всё рендерится на клиенте после загрузки бандла.', 'Everything renders on the client after the bundle loads.'),
          t('SSR/RSC, если нужен HTML до JS.', 'SSR/RSC if HTML is needed before JS.'),
          t('Что видит пользователь при медленной сети до выполнения JS?', 'What does the user see on a slow network before JS runs?'),
        ),
        node(
          'app',
          'app',
          t('Vite SPA', 'Vite SPA'),
          t('Приложение по фичам на React + TS, без обязательного BFF.', 'Feature-based React + TS app, no BFF required.'),
          t('Next.js, если позже понадобится гибридный рендер.', 'Next.js if hybrid rendering is needed later.'),
          t('Как режете бандл: маршруты, фичи, тяжёлые графики?', 'How do you split the bundle: routes, features, heavy charts?'),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('browser', 'app', t('JS бандл', 'JS bundle')),
        edge('app', 'query', t('хуки данных', 'data hooks')),
        edge('query', 'api', t('HTTP', 'HTTP')),
        edge('ci', 'app', t('выкладка на CDN', 'deploy to CDN')),
      ],
    },
  },
  ssg_isr: {
    id: 'ssg_isr',
    title: t('SSG/ISR на Next.js', 'Next.js SSG/ISR'),
    summary: t(
      'Статический HTML на CDN с фоновой перегенерацией: SEO и скорость статики при нечасто меняющихся данных.',
      'Static HTML on a CDN with background regeneration: SEO and static speed when data changes infrequently.',
    ),
    rendering: t(
      'SSG на билде, ISR по времени или событию. Стратегия постраничная: лендинг — статика, каталог — ISR, кабинет можно оставить CSR.',
      'SSG at build, ISR on a timer or event. Choose per page: landing is static, catalogue is ISR, the account area can stay CSR.',
    ),
    structure: t(
      'Feature-based или лёгкий FSD: слои app → pages → widgets → features → entities → shared. Несколько команд — только вниз по импортам, публичный API слайса, ESLint/Nx boundaries.',
      'Feature-based or light FSD: app → pages → widgets → features → entities → shared. Several teams means downward-only imports, a public slice API, and ESLint/Nx boundaries.',
    ),
    repo: t(
      'Next.js приложение, HTML и ассеты на CDN. Для нескольких пакетов — монорепо Nx/Turborepo с affected-сборками.',
      'A Next.js app, HTML and assets on a CDN. With several packages, an Nx/Turborepo monorepo with affected builds.',
    ),
    state: t(
      'Каталог и карточки кэширует TanStack Query на клиенте после гидрации; серверные данные не складываем в Redux. Редкое клиентское — Zustand, фильтры — URL.',
      'Catalogue and product pages use TanStack Query on the client after hydration; we do not dump server data into Redux. Rare client state is Zustand, filters live in the URL.',
    ),
    why: t(
      'SEO критичен, данные статичны или меняются нечасто: ISR даёт скорость статики и приемлемую свежесть без постоянного SSR.',
      'SEO is critical and data is static or infrequent: ISR gives static speed with acceptable freshness without always-on SSR.',
    ),
    tradeoffs: [
      t(
        'Цена — возможна устаревшая версия до ревалидации, долгий билд на тысячи страниц и сложнее отладка кэша.',
        'The trade-off is a stale version until revalidation, long builds for thousands of pages, and harder cache debugging.',
      ),
    ],
    evolution: [
      t(
        'Если карточки станут персональными в реальном времени — эти маршруты перевожу на SSR/streaming, остальное оставляю ISR.',
        'If cards become personal and realtime, I move those routes to SSR/streaming and keep the rest on ISR.',
      ),
      t(
        'Сигнал: перегенерация по событию не успевает за ценой/наличием, или TTFB персонализации требует сервера на каждый запрос.',
        'Signal: event-driven regeneration cannot keep up with price/stock, or personalisation TTFB needs a server on every request.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'cdn',
          'cdn',
          t('CDN', 'CDN'),
          t('Раздаёт пререндеренный HTML и ассеты максимально близко к пользователю.', 'Serves prerendered HTML and assets as close to the user as possible.'),
          t('SSR на origin-сервере, если HTML должен быть персональным.', 'Origin SSR if HTML must be personalised.'),
          t('Какой Cache-Control у HTML и кто инвалидирует ISR?', 'What Cache-Control does HTML use, and who invalidates ISR?'),
        ),
        node(
          'app',
          'app',
          t('Next.js SSG/ISR', 'Next.js SSG/ISR'),
          t('Страницы собираются на билде или пересобираются в фоне.', 'Pages are built at compile time or regenerated in the background.'),
          t('CSR-остров для кабинета за логином.', 'A CSR island for the logged-in account area.'),
          t('Какие маршруты статика, какие ISR, какие клиентские?', 'Which routes are static, ISR, or client-only?'),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('cdn', 'app', t('HTML с CDN', 'HTML from CDN')),
        edge('app', 'query', t('клиентский кэш', 'client cache')),
        edge('query', 'api', t('ревалидация / запрос', 'revalidate / fetch')),
        edge('ci', 'cdn', t('публикация', 'publish')),
      ],
    },
  },
  ssr_app: {
    id: 'ssr_app',
    title: t('SSR-приложение (Next + RSC)', 'SSR app (Next + RSC)'),
    summary: t(
      'HTML на каждый запрос, RSC по умолчанию, FSD-слои, Query на клиенте, BFF по желанию для агрегации микросервисов.',
      'HTML per request, RSC by default, FSD layers, Query on the client, optional BFF to aggregate microservices.',
    ),
    rendering: t(
      'SSR для SEO и свежих/персональных данных. В Next.js App Router серверные компоненты по умолчанию, клиентские — только где нужна интерактивность. Streaming снижает TTFB.',
      'SSR for SEO and fresh/personal data. In the Next.js App Router, Server Components are the default; Client Components only where interactivity is needed. Streaming lowers TTFB.',
    ),
    structure: t(
      'FSD-подобные слои с импортом только вниз: несколько команд не лезут в чужие слайсы. Публичный API, CODEOWNERS, границы в ESLint. Кабинет внутри того же Next-приложения.',
      'FSD-style layers with downward-only imports so several teams stay out of each other\'s slices. Public APIs, CODEOWNERS, ESLint boundaries. The account area lives in the same Next app.',
    ),
    repo: t(
      'Next.js, сервер в критическом пути: мониторинг и масштабирование обязательны. Общие пакеты — в монорепо, если команд больше одной.',
      'Next.js with the server on the critical path: monitoring and scaling are mandatory. Shared packages live in a monorepo if there is more than one team.',
    ),
    state: t(
      'RSC читают данные на сервере; интерактивные острова используют TanStack Query. Zustand — для редкого клиентского. Не держим все серверные данные в Redux.',
      'RSC read data on the server; interactive islands use TanStack Query. Zustand covers rare client state. Do not keep all server data in Redux.',
    ),
    why: t(
      'SEO критичен и данные realtime или персональные: статика устареет, нужен HTML с сервера на запрос плюс возможность BFF, чтобы убрать каскады с клиента.',
      'SEO is critical and data is realtime or personal: static HTML would go stale, so we need per-request HTML and an optional BFF to remove client waterfalls.',
    ),
    tradeoffs: [
      t(
        'Цена SSR: hydration стоит времени на клиенте, а сервер становится частью критического пути — его надо мониторить и масштабировать.',
        'SSR cost: hydration takes time on the client, and the server becomes part of the critical path, so it needs monitoring and scaling.',
      ),
      t(
        'BFF — ещё один сервис у фронтенд-команды: оправдан, когда экран собирает много микросервисов или токены нельзя пускать в браузер.',
        'A BFF is another service the frontend team owns: justified when a screen aggregates many microservices or tokens must not reach the browser.',
      ),
    ],
    evolution: [
      t(
        'Неперсональные части вынесу на CDN/edge cache или ISR, чтобы не рендерить всё на origin.',
        'I would cache non-personal parts on CDN/edge or ISR so origin does not render everything.',
      ),
      t(
        'Сигнал к упрощению: если персонализация ушла в клиентские острова и SEO-страницы снова статичны.',
        'Simplify when personalisation moves into client islands and SEO pages are static again.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'browser',
          'browser',
          t('Браузер', 'Browser'),
          t('Получает HTML сразу, затем гидратирует острова.', 'Gets HTML immediately, then hydrates islands.'),
          t('Чистый CSR, если страница за логином и SEO не нужно.', 'Pure CSR if the page is behind login and SEO is irrelevant.'),
          t('Что стримится, а что ждёт медленный запрос?', 'What streams, and what waits on the slow request?'),
        ),
        node(
          'app',
          'app',
          t('Next.js SSR / RSC', 'Next.js SSR / RSC'),
          t('Серверные компоненты по умолчанию, клиентские точечно.', 'Server Components by default, Client Components only where needed.'),
          t('Vite CSR для закрытых экранов.', 'Vite CSR for logged-in screens.'),
          t('Где проходит граница RSC и клиентского острова?', 'Where is the RSC vs client-island boundary?'),
        ),
        node(
          'bff',
          'bff',
          t('BFF (опционально)', 'BFF (optional)'),
          t('Агрегация под экран, кэш и токены на сервере, без каскадов из браузера.', 'Per-screen aggregation, cache and tokens on the server, no browser waterfalls.'),
          t('Прямые запросы к API, если сервисов мало.', 'Direct API calls if there are few services.'),
          t('Что агрегирует BFF и какой у него SLA?', 'What does the BFF aggregate, and what SLA does it carry?'),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('browser', 'app', t('HTML + ответ RSC', 'HTML + RSC payload')),
        edge('app', 'bff', t('серверный запрос', 'server fetch')),
        edge('app', 'query', t('клиентские острова', 'client islands')),
        edge('bff', 'api', t('агрегация', 'aggregation')),
        edge('query', 'api', t('клиентский HTTP', 'client HTTP')),
        edge('ci', 'app', t('выкладка origin-сервера', 'deploy origin')),
      ],
    },
  },
  mfe: {
    id: 'mfe',
    title: t('Микрофронтенды: shell + Module Federation', 'Micro-frontends: shell + Module Federation'),
    summary: t(
      'Общий shell, удалённые модули, общая дизайн-система. Query в каждом приложении, без общего глобального Redux.',
      'Shared shell, remote modules, shared design system. Query in each app, no global shared Redux.',
    ),
    rendering: t(
      'Рендер выбирается по приложению: кабинет может быть CSR, витрина — SSR/ISR. Federation не заменяет выбор CSR/SSR.',
      'Rendering is chosen per app: the account area can be CSR, the storefront SSR/ISR. Federation does not replace the CSR/SSR choice.',
    ),
    structure: t(
      'Организационная нарезка: независимые команды и релизы. Внутри каждого MFE — FSD или feature-based с импортом только вниз. Между частями — контракт, не прямые импорты.',
      'An organisational split: independent teams and releases. Inside each MFE, FSD or feature-based structure with downward-only imports. Between parts — a contract, not direct imports.',
    ),
    repo: t(
      'Общий shell загружает удалённые модули через Module Federation, общий React и дизайн-система. Сначала модульный монолит в монорепо с жёсткими границами; полирепо — только если циклы реально независимы.',
      'A shared shell loads remotes via Module Federation, with shared React and a design system. First a modular monolith in a monorepo with strict boundaries; polyrepo only if cycles are truly independent.',
    ),
    state: t(
      'У каждого MFE свой TanStack Query. Коммуникация — URL, события или тонкий контракт. Общего глобального Redux нет.',
      'Each MFE owns its TanStack Query. Communication is URL, events or a thin contract. There is no shared global Redux.',
    ),
    why: t(
      'Микрофронтенды — прежде всего про организацию: 4+ команд блокируют релизы или разные циклы поставки. Для 1–3 человек это слишком дорого: модульный монолит даёт ~80% пользы.',
      'Micro-frontends are primarily organisational: 4+ teams blocking releases or different delivery cycles. For 1–3 people they are too expensive: a modular monolith gives about 80% of the benefit.',
    ),
    tradeoffs: [
      t(
        'Цена серьёзная: дублирование зависимостей и рост бандла, рассинхрон версий React и дизайн-системы, сложнее общий стейт, роутинг, e2e-тесты и локальная разработка.',
        'The cost is significant: duplicated dependencies and bigger bundles, React and design-system version drift, harder shared state, routing, end-to-end tests and local development.',
      ),
      t(
        'Сначала модульный монолит в монорепо с CODEOWNERS; MFE — когда независимые релизы доказанно нужны.',
        'Start with a modular monolith in a monorepo plus CODEOWNERS; MFE only when independent releases are proven necessary.',
      ),
    ],
    evolution: [
      t(
        'Если команды снова могут релизиться вместе — схлопываю remote обратно в пакеты монорепо.',
        'If teams can ship together again, I fold remotes back into monorepo packages.',
      ),
      t(
        'Сигнал к MFE: постоянные конфликты ownership и блокировки релизов после границ в монолите.',
        'Signal to adopt MFE: persistent ownership conflicts and release locks after monolith boundaries.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'shell',
          'mfe',
          t('Общий shell', 'Shared shell'),
          t('Общий layout, роутинг, авторизация и загрузка удалённых модулей.', 'Shared layout, routing, auth and remote module loading.'),
          t('Одно SPA с границами модулей, если независимый деплой не нужен.', 'A single SPA with module boundaries if independent deploy is not needed.'),
          t('Какие зависимости общие, и что будет при рассинхроне версий React?', 'Which dependencies are shared, and what happens on React version drift?'),
        ),
        node(
          'catalog-mfe',
          'mfe',
          t('Удалённый MFE', 'Remote MFE'),
          t('Независимый деплой части продукта со своим Query.', 'Independently deployed product slice with its own Query.'),
          t('npm-пакет в монорепо без загрузки модулей в рантайме.', 'An npm package in the monorepo without runtime federation.'),
          t('Как версионируете контракт shell ↔ удалённый модуль?', 'How do you version the shell ↔ remote contract?'),
        ),
        node(
          'app',
          'app',
          t('Host-приложение', 'Host app'),
          t('Собирает shell и регистрирует удалённые модули, не содержит чужой бизнес-логики.', 'Composes the shell and registers remotes; it does not own foreign business logic.'),
          t('Серверная маршрутизация /shop vs /account без Federation.', 'Server routing /shop vs /account without Federation.'),
          t('Кто владеет общим роутингом и дизайн-системой?', 'Who owns shared routing and the design system?'),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('shell', 'catalog-mfe', t('Module Federation', 'Module Federation')),
        edge('shell', 'app', t('композиция', 'compose')),
        edge('app', 'query', t('кэш приложения', 'app cache')),
        edge('catalog-mfe', 'query', t('свой Query', 'own Query')),
        edge('query', 'api', t('HTTP', 'HTTP')),
        edge('ci', 'shell', t('выкладка shell и удалённых модулей', 'deploy shell + remotes')),
      ],
    },
  },
}

export function getProfile(id: ProfileId): ArchitectureProfile {
  return PROFILES[id]
}
