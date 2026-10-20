import { edge, node, t } from './diagram'
import { TEXTBOOK } from './textbook'
import type { Topic, TopicId } from './types'

export const TOPIC_ORDER: TopicId[] = [
  'architecture',
  'structure',
  'state',
  'rendering',
  'api',
  'scale',
  'perf',
  'reliability',
  'security',
  'a11y',
  'offline',
  'i18n',
  'leadership',
]

export const TOPICS: Record<TopicId, Topic> = {
  architecture: {
    id: 'architecture',
    title: t('Что такое архитектура фронтенда', 'What frontend architecture is', 'Czym jest architektura frontendu'),
    thesis: t(
      'Архитектура — набор решений, которые дорого менять, и правила, удерживающие систему управляемой при росте кода и команды. Начинай ответ с цели — снизить стоимость изменений, — а не с папок и библиотек.',
      'Architecture is the set of decisions that are expensive to change, plus the rules that keep the system manageable as code and team grow. Start the answer from the goal — lower the cost of change — not from folders and libraries.',
      'Architektura to zestaw decyzji, które drogo zmieniać, oraz reguły utrzymujące system w ryzach wraz ze wzrostem kodu i zespołu. Zacznij odpowiedź od celu — obniżyć koszt zmian — a nie od folderów i bibliotek.',
    ),
    ...TEXTBOOK.architecture,
    rows: [
      {
        label: t('Изменения локальны', 'Changes are local', 'Zmiany są lokalne'),
        body: t(
          'Фича правится в 1–2 модулях, а не в 15 файлах по всему проекту.',
          'A feature changes in 1–2 modules, not in 15 files across the project.',
          'Funkcję zmienia się w 1–2 modułach, a nie w 15 plikach w całym projekcie.',
        ),
      },
      {
        label: t('Явные зависимости', 'Explicit dependencies', 'Jawne zależności'),
        body: t(
          'Направление импортов однонаправленное, циклов нет, правила проверяются линтером.',
          'Import direction is one-way, there are no cycles, and the rules are lint-checked.',
          'Kierunek importów jest jednokierunkowy, nie ma cykli, a reguły sprawdza linter.',
        ),
      },
      {
        label: t('Тестируемость', 'Testability', 'Testowalność'),
        body: t(
          'Бизнес-логику можно протестировать без рендера и без сети.',
          'Business logic can be tested without rendering and without the network.',
          'Logikę biznesową można przetestować bez renderu i bez sieci.',
        ),
      },
      {
        label: t('Понятность', 'Clarity', 'Zrozumiałość'),
        body: t(
          'Новый разработчик находит нужное место за минуты, а не часы.',
          'A new developer finds the right place in minutes, not hours.',
          'Nowy programista znajduje właściwe miejsce w minuty, a nie w godziny.',
        ),
      },
      {
        label: t('Заменяемость', 'Replaceability', 'Wymienialność'),
        body: t(
          'Библиотеку (роутер, стейт-менеджер, UI-кит) можно поменять за ограниченный объём работ.',
          'A library (router, state manager, UI kit) can be swapped in a bounded amount of work.',
          'Bibliotekę (router, menedżer stanu, UI kit) można wymienić w ograniczonym zakresie prac.',
        ),
      },
      {
        label: t('Производительность и надёжность', 'Performance and reliability', 'Wydajność i niezawodność'),
        body: t(
          'Метрики (Core Web Vitals, error rate) заложены в систему, а не чинятся постфактум.',
          'Metrics (Core Web Vitals, error rate) are built into the system, not fixed after the fact.',
          'Metryki (Core Web Vitals, error rate) są wbudowane w system, a nie naprawiane po fakcie.',
        ),
      },
      {
        label: t('Соответствие команде', 'Fit with the team', 'Dopasowanie do zespołu'),
        body: t(
          'Структура кода повторяет структуру ownership (закон Конвея).',
          'Code structure mirrors ownership structure (Conway’s law).',
          'Struktura kodu odzwierciedla strukturę ownership (prawo Conwaya).',
        ),
      },
    ],
    followUps: [
      t(
        'Чем архитектура отличается от дизайна кода? Архитектура — про границы и зависимости между модулями, дизайн — про устройство кода внутри модуля.',
        'How is architecture different from code design? Architecture is about boundaries and dependencies between modules; design is about how code is organised inside a module.',
        'Czym architektura różni się od projektowania kodu? Architektura dotyczy granic i zależności między modułami, projektowanie — budowy kodu wewnątrz modułu.',
      ),
      t(
        'Кто отвечает за архитектуру? Senior/lead задаёт рамки и фиксирует решения (ADR), но правила должны быть автоматизированы (линтеры, CI), иначе они живут, пока автор в команде.',
        'Who owns architecture? A senior/lead sets the frame and records decisions (ADRs), but the rules must be automated (linters, CI), or they live only while the author stays on the team.',
        'Kto odpowiada za architekturę? Senior/lead wyznacza ramy i zapisuje decyzje (ADR), ale reguły muszą być zautomatyzowane (lintery, CI), inaczej żyją tylko tak długo, jak autor w zespole.',
      ),
      t(
        'Каркас ответа на любой архитектурный вопрос: контекст → варианты → выбор → цена → эволюция. «Если X, я бы выбрал A, потому что…; цена — Y; при сигнале Z перешёл бы на B».',
        'The frame for any architecture answer: context → options → choice → cost → evolution. “If X, I’d pick A because…; the trade-off is Y; if we see Z, I’d move to B.”',
        'Szkielet odpowiedzi na każde pytanie architektoniczne: kontekst → warianty → wybór → cena → ewolucja. „Jeśli X, wybrałbym A, ponieważ…; cena to Y; przy sygnale Z przeszedłbym na B”.',
      ),
      t(
        'Опыт доказывают цифрами и ошибками: «LCP снизили с 4,1 до 2,3 с», «CI с 18 до 7 минут», «поторопились с микрофронтендами, вот что вынес».',
        'Prove experience with numbers and mistakes: “we cut LCP from 4.1 to 2.3 s”, “CI from 18 to 7 minutes”, “we rushed into micro-frontends, here’s what I took away”.',
        'Doświadczenie udowadniaj liczbami i błędami: „obniżyliśmy LCP z 4,1 do 2,3 s”, „CI z 18 do 7 minut”, „pospieszyliśmy się z mikrofrontendami, oto wnioski”.',
      ),
    ],
    redFlag: t(
      'Рассказ начинается со списка библиотек и папок, без продукта, масштаба и причин.',
      'The story starts with a list of libraries and folders, with no product, scale or reasons.',
      'Opowieść zaczyna się od listy bibliotek i folderów, bez produktu, skali i powodów.',
    ),
    diagram: {
      nodes: [
        node(
          'goal',
          'ui',
          t('Стоимость изменений', 'Cost of change', 'Koszt zmian'),
          t(
            'Цель архитектуры: типичное изменение дешёвое и локальное.',
            'The goal of architecture: the typical change is cheap and local.',
            'Cel architektury: typowa zmiana jest tania i lokalna.',
          ),
          t(
            'Цель «красивая структура папок» не отвечает на вопрос бизнеса.',
            'A goal of “pretty folders” does not answer the business question.',
            'Cel „ładne foldery” nie odpowiada na pytanie biznesu.',
          ),
          t(
            'Какое самое частое изменение у вас должно быть дешёвым?',
            'Which is your most frequent change, and does it stay cheap?',
            'Która zmiana jest u was najczęstsza i czy pozostaje tania?',
          ),
        ),
        node(
          'boundaries',
          'app',
          t('Границы модулей', 'Module boundaries', 'Granice modułów'),
          t(
            'Однонаправленные зависимости и публичные API держат изменения внутри модуля.',
            'One-way dependencies and public APIs keep a change inside one module.',
            'Jednokierunkowe zależności i publiczne API trzymają zmianę wewnątrz jednego modułu.',
          ),
          t(
            'Свободные импорты между всеми частями — быстро, пока код маленький.',
            'Free imports between all parts are fast while the code is small.',
            'Swobodne importy między wszystkimi częściami są szybkie, dopóki kod jest mały.',
          ),
          t(
            'Кто владеет каждой границей и как она совпадает с командами?',
            'Who owns each boundary, and how does it match the teams?',
            'Kto jest właścicielem każdej granicy i jak pokrywa się z zespołami?',
          ),
        ),
        node(
          'automation',
          'ci',
          t('Lint, CI и ADR', 'Lint, CI and ADRs', 'Lint, CI i ADR'),
          t(
            'Правила автоматизированы и записаны, иначе живут, пока автор в команде.',
            'Rules are automated and written down, or they live only while the author stays.',
            'Reguły są zautomatyzowane i spisane, inaczej żyją tylko tak długo, jak autor w zespole.',
          ),
          t(
            'Договорённости на словах и на ревью работают для команды из трёх человек.',
            'Verbal agreements and review work for a team of three.',
            'Ustne ustalenia i review działają dla zespołu trzech osób.',
          ),
          t(
            'Что именно падает в CI при нарушении границы?',
            'What exactly fails in CI when a boundary is broken?',
            'Co dokładnie wywala się w CI przy naruszeniu granicy?',
          ),
        ),
        node(
          'signals',
          'browser',
          t('Метрики и обратная связь', 'Metrics and feedback', 'Metryki i informacja zwrotna'),
          t(
            'Core Web Vitals, error rate и время изменения показывают, работает ли архитектура.',
            'Core Web Vitals, error rate and lead time show whether the architecture works.',
            'Core Web Vitals, error rate i czas wprowadzania zmian pokazują, czy architektura działa.',
          ),
          t(
            'Оценка «на ощупь» без цифр до и после.',
            'A gut-feel verdict with no before-and-after numbers.',
            'Ocena „na wyczucie” bez liczb przed i po.',
          ),
          t(
            'При каком сигнале вы пересмотрите решение?',
            'At what signal would you revisit the decision?',
            'Przy jakim sygnale zrewidujecie decyzję?',
          ),
        ),
      ],
      edges: [
        edge('goal', 'boundaries', t('задаёт границы', 'shapes boundaries', 'wyznacza granice')),
        edge('boundaries', 'automation', t('закрепляем правилом', 'enforced by rules', 'utrwalamy regułą')),
        edge('automation', 'signals', t('измеряем эффект', 'measure the effect', 'mierzymy efekt')),
        edge('signals', 'goal', t('пересмотр цели', 'revisit the goal', 'rewizja celu')),
      ],
    },
  },
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
        'Context — доставка значения, не стор: любое изменение перерендеривает потребителей, поэтому он для темы, локали, DI. Zustand — мало boilerplate. Redux Toolkit — строгий поток и DevTools для большой команды. Jotai — атомы для редакторов и канвасов.',
        'Context delivers a value, it is not a store: any change re-renders consumers, so it is for theme, locale, DI. Zustand is low boilerplate. Redux Toolkit is a strict flow and DevTools for a large team. Jotai provides atoms for editors and canvases.',
        'Context dostarcza wartość, ale nie jest storem: każda zmiana renderuje konsumentów ponownie, więc pasuje do motywu, języka i DI. Zustand ma mało boilerplate. Redux Toolkit daje ścisły przepływ i DevTools dla dużego zespołu. Jotai zapewnia atomy dla edytorów i obszarów roboczych.',
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
  a11y: {
    id: 'a11y',
    title: t('Доступность (a11y)', 'Accessibility (a11y)', 'Dostępność (a11y)'),
    thesis: t(
      'Доступность — требование к продукту, а не финальная полировка: семантический HTML закрывает большую часть задач, ARIA нужна только там, где семантики не хватает, а проверки автоматизированы в CI и дополнены ручным прогоном. Критерии приёмки берём из WCAG 2.2 AA (рекомендация W3C).',
      'Accessibility is a product requirement, not final polish: semantic HTML covers most of it, ARIA is for where semantics fall short, and checks are automated in CI and backed by a manual pass. The acceptance criteria come from WCAG 2.2 AA (a W3C recommendation).',
      'Dostępność to wymaganie produktu, a nie końcowy szlif: semantyczny HTML pokrywa większość spraw, ARIA służy tam, gdzie semantyki brakuje, a kontrole są zautomatyzowane w CI i uzupełnione ręcznym przeglądem. Kryteria akceptacji pochodzą z WCAG 2.2 AA (rekomendacja W3C).',
    ),
    ...TEXTBOOK.a11y,
    rows: [
      {
        label: t('WCAG и уровень AA', 'WCAG and level AA', 'WCAG i poziom AA'),
        body: t(
          'Четыре принципа: воспринимаемость, управляемость, понятность, надёжность. WCAG — рекомендация W3C; регуляторные требования (EAA, EN 301 549) ссылаются на неё. Целимся в AA: контраст текста 4,5:1, всё доступно с клавиатуры, видимый фокус, подписи у полей, размер цели нажатия не менее 24×24 CSS px (SC 2.5.8).',
          'Four principles: perceivable, operable, understandable, robust. WCAG is a W3C recommendation; regulatory requirements (EAA, EN 301 549) refer to it. Target AA: 4.5:1 text contrast, everything reachable by keyboard, visible focus, labelled fields, target size of at least 24×24 CSS px (SC 2.5.8).',
          'Cztery zasady: postrzegalność, funkcjonalność, zrozumiałość, solidność. WCAG to rekomendacja W3C; wymogi regulacyjne (EAA, EN 301 549) się do niej odwołują. Celujemy w AA: kontrast tekstu 4,5:1, wszystko dostępne z klawiatury, widoczny fokus, opisane pola, rozmiar celu dotyku co najmniej 24×24 CSS px (SC 2.5.8).',
        ),
      },
      {
        label: t('Семантический HTML', 'Semantic HTML', 'Semantyczny HTML'),
        body: t(
          'button вместо div с onClick, label у каждого поля, иерархия заголовков, landmarks (main, nav). Первое правило ARIA: если есть нативный элемент, ARIA не нужна. Плохая ARIA хуже её отсутствия.',
          'button instead of a div with onClick, a label on every field, a heading hierarchy, landmarks (main, nav). The first rule of ARIA: if a native element exists, you do not need ARIA. Bad ARIA is worse than none.',
          'button zamiast div z onClick, label przy każdym polu, hierarchia nagłówków, landmarki (main, nav). Pierwsza zasada ARIA: jeśli istnieje natywny element, ARIA nie jest potrzebna. Zła ARIA jest gorsza niż jej brak.',
        ),
      },
      {
        label: t('Клавиатура и фокус', 'Keyboard and focus', 'Klawiatura i fokus'),
        body: t(
          'Логичный порядок Tab, видимый :focus-visible, ловушка фокуса в модалке с возвратом на триггер, roving tabindex для составных виджетов, skip link и перенос фокуса при смене маршрута в SPA.',
          'A logical Tab order, visible :focus-visible, a focus trap in a modal that returns to the trigger, roving tabindex for composite widgets, a skip link and moving focus on route change in an SPA.',
          'Logiczna kolejność Tab, widoczny :focus-visible, pułapka fokusa w modalu z powrotem na wyzwalacz, roving tabindex dla widgetów złożonych, skip link i przenoszenie fokusa przy zmianie trasy w SPA.',
        ),
      },
      {
        label: t('Screen readers и live regions', 'Screen readers and live regions', 'Czytniki ekranu i live regions'),
        body: t(
          'Доступное имя у каждого контрола; динамические сообщения через role="status" (polite) и role="alert" (assertive); aria-busy при загрузке. Регион должен быть в DOM до изменения текста; не озвучивать каждое обновление.',
          'An accessible name on every control; dynamic messages via role="status" (polite) and role="alert" (assertive); aria-busy while loading. The region must be in the DOM before the text changes; do not announce every update.',
          'Dostępna nazwa każdej kontrolki; komunikaty dynamiczne przez role="status" (polite) i role="alert" (assertive); aria-busy podczas ładowania. Region musi być w DOM przed zmianą tekstu; nie ogłaszaj każdej aktualizacji.',
        ),
      },
      {
        label: t('Границы дизайн-системы', 'Design-system boundaries', 'Granice design systemu'),
        body: t(
          'Примитивы (Radix, React Aria) владеют ролями, клавишами и фокусом, Storybook проверяет их axe-аддоном. Продуктовая фича отвечает за подписи, заголовки, тексты ошибок и порядок на странице.',
          'Primitives (Radix, React Aria) own roles, keys and focus, and Storybook checks them with the axe addon. The product feature owns labels, headings, error copy and page order.',
          'Prymitywy (Radix, React Aria) odpowiadają za role, klawisze i fokus, a Storybook sprawdza je dodatkiem axe. Funkcja produktowa odpowiada za etykiety, nagłówki, teksty błędów i kolejność na stronie.',
        ),
      },
      {
        label: t('Проверки: axe, Playwright, вручную', 'Checks: axe, Playwright, manual', 'Kontrole: axe, Playwright, ręcznie'),
        body: t(
          'eslint-plugin-jsx-a11y ловит JSX, axe в unit и Playwright — часть нарушений в DOM, Playwright проходит критичные сценарии клавиатурой. Смысл подписей, порядок фокуса и озвучку проверяет только ручной прогон с VoiceOver или NVDA, zoom 200%.',
          'eslint-plugin-jsx-a11y catches JSX issues, axe in unit tests and Playwright catches part of the DOM violations, Playwright drives critical flows by keyboard. Label meaning, focus order and announcements need a manual pass with VoiceOver or NVDA and 200% zoom.',
          'eslint-plugin-jsx-a11y łapie problemy w JSX, axe w testach jednostkowych i Playwright — część naruszeń w DOM, Playwright przechodzi krytyczne scenariusze klawiaturą. Sens etykiet, kolejność fokusa i ogłaszanie sprawdza tylko ręczny przegląd z VoiceOver lub NVDA i zoomem 200%.',
        ),
      },
    ],
    followUps: [
      t(
        'Модальное окно: фокус внутрь, ловушка Tab, Esc закрывает, фокус возвращается на триггер, фон inert или aria-modal. Нативный <dialog> закрывает большую часть.',
        'A modal dialog: focus moves in, Tab is trapped, Esc closes, focus returns to the trigger, the background is inert or aria-modal. A native <dialog> covers most of it.',
        'Okno modalne: fokus wchodzi do środka, Tab jest uwięziony, Esc zamyka, fokus wraca na wyzwalacz, tło jest inert lub aria-modal. Natywny <dialog> pokrywa większość.',
      ),
      t(
        'SPA и смена маршрута: переносим фокус на заголовок страницы, обновляем document.title и озвучиваем переход через live region, иначе пользователь screen reader не узнаёт, что страница сменилась.',
        'SPA route changes: move focus to the page heading, update document.title and announce the navigation through a live region, otherwise a screen-reader user does not learn the page changed.',
        'Zmiana trasy w SPA: przenosimy fokus na nagłówek strony, aktualizujemy document.title i ogłaszamy przejście przez live region, inaczej użytkownik czytnika ekranu nie dowie się, że strona się zmieniła.',
      ),
      t(
        'Trade-offs: примитивы и ограничения контраста замедляют прототипирование и спорят с брендом; ручные проверки стоят времени; автоматика ловит лишь часть проблем. Лечим встраиванием в примитивы и критерии приёмки, а не отдельным «спринтом a11y».',
        'Trade-offs: primitives and contrast limits slow prototyping and argue with the brand; manual checks cost time; automation catches only part of the issues. The cure is building it into primitives and acceptance criteria, not a separate “a11y sprint”.',
        'Trade-offy: prymitywy i ograniczenia kontrastu spowalniają prototypowanie i kłócą się z marką; ręczne kontrole kosztują czas; automatyka łapie tylko część problemów. Lekarstwem jest wbudowanie w prymitywy i kryteria akceptacji, a nie osobny „sprint a11y”.',
      ),
      t(
        'Сигнал эволюции: начинаем с семантики и axe в CI для критичных сценариев. Если ручные проверки регулярно находят то, что пропустил axe, или появляется регуляторный контекст (European Accessibility Act и EN 301 549, которые ссылаются на WCAG; это не юридическая консультация), нанимаем a11y-ownership, вводим аудит и пользовательские тесты; пересматриваем подход раз в квартал.',
        'Evolution signal: start with semantics and axe in CI for critical flows. If manual checks keep finding what axe missed, or a regulatory context appears (the European Accessibility Act and EN 301 549, which refer to WCAG; this is not legal advice), add a11y ownership, audits and testing with real users; revisit the approach quarterly.',
        'Sygnał ewolucji: zaczynamy od semantyki i axe w CI dla krytycznych scenariuszy. Jeśli ręczne kontrole regularnie znajdują to, co axe przepuścił, albo pojawia się kontekst regulacyjny (European Accessibility Act i EN 301 549, które odwołują się do WCAG; to nie porada prawna), dodajemy ownership dostępności, audyty i testy z prawdziwymi użytkownikami; podejście rewidujemy co kwartał.',
      ),
      t(
        'Автокомплит: паттерн combobox — role="combobox", aria-expanded, aria-activedescendant, role="listbox"/"option", стрелки, Enter и Escape; не отправлять запрос во время IME-композиции.',
        'Autocomplete: the combobox pattern — role="combobox", aria-expanded, aria-activedescendant, role="listbox"/"option", arrows, Enter and Escape; do not fire a request during IME composition.',
        'Autouzupełnianie: wzorzec combobox — role="combobox", aria-expanded, aria-activedescendant, role="listbox"/"option", strzałki, Enter i Escape; nie wysyłaj zapytania podczas kompozycji IME.',
      ),
    ],
    redFlag: t(
      'Говорю «навешу aria-label на всё» или «доступность проверит axe» — без семантики, клавиатуры и ручной проверки.',
      'I say “I’ll add aria-label everywhere” or “axe will check accessibility” — with no semantics, keyboard or manual check.',
      'Mówię „dodam aria-label wszędzie” albo „dostępność sprawdzi axe” — bez semantyki, klawiatury i ręcznej kontroli.',
    ),
    diagram: {
      nodes: [
        node(
          'html',
          'browser',
          t('Семантика и фокус', 'Semantic HTML and focus', 'Semantyka i fokus'),
          t(
            'Нативные элементы дают роль, фокус и клавиатуру бесплатно.',
            'Native elements give role, focus and keyboard for free.',
            'Natywne elementy dają rolę, fokus i klawiaturę za darmo.',
          ),
          t(
            'ARIA поверх div, когда нативного элемента действительно нет.',
            'ARIA on top of a div only when no native element exists.',
            'ARIA na div tylko wtedy, gdy natywnego elementu naprawdę nie ma.',
          ),
          t(
            'Где вы переносите фокус после смены маршрута?',
            'Where do you move focus after a route change?',
            'Gdzie przenosicie fokus po zmianie trasy?',
          ),
        ),
        node(
          'ds',
          'ui',
          t('Примитивы дизайн-системы', 'Design-system primitives', 'Prymitywy design systemu'),
          t(
            'Клавиатурный контракт сложных виджетов написан один раз.',
            'The keyboard contract of complex widgets is written once.',
            'Kontrakt klawiatury złożonych widgetów jest napisany raz.',
          ),
          t(
            'Собственные виджеты в каждой фиче, если потребителей мало.',
            'Custom widgets in each feature while consumers are few.',
            'Własne widgety w każdej funkcji, dopóki konsumentów jest mało.',
          ),
          t(
            'Что остаётся на стороне продуктовой команды?',
            'What stays with the product team?',
            'Co zostaje po stronie zespołu produktowego?',
          ),
        ),
        node(
          'ci',
          'ci',
          t('axe и Playwright в CI', 'axe and Playwright in CI', 'axe i Playwright w CI'),
          t(
            'Автоматика ловит регрессии в DOM и критичные клавиатурные сценарии.',
            'Automation catches DOM regressions and critical keyboard flows.',
            'Automatyka łapie regresje w DOM i krytyczne scenariusze klawiatury.',
          ),
          t(
            'Только ручной аудит раз в год — слишком поздно.',
            'A manual audit once a year alone is too late.',
            'Sam ręczny audyt raz w roku to za późno.',
          ),
          t(
            'Какие нарушения ломают сборку, а какие — предупреждение?',
            'Which violations fail the build and which only warn?',
            'Które naruszenia blokują build, a które tylko ostrzegają?',
          ),
        ),
        node(
          'manual',
          'app',
          t('Ручной прогон', 'Manual pass', 'Ręczny przegląd'),
          t(
            'Клавиатура, VoiceOver/NVDA и zoom находят то, чего не видит axe.',
            'Keyboard, VoiceOver/NVDA and zoom find what axe cannot see.',
            'Klawiatura, VoiceOver/NVDA i zoom znajdują to, czego axe nie widzi.',
          ),
          t(
            'Тесты с реальными пользователями с ограничениями — следующий уровень.',
            'Testing with real users with disabilities is the next level.',
            'Testy z prawdziwymi użytkownikami z niepełnosprawnościami to kolejny poziom.',
          ),
          t(
            'При каком сигнале вы вводите аудит и a11y-ownership?',
            'At what signal do you add audits and a11y ownership?',
            'Przy jakim sygnale wprowadzacie audyt i ownership dostępności?',
          ),
        ),
      ],
      edges: [
        edge('html', 'ds', t('контракт примитива', 'primitive contract', 'kontrakt prymitywu')),
        edge('ds', 'ci', t('автопроверка', 'automated check', 'automatyczna kontrola')),
        edge('ci', 'manual', t('пробелы автоматики', 'gaps in automation', 'luki w automatyce')),
        edge('manual', 'html', t('находки в семантику', 'findings back to semantics', 'wnioski do semantyki')),
      ],
    },
  },
  offline: {
    id: 'offline',
    title: t('Офлайн и нестабильная сеть', 'Offline and unreliable network', 'Offline i niestabilna sieć'),
    thesis: t(
      'Офлайн — это два разных мира: кэш чтения (service worker, Cache API, stale-while-revalidate) и офлайн-запись (outbox в IndexedDB, идемпотентность, конфликты). Не смешивай их: кэш чтения дёшев и безопасен, офлайн-запись — распределённая система на клиенте.',
      'Offline is two different worlds: read caching (service worker, Cache API, stale-while-revalidate) and offline writes (an outbox in IndexedDB, idempotency, conflicts). Do not mix them: read caching is cheap and safe, offline writing is a distributed system on the client.',
      'Offline to dwa różne światy: cache odczytu (service worker, Cache API, stale-while-revalidate) i zapis offline (outbox w IndexedDB, idempotentność, konflikty). Nie mieszaj ich: cache odczytu jest tani i bezpieczny, zapis offline to system rozproszony na kliencie.',
    ),
    ...TEXTBOOK.offline,
    rows: [
      {
        label: t('Стратегии кэша чтения', 'Read-cache strategies', 'Strategie cache odczytu'),
        body: t(
          'Ассеты с хешем — cache-first. HTML и данные, где важна свежесть, — network-first. Списки, аватары — stale-while-revalidate. Платежи и необратимое — только сеть. App shell открывается без сети; Workbox упрощает стратегии.',
          'Hashed assets — cache-first. HTML and data where freshness matters — network-first. Lists, avatars — stale-while-revalidate. Payments and irreversible actions — network-only. The app shell opens without a network; Workbox simplifies the strategies.',
          'Zasoby z hashem — cache-first. HTML i dane, gdzie liczy się świeżość — network-first. Listy, awatary — stale-while-revalidate. Płatności i operacje nieodwracalne — tylko sieć. App shell otwiera się bez sieci; Workbox upraszcza strategie.',
        ),
      },
      {
        label: t('Хранилище', 'Storage', 'Przechowywanie'),
        body: t(
          'Cache API — для ответов, IndexedDB (idb, Dexie) — для структурированных данных и outbox; localStorage синхронный и мал. Квоты и вытеснение: запрашивать navigator.storage.persist(), версионировать схему IndexedDB.',
          'Cache API for responses, IndexedDB (idb, Dexie) for structured data and the outbox; localStorage is synchronous and small. Quotas and eviction: request navigator.storage.persist(), version the IndexedDB schema.',
          'Cache API dla odpowiedzi, IndexedDB (idb, Dexie) dla danych strukturalnych i outboxa; localStorage jest synchroniczny i mały. Limity i wywłaszczanie: żądaj navigator.storage.persist(), wersjonuj schemat IndexedDB.',
        ),
      },
      {
        label: t('Outbox для записи', 'Outbox for writes', 'Outbox dla zapisu'),
        body: t(
          'Действие {clientId, тип, payload, время, попытки} сохраняется в IndexedDB до того, как UI скажет «сохранено». Очередь проигрывается по порядку при online, на старте и по Background Sync (только Chromium; для Safari и Firefox обязателен fallback на online и старт приложения). Одна вкладка — лидер.',
          'An action {clientId, type, payload, time, attempts} is persisted to IndexedDB before the UI says “saved”. The queue replays in order on online, on startup and via Background Sync (Chromium only; a fallback to online and app start is mandatory for Safari and Firefox). One tab is the leader.',
          'Akcja {clientId, typ, payload, czas, próby} jest zapisywana w IndexedDB, zanim UI powie „zapisano”. Kolejka odtwarza się po kolei przy online, na starcie i przez Background Sync (tylko Chromium; dla Safari i Firefoksa fallback na online i start aplikacji jest obowiązkowy). Jedna karta jest liderem.',
        ),
      },
      {
        label: t('Optimistic UI', 'Optimistic UI', 'Optymistyczny UI'),
        body: t(
          'Показываем результат сразу со статусом pending → synced / failed, с откатом или «повторить». Различаем «сохранено локально» и «подтверждено сервером». Не для платежей и необратимых операций.',
          'Show the result at once with pending → synced / failed, with rollback or “retry”. Distinguish “saved locally” from “confirmed by the server”. Not for payments and irreversible operations.',
          'Pokazujemy wynik od razu ze statusem pending → synced / failed, z wycofaniem lub „ponów”. Odróżniamy „zapisano lokalnie” od „potwierdzono przez serwer”. Nie dla płatności i operacji nieodwracalnych.',
        ),
      },
      {
        label: t('Идемпотентность', 'Idempotency', 'Idempotentność'),
        body: t(
          'Клиент генерирует clientId и шлёт как Idempotency-Key. Доставка at-least-once, ретраи безопасны: сервер дедуплицирует и возвращает прежний результат, а не создаёт второй заказ.',
          'The client generates a clientId and sends it as an Idempotency-Key. Delivery is at-least-once, retries are safe: the server dedupes and returns the previous result instead of creating a second order.',
          'Klient generuje clientId i wysyła go jako Idempotency-Key. Dostarczenie jest at-least-once, ponowienia są bezpieczne: serwer deduplikuje i zwraca poprzedni wynik zamiast tworzyć drugie zamówienie.',
        ),
      },
      {
        label: t('Конфликты и reconnect', 'Conflicts and reconnect', 'Konflikty i reconnect'),
        body: t(
          'LWW для простого, версия/ETag и If-Match с 409 для важного, слияние по полям или CRDT для редакторов. После reconnect: backoff с jitter, инвалидация кэша, догон событий, обновление токена.',
          'LWW for simple data, a version/ETag and If-Match with a 409 for important data, field-level merge or CRDT for editors. After reconnect: backoff with jitter, cache invalidation, catching up events, refreshing the token.',
          'LWW dla prostych danych, wersja/ETag i If-Match z 409 dla ważnych, scalanie po polach lub CRDT dla edytorów. Po reconnect: backoff z jitterem, unieważnienie cache, nadrobienie zdarzeń, odświeżenie tokenu.',
        ),
      },
    ],
    followUps: [
      t(
        'Обновление service worker: skipWaiting и clients.claim рискуют смешать старый HTML и новые ассеты; безопаснее показать «доступна новая версия», чистить старые кэши на activate и версионировать имена кэшей.',
        'Service worker updates: skipWaiting and clients.claim risk mixing old HTML with new assets; safer to show “new version available”, clean old caches on activate and version cache names.',
        'Aktualizacja service workera: skipWaiting i clients.claim grożą pomieszaniem starego HTML z nowymi zasobami; bezpieczniej pokazać „dostępna nowa wersja”, czyścić stare cache przy activate i wersjonować nazwy cache.',
      ),
      t(
        'navigator.onLine врёт: «подключён к Wi-Fi» не значит «есть интернет». Источник правды — результат запроса; lie-fi (очень медленная сеть) лечится таймаутами и состоянием «синхронизируется».',
        'navigator.onLine lies: “connected to Wi-Fi” does not mean “has internet”. The source of truth is the request result; lie-fi (a very slow network) is handled with timeouts and a “syncing” state.',
        'navigator.onLine kłamie: „połączony z Wi-Fi” nie znaczy „ma internet”. Źródłem prawdy jest wynik żądania; lie-fi (bardzo wolna sieć) obsługują timeouty i stan „synchronizacja”.',
      ),
      t(
        'Несколько вкладок: BroadcastChannel рассылает изменения, Web Locks выбирают одну вкладку для проигрывания outbox, иначе одно действие уйдёт дважды (идемпотентность — страховка, а не замена).',
        'Several tabs: BroadcastChannel spreads changes, Web Locks pick one tab to replay the outbox, otherwise one action is sent twice (idempotency is a safety net, not a substitute).',
        'Wiele kart: BroadcastChannel rozsyła zmiany, Web Locks wybierają jedną kartę do odtwarzania outboxa, inaczej jedna akcja pójdzie dwa razy (idempotentność to zabezpieczenie, a nie zamiennik).',
      ),
      t(
        'Эволюция: начинаем с кэша чтения и ретраев; outbox добавляем для одного-двух критичных сценариев; sync-движок или CRDT (Replicache, PowerSync, Yjs) — когда конфликты частые, а типов сущностей много. Пересматриваем по доле конфликтов и обращений в поддержку.',
        'Evolution: start with read caching and retries; add an outbox for one or two critical flows; a sync engine or CRDT (Replicache, PowerSync, Yjs) when conflicts are frequent and entity types are many. Revisit by conflict rate and support tickets.',
        'Ewolucja: zaczynamy od cache odczytu i ponowień; outbox dodajemy dla jednego–dwóch krytycznych scenariuszy; silnik sync lub CRDT (Replicache, PowerSync, Yjs), gdy konflikty są częste, a typów encji dużo. Rewidujemy według odsetka konfliktów i zgłoszeń do supportu.',
      ),
      t(
        'Тесты: Playwright context.setOffline, перехват сети, проверка проигрывания outbox после reconnect, повторной доставки и ответа 409.',
        'Tests: Playwright context.setOffline, network interception, verifying outbox replay after reconnect, redelivery and a 409 response.',
        'Testy: Playwright context.setOffline, przechwytywanie sieci, weryfikacja odtwarzania outboxa po reconnect, ponownego dostarczenia i odpowiedzi 409.',
      ),
    ],
    redFlag: t(
      'Говорю «добавим service worker, и офлайн заработает» — без стратегии кэша, очереди записей, идемпотентности и конфликтов.',
      'I say “we’ll add a service worker and offline will work” — with no cache strategy, write queue, idempotency or conflict handling.',
      'Mówię „dodamy service workera i offline zadziała” — bez strategii cache, kolejki zapisów, idempotentności i obsługi konfliktów.',
    ),
    diagram: {
      nodes: [
        node(
          'ui',
          'ui',
          t('Optimistic UI', 'Optimistic UI', 'Optymistyczny UI'),
          t(
            'Пользователь видит результат сразу и состояние pending / synced / failed.',
            'The user sees the result at once and a pending / synced / failed state.',
            'Użytkownik widzi wynik od razu i stan pending / synced / failed.',
          ),
          t(
            'Блокирующий спиннер до ответа сервера для критичных операций.',
            'A blocking spinner until the server answers for critical operations.',
            'Blokujący spinner do odpowiedzi serwera dla operacji krytycznych.',
          ),
          t(
            'Как вы показываете, что запись ещё не подтверждена?',
            'How do you show a write is not yet confirmed?',
            'Jak pokazujecie, że zapis nie został jeszcze potwierdzony?',
          ),
        ),
        node(
          'sw',
          'browser',
          t('Service worker + Cache API', 'Service worker + Cache API', 'Service worker + Cache API'),
          t(
            'Читаем из кэша по стратегии под тип ресурса; худший риск — устаревшие данные.',
            'Reads come from the cache by strategy per resource type; the worst risk is stale data.',
            'Odczyty idą z cache według strategii dla typu zasobu; najgorsze ryzyko to nieaktualne dane.',
          ),
          t(
            'Только HTTP-кэш и ретраи, если офлайн нужен лишь как деградация.',
            'Only the HTTP cache and retries if offline is just graceful degradation.',
            'Tylko cache HTTP i ponowienia, jeśli offline to tylko łagodna degradacja.',
          ),
          t(
            'Какую стратегию вы выберете для списка, а какую для платежа?',
            'Which strategy do you pick for a list and which for a payment?',
            'Jaką strategię wybierzecie dla listy, a jaką dla płatności?',
          ),
        ),
        node(
          'outbox',
          'store',
          t('Outbox в IndexedDB', 'IndexedDB outbox', 'Outbox w IndexedDB'),
          t(
            'Запись переживает перезагрузку: действие хранится на диске до подтверждения.',
            'The write survives a reload: the action sits on disk until confirmed.',
            'Zapis przetrwa przeładowanie: akcja leży na dysku do potwierdzenia.',
          ),
          t(
            'Очередь в памяти, если потеря при закрытии вкладки допустима.',
            'An in-memory queue if losing it on tab close is acceptable.',
            'Kolejka w pamięci, jeśli utrata przy zamknięciu karty jest akceptowalna.',
          ),
          t(
            'Кто проигрывает очередь, если открыто несколько вкладок?',
            'Who replays the queue when several tabs are open?',
            'Kto odtwarza kolejkę, gdy otwartych jest kilka kart?',
          ),
        ),
        node(
          'api',
          'api',
          t('Идемпотентный API', 'Idempotent API', 'Idempotentne API'),
          t(
            'Ключ идемпотентности и версия делают ретраи безопасными, а конфликты явными (409).',
            'An idempotency key and a version make retries safe and conflicts explicit (409).',
            'Klucz idempotentności i wersja czynią ponowienia bezpiecznymi, a konflikty jawnymi (409).',
          ),
          t(
            'Last-write-wins, если потеря одной правки допустима.',
            'Last-write-wins if losing one edit is acceptable.',
            'Last-write-wins, jeśli utrata jednej edycji jest akceptowalna.',
          ),
          t(
            'Что видит пользователь при 409 после reconnect?',
            'What does the user see on a 409 after reconnect?',
            'Co widzi użytkownik przy 409 po reconnect?',
          ),
        ),
      ],
      edges: [
        edge('ui', 'sw', t('чтение из кэша', 'reads from cache', 'odczyt z cache')),
        edge('ui', 'outbox', t('запись в очередь', 'write to the queue', 'zapis do kolejki')),
        edge('outbox', 'api', t('replay с ключом', 'replay with a key', 'odtwarzanie z kluczem')),
        edge('api', 'ui', t('ack или конфликт', 'ack or conflict', 'ack lub konflikt')),
      ],
    },
  },
  i18n: {
    id: 'i18n',
    title: t(
      'Интернационализация (i18n) и локализация',
      'Internationalisation (i18n) and localisation',
      'Internacjonalizacja (i18n) i lokalizacja',
    ),
    thesis: t(
      'i18n — архитектурное решение, а не словарь строк: локаль живёт в URL, форматы идут через Intl и ICU, словари грузятся лениво и доступны на сервере, вёрстка готова к RTL и длинным строкам. Библиотека вторична и не должна определять модель.',
      'i18n is an architectural decision, not a string dictionary: locale lives in the URL, formats go through Intl and ICU, dictionaries load lazily and are available on the server, and the layout is ready for RTL and long strings. The library is secondary and must not define the model.',
      'i18n to decyzja architektoniczna, a nie słownik stringów: locale żyje w URL, formaty idą przez Intl i ICU, słowniki ładują się leniwie i są dostępne na serwerze, a layout jest gotowy na RTL i długie teksty. Biblioteka jest wtórna i nie powinna wyznaczać modelu.',
    ),
    ...TEXTBOOK.i18n,
    rows: [
      {
        label: t('Локаль в URL', 'Locale in the URL', 'Locale w URL'),
        body: t(
          'Путь (/pl/…) или поддомен: ссылка однозначна, CDN кэширует версии, поисковики получают hreflang и canonical. Cookie и Accept-Language — только для первого редиректа; смена языка — переход по URL.',
          'Path (/pl/…) or subdomain: the link is unambiguous, the CDN caches versions, search engines get hreflang and canonical. Cookie and Accept-Language only drive the first redirect; changing language is a URL navigation.',
          'Ścieżka (/pl/…) lub subdomena: link jest jednoznaczny, CDN cache’uje wersje, wyszukiwarki dostają hreflang i canonical. Cookie i Accept-Language służą tylko do pierwszego przekierowania; zmiana języka to przejście na URL.',
        ),
      },
      {
        label: t('Intl и форматы', 'Intl and formats', 'Intl i formaty'),
        body: t(
          'Числа, валюта, даты, относительное время, списки и сортировка — через Intl (NumberFormat, DateTimeFormat, RelativeTimeFormat, ListFormat, Collator). Валюта не выводится из языка, часовой пояс хранится отдельно от локали.',
          'Numbers, currency, dates, relative time, lists and sorting go through Intl (NumberFormat, DateTimeFormat, RelativeTimeFormat, ListFormat, Collator). Currency is not derived from the language, and the time zone is stored apart from the locale.',
          'Liczby, waluta, daty, czas względny, listy i sortowanie idą przez Intl (NumberFormat, DateTimeFormat, RelativeTimeFormat, ListFormat, Collator). Waluta nie wynika z języka, a strefa czasowa jest przechowywana osobno od locale.',
        ),
      },
      {
        label: t('ICU и плюрализация', 'ICU and pluralisation', 'ICU i pluralizacja'),
        body: t(
          'Сообщение целиком в ICU MessageFormat: plural, select, вставки; категории one/few/many/other у русского и польского, one/other у английского. Intl.PluralRules; никакой склейки, переводчик видит фразу целиком.',
          'The whole message in ICU MessageFormat: plural, select, placeholders; categories one/few/many/other for Russian and Polish, one/other for English. Intl.PluralRules; no concatenation, the translator sees the whole phrase.',
          'Cały komunikat w ICU MessageFormat: plural, select, wstawki; kategorie one/few/many/other dla rosyjskiego i polskiego, one/other dla angielskiego. Intl.PluralRules; bez sklejania, tłumacz widzi całe zdanie.',
        ),
      },
      {
        label: t('Ленивые словари и SSR', 'Lazy dictionaries and SSR', 'Leniwe słowniki i SSR'),
        body: t(
          'Словарь локали и маршрута — отдельный чанк через dynamic import с хешем. SSR отдаёт HTML на нужном языке и встраивает только нужные сообщения: нет мерцания и hydration mismatch. Fallback-локаль для ненайденных ключей.',
          'The locale-and-route dictionary is a separate chunk via dynamic import with a hash. SSR returns HTML in the right language and embeds only the needed messages: no flicker or hydration mismatch. A fallback locale for missing keys.',
          'Słownik locale i trasy to osobny chunk przez dynamic import z hashem. SSR zwraca HTML w odpowiednim języku i osadza tylko potrzebne komunikaty: bez migotania i hydration mismatch. Locale zapasowe dla brakujących kluczy.',
        ),
      },
      {
        label: t('RTL и вёрстка', 'RTL and layout', 'RTL i layout'),
        body: t(
          'dir="rtl", logical properties (margin-inline-start), зеркалирование иконок навигации, <bdi> для смешанного текста. Запас под удлинение текста (польский и немецкий длиннее английского), отдельные шрифты под письменность.',
          'dir="rtl", logical properties (margin-inline-start), mirrored navigation icons, <bdi> for mixed text. Room for text expansion (Polish and German run longer than English) and dedicated fonts per script.',
          'dir="rtl", logical properties (margin-inline-start), odbijane ikony nawigacji, <bdi> dla tekstu mieszanego. Zapas na wydłużenie tekstu (polski i niemiecki są dłuższe od angielskiego) i osobne fonty dla pisma.',
        ),
      },
      {
        label: t('Тестирование', 'Testing', 'Testowanie'),
        body: t(
          'Линтер на hardcoded-строки, сверка ключей между локалями и валидация ICU в CI, псевдолокализация, Playwright-снапшоты в RTL и в самой длинной локали, plural-кейсы 0, 1, 2, 5, 22.',
          'A linter for hardcoded strings, key parity between locales and ICU validation in CI, pseudo-localisation, Playwright snapshots in RTL and in the longest locale, plural cases 0, 1, 2, 5, 22.',
          'Linter na zahardkodowane stringi, zgodność kluczy między locale i walidacja ICU w CI, pseudolokalizacja, snapshoty Playwright w RTL i najdłuższym locale, przypadki liczby mnogiej 0, 1, 2, 5, 22.',
        ),
      },
    ],
    followUps: [
      t(
        'Не привязывайся к библиотеке: i18next, FormatJS/react-intl, Lingui, next-intl решают одно и то же. Выбор — по поддержке ICU, извлечению ключей, размеру, поддержке RSC и SSR. Держи формат сообщений (ICU) и ключи переносимыми.',
        'Do not tie yourself to one library: i18next, FormatJS/react-intl, Lingui and next-intl solve the same problem. Choose by ICU support, key extraction, size, and RSC and SSR support. Keep the message format (ICU) and keys portable.',
        'Nie wiąż się z jedną biblioteką: i18next, FormatJS/react-intl, Lingui i next-intl rozwiązują ten sam problem. Wybieraj według wsparcia ICU, ekstrakcji kluczy, rozmiaru oraz wsparcia RSC i SSR. Zadbaj, by format komunikatów (ICU) i klucze były przenośne.',
      ),
      t(
        'Процесс переводов: ключи по смыслу, а не по тексту; извлечение из кода; TMS (Crowdin, Lokalise) с контекстом и скриншотами для переводчиков; ревью перед релизом; fallback на язык по умолчанию.',
        'Translation workflow: keys by meaning, not by text; extraction from code; a TMS (Crowdin, Lokalise) with context and screenshots for translators; review before release; fallback to the default language.',
        'Proces tłumaczeń: klucze według znaczenia, a nie tekstu; ekstrakcja z kodu; TMS (Crowdin, Lokalise) z kontekstem i zrzutami dla tłumaczy; review przed wydaniem; fallback na język domyślny.',
      ),
      t(
        'Trade-offs: больше языков — больше процесс, размер бандла и матрица тестов; SSR и ленивые словари усложняют кэш; RTL требует переосмысления вёрстки. Окупается, если рынок и SEO реально требуют языков.',
        'Trade-offs: more languages mean more process, bundle size and test matrix; SSR and lazy dictionaries complicate caching; RTL needs the layout rethought. It pays off when the market and SEO genuinely require the languages.',
        'Trade-offy: więcej języków to więcej procesu, rozmiaru bundla i macierzy testów; SSR i leniwe słowniki komplikują cache; RTL wymaga przemyślenia layoutu. Opłaca się, gdy rynek i SEO naprawdę wymagają języków.',
      ),
      t(
        'Эволюция: сначала i18n-ready код (без hardcoded, через Intl) для одной локали; второй язык — URL и ленивые словари; RTL — по сигналу рынка. Пересматриваем при росте очереди переводов, размера бандла или доли трафика из новых регионов.',
        'Evolution: first i18n-ready code (no hardcoded strings, via Intl) for one locale; a second language adds URLs and lazy dictionaries; RTL follows a market signal. Revisit when the translation backlog, bundle size or traffic share from new regions grows.',
        'Ewolucja: najpierw kod gotowy na i18n (bez zahardkodowanych stringów, przez Intl) dla jednego locale; drugi język dodaje URL-e i leniwe słowniki; RTL — na sygnał z rynku. Rewidujemy przy wzroście kolejki tłumaczeń, rozmiaru bundla lub udziału ruchu z nowych regionów.',
      ),
      t(
        'Даты и время: храним UTC и IANA-пояс, форматируем на клиенте через Intl.DateTimeFormat с timeZone; «сегодня» и «через 2 дня» зависят от пояса пользователя, а не сервера.',
        'Dates and time: store UTC and an IANA zone, format on the client via Intl.DateTimeFormat with timeZone; “today” and “in 2 days” depend on the user’s zone, not the server’s.',
        'Daty i czas: przechowujemy UTC i strefę IANA, formatujemy na kliencie przez Intl.DateTimeFormat z timeZone; „dzisiaj” i „za 2 dni” zależą od strefy użytkownika, a nie serwera.',
      ),
    ],
    redFlag: t(
      'Хардкожу строки, склеиваю фразы через + и считаю, что i18n — это подключить библиотеку и словарь.',
      'I hardcode strings, concatenate phrases with + and think i18n means plugging in a library and a dictionary.',
      'Zahardkodowuję stringi, sklejam frazy przez + i uważam, że i18n to podpięcie biblioteki i słownika.',
    ),
    diagram: {
      nodes: [
        node(
          'url',
          'browser',
          t('Локаль в URL', 'Locale in the URL', 'Locale w URL'),
          t(
            'Однозначная ссылка, версия для CDN и hreflang для SEO.',
            'An unambiguous link, a CDN-cacheable version and hreflang for SEO.',
            'Jednoznaczny link, wersja do cache’owania na CDN i hreflang dla SEO.',
          ),
          t(
            'Cookie или клиентский стейт — проще, но без SEO и шаринга.',
            'Cookie or client state is simpler but loses SEO and shareability.',
            'Cookie lub stan klienta jest prostsze, ale traci SEO i możliwość udostępniania.',
          ),
          t(
            'Как вы редиректите первого посетителя и запоминаете выбор?',
            'How do you redirect the first visitor and remember the choice?',
            'Jak przekierowujecie pierwszego odwiedzającego i zapamiętujecie wybór?',
          ),
        ),
        node(
          'dict',
          'cdn',
          t('Ленивые словари', 'Lazy dictionaries', 'Leniwe słowniki'),
          t(
            'Чанк на локаль и маршрут: грузим только нужное, кэшируем по хешу.',
            'A chunk per locale and route: load only what is needed, cache by hash.',
            'Chunk na locale i trasę: ładujemy tylko to, co potrzebne, cache po hashu.',
          ),
          t(
            'Один общий словарь, если языков два, а сообщений немного.',
            'One shared dictionary while there are two languages and few messages.',
            'Jeden wspólny słownik, gdy są dwa języki i mało komunikatów.',
          ),
          t(
            'Как SSR получает тот же словарь, что и клиент?',
            'How does SSR get the same dictionary as the client?',
            'Jak SSR dostaje ten sam słownik co klient?',
          ),
        ),
        node(
          'icu',
          'app',
          t('Intl и ICU-сообщения', 'Intl and ICU messages', 'Intl i komunikaty ICU'),
          t(
            'Форматы и плюрализация по правилам языка, фраза переводится целиком.',
            'Formats and plurals follow language rules, and the phrase is translated whole.',
            'Formaty i liczba mnoga według reguł języka, zdanie tłumaczone w całości.',
          ),
          t(
            'Ручные шаблоны, если язык один и тексты фиксированные.',
            'Hand-made templates if there is one language and fixed copy.',
            'Ręczne szablony, jeśli jest jeden język i stałe teksty.',
          ),
          t(
            'Как вы переведёте «1 файл, 2 файла, 5 файлов»?',
            'How do you translate “1 file, 2 files, 5 files”?',
            'Jak przetłumaczycie „1 plik, 2 pliki, 5 plików”?',
          ),
        ),
        node(
          'ci',
          'ci',
          t('Проверки в CI', 'CI checks', 'Kontrole w CI'),
          t(
            'Lint на hardcoded-строки, сверка ключей и псевдолокализация ловят проблемы до релиза.',
            'Lint for hardcoded strings, key parity and pseudo-localisation catch issues before release.',
            'Lint na zahardkodowane stringi, zgodność kluczy i pseudolokalizacja łapią problemy przed wydaniem.',
          ),
          t(
            'Ручная проверка каждого языка перед релизом не масштабируется.',
            'Manually checking each language before release does not scale.',
            'Ręczne sprawdzanie każdego języka przed wydaniem się nie skaluje.',
          ),
          t(
            'Какая проверка упадёт, если ключа нет в польском словаре?',
            'Which check fails when a key is missing from the Polish dictionary?',
            'Która kontrola padnie, gdy klucza brakuje w polskim słowniku?',
          ),
        ),
      ],
      edges: [
        edge('url', 'dict', t('выбирает локаль', 'selects the locale', 'wybiera locale')),
        edge('dict', 'icu', t('сообщения', 'messages', 'komunikaty')),
        edge('ci', 'dict', t('сверка ключей', 'key parity check', 'zgodność kluczy')),
        edge('ci', 'icu', t('валидация ICU', 'ICU validation', 'walidacja ICU')),
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
