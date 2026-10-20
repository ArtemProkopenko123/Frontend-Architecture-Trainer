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
  architecture: {
    checks: t(
      'Понимаешь ли ты архитектуру как инструмент для бизнеса и команды, а не как «красивую структуру папок».',
      'Do you see architecture as a tool for the business and the team, not as a pretty folder structure.',
      'Czy rozumiesz architekturę jako narzędzie dla biznesu i zespołu, a nie jako „ładną strukturę folderów”.',
    ),
    structure: [
      t(
        'Определение через цель: снизить стоимость изменений.',
        'Define it through the goal: lower the cost of change.',
        'Zdefiniuj ją przez cel: obniżyć koszt zmian.',
      ),
      t(
        'Из чего состоит: границы модулей, потоки данных, рендеринг, интеграция с бэкендом, сборка и доставка.',
        'What it consists of: module boundaries, data flows, rendering, backend integration, build and delivery.',
        'Z czego się składa: granice modułów, przepływy danych, rendering, integracja z backendem, build i dostarczanie.',
      ),
      t(
        'Критерии хорошей архитектуры и как проверить каждый на практике.',
        'The criteria of good architecture and how to check each one in practice.',
        'Kryteria dobrej architektury i jak sprawdzić każde z nich w praktyce.',
      ),
      t(
        'Пример из опыта и честная цена решения.',
        'An example from experience and the honest cost of the decision.',
        'Przykład z doświadczenia i uczciwa cena decyzji.',
      ),
    ],
    sample: t(
      'Для меня архитектура — это решения, которые дорого менять: как код разбит на модули и кто от кого зависит, где живёт состояние, как мы получаем данные и рендерим страницы, как это собирается и доставляется. Хорошая архитектура делает типичное изменение дешёвым и локальным: новую фичу добавляет одна команда, не трогая чужой код и не ломая соседние экраны.',
      'To me, architecture is the set of decisions that are expensive to change: how the code is split into modules and what depends on what, where state lives, how we fetch data and render pages, and how it all gets built and shipped. Good architecture makes the typical change cheap and local — one team can add a feature without touching someone else’s code or breaking other screens.',
      'Dla mnie architektura to decyzje, które drogo zmieniać: jak kod jest podzielony na moduły i kto od kogo zależy, gdzie żyje stan, jak pobieramy dane i renderujemy strony oraz jak to jest budowane i dostarczane. Dobra architektura sprawia, że typowa zmiana jest tania i lokalna: jeden zespół dodaje funkcję, nie ruszając cudzego kodu i nie psując sąsiednich ekranów.',
    ),
    cards: [
      card(
        'definition',
        t('Определение архитектуры', 'Defining architecture', 'Definicja architektury'),
        t(
          'Начинаешь с цели, а не с папок и библиотек.',
          'You start from the goal, not from folders and libraries.',
          'Zaczynasz od celu, a nie od folderów i bibliotek.',
        ),
        [
          t('Решения, которые дорого менять.', 'Decisions that are expensive to change.', 'Decyzje, które drogo zmieniać.'),
          t(
            'Типичное изменение дешёвое и локальное.',
            'The typical change is cheap and local.',
            'Typowa zmiana jest tania i lokalna.',
          ),
        ],
        t(
          'Архитектура — набор решений, которые дорого менять, и правила, удерживающие систему управляемой при росте кода и команды. Цель — снизить стоимость изменений.',
          'Architecture is the set of decisions that are expensive to change, plus the rules that keep the system manageable as code and team grow. The goal is to lower the cost of change.',
          'Architektura to zestaw decyzji, które drogo zmieniać, oraz reguły utrzymujące system w ryzach wraz ze wzrostem kodu i zespołu. Celem jest obniżenie kosztu zmian.',
        ),
      ),
      card(
        'good-criteria',
        t('Критерии хорошей архитектуры', 'Criteria of good architecture', 'Kryteria dobrej architektury'),
        t(
          'Для каждого критерия называешь проверку, а не лозунг.',
          'For each criterion you name a check, not a slogan.',
          'Dla każdego kryterium podajesz sposób sprawdzenia, a nie hasło.',
        ),
        [
          t(
            'Локальность, явные зависимости, тестируемость.',
            'Locality, explicit dependencies, testability.',
            'Lokalność, jawne zależności, testowalność.',
          ),
          t(
            'Заменяемость, метрики, соответствие команде (Conway).',
            'Replaceability, metrics, fit with the team (Conway).',
            'Wymienialność, metryki, dopasowanie do zespołu (Conway).',
          ),
        ],
        t(
          'Фича правится в 1–2 модулях, а не в 15 файлах; импорты однонаправленные и проверяются линтером; логика тестируется без рендера и сети; новичок находит нужное за минуты; библиотеку можно заменить за ограниченный объём работ; структура кода повторяет ownership.',
          'A feature changes in 1–2 modules, not 15 files; imports are one-way and lint-checked; logic is tested without rendering or network; a newcomer finds things in minutes; a library can be swapped in bounded work; code structure mirrors ownership.',
          'Funkcję zmienia się w 1–2 modułach, a nie w 15 plikach; importy są jednokierunkowe i sprawdzane lintem; logikę testuje się bez renderu i sieci; nowa osoba znajduje potrzebne miejsce w minuty; bibliotekę można wymienić w ograniczonym zakresie prac; struktura kodu odzwierciedla ownership.',
        ),
      ),
      card(
        'senior-signals',
        t('Сигналы senior-уровня', 'Senior-level signals', 'Sygnały poziomu senior'),
        t(
          'Интервьюер ищет ход мысли, а не «правильный» ответ.',
          'The interviewer looks for reasoning, not a “right” answer.',
          'Rekruter szuka toku myślenia, a nie „poprawnej” odpowiedzi.',
        ),
        [
          t(
            'Требования раньше библиотек, trade-offs без подсказки.',
            'Requirements before libraries, trade-offs unprompted.',
            'Wymagania przed bibliotekami, trade-offy bez podpowiedzi.',
          ),
          t(
            'Цифры, команда и процесс, признание ошибок.',
            'Numbers, team and process, admitting mistakes.',
            'Liczby, zespół i proces, przyznanie się do błędów.',
          ),
        ],
        t(
          'Говорю о требованиях и ограничениях раньше, чем о библиотеках; сам называю цену решения; опираюсь на цифры (LCP с 4,1 до 2,3 с, CI с 18 до 7 минут); думаю об онбординге, ownership и о том, как решение переживёт уход автора; признаю ошибки.',
          'I talk about requirements and constraints before libraries; I name the cost of a decision myself; I rely on numbers (LCP from 4.1 to 2.3 s, CI from 18 to 7 minutes); I think about onboarding, ownership and how a decision survives its author leaving; I admit mistakes.',
          'Mówię o wymaganiach i ograniczeniach przed bibliotekami; sam nazywam cenę decyzji; opieram się na liczbach (LCP z 4,1 do 2,3 s, CI z 18 do 7 minut); myślę o onboardingu, ownership i o tym, jak decyzja przetrwa odejście autora; przyznaję się do błędów.',
        ),
      ),
      card(
        'phrases',
        t('Фразы-связки RU/EN', 'Bridge phrases RU/EN', 'Frazy łączące RU/EN'),
        t(
          'Можешь спокойно держать паузу и уточнять контекст.',
          'You can calmly take a pause and clarify the context.',
          'Potrafisz spokojnie zrobić pauzę i dopytać o kontekst.',
        ),
        [
          t(
            'Пауза, уточнение, trade-off.',
            'Pause, clarification, trade-off.',
            'Pauza, doprecyzowanie, trade-off.',
          ),
          t(
            'Честное «не знаю» и ссылка на опыт.',
            'An honest “I don’t know” and a pointer to experience.',
            'Uczciwe „nie wiem” i odwołanie do doświadczenia.',
          ),
        ],
        t(
          'Взять паузу: «Дайте секунду подумать, как бы я это разложил» (“Let me take a second to structure this”). Уточнить: «Какой масштаб обсуждаем: команда, пользователи?» (“What scale are we talking about?”). Trade-off: «Это упрощает A, но ценой B» (“This simplifies A at the cost of B”). Не знаю: «Напрямую не работал, но рассуждал бы так…» (“I haven’t used it in production, but here’s how I’d reason about it…”).',
          'Take a pause: “Let me take a second to structure this.” Clarify: “What scale are we talking about — team size, users?” Trade-off: “This simplifies A at the cost of B.” Don’t know: “I haven’t used it in production, but here’s how I’d reason about it…” Rehearse each phrase aloud, in English and in your own language.',
          'Wziąć pauzę: „Dajcie mi chwilę, jak bym to rozłożył” (“Let me take a second to structure this”). Dopytać: „O jakiej skali mówimy: zespół, użytkownicy?” (“What scale are we talking about?”). Trade-off: „To upraszcza A kosztem B” (“This simplifies A at the cost of B”). Nie wiem: „Nie pracowałem z tym bezpośrednio, ale rozumowałbym tak…” (“I haven’t used it in production, but here’s how I’d reason about it…”).',
        ),
      ),
    ],
  },
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
  a11y: {
    checks: t(
      'Относишься к доступности как к требованию продукта: семантика, клавиатура, фокус, проверки в CI и вручную — а не «добавим aria-label».',
      'You treat accessibility as a product requirement: semantics, keyboard, focus, checks in CI and by hand — not “let’s add aria-label”.',
      'Traktujesz dostępność jako wymaganie produktu: semantyka, klawiatura, fokus, kontrole w CI i ręcznie — a nie „dodajmy aria-label”.',
    ),
    structure: [
      t(
        'Требование и уровень: WCAG 2.2 AA, кому и зачем.',
        'The requirement and level: WCAG 2.2 AA, for whom and why.',
        'Wymaganie i poziom: WCAG 2.2 AA, dla kogo i po co.',
      ),
      t(
        'Порядок: семантический HTML → клавиатура и фокус → ARIA и live regions.',
        'The order: semantic HTML → keyboard and focus → ARIA and live regions.',
        'Kolejność: semantyczny HTML → klawiatura i fokus → ARIA i live regions.',
      ),
      t(
        'Границы: что гарантирует дизайн-система, а что остаётся фиче.',
        'Boundaries: what the design system guarantees and what stays with the feature.',
        'Granice: co gwarantuje design system, a co zostaje po stronie funkcji.',
      ),
      t(
        'Проверки: axe в CI, Playwright, ручной прогон с клавиатурой и screen reader.',
        'Checks: axe in CI, Playwright, a manual pass with keyboard and screen reader.',
        'Kontrole: axe w CI, Playwright, ręczny przegląd z klawiaturą i czytnikiem ekranu.',
      ),
      t(
        'Trade-offs и сигнал, при котором усиливаешь подход.',
        'Trade-offs and the signal that makes you step the approach up.',
        'Trade-offy i sygnał, przy którym wzmacniasz podejście.',
      ),
    ],
    sample: t(
      'Я начинаю с требования: беру за основу критерии WCAG 2.2 AA (рекомендация W3C, на которую ссылаются регуляторные требования вроде EAA и EN 301 549; это не юридическая консультация) и думаю о реальных пользователях. Дальше порядок такой: сначала семантический HTML — button, label, заголовки, landmarks, — потом клавиатура и управление фокусом, и только где семантики не хватает — ARIA. Сложные виджеты берём из headless-примитивов дизайн-системы, поэтому клавиатурный контракт написан один раз; фича отвечает за подписи, заголовки и тексты ошибок. Проверяю eslint-plugin-jsx-a11y и axe в CI, критичные сценарии — в Playwright, плюс ручной прогон с клавиатурой и screen reader перед релизом. Цена: примитивы медленнее прототипировать, бренд-цвета упираются в контраст, автоматика ловит лишь часть проблем. Если ручные проверки регулярно находят регрессии, которые пропустил axe, или появляется аудит и юридическое требование, я перехожу к выделенному a11y-ownership и регулярному аудиту.',
      'I start with the requirement: I take the WCAG 2.2 AA criteria as the baseline (a W3C recommendation that regulatory requirements such as the EAA and EN 301 549 refer to; this is not legal advice) and think about real users. The order is semantic HTML first — button, label, headings, landmarks — then keyboard and focus management, and ARIA only where semantics fall short. Complex widgets come from the design system’s headless primitives, so the keyboard contract is written once; the feature owns labels, headings and error copy. I check with eslint-plugin-jsx-a11y and axe in CI, critical flows in Playwright, plus a manual keyboard and screen-reader pass before release. The cost: primitives are slower to prototype, brand colours collide with contrast, and automation catches only part of the issues. If manual checks keep finding regressions axe missed, or an audit or legal requirement appears, I move to dedicated a11y ownership and regular audits.',
      'Zaczynam od wymagania: biorę za podstawę kryteria WCAG 2.2 AA (rekomendacja W3C, do której odwołują się wymogi regulacyjne, takie jak EAA i EN 301 549; to nie porada prawna) i myślę o prawdziwych użytkownikach. Kolejność jest taka: najpierw semantyczny HTML — button, label, nagłówki, landmarki — potem klawiatura i zarządzanie fokusem, a ARIA tylko tam, gdzie semantyki brakuje. Złożone widgety biorę z bezgłowych prymitywów design systemu, więc kontrakt klawiatury jest napisany raz; funkcja odpowiada za etykiety, nagłówki i teksty błędów. Sprawdzam eslint-plugin-jsx-a11y i axe w CI, krytyczne scenariusze w Playwright, a przed wydaniem ręczny przegląd z klawiaturą i czytnikiem ekranu. Cena: prymitywy wolniej się prototypuje, kolory marki zderzają się z kontrastem, a automatyka łapie tylko część problemów. Jeśli ręczne testy regularnie znajdują regresje, które axe przepuścił, albo pojawia się audyt i wymóg prawny, przechodzę do dedykowanego ownership dostępności i regularnych audytów.',
    ),
    cards: [
      card(
        'semantic-first',
        t('Семантика раньше ARIA', 'Semantics before ARIA', 'Semantyka przed ARIA'),
        t(
          'Знаешь, что плохой ARIA хуже, чем её отсутствие.',
          'You know bad ARIA is worse than no ARIA.',
          'Wiesz, że zła ARIA jest gorsza niż jej brak.',
        ),
        [
          t(
            'Нативный элемент вместо div с onClick.',
            'A native element instead of a div with onClick.',
            'Natywny element zamiast div z onClick.',
          ),
          t(
            'Заголовки, landmarks, label у каждого поля.',
            'Headings, landmarks, a label on every field.',
            'Nagłówki, landmarki, label przy każdym polu.',
          ),
        ],
        t(
          'Нативные button, a, input, dialog, label дают роль, фокус и клавиатуру бесплатно. ARIA добавляю, только когда нативной семантики нет, и тогда беру на себя весь контракт: роль, состояние, клавиши.',
          'Native button, a, input, dialog and label give role, focus and keyboard for free. I add ARIA only when no native semantics exist, and then I own the whole contract: role, state, keys.',
          'Natywne button, a, input, dialog i label dają rolę, fokus i klawiaturę za darmo. ARIA dodaję tylko wtedy, gdy nie ma natywnej semantyki, i wtedy biorę na siebie cały kontrakt: rolę, stan, klawisze.',
        ),
      ),
      card(
        'focus-management',
        t('Клавиатура и управление фокусом', 'Keyboard and focus management', 'Klawiatura i zarządzanie fokusem'),
        t(
          'Умеешь провести пользователя через модалку и смену маршрута без мыши.',
          'You can take a user through a modal and a route change without a mouse.',
          'Potrafisz przeprowadzić użytkownika przez modal i zmianę trasy bez myszy.',
        ),
        [
          t(
            'Видимый :focus-visible и логичный порядок Tab.',
            'A visible :focus-visible and a logical Tab order.',
            'Widoczny :focus-visible i logiczna kolejność Tab.',
          ),
          t(
            'Ловушка фокуса, Esc и возврат фокуса.',
            'A focus trap, Esc and focus return.',
            'Pułapka fokusa, Esc i powrót fokusa.',
          ),
        ],
        t(
          'Модалка: фокус внутрь, Tab не уходит наружу, Esc закрывает, фокус возвращается на триггер, фон inert. В SPA при смене маршрута переношу фокус на заголовок и обновляю document.title, иначе screen reader молчит. Рядом — skip link.',
          'Modal: focus moves in, Tab stays inside, Esc closes, focus returns to the trigger, the background is inert. In an SPA on route change I move focus to the heading and update document.title, otherwise a screen reader says nothing. Plus a skip link.',
          'Modal: fokus wchodzi do środka, Tab nie wychodzi na zewnątrz, Esc zamyka, fokus wraca na wyzwalacz, tło jest inert. W SPA przy zmianie trasy przenoszę fokus na nagłówek i aktualizuję document.title, inaczej czytnik ekranu milczy. Do tego skip link.',
        ),
      ),
      card(
        'live-regions',
        t('Screen readers и live regions', 'Screen readers and live regions', 'Czytniki ekranu i live regions'),
        t(
          'Умеешь озвучить динамические изменения, не превращая их в спам.',
          'You can announce dynamic changes without turning them into spam.',
          'Potrafisz ogłaszać dynamiczne zmiany, nie robiąc z nich spamu.',
        ),
        [
          t(
            'polite для статусов, assertive — для ошибок.',
            'polite for status, assertive for errors.',
            'polite dla statusów, assertive dla błędów.',
          ),
          t(
            'Регион существует в DOM до изменения текста.',
            'The region exists in the DOM before the text changes.',
            'Region istnieje w DOM przed zmianą tekstu.',
          ),
        ],
        t(
          'Тосты, результаты поиска и ошибки форм озвучиваю через role="status" (aria-live="polite") и role="alert". Контейнер стоит в DOM заранее, меняется только текст; у загрузки — aria-busy. Не озвучиваю каждое обновление.',
          'Toasts, search results and form errors are announced via role="status" (aria-live="polite") and role="alert". The container is in the DOM up front and only its text changes; loading gets aria-busy. I do not announce every update.',
          'Toasty, wyniki wyszukiwania i błędy formularzy ogłaszam przez role="status" (aria-live="polite") i role="alert". Kontener jest w DOM wcześniej, zmienia się tylko tekst; ładowanie dostaje aria-busy. Nie ogłaszam każdej aktualizacji.',
        ),
      ),
      card(
        'design-system-boundary',
        t('Границы дизайн-системы', 'Design-system boundaries', 'Granice design systemu'),
        t(
          'Разделяешь, что гарантирует система, а что должен сделать продуктовый разработчик.',
          'You split what the system guarantees from what the product developer must do.',
          'Rozdzielasz to, co gwarantuje system, od tego, co musi zrobić deweloper produktu.',
        ),
        [
          t(
            'Примитивы владеют ролями, клавишами и фокусом.',
            'Primitives own roles, keys and focus.',
            'Prymitywy odpowiadają za role, klawisze i fokus.',
          ),
          t(
            'Фича владеет подписями, заголовками и текстами ошибок.',
            'The feature owns labels, headings and error copy.',
            'Funkcja odpowiada za etykiety, nagłówki i teksty błędów.',
          ),
        ],
        t(
          'Radix/React Aria закрывают клавиатурный контракт Dialog, Select, Tabs один раз. Продуктовая команда обязана дать осмысленное имя, структуру заголовков и понятную ошибку; это ловят lint и ревью, а не примитив.',
          'Radix/React Aria cover the keyboard contract of Dialog, Select and Tabs once. The product team must provide a meaningful name, heading structure and a clear error; lint and review catch that, not the primitive.',
          'Radix/React Aria zamykają kontrakt klawiatury dla Dialog, Select i Tabs raz. Zespół produktowy musi dostarczyć sensowną nazwę, strukturę nagłówków i zrozumiały błąd; to łapią lint i review, a nie prymityw.',
        ),
      ),
      card(
        'a11y-checks',
        t('Автоматические и ручные проверки', 'Automated and manual checks', 'Kontrole automatyczne i ręczne'),
        t(
          'Знаешь предел axe и не обещаешь «полную доступность» от CI.',
          'You know the limit of axe and do not promise “full accessibility” from CI.',
          'Znasz granice axe i nie obiecujesz „pełnej dostępności” z CI.',
        ),
        [
          t(
            'eslint-plugin-jsx-a11y, jest-axe, axe в Playwright.',
            'eslint-plugin-jsx-a11y, jest-axe, axe in Playwright.',
            'eslint-plugin-jsx-a11y, jest-axe, axe w Playwright.',
          ),
          t(
            'Ручной прогон: клавиатура, VoiceOver/NVDA, zoom.',
            'A manual pass: keyboard, VoiceOver/NVDA, zoom.',
            'Ręczny przegląd: klawiatura, VoiceOver/NVDA, zoom.',
          ),
        ],
        t(
          'Линтер ловит очевидное в JSX, axe — часть нарушений в DOM, Playwright — критичные сценарии с клавиатуры. Порядок фокуса, смысл подписей и озвучку динамики автоматика не видит, поэтому перед релизом — ручной прогон.',
          'The linter catches the obvious in JSX, axe catches part of the violations in the DOM, Playwright drives critical flows from the keyboard. Focus order, label meaning and dynamic announcements are invisible to automation, so there is a manual pass before release.',
          'Linter łapie oczywistości w JSX, axe — część naruszeń w DOM, Playwright przechodzi krytyczne scenariusze z klawiatury. Kolejności fokusa, sensu etykiet i ogłaszania dynamiki automatyka nie widzi, więc przed wydaniem jest ręczny przegląd.',
        ),
      ),
    ],
  },
  offline: {
    checks: t(
      'Разделяешь кэш чтения и офлайн-запись и понимаешь, что второе — это распределённая система на клиенте.',
      'You separate read caching from offline writes and understand the second is a distributed system on the client.',
      'Rozdzielasz cache odczytu od zapisu offline i rozumiesz, że to drugie jest systemem rozproszonym na kliencie.',
    ),
    structure: [
      t(
        'Какой офлайн нужен: деградация, только чтение или полноценная запись.',
        'What offline means here: graceful degradation, read-only or full writes.',
        'Jaki offline jest potrzebny: degradacja, tylko odczyt czy pełny zapis.',
      ),
      t(
        'Чтение: service worker, стратегии кэша, app shell, хранилище.',
        'Reads: service worker, cache strategies, app shell, storage.',
        'Odczyt: service worker, strategie cache, app shell, storage.',
      ),
      t(
        'Запись: outbox в IndexedDB, optimistic UI, идемпотентность.',
        'Writes: an outbox in IndexedDB, optimistic UI, idempotency.',
        'Zapis: outbox w IndexedDB, optimistic UI, idempotentność.',
      ),
      t(
        'Конфликты и reconnect: версии, backoff, догон состояния.',
        'Conflicts and reconnect: versions, backoff, catching up state.',
        'Konflikty i reconnect: wersje, backoff, nadrabianie stanu.',
      ),
      t(
        'Trade-offs и сигнал, при котором усложняешь схему.',
        'Trade-offs and the signal that makes you add machinery.',
        'Trade-offy i sygnał, przy którym komplikujesz rozwiązanie.',
      ),
    ],
    sample: t(
      'Сначала уточняю, что значит офлайн: открыть приложение без сети, читать закэшированное или ещё и писать. Чтение — это service worker и кэш: cache-first для ассетов с хешами, stale-while-revalidate для списков, network-first там, где важна свежесть, и никакого кэша для платежей. Запись — другая задача: действие сначала сохраняется в outbox в IndexedDB с clientId, UI показывает pending, а при reconnect очередь проигрывается по порядку; сервер дедуплицирует по ключу идемпотентности, а конфликты решаются версией (ETag, If-Match) или явным UI слияния. Цена: хранилище и квоты, миграции схемы IndexedDB, обновления service worker и тестирование состояний сети. Я бы начал с кэша чтения и ретраев, добавил outbox для одного-двух критичных сценариев и перешёл к sync-движку или CRDT, только когда конфликты станут частыми.',
      'First I clarify what offline means: opening the app without a network, reading cached data, or also writing. Reading is a service worker and a cache: cache-first for hashed assets, stale-while-revalidate for lists, network-first where freshness matters, and no cache for payments. Writing is a different problem: the action is first saved to an outbox in IndexedDB with a clientId, the UI shows pending, and on reconnect the queue replays in order; the server dedupes via an idempotency key, and conflicts are resolved with a version (ETag, If-Match) or an explicit merge UI. The cost: storage and quotas, IndexedDB schema migrations, service worker updates and testing network states. I would start with read caching and retries, add an outbox for one or two critical flows, and move to a sync engine or CRDT only once conflicts become frequent.',
      'Najpierw doprecyzowuję, co znaczy offline: otwarcie aplikacji bez sieci, odczyt danych z cache czy także zapis. Odczyt to service worker i cache: cache-first dla zasobów z hashem, stale-while-revalidate dla list, network-first tam, gdzie liczy się świeżość, i żadnego cache dla płatności. Zapis to inny problem: akcja jest najpierw zapisywana do outboxa w IndexedDB z clientId, UI pokazuje pending, a po reconnect kolejka jest odtwarzana po kolei; serwer deduplikuje po kluczu idempotentności, a konflikty rozwiązuje wersja (ETag, If-Match) lub jawny interfejs scalania. Cena: storage i limity, migracje schematu IndexedDB, aktualizacje service workera i testowanie stanów sieci. Zacząłbym od cache odczytu i ponowień, dodał outbox dla jednego–dwóch krytycznych scenariuszy, a do silnika sync lub CRDT przeszedł dopiero, gdy konflikty staną się częste.',
    ),
    cards: [
      card(
        'sw-read-caching',
        t('Service worker и стратегии кэша чтения', 'Service worker and read-cache strategies', 'Service worker i strategie cache odczytu'),
        t(
          'Выбираешь стратегию кэша под тип ресурса, а не «кэшируем всё».',
          'You pick a cache strategy per resource type, not “cache everything”.',
          'Dobierasz strategię cache do typu zasobu, a nie „cache’ujemy wszystko”.',
        ),
        [
          t(
            'Cache-first, network-first, stale-while-revalidate: по типу ресурса.',
            'Cache-first, network-first, stale-while-revalidate: per resource type.',
            'Cache-first, network-first, stale-while-revalidate: według typu zasobu.',
          ),
          t(
            'Версионирование кэша и обновление service worker.',
            'Cache versioning and service worker updates.',
            'Wersjonowanie cache i aktualizacja service workera.',
          ),
        ],
        t(
          'Ассеты с хешем — cache-first; HTML и данные, где важна свежесть, — network-first; списки и аватары — stale-while-revalidate; платежи — только сеть. Старые кэши чищу при activate, а обновление service worker показываю как «доступна новая версия».',
          'Hashed assets are cache-first; HTML and data where freshness matters are network-first; lists and avatars are stale-while-revalidate; payments are network-only. I clean old caches on activate and surface a service worker update as “new version available”.',
          'Zasoby z hashem to cache-first; HTML i dane, gdzie liczy się świeżość, to network-first; listy i awatary to stale-while-revalidate; płatności — tylko sieć. Stare cache czyszczę przy activate, a aktualizację service workera pokazuję jako „dostępna nowa wersja”.',
        ),
      ),
      card(
        'outbox',
        t('Outbox в IndexedDB', 'An outbox in IndexedDB', 'Outbox w IndexedDB'),
        t(
          'Понимаешь, что запись офлайн — это надёжная очередь, а не retry в памяти.',
          'You understand an offline write is a durable queue, not an in-memory retry.',
          'Rozumiesz, że zapis offline to trwała kolejka, a nie ponowienie w pamięci.',
        ),
        [
          t(
            'Действие пишется на диск до того, как UI скажет «сохранено».',
            'The action hits disk before the UI says “saved”.',
            'Akcja trafia na dysk, zanim UI powie „zapisano”.',
          ),
          t(
            'Проигрывание по порядку, один воркер на все вкладки.',
            'Ordered replay, a single replayer across tabs.',
            'Odtwarzanie po kolei, jeden replayer dla wszystkich kart.',
          ),
        ],
        t(
          'Запись в outbox: {clientId, тип, payload, время, попытки} в IndexedDB. Проигрываю по порядку при событии online, старте приложения и по Background Sync (только Chromium; для Safari и Firefox обязателен fallback на online и старт приложения). Одну вкладку делаю лидером через Web Locks, чтобы не отправить дважды.',
          'An outbox record: {clientId, type, payload, time, attempts} in IndexedDB. I replay in order on the online event, app start and Background Sync (Chromium only; a fallback to online and app start is mandatory for Safari and Firefox). One tab becomes the leader via Web Locks so nothing is sent twice.',
          'Rekord w outboxie: {clientId, typ, payload, czas, próby} w IndexedDB. Odtwarzam po kolei przy zdarzeniu online, starcie aplikacji i przez Background Sync (tylko Chromium; dla Safari i Firefoksa fallback na online i start aplikacji jest obowiązkowy). Jedna karta zostaje liderem przez Web Locks, żeby nic nie poszło dwa razy.',
        ),
      ),
      card(
        'optimistic-idempotency',
        t('Optimistic UI и идемпотентность', 'Optimistic UI and idempotency', 'Optimistic UI i idempotentność'),
        t(
          'Различаешь «сохранено локально» и «подтверждено сервером» и защищаешься от дублей.',
          'You distinguish “saved locally” from “confirmed by the server” and guard against duplicates.',
          'Odróżniasz „zapisano lokalnie” od „potwierdzono przez serwer” i chronisz się przed duplikatami.',
        ),
        [
          t(
            'Статусы pending / synced / failed с повтором.',
            'pending / synced / failed states with a retry.',
            'Statusy pending / synced / failed z ponowieniem.',
          ),
          t(
            'Ключ идемпотентности от клиента, дедупликация на сервере.',
            'A client-generated idempotency key, server-side dedup.',
            'Klucz idempotentności od klienta, deduplikacja na serwerze.',
          ),
        ],
        t(
          'Optimistic UI показывает результат сразу, но помечает pending и умеет откат или «повторить». Клиент генерирует clientId и шлёт его как Idempotency-Key: доставка at-least-once, а сервер выполняет операцию один раз. Для платежей optimistic UI не использую.',
          'Optimistic UI shows the result at once but marks it pending and supports rollback or “retry”. The client generates a clientId and sends it as an Idempotency-Key: delivery is at-least-once while the server executes the operation once. I do not use optimistic UI for payments.',
          'Optimistic UI pokazuje wynik od razu, ale oznacza go jako pending i umożliwia wycofanie lub „ponów”. Klient generuje clientId i wysyła go jako Idempotency-Key: dostarczenie jest at-least-once, a serwer wykonuje operację raz. Dla płatności nie używam optimistic UI.',
        ),
      ),
      card(
        'conflicts-reconnect',
        t('Конфликты и reconnect', 'Conflicts and reconnect', 'Konflikty i reconnect'),
        t(
          'Имеешь стратегию на случай, когда два устройства изменили одно и то же.',
          'You have a strategy for when two devices changed the same thing.',
          'Masz strategię na sytuację, gdy dwa urządzenia zmieniły to samo.',
        ),
        [
          t(
            'LWW, версия/ETag, слияние по полям, CRDT.',
            'LWW, version/ETag, field-level merge, CRDT.',
            'LWW, wersja/ETag, scalanie po polach, CRDT.',
          ),
          t(
            'Backoff с jitter и догон состояния после reconnect.',
            'Backoff with jitter and catching up after reconnect.',
            'Backoff z jitterem i nadrabianie stanu po reconnect.',
          ),
        ],
        t(
          'Простые данные — last-write-wins; важные — версия и If-Match с ответом 409 и экраном «выберите версию»; редакторы — слияние по полям или CRDT. После reconnect: backoff с jitter, инвалидация кэша и догон пропущенных событий; учитываю просроченный токен.',
          'Simple data — last-write-wins; important data — a version and If-Match with a 409 response and a “choose a version” screen; editors — field-level merge or CRDT. After reconnect: backoff with jitter, cache invalidation and catching up missed events; I account for an expired token.',
          'Proste dane — last-write-wins; ważne — wersja i If-Match z odpowiedzią 409 i ekranem „wybierz wersję”; edytory — scalanie po polach lub CRDT. Po reconnect: backoff z jitterem, unieważnienie cache i nadrobienie pominiętych zdarzeń; uwzględniam wygasły token.',
        ),
      ),
      card(
        'read-vs-write',
        t('Чтение против записи', 'Reads versus writes', 'Odczyt kontra zapis'),
        t(
          'Не продаёшь «service worker» как решение офлайн-записи.',
          'You do not sell a “service worker” as the answer to offline writes.',
          'Nie sprzedajesz „service workera” jako rozwiązania zapisu offline.',
        ),
        [
          t(
            'Кэш чтения дёшев и безопасен: худшее — устаревшие данные.',
            'Read caching is cheap and safe: the worst case is stale data.',
            'Cache odczytu jest tani i bezpieczny: najgorszy przypadek to nieaktualne dane.',
          ),
          t(
            'Запись добавляет очередь, дубли и конфликты.',
            'Writes add a queue, duplicates and conflicts.',
            'Zapis dodaje kolejkę, duplikaty i konflikty.',
          ),
        ],
        t(
          'Читать из кэша можно без outbox: риск — устаревшие данные. Писать офлайн — это очередь, идемпотентность, конфликты и статусы в UI. Поэтому я проектирую их отдельно и включаю запись офлайн только для сценариев, которым она действительно нужна.',
          'Reading from a cache works without an outbox: the risk is stale data. Writing offline means a queue, idempotency, conflicts and UI states. So I design them separately and enable offline writes only for the flows that really need them.',
          'Odczyt z cache działa bez outboxa: ryzyko to nieaktualne dane. Zapis offline to kolejka, idempotentność, konflikty i stany w UI. Dlatego projektuję je osobno i włączam zapis offline tylko dla scenariuszy, które naprawdę go potrzebują.',
        ),
      ),
    ],
  },
  i18n: {
    checks: t(
      'Видишь i18n как архитектуру (URL, форматы, загрузка, вёрстка, тесты), а не как словарь и библиотеку.',
      'You see i18n as architecture (URL, formats, loading, layout, tests), not a dictionary and a library.',
      'Widzisz i18n jako architekturę (URL, formaty, ładowanie, layout, testy), a nie słownik i bibliotekę.',
    ),
    structure: [
      t(
        'Требования: языки, регионы, RTL, SEO, процесс переводчиков.',
        'Requirements: languages, regions, RTL, SEO, the translators’ workflow.',
        'Wymagania: języki, regiony, RTL, SEO, proces tłumaczy.',
      ),
      t(
        'Источник локали: URL, затем cookie и Accept-Language; hreflang.',
        'The source of locale: URL first, then cookie and Accept-Language; hreflang.',
        'Źródło locale: najpierw URL, potem cookie i Accept-Language; hreflang.',
      ),
      t(
        'Сообщения и форматы: ICU, плюрализация, Intl, без склейки строк.',
        'Messages and formats: ICU, pluralisation, Intl, no string concatenation.',
        'Komunikaty i formaty: ICU, pluralizacja, Intl, bez sklejania stringów.',
      ),
      t(
        'Загрузка: ленивые словари и SSR без мерцания и mismatch.',
        'Loading: lazy dictionaries and SSR without flicker or mismatch.',
        'Ładowanie: leniwe słowniki i SSR bez migotania i mismatchu.',
      ),
      t(
        'Вёрстка (RTL, длина текста), тесты и выбор библиотеки в конце.',
        'Layout (RTL, text length), tests, and the library choice last.',
        'Layout (RTL, długość tekstu), testy i wybór biblioteki na końcu.',
      ),
    ],
    sample: t(
      'Я начинаю с требований: сколько языков и регионов, нужен ли RTL, важно ли SEO. Локаль живёт в URL (/pl/…), потому что так страницу можно шарить, кэшировать на CDN и отдавать поисковикам с hreflang; cookie и Accept-Language нужны только для первого редиректа. Форматирование — через Intl и сообщения в ICU MessageFormat, плюрализация по правилам языка, а не «if count === 1»; строки никогда не склеиваю. Словари грузятся лениво по локали и маршруту и доступны на сервере, чтобы SSR отдавал нужный язык без мерцания и hydration mismatch. Вёрстка использует logical properties и не рассчитывает на длину английского текста. Библиотеку (i18next, FormatJS, Lingui, next-intl) выбираю последней: по поддержке ICU, извлечению ключей, размеру и RSC. Цена: процесс переводов, размер бандла и тестовая матрица; поэтому добавляю языки по сигналу рынка и проверяю псевдолокализацией и missing-key проверкой в CI.',
      'I start with requirements: how many languages and regions, is RTL needed, does SEO matter. The locale lives in the URL (/pl/…) because that makes pages shareable, CDN-cacheable and indexable with hreflang; the cookie and Accept-Language only drive the first redirect. Formatting goes through Intl and messages in ICU MessageFormat, with plurals by language rules rather than “if count === 1”; I never concatenate strings. Dictionaries load lazily per locale and route and are available on the server so SSR renders the right language without flicker or a hydration mismatch. Layout uses logical properties and does not assume English text length. I choose the library (i18next, FormatJS, Lingui, next-intl) last: by ICU support, key extraction, size and RSC support. The cost: translation workflow, bundle size and a test matrix, so I add languages on a market signal and verify with pseudo-localisation and a missing-key check in CI.',
      'Zaczynam od wymagań: ile języków i regionów, czy potrzebny jest RTL, czy liczy się SEO. Locale żyje w URL (/pl/…), bo wtedy stronę można udostępniać, cache’ować na CDN i indeksować z hreflang; cookie i Accept-Language służą tylko do pierwszego przekierowania. Formatowanie idzie przez Intl, a komunikaty w ICU MessageFormat, z liczbą mnogą według reguł języka, a nie „if count === 1”; nigdy nie skleja się stringów. Słowniki ładują się leniwie per locale i trasa i są dostępne na serwerze, żeby SSR renderował właściwy język bez migotania i hydration mismatch. Layout używa logical properties i nie zakłada długości angielskiego tekstu. Bibliotekę (i18next, FormatJS, Lingui, next-intl) wybieram na końcu: pod kątem wsparcia ICU, ekstrakcji kluczy, rozmiaru i RSC. Cena: proces tłumaczeń, rozmiar bundla i macierz testów, więc dodaję języki na sygnał z rynku i weryfikuję pseudolokalizacją oraz kontrolą brakujących kluczy w CI.',
    ),
    cards: [
      card(
        'locale-routing',
        t('Локаль в URL и SEO', 'Locale in the URL and SEO', 'Locale w URL i SEO'),
        t(
          'Знаешь, откуда брать локаль и почему не из состояния клиента.',
          'You know where locale comes from and why not from client state.',
          'Wiesz, skąd brać locale i dlaczego nie ze stanu klienta.',
        ),
        [
          t(
            'Путь или поддомен, hreflang, canonical.',
            'Path or subdomain, hreflang, canonical.',
            'Ścieżka lub subdomena, hreflang, canonical.',
          ),
          t(
            'Cookie и Accept-Language только для первого редиректа.',
            'Cookie and Accept-Language only for the first redirect.',
            'Cookie i Accept-Language tylko do pierwszego przekierowania.',
          ),
        ],
        t(
          'Локаль в пути (/pl/…): ссылка однозначна, CDN кэширует версии отдельно, поисковики получают hreflang и canonical. Выбор пользователя запоминаю в cookie, но смена языка — это переход на другой URL, а не setState.',
          'Locale in the path (/pl/…): the link is unambiguous, the CDN caches versions separately, search engines get hreflang and canonical. I remember the user’s choice in a cookie, but switching language is navigation to another URL, not setState.',
          'Locale w ścieżce (/pl/…): link jest jednoznaczny, CDN cache’uje wersje osobno, wyszukiwarki dostają hreflang i canonical. Wybór użytkownika zapamiętuję w cookie, ale zmiana języka to przejście na inny URL, a nie setState.',
        ),
      ),
      card(
        'icu-plurals',
        t('Intl, ICU и плюрализация', 'Intl, ICU and pluralisation', 'Intl, ICU i pluralizacja'),
        t(
          'Не склеиваешь фразы и знаешь, что у русского и польского больше форм множественного числа, чем у английского.',
          'You do not concatenate phrases and know Russian and Polish have more plural forms than English.',
          'Nie sklejasz fraz i wiesz, że rosyjski i polski mają więcej form liczby mnogiej niż angielski.',
        ),
        [
          t(
            'Сообщение целиком в ICU: plural, select, вставки.',
            'The whole message in ICU: plural, select, placeholders.',
            'Cały komunikat w ICU: plural, select, wstawki.',
          ),
          t(
            'Числа, даты и время через Intl, не вручную.',
            'Numbers, dates and times through Intl, not by hand.',
            'Liczby, daty i czas przez Intl, a nie ręcznie.',
          ),
        ],
        t(
          'Переводчик получает фразу целиком: {count, plural, one {# файл} few {# файла} many {# файлов} other {# файла}}. Числа, даты, валюты и списки форматирую через Intl, часовой пояс храню отдельно от локали; ручное форматирование и конкатенация ломают порядок слов.',
          'The translator gets the whole phrase: {count, plural, one {# file} other {# files}}. Numbers, dates, currencies and lists go through Intl, and the time zone is stored separately from the locale; manual formatting and concatenation break word order.',
          'Tłumacz dostaje całe zdanie: {count, plural, one {# plik} few {# pliki} many {# plików} other {# pliku}}. Liczby, daty, waluty i listy formatuję przez Intl, a strefę czasową przechowuję osobno od locale; ręczne formatowanie i sklejanie psują szyk zdania.',
        ),
      ),
      card(
        'lazy-dictionaries-ssr',
        t('Ленивые словари и SSR', 'Lazy dictionaries and SSR', 'Leniwe słowniki i SSR'),
        t(
          'Не грузишь все языки сразу и не ломаешь hydration.',
          'You do not load every language up front and you do not break hydration.',
          'Nie ładujesz wszystkich języków naraz i nie psujesz hydratacji.',
        ),
        [
          t(
            'Динамический импорт по локали и namespace маршрута.',
            'Dynamic import per locale and route namespace.',
            'Dynamiczny import per locale i namespace trasy.',
          ),
          t(
            'Сервер и клиент рендерят один и тот же язык.',
            'Server and client render the same language.',
            'Serwer i klient renderują ten sam język.',
          ),
        ],
        t(
          'Словарь локали и маршрута — отдельный чанк через dynamic import, с хешем для CDN-кэша. Сервер отдаёт HTML на нужном языке и встраивает только нужные сообщения, чтобы клиент не менял язык после загрузки и не получил hydration mismatch. Есть fallback-локаль для ненайденных ключей.',
          'The locale-and-route dictionary is a separate chunk via dynamic import, hashed for the CDN cache. The server returns HTML in the right language and embeds only the messages needed, so the client does not switch language after load or hit a hydration mismatch. A fallback locale covers missing keys.',
          'Słownik locale i trasy to osobny chunk przez dynamic import, z hashem dla cache CDN. Serwer zwraca HTML w odpowiednim języku i osadza tylko potrzebne komunikaty, żeby klient nie zmieniał języka po załadowaniu ani nie trafił na hydration mismatch. Locale zapasowe obsługuje brakujące klucze.',
        ),
      ),
      card(
        'rtl-layout',
        t('RTL и вёрстка', 'RTL and layout', 'RTL i layout'),
        t(
          'Вёрстка не зашита под левую-правую сторону и короткие английские слова.',
          'The layout is not hard-wired to left-right and short English words.',
          'Layout nie jest przyspawany do lewej i prawej strony ani do krótkich angielskich słów.',
        ),
        [
          t(
            'dir="rtl", logical properties, зеркалирование иконок.',
            'dir="rtl", logical properties, mirrored icons.',
            'dir="rtl", logical properties, odbijane ikony.',
          ),
          t(
            'Запас под удлинение текста и шрифты под письменность.',
            'Room for text expansion and fonts per script.',
            'Zapas na wydłużenie tekstu i fonty dla danego pisma.',
          ),
        ],
        t(
          'Использую margin-inline-start вместо margin-left, flex и grid следуют направлению, а стрелки и иконки навигации зеркалю. Кнопки не имеют фиксированной ширины: немецкий и польский длиннее английского. Для арабского и иврита нужны отдельные шрифты и <bdi> для смешанного текста.',
          'I use margin-inline-start instead of margin-left, flex and grid follow the direction, and navigation arrows and icons are mirrored. Buttons have no fixed width: German and Polish run longer than English. Arabic and Hebrew need dedicated fonts and <bdi> for mixed text.',
          'Używam margin-inline-start zamiast margin-left, flex i grid podążają za kierunkiem, a strzałki i ikony nawigacji są odbijane. Przyciski nie mają stałej szerokości: niemiecki i polski są dłuższe od angielskiego. Arabski i hebrajski wymagają osobnych fontów i <bdi> dla tekstu mieszanego.',
        ),
      ),
      card(
        'i18n-testing',
        t('Тестирование i18n', 'Testing i18n', 'Testowanie i18n'),
        t(
          'Ловишь hardcoded-строки, пропавшие ключи и сломанную вёрстку до продакшена.',
          'You catch hardcoded strings, missing keys and broken layout before production.',
          'Łapiesz zahardkodowane stringi, brakujące klucze i zepsuty layout przed produkcją.',
        ),
        [
          t(
            'Lint на hardcoded-строки и проверка ключей в CI.',
            'A lint rule for hardcoded strings and a key check in CI.',
            'Reguła lint na zahardkodowane stringi i kontrola kluczy w CI.',
          ),
          t(
            'Псевдолокализация, RTL- и длинные снапшоты, граничные числа.',
            'Pseudo-localisation, RTL and long-text snapshots, edge-case numbers.',
            'Pseudolokalizacja, snapshoty RTL i długich tekstów, liczby brzegowe.',
          ),
        ],
        t(
          'В CI: линтер на литералы в JSX, сверка ключей между локалями, валидация ICU-синтаксиса. Псевдолокализация (удлинённые строки с диакритикой) показывает обрезанный и непереведённый текст; Playwright гоняет ключевые экраны в RTL и самой длинной локали. Для plural тестирую 0, 1, 2, 5, 22.',
          'In CI: a linter for literals in JSX, key parity between locales, ICU syntax validation. Pseudo-localisation (expanded strings with diacritics) exposes truncated and untranslated text; Playwright runs key screens in RTL and the longest locale. For plurals I test 0, 1, 2, 5, 22.',
          'W CI: linter na literały w JSX, zgodność kluczy między locale, walidacja składni ICU. Pseudolokalizacja (wydłużone stringi z diakrytykami) pokazuje obcięty i nieprzetłumaczony tekst; Playwright przechodzi kluczowe ekrany w RTL i najdłuższym locale. Dla liczby mnogiej testuję 0, 1, 2, 5, 22.',
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
