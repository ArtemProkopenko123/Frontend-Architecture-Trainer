import { edge, node, t } from './diagram'
import type { RadioCase, RadioCaseId, RadioStep, SpotlightTask } from './types'

export const RADIO_STEPS: RadioStep[] = [
  'pick',
  'requirements',
  'architecture',
  'data',
  'interface',
  'optimizations',
]

export const RADIO_OPENING = t(
  'Прежде чем рисовать, хочу уточнить требования. Какие основные сценарии? Какие устройства и сеть — мобильный интернет учитываем? Нужно ли SEO? Какой порядок объёма данных? Нужен ли realtime и офлайн? Предлагаю сфокусироваться на A и B, а C вынести за скоуп — согласны?',
  'Before I start drawing, I would like to clarify the requirements. What are the core user flows? Which devices and networks — do we care about slow mobile connections? Is SEO important? What is the rough data volume? Do we need real-time updates or offline support? I suggest we focus on A and B and leave C out of scope — does that work?',
)

const TIME_HINT = t(
  'R 5–8 / A ~10 / D 5–8 / I 5–8 / O 15–20',
  'R 5–8 / A ~10 / D 5–8 / I 5–8 / O 15–20',
)

export const RADIO_CASES: Record<RadioCaseId, RadioCase> = {
  feed: {
    id: 'feed',
    title: t('Новостная лента', 'News feed'),
    summary: t(
      'Бесконечная лента постов: Query-кэш как единственный источник для UI, SSE обновляет кэш, лайк — оптимистично.',
      'Infinite post feed: Query cache is the only UI source, SSE updates the cache, likes are optimistic.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Бесконечная прокрутка постов с текстом и медиа.', 'Infinite scroll of posts with text and media.'),
      t('Лайки и комментарии, новые посты без перезагрузки страницы.', 'Likes and comments, new posts without a full reload.'),
      t('Mobile web; SEO не критично.', 'Mobile web; SEO is not critical.'),
      t('Вне скоупа: полноценный редактор постов и модерация.', 'Out of scope: a full post editor and moderation.'),
    ],
    architecture: [
      t(
        'FeedPage → FeedList (виртуализированный) → PostCard; слой данных — TanStack Query useInfiniteQuery.',
        'FeedPage → FeedList (virtualised) → PostCard; data layer is TanStack Query useInfiniteQuery.',
      ),
      t('Клиент ходит в BFF; компоненты читают данные только из кэша Query.', 'The client talks to a BFF; components read data only from the Query cache.'),
      t(
        'Новые посты приходят по SSE в кэш; лайк уходит на сервер оптимистично и откатывается при ошибке.',
        'New posts arrive over SSE into the cache; a like goes to the server optimistically and rolls back on error.',
      ),
    ],
    data: [
      t(
        'Post { id, author, content, media[], likeCount, likedByMe, createdAt }.',
        'Post { id, author, content, media[], likeCount, likedByMe, createdAt }.',
      ),
      t('User нормализуется, если автор встречается часто.', 'User is normalised if the author appears often.'),
      t(
        'Страницы infinite query живут в кэше; старые страницы можно вытеснять при долгой прокрутке.',
        'Infinite-query pages live in the cache; old pages can be evicted after a long scroll.',
      ),
    ],
    api: [
      t(
        'GET /feed?cursor=…&limit=20 → { items, nextCursor }; cursor-пагинация устойчива к новым постам сверху.',
        'GET /feed?cursor=…&limit=20 → { items, nextCursor }; cursor pagination stays stable when new posts appear on top.',
      ),
      t(
        'Новые посты — SSE (или WebSocket / polling); показываются плашкой «N новых постов», а не вставляются мгновенно, иначе скачет скролл.',
        'New posts via SSE (or WebSocket / polling); show an “N new posts” banner instead of inserting instantly, or the scroll jumps.',
      ),
      t('POST /posts/:id/like — идемпотентная мутация для оптимистичного лайка.', 'POST /posts/:id/like — idempotent mutation for the optimistic like.'),
    ],
    optimizations: [
      t('Виртуализация и восстановление позиции скролла.', 'Virtualisation and restoring scroll position.'),
      t(
        'Prefetch следующей страницы у конца списка (IntersectionObserver).',
        'Prefetch the next page near the end of the list (IntersectionObserver).',
      ),
      t('Lazy-загрузка и srcset для изображений, заранее заданные размеры против CLS.', 'Lazy-load and srcset for images, reserved sizes against CLS.'),
      t('Оптимистичные лайки; a11y ленты: role="feed", aria-busy, фокус.', 'Optimistic likes; feed a11y: role="feed", aria-busy, focus.'),
      t('Удаление старых страниц из памяти при долгой прокрутке.', 'Drop old pages from memory after a long scroll.'),
    ],
    diagram: {
      nodes: [
        node(
          'feedPage',
          'ui',
          t('FeedPage', 'FeedPage'),
          t('Страница собирает список и не ходит в HTTP напрямую.', 'The page composes the list and never talks HTTP itself.'),
          t('Отдельный layout-маршрут, если лента вложена в shell приложения.', 'A nested layout route if the feed sits inside an app shell.'),
          t('Что остаётся на странице, а что уезжает в FeedList при росте фичи?', 'What stays on the page versus moving into FeedList as the feature grows?'),
        ),
        node(
          'feedList',
          'ui',
          t('FeedList', 'FeedList'),
          t('Виртуализированный список страниц infinite query.', 'Virtualised list of infinite-query pages.'),
          t('Обычный map без виртуализации, пока постов мало.', 'A plain map without virtualisation while the list is small.'),
          t('Как восстанавливаете позицию скролла после возврата с карточки?', 'How do you restore scroll after returning from a post?'),
        ),
        node(
          'postCard',
          'ui',
          t('PostCard', 'PostCard'),
          t('Карточка читает пост из кэша Query и шлёт оптимистичный лайк.', 'The card reads the post from the Query cache and sends an optimistic like.'),
          t('Разнести медиа и действия в слоты, если карточка разрастётся.', 'Split media and actions into slots if the card grows.'),
          t('Как откатываете лайк и не ломаете фокус на mobile?', 'How do you roll back a like without breaking focus on mobile?'),
        ),
        node(
          'query',
          'query',
          t('TanStack Query infinite', 'TanStack Query infinite'),
          t('Единственный источник данных для UI: страницы, статусы, инвалидация.', 'The only data source for the UI: pages, statuses, invalidation.'),
          t('SWR или RTK Query с infinite-пагинацией.', 'SWR or RTK Query with infinite pagination.'),
          t('Как ключ кэша связан с курсором и как вытесняете старые страницы?', 'How does the cache key relate to the cursor, and how do you evict old pages?'),
        ),
        node(
          'bff',
          'bff',
          t('BFF', 'BFF'),
          t('Агрегирует ленту под экран, скрывает каскад микросервисов.', 'Aggregates the feed for the screen and hides a microservice waterfall.'),
          t('Прямой HTTP к API, если бэкенд уже отдаёт готовую ленту.', 'Direct HTTP to the API if the backend already serves a ready-made feed.'),
          t('Что кэшируется на BFF и как инвалидируется после лайка?', 'What is cached on the BFF, and how is it invalidated after a like?'),
        ),
        node(
          'api',
          'api',
          t('HTTP API', 'HTTP API'),
          t('Cursor-лента и мутации; контракт стабилен при вставках сверху.', 'Cursor feed and mutations; the contract stays stable when items insert on top.'),
          t('GraphQL-лента, если клиентам нужны разные поля поста.', 'A GraphQL feed if clients need different post fields.'),
          t('Почему cursor, а не offset, когда сверху постоянно появляются посты?', 'Why cursor rather than offset when posts keep appearing on top?'),
        ),
        node(
          'sse',
          'realtime',
          t('SSE / realtime', 'SSE / realtime'),
          t('Новые посты приходят в кэш Query, UI показывает плашку, а не прыгает скролл.', 'New posts land in the Query cache; the UI shows a banner instead of jumping scroll.'),
          t('Короткий polling или WebSocket, если канал уже есть в продукте.', 'Short polling or WebSocket if the product already has a channel.'),
          t('Как догружаете пропуски после обрыва SSE?', 'How do you catch up after an SSE drop?'),
        ),
      ],
      edges: [
        edge('feedPage', 'feedList', t('композиция', 'composition')),
        edge('feedList', 'postCard', t('строка', 'row')),
        edge('feedPage', 'query', t('только кэш', 'cache only')),
        edge('feedList', 'query', t('infinite pages', 'infinite pages')),
        edge('postCard', 'query', t('чтение + optimistic like', 'read + optimistic like')),
        edge('sse', 'query', t('обновляет кэш', 'updates cache')),
        edge('query', 'bff', t('fetch / mutate', 'fetch / mutate')),
        edge('bff', 'api'),
      ],
    },
  },
  autocomplete: {
    id: 'autocomplete',
    title: t('Автокомплит / поиск с подсказками', 'Autocomplete / typeahead search'),
    summary: t(
      'Combobox с debounce, AbortController против гонок, LRU-кэш подсказок и доступный ARIA-паттерн.',
      'Combobox with debounce, AbortController against races, an LRU of suggestions, and an ARIA combobox pattern.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Подсказки по мере ввода, навигация клавиатурой, выделение совпадений.', 'Suggestions as you type, keyboard navigation, match highlighting.'),
      t('Недавние запросы.', 'Recent queries.'),
      t('Граничные случаи: пустой результат, ошибка сети, быстрый ввод, вставка, IME.', 'Edge cases: empty result, network error, fast typing, paste, IME.'),
    ],
    architecture: [
      t(
        'Компонент-combobox с пропсами fetchSuggestions, renderItem, onSelect, minQueryLength, debounceMs — гибкость через композицию.',
        'A combobox with fetchSuggestions, renderItem, onSelect, minQueryLength, debounceMs — flexibility through composition.',
      ),
      t('Debounce ~200–300 мс и отмена предыдущего запроса через AbortController.', 'Debounce of about 200–300 ms and cancel the previous request with AbortController.'),
      t('Кэш результатов по строке запроса — LRU в памяти.', 'Cache results by query string — an in-memory LRU.'),
    ],
    data: [
      t('Suggestion { id, label, meta? }; недавние запросы — отдельный список в памяти или localStorage.', 'Suggestion { id, label, meta? }; recent queries are a separate in-memory or localStorage list.'),
      t('Минимальная длина запроса, чтобы не бить API на каждый символ.', 'A minimum query length so the API is not hit on every character.'),
      t('Во время composition (IME) запрос не отправляем.', 'Do not send a request during IME composition.'),
    ],
    api: [
      t('GET /suggest?q=…&limit=10 → { items }.', 'GET /suggest?q=…&limit=10 → { items }.'),
      t('Отмена inflight-запроса при новой строке; игнор устаревшего ответа как защита от гонок.', 'Abort the in-flight request on a new string; ignore a stale response as race protection.'),
      t('Ошибка сети не ломает поле ввода — показываем состояние ошибки списка.', 'A network error must not break the input — show an error state on the list.'),
    ],
    optimizations: [
      t('ARIA combobox: role="combobox", aria-expanded, aria-activedescendant, listbox/option.', 'ARIA combobox: role="combobox", aria-expanded, aria-activedescendant, listbox/option.'),
      t('Стрелки, Enter, Escape; выделение совпадений без ломания скринридера.', 'Arrows, Enter, Escape; highlight matches without breaking the screen reader.'),
      t('LRU снижает повторные запросы; debounce режет шторм на медленной сети.', 'LRU cuts repeat requests; debounce tames storms on a slow network.'),
    ],
    diagram: {
      nodes: [
        node(
          'combobox',
          'ui',
          t('Combobox', 'Combobox'),
          t('Поле и listbox; клавиатура и ARIA живут здесь.', 'Input and listbox; keyboard and ARIA live here.'),
          t('Нативный datalist — слишком бедный для подсветки и недавних запросов.', 'Native datalist is too weak for highlighting and recent queries.'),
          t('Как ведёте aria-activedescendant при виртуализации списка?', 'How do you keep aria-activedescendant correct if the list is virtualised?'),
        ),
        node(
          'debounce',
          'app',
          t('Debounce / AbortController', 'Debounce / AbortController'),
          t('200–300 мс задержки и отмена предыдущего fetch защищают от гонок.', 'A 200–300 ms delay and aborting the previous fetch protect against races.'),
          t('TanStack Query сам отменяет по ключу, если подсказки живут в Query.', 'TanStack Query already aborts by key if suggestions live in Query.'),
          t('Что делаете на compositionstart/compositionend для IME?', 'What do you do on compositionstart/compositionend for IME?'),
        ),
        node(
          'lru',
          'store',
          t('LRU cache', 'LRU cache'),
          t('Кэш подсказок по строке запроса в памяти.', 'In-memory cache of suggestions keyed by query string.'),
          t('SessionStorage, если кэш должен пережить перезагрузку вкладки.', 'SessionStorage if the cache should survive a tab reload.'),
          t('Какой размер LRU и как инвалидируете после смены локали?', 'What size is the LRU, and how do you invalidate after a locale change?'),
        ),
        node(
          'api',
          'api',
          t('Suggest API', 'Suggest API'),
          t('Короткий GET по префиксу; лимит маленький.', 'A short GET by prefix; the limit stays small.'),
          t('Поиск на клиенте по уже загруженному словарю, если словарь крошечный.', 'Client-side search over a loaded dictionary if it is tiny.'),
          t('Есть ли rate limit и что видит пользователь при 429?', 'Is there a rate limit, and what does the user see on 429?'),
        ),
      ],
      edges: [
        edge('combobox', 'debounce', t('ввод', 'input')),
        edge('debounce', 'lru', t('нормализованный q', 'normalised q')),
        edge('lru', 'api', t('miss', 'miss')),
        edge('api', 'lru', t('put', 'put')),
        edge('lru', 'combobox', t('hit / result', 'hit / result')),
      ],
    },
  },
  chat: {
    id: 'chat',
    title: t('Чат / мессенджер', 'Chat / messenger'),
    summary: t(
      'Нормализованный стор, WebSocket с реконнектом, история по курсору вверх, офлайн-очередь в IndexedDB.',
      'Normalised store, WebSocket with reconnect, cursor history upwards, offline queue in IndexedDB.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Список диалогов и переписка в реальном времени.', 'Conversation list and a real-time thread.'),
      t('Статусы sending → sent → delivered → read; повтор при ошибке.', 'Statuses sending → sent → delivered → read; retry on error.'),
      t('Офлайн и несколько вкладок — по возможности в скоупе.', 'Offline and multiple tabs — in scope if time allows.'),
    ],
    architecture: [
      t('ConversationList и MessageList читают нормализованный стор, не сырой сокет.', 'ConversationList and MessageList read a normalised store, not the raw socket.'),
      t('WebSocket для двусторонней связи; HTTP API — история по курсору.', 'WebSocket for two-way traffic; HTTP API for cursor history.'),
      t('Офлайн-очередь и черновики — IndexedDB; одна живая связь между вкладками через SharedWorker / BroadcastChannel.', 'Offline queue and drafts in IndexedDB; one live connection across tabs via SharedWorker / BroadcastChannel.'),
    ],
    data: [
      t('Нормализованный стор: conversations, messagesByConversation, непрочитанные счётчики.', 'Normalised store: conversations, messagesByConversation, unread counters.'),
      t('Оптимистичное сообщение с временным clientId; идемпотентность по clientId.', 'Optimistic message with a temporary clientId; idempotency by clientId.'),
      t('История — cursor-пагинация вверх с сохранением позиции скролла.', 'History is cursor pagination upwards with preserved scroll position.'),
    ],
    api: [
      t('GET /conversations/:id/messages?cursor=&limit= — догрузка истории.', 'GET /conversations/:id/messages?cursor=&limit= — load older history.'),
      t('WebSocket: new message, ack, presence; heartbeat и реконнект с экспоненциальным backoff.', 'WebSocket: new message, ack, presence; heartbeat and reconnect with exponential backoff.'),
      t('После переподключения — догрузка пропущенных по последнему messageId.', 'After reconnect, catch up from the last messageId.'),
    ],
    optimizations: [
      t('Виртуализированный список в обратном направлении.', 'Virtualised list in reverse direction.'),
      t('Офлайн-очередь в IndexedDB; Notification API.', 'Offline queue in IndexedDB; Notification API.'),
      t('Синхронизация вкладок: BroadcastChannel, одно WebSocket-соединение через SharedWorker.', 'Tab sync: BroadcastChannel, one WebSocket via SharedWorker.'),
    ],
    diagram: {
      nodes: [
        node(
          'conversationList',
          'ui',
          t('ConversationList', 'ConversationList'),
          t('Список диалогов и непрочитанные из нормализованного стора.', 'Conversation list and unreads from the normalised store.'),
          t('Виртуальный список, если диалогов тысячи.', 'A virtual list if there are thousands of conversations.'),
          t('Как сортируете диалоги при входящем сообщении, не дёргая весь список?', 'How do you reorder on inbound mail without thrashing the whole list?'),
        ),
        node(
          'messageList',
          'ui',
          t('MessageList', 'MessageList'),
          t('Обратная виртуализация; догрузка истории вверх.', 'Reverse virtualisation; load history upwards.'),
          t('Окно из последних N без виртуализации на коротких тредах.', 'A last-N window without virtualisation on short threads.'),
          t('Как не теряете якорь скролла, когда сверху приезжает страница истории?', 'How do you keep the scroll anchor when a history page prepends?'),
        ),
        node(
          'normStore',
          'store',
          t('Normalized store', 'Normalized store'),
          t('conversations, messagesByConversation, статусы и clientId.', 'conversations, messagesByConversation, statuses and clientId.'),
          t('TanStack Query плюс узкий стор только для realtime-буфера.', 'TanStack Query plus a thin store just for the realtime buffer.'),
          t('Где дедуплицируете одно сообщение из HTTP-истории и с сокета?', 'Where do you dedupe one message from HTTP history and from the socket?'),
        ),
        node(
          'ws',
          'realtime',
          t('WebSocket', 'WebSocket'),
          t('Двусторонняя доставка, ack, heartbeat, backoff-реконнект.', 'Two-way delivery, ack, heartbeat, backoff reconnect.'),
          t('SSE, если клиент только слушает, а отправка идёт HTTP.', 'SSE if the client only listens and send stays on HTTP.'),
          t('Как восстанавливаете пропуски после обрыва по messageId?', 'How do you recover gaps after a drop using messageId?'),
        ),
        node(
          'api',
          'api',
          t('History API', 'History API'),
          t('Cursor-пагинация истории; идемпотентная отправка по clientId.', 'Cursor history; idempotent send by clientId.'),
          t('Полный dump переписки файлом — только для экспорта, не для UI.', 'A full transcript dump is for export, not for the UI.'),
          t('Какой TTL у курсора и что, если сообщение удалили в середине страницы?', 'What is the cursor TTL, and what if a message is deleted mid-page?'),
        ),
        node(
          'idb',
          'store',
          t('IndexedDB', 'IndexedDB'),
          t('Офлайн-очередь исходящих и кэш последних сообщений.', 'Offline outbox and a cache of recent messages.'),
          t('Только memory-очередь, если офлайн вне скоупа.', 'An in-memory queue only if offline is out of scope.'),
          t('Как чистите очередь после успешного ack и при конфликте clientId?', 'How do you drain the queue after ack and on a clientId conflict?'),
        ),
      ],
      edges: [
        edge('conversationList', 'normStore', t('чтение', 'read')),
        edge('messageList', 'normStore', t('чтение', 'read')),
        edge('ws', 'normStore', t('события', 'events')),
        edge('normStore', 'ws', t('отправка', 'send')),
        edge('api', 'normStore', t('история cursor', 'cursor history')),
        edge('normStore', 'idb', t('офлайн-очередь', 'offline queue')),
        edge('idb', 'normStore', t('replay', 'replay')),
      ],
    },
  },
  dashboard: {
    id: 'dashboard',
    title: t('Дашборд с графиками и фильтрами', 'Dashboard with charts and filters'),
    summary: t(
      'Фильтры в URL, реестр виджетов, независимый Query на виджет, агрегация на API, Worker для тяжёлого расчёта.',
      'Filters in the URL, widget registry, independent Query per widget, aggregation on the API, a Worker for heavy calc.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Набор виджетов (графики, KPI) с общими фильтрами и периодом.', 'A set of widgets (charts, KPIs) sharing filters and a period.'),
      t('Дашбордом можно поделиться ссылкой; каждый виджет со своим loading/error.', 'The dashboard is shareable via URL; each widget has its own loading/error.'),
      t('Тяжёлые ряды — тысячи точек; SEO обычно не важно (за логином).', 'Heavy series — thousands of points; SEO usually does not matter (logged in).'),
    ],
    architecture: [
      t('Фильтры и период — в URL; данные виджетов — независимые запросы Query.', 'Filters and period live in the URL; widget data is independent Query requests.'),
      t('Реестр виджетов: конфиг → компонент, новые виджеты без правки ядра.', 'Widget registry: config → component, new widgets without editing the core.'),
      t('Error boundary на каждый виджет, чтобы падал блок, а не страница.', 'An error boundary per widget so a block fails, not the page.'),
    ],
    data: [
      t('FilterState в search params: период, сущности, группировка.', 'FilterState in search params: period, entities, grouping.'),
      t('Каждый виджет — свой query key от фильтров; общий кэш пересекающихся запросов.', 'Each widget has its own query key from filters; overlapping requests share cache.'),
      t('Агрегированные ряды с сервера, не сырые события на клиенте.', 'Aggregated series from the server, not raw events on the client.'),
    ],
    api: [
      t('GET /metrics/:widget?from&to&filters — агрегация на сервере.', 'GET /metrics/:widget?from&to&filters — aggregation on the server.'),
      t('Общий BFF/агрегатор, если виджеты ходят в разные сервисы.', 'A shared BFF/aggregator if widgets fan out to many services.'),
      t('Частичная деградация: 5xx одного виджета не отменяет остальные.', 'Partial degradation: one widget 5xx must not cancel the others.'),
    ],
    optimizations: [
      t('Ленивая загрузка библиотеки графиков; рендер только видимых виджетов.', 'Lazy-load the chart library; render only visible widgets.'),
      t('Web Worker для тяжёлых пересчётов; canvas вместо SVG при тысячах точек.', 'Web Worker for heavy recalculation; canvas instead of SVG for thousands of points.'),
      t('Независимое loading/error; prefetch виджетов в viewport.', 'Independent loading/error; prefetch widgets in the viewport.'),
    ],
    diagram: {
      nodes: [
        node(
          'url',
          'browser',
          t('Filters in URL', 'Filters in URL'),
          t('Период и фильтры в search params — ссылкой можно поделиться, работает «назад».', 'Period and filters in search params — shareable links, Back works.'),
          t('Локальный стор фильтров, если шаринг вне скоупа.', 'A local filter store if sharing is out of scope.'),
          t('Как нормализуете пустые параметры, чтобы ключи Query не плодились?', 'How do you normalise empty params so Query keys do not explode?'),
        ),
        node(
          'registry',
          'ui',
          t('Widget registry', 'Widget registry'),
          t('Конфиг → компонент; ядро дашборда не знает конкретные графики.', 'Config → component; the dashboard core does not know concrete charts.'),
          t('Жёстко прошитый набор виджетов на ранней стадии.', 'A hardcoded widget set early on.'),
          t('Кто владеет контрактом конфига и как добавляют виджет без релиза ядра?', 'Who owns the config contract, and how do you add a widget without a core release?'),
        ),
        node(
          'query',
          'query',
          t('Query per widget', 'Query per widget'),
          t('Независимые запросы: свой loading/error, общий кэш по ключу фильтров.', 'Independent requests: own loading/error, shared cache by filter key.'),
          t('Один большой запрос на весь дашборд — дешевле, но падает всё сразу.', 'One big request for the whole dashboard is cheaper but fails all at once.'),
          t('Как отменяете запросы при смене периода, не мигая всеми виджетами?', 'How do you abort on period change without flashing every widget?'),
        ),
        node(
          'api',
          'api',
          t('Aggregation API', 'Aggregation API'),
          t('Сервер считает ряды; клиент не складывает сырые события.', 'The server computes series; the client does not sum raw events.'),
          t('Предрасчитанный OLAP-куб / warehouse, если метрик много.', 'A precomputed OLAP cube / warehouse if there are many metrics.'),
          t('Какая гранулярность агрегации и что при слишком широком периоде?', 'What aggregation grain, and what happens on a too-wide period?'),
        ),
        node(
          'worker',
          'app',
          t('Web Worker', 'Web Worker'),
          t('Тяжёлый пересчёт и подготовка точек вне main thread.', 'Heavy recalculation and point prep off the main thread.'),
          t('Готовые серии с API и сразу canvas, если считать нечего.', 'Ready series from the API straight to canvas if there is nothing to compute.'),
          t('Как сериализуете данные в Worker и не копируете гигантский массив дважды?', 'How do you serialise into the Worker without copying a huge array twice?'),
        ),
      ],
      edges: [
        edge('url', 'registry', t('фильтры', 'filters')),
        edge('registry', 'query', t('ключ виджета', 'widget key')),
        edge('query', 'api', t('агрегация', 'aggregation')),
        edge('api', 'query', t('series', 'series')),
        edge('query', 'worker', t('тяжёлый расчёт', 'heavy calc')),
        edge('worker', 'registry', t('точки для canvas', 'points for canvas')),
      ],
    },
  },
}

export function getRadioCase(id: RadioCaseId): RadioCase {
  return RADIO_CASES[id]
}

export const SPOTLIGHT_TASKS: SpotlightTask[] = [
  {
    title: t('Совместный редактор (Google Docs)', 'Collaborative editor (Google Docs)'),
    themes: t('CRDT/OT (Yjs), presence, конфликты, офлайн', 'CRDT/OT (Yjs), presence, conflicts, offline'),
  },
  {
    title: t('Интернет-магазин / каталог', 'Online shop / catalogue'),
    themes: t(
      'SSR/ISR и SEO, фильтры в URL, корзина (гость → логин), оплата',
      'SSR/ISR and SEO, filters in the URL, cart (guest → login), payment',
    ),
  },
  {
    title: t('Загрузка файлов (Google Drive)', 'File upload (Google Drive)'),
    themes: t(
      'Chunked/resumable upload, прогресс, параллелизм, отмена, превью',
      'Chunked/resumable upload, progress, parallelism, cancel, preview',
    ),
  },
  {
    title: t('Видео-плеер (YouTube)', 'Video player (YouTube)'),
    themes: t(
      'Adaptive streaming (HLS/DASH), буферизация, доступность, аналитика',
      'Adaptive streaming (HLS/DASH), buffering, accessibility, analytics',
    ),
  },
  {
    title: t('Канбан-доска (Trello)', 'Kanban board (Trello)'),
    themes: t(
      'Drag-and-drop, оптимистичный порядок (fractional indexing), realtime',
      'Drag-and-drop, optimistic order (fractional indexing), realtime',
    ),
  },
  {
    title: t('Календарь', 'Calendar'),
    themes: t(
      'Часовые пояса, повторяющиеся события, раскладка пересечений',
      'Time zones, recurring events, overlap layout',
    ),
  },
  {
    title: t('Таблица с большими данными', 'Large data table'),
    themes: t(
      'Виртуализация строк и колонок, серверная сортировка/фильтрация',
      'Row and column virtualisation, server-side sort/filter',
    ),
  },
]

export const RADIO_MISTAKES = [
  t('Сразу рисовать компоненты без требований.', 'Start drawing components without requirements.'),
  t('Уйти глубоко в одну деталь и не успеть остальное.', 'Go deep on one detail and run out of time for the rest.'),
  t('Не говорить вслух.', 'Stay silent instead of thinking out loud.'),
  t('Забыть про ошибки, доступность и мобильные устройства.', 'Forget errors, accessibility and mobile devices.'),
]
