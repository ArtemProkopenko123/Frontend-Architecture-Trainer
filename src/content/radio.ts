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
  'Before I start drawing, I would like to clarify the requirements. What are the core user flows? Which devices and networks — do we care about slow mobile connections? Is SEO important? What is the rough data volume? Do we need real-time updates or offline support? I suggest we focus on A and B and leave C out of scope — does that work?', 'Zanim zacznę rysować, chcę doprecyzować wymagania. Jakie są główne scenariusze? Jakie urządzenia i sieć — czy liczy się wolny mobile? Czy SEO jest ważne? Jaka jest rzędu wielkość danych? Czy potrzebny jest realtime i offline? Proponuję skupić się na A i B, a C wyłączyć ze scope — zgoda?',
)

const TIME_HINT = t(
  'R 5–8 / A ~10 / D 5–8 / I 5–8 / O 15–20',
  'R 5–8 / A ~10 / D 5–8 / I 5–8 / O 15–20',
)

export const RADIO_CASES: Record<RadioCaseId, RadioCase> = {
  feed: {
    id: 'feed',
    title: t('Новостная лента', 'News feed', 'Feed newsów'),
    summary: t(
      'Бесконечная лента постов: Query-кэш как единственный источник для UI, SSE обновляет кэш, лайк — оптимистично.',
      'Infinite post feed: Query cache is the only UI source, SSE updates the cache, likes are optimistic.', 'Nieskończony feed postów: cache Query to jedyne źródło UI, SSE aktualizuje cache, like jest optymistyczny.',
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
          t(
            'Пока лента одна, на FeedPage оставляю маршрут, шапку и хук infinite query, а список, виртуализацию и восстановление скролла уезжают в FeedList. Цена — лишний слой композиции, зато страница не распухает от деталей рендера.',
            'While there is one feed, FeedPage keeps the route, chrome and the infinite-query hook; list, virtualisation and scroll restore move into FeedList. The cost is an extra composition layer, but the page does not absorb render details.',
            'Dopóki jest jeden feed, na FeedPage zostawiam trasę, chrome i hook infinite query, a lista, wirtualizacja i przywracanie scrolla idą do FeedList. Koszt to dodatkowa warstwa kompozycji, ale strona nie puchnie od szczegółów renderu.',
          ),
        ),
        node(
          'feedList',
          'ui',
          t('FeedList', 'FeedList'),
          t('Виртуализированный список страниц infinite query.', 'Virtualised list of infinite-query pages.'),
          t('Обычный map без виртуализации, пока постов мало.', 'A plain map without virtualisation while the list is small.'),
          t('Как восстанавливаете позицию скролла после возврата с карточки?', 'How do you restore scroll after returning from a post?'),
          t(
            'Позицию храню в sessionStorage или в состоянии роутера по ключу ленты и восстанавливаю после монтирования виртуализированного списка, а не через голый window.scroll. Цена — нужно дождаться измерения высот строк, иначе якорь прыгает.',
            'I store the offset in sessionStorage or router state keyed by the feed and restore it after the virtualised list mounts, not via a raw window.scroll. The cost is waiting for row measurements, otherwise the anchor jumps.',
            'Offset trzymam w sessionStorage albo w stanie routera pod kluczem feedu i przywracam po zamontowaniu zwirtualizowanej listy, nie przez goły window.scroll. Koszt: trzeba poczekać na pomiary wysokości wierszy, inaczej kotwica skacze.',
          ),
        ),
        node(
          'postCard',
          'ui',
          t('PostCard', 'PostCard'),
          t('Карточка читает пост из кэша Query и шлёт оптимистичный лайк.', 'The card reads the post from the Query cache and sends an optimistic like.'),
          t('Разнести медиа и действия в слоты, если карточка разрастётся.', 'Split media and actions into slots if the card grows.'),
          t('Как откатываете лайк и не ломаете фокус на mobile?', 'How do you roll back a like without breaking focus on mobile?'),
          t(
            'Лайк патчу оптимистично в кэше Query по id поста и при ошибке откатываю только likeCount и likedByMe, не размонтируя карточку и не меняя порядок. Фокус остаётся на кнопке; цена — аккуратный merge вместо invalidate, иначе список перерисуется и фокус уедет.',
            'I patch the Query cache by post id optimistically and on error roll back only likeCount and likedByMe without unmounting the card or reordering. Focus stays on the button; the cost is a careful cache merge instead of invalidate, or the list remounts and focus is lost.',
            'Like aktualizuję optymistycznie w cache Query po id posta, przy błędzie cofam tylko likeCount i likedByMe, bez odmontowania karty i bez zmiany kolejności. Fokus zostaje na przycisku; koszt to ostrożny merge zamiast invalidate, inaczej lista się przerysuje i fokus ucieknie.',
          ),
        ),
        node(
          'query',
          'query',
          t('TanStack Query infinite', 'TanStack Query infinite'),
          t('Единственный источник данных для UI: страницы, статусы, инвалидация.', 'The only data source for the UI: pages, statuses, invalidation.'),
          t('SWR или RTK Query с infinite-пагинацией.', 'SWR or RTK Query with infinite pagination.'),
          t('Как ключ кэша связан с курсором и как вытесняете старые страницы?', 'How does the cache key relate to the cursor, and how do you evict old pages?'),
          t(
            'Ключ бесконечного запроса — фид и фильтры, курсор живёт внутри страниц, а не в ключе, иначе каждая страница станет отдельным кэшем. Старые страницы вытесняю maxPages или splice после длинного скролла; цена — возврат назад снова догрузит хвост.',
            'The infinite-query key is the feed and filters; the cursor lives inside pages, not in the key, or every page becomes its own cache. I evict old pages with maxPages or a splice after a long scroll; the cost is that going back refetches the tail.',
            'Klucz infinite query to feed i filtry; kursor żyje wewnątrz stron, nie w kluczu, bo inaczej każda strona to osobny cache. Stare strony wypycham maxPages albo ręcznym splice po długim scrollu; koszt — cofnięcie się ponownie dociągnie ogon.',
          ),
        ),
        node(
          'bff',
          'bff',
          t('BFF', 'BFF'),
          t('Агрегирует ленту под экран, скрывает каскад микросервисов.', 'Aggregates the feed for the screen and hides a microservice waterfall.'),
          t('Прямой HTTP к API, если бэкенд уже отдаёт готовую ленту.', 'Direct HTTP to the API if the backend already serves a ready-made feed.'),
          t('Что кэшируется на BFF и как инвалидируется после лайка?', 'What is cached on the BFF, and how is it invalidated after a like?'),
          t(
            'На BFF кэширую собранную страницу ленты по курсору на коротком TTL и не кэширую likedByMe — это персональное поле. После лайка инвалидирую только счётчик точечным патчем или коротким TTL, а не весь фид; цена — краткая рассинхронизация счётчика.',
            'The BFF caches the assembled feed page by cursor with a short TTL and does not cache likedByMe — that field is personal. After a like I invalidate only the count via a patch or short TTL, not the whole feed; the cost is a brief count skew.',
            'Na BFF cache\'uję złożoną stronę feedu po kursorze z krótkim TTL i nie cache\'uję likedByMe — to pole osobiste. Po like invaliduję tylko licznik przez punktowy patch albo krótki TTL, nie cały feed; koszt to krótka rozbieżność licznika.',
          ),
        ),
        node(
          'api',
          'api',
          t('HTTP API', 'HTTP API'),
          t('Cursor-лента и мутации; контракт стабилен при вставках сверху.', 'Cursor feed and mutations; the contract stays stable when items insert on top.'),
          t('GraphQL-лента, если клиентам нужны разные поля поста.', 'A GraphQL feed if clients need different post fields.'),
          t('Почему cursor, а не offset, когда сверху постоянно появляются посты?', 'Why cursor rather than offset when posts keep appearing on top?'),
          t(
            'Offset плывёт: новый пост сверху сдвигает страницы и даёт дыры и дубли. Курсор по id или createdAt стабилен при вставках сверху; цена — нельзя прыгнуть на произвольную страницу и сложнее показать «страница 5 из N».',
            'Offset drifts: a new top post shifts pages and creates holes and duplicates. A cursor on id or createdAt stays stable when items insert on top; the cost is no jump to page N and a harder “page 5 of N” UI.',
            'Offset pływa: nowy post u góry przesuwa strony i daje dziury oraz duplikaty. Kursor po id albo createdAt jest stabilny przy wstawkach z góry; koszt — nie skoczysz na dowolną stronę i trudniej pokazać „strona 5 z N”.',
          ),
        ),
        node(
          'sse',
          'realtime',
          t('SSE / realtime', 'SSE / realtime'),
          t('Новые посты приходят в кэш Query, UI показывает плашку, а не прыгает скролл.', 'New posts land in the Query cache; the UI shows a banner instead of jumping scroll.'),
          t('Короткий polling или WebSocket, если канал уже есть в продукте.', 'Short polling or WebSocket if the product already has a channel.'),
          t('Как догружаете пропуски после обрыва SSE?', 'How do you catch up after an SSE drop?'),
          t(
            'Храню lastEventId или id последнего поста в кэше и после reconnect делаю короткий HTTP catch-up, затем снова открываю SSE. Цена — один лишний запрос и окно, где плашка «N новых» важнее мгновенной вставки.',
            'I keep lastEventId or the last post id in cache and after reconnect run a short HTTP catch-up, then reopen SSE. The cost is one extra request and a window where an “N new” banner beats instant insert.',
            'Trzymam lastEventId albo id ostatniego posta w cache i po reconnect robię krótki HTTP catch-up, potem znów otwieram SSE. Koszt to jedno dodatkowe żądanie i okno, w którym pasek „N nowych” jest ważniejszy niż natychmiastowy wstaw.',
          ),
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
    title: t('Автокомплит / поиск с подсказками', 'Autocomplete / typeahead search', 'Autocomplete / wyszukiwarka z podpowiedziami'),
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
          t(
            'Активный option всегда монтирую, даже если соседние строки вытеснены виртуализацией, и ставлю aria-activedescendant на его стабильный id. Цена — окно виртуализации чуть шире вокруг фокуса и нельзя переиспользовать один DOM-узел для всех option.',
            'I keep the active option mounted even if neighbours are virtualised away and point aria-activedescendant at its stable id. The cost is a slightly wider virtual window around focus and no recycling one DOM node for every option.',
            'Aktywną option zawsze montuję, nawet gdy sąsiednie wiersze wylecą z wirtualizacji, i ustawiam aria-activedescendant na jej stabilne id. Koszt — nieco szersze okno wirtualizacji wokół fokusu i brak recyklingu jednego węzła DOM dla wszystkich option.',
          ),
        ),
        node(
          'debounce',
          'app',
          t('Debounce / AbortController', 'Debounce / AbortController'),
          t('200–300 мс задержки и отмена предыдущего fetch защищают от гонок.', 'A 200–300 ms delay and aborting the previous fetch protect against races.'),
          t('TanStack Query сам отменяет по ключу, если подсказки живут в Query.', 'TanStack Query already aborts by key if suggestions live in Query.'),
          t('Что делаете на compositionstart/compositionend для IME?', 'What do you do on compositionstart/compositionend for IME?'),
          t(
            'На compositionstart ставлю флаг и не запускаю debounce и fetch, на compositionend снимаю флаг и планирую запрос с финальной строкой. Цена — чуть более сложный автомат ввода, зато нет сломанных запросов на каждый иероглиф IME.',
            'On compositionstart I set a flag and skip debounce and fetch; on compositionend I clear it and schedule a request with the final string. The cost is a slightly richer input state machine, but no broken requests on every IME glyph.',
            'Na compositionstart stawiam flagę i nie odpalam debounce ani fetch, na compositionend zdejmuję ją i planuję request z finalnym stringiem. Koszt to trochę bogatszy automat stanu inputu, za to nie ma popsutych zapytań na każdy znak IME.',
          ),
        ),
        node(
          'lru',
          'store',
          t('LRU cache', 'LRU cache'),
          t('Кэш подсказок по строке запроса в памяти.', 'In-memory cache of suggestions keyed by query string.'),
          t('SessionStorage, если кэш должен пережить перезагрузку вкладки.', 'SessionStorage if the cache should survive a tab reload.'),
          t('Какой размер LRU и как инвалидируете после смены локали?', 'What size is the LRU, and how do you invalidate after a locale change?'),
          t(
            'Держу LRU на 50–100 ключей query→items в памяти вкладки и сбрасываю целиком при смене локали или словаря, потому что подписи и ранжирование другие. Цена — после смены языка первый ввод снова бьёт API.',
            'I keep an in-tab LRU of 50–100 query-to-items entries and wipe it on locale or dictionary change because labels and ranking differ. The cost is that the first typed query after a language switch hits the API again.',
            'Trzymam LRU 50–100 kluczy query→items w pamięci karty i czyszczę całość przy zmianie locale albo słownika, bo etykiety i ranking są inne. Koszt — po zmianie języka pierwsze wpisanie znów uderza w API.',
          ),
        ),
        node(
          'api',
          'api',
          t('Suggest API', 'Suggest API'),
          t('Короткий GET по префиксу; лимит маленький.', 'A short GET by prefix; the limit stays small.'),
          t('Поиск на клиенте по уже загруженному словарю, если словарь крошечный.', 'Client-side search over a loaded dictionary if it is tiny.'),
          t('Есть ли rate limit и что видит пользователь при 429?', 'Is there a rate limit, and what does the user see on 429?'),
          t(
            'На префиксный suggest почти всегда есть rate limit; при 429 не чищу поле, показываю тихое состояние ошибки списка и временно увеличиваю debounce. Цена — несколько секунд без свежих подсказок, зато инпут остаётся живым.',
            'Prefix suggest almost always has a rate limit; on 429 I do not clear the input, I show a quiet list error and temporarily raise debounce. The cost is stale suggestions for a few seconds, but the field stays usable.',
            'Prefix suggest niemal zawsze ma rate limit; przy 429 nie czyszczę pola, pokazuję cichy stan błędu listy i chwilowo zwiększam debounce. Koszt — użytkownik może nie zobaczyć świeżych podpowiedzi przez kilka sekund, ale input zostaje żywy.',
          ),
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
    title: t('Чат / мессенджер', 'Chat / messenger', 'Czat / komunikator'),
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
          t(
            'Диалоги храню в Map по id плюс отдельный индекс lastMessageAt и при входящем двигаю только один id в начало индекса. Цена — два представления одних данных, зато нет полной сортировки тысяч строк на каждое сообщение.',
            'I keep conversations in a Map by id plus a sorted lastMessageAt index and on inbound mail move only that id to the front of the index. The cost is two views of the same data, but no full sort of thousands of rows per message.',
            'Dialogi trzymam w Map po id plus osobny posortowany indeks lastMessageAt i przy przychodzącej wiadomości przesuwam tylko to id na początek indeksu. Koszt to dwa widoki tych samych danych, ale nie ma pełnego sortu tysięcy wierszy na każdą wiadomość.',
          ),
        ),
        node(
          'messageList',
          'ui',
          t('MessageList', 'MessageList'),
          t('Обратная виртуализация; догрузка истории вверх.', 'Reverse virtualisation; load history upwards.'),
          t('Окно из последних N без виртуализации на коротких тредах.', 'A last-N window without virtualisation on short threads.'),
          t('Как не теряете якорь скролла, когда сверху приезжает страница истории?', 'How do you keep the scroll anchor when a history page prepends?'),
          t(
            'Перед prepend запоминаю scrollHeight и первый видимый messageId, после вставки компенсирую дельту высоты, а виртуализатор якорит по id, не по индексу. Цена — лишний layout read и нельзя слепо делать concat в начало массива.',
            'Before prepend I snapshot scrollHeight and the first visible messageId, then compensate the height delta; the virtualiser anchors by id, not index. The cost is an extra layout read and you cannot blindly concat onto the array head.',
            'Przed prepend zapisuję scrollHeight i id pierwszej widocznej wiadomości, po wstawce kompensuję deltę wysokości, a wirtualizator kotwiczy po id, nie po indeksie. Koszt — dodatkowy layout read i nie można ślepo robić concat na początek tablicy.',
          ),
        ),
        node(
          'normStore',
          'store',
          t('Normalized store', 'Normalized store'),
          t('conversations, messagesByConversation, статусы и clientId.', 'conversations, messagesByConversation, statuses and clientId.'),
          t('TanStack Query плюс узкий стор только для realtime-буфера.', 'TanStack Query plus a thin store just for the realtime buffer.'),
          t('Где дедуплицируете одно сообщение из HTTP-истории и с сокета?', 'Where do you dedupe one message from HTTP history and from the socket?'),
          t(
            'Дедуп делаю в нормализованном сторе по serverId, а до ack — по clientId; HTTP-страница и событие сокета пишут в одну карту сущностей. Цена — строгий контракт id на обоих путях, иначе в треде появятся двойники.',
            'Dedupe lives in the normalised store by serverId, and by clientId until ack; HTTP history and the socket write the same entity map. The cost is a strict id contract on both paths, or the thread shows twins.',
            'Dedup robię w znormalizowanym store po serverId, a do ack — po clientId; strona HTTP i zdarzenie socketu piszą do tej samej mapy encji. Koszt — ścisły kontrakt id po obu stronach, inaczej w wątku pojawią się sobowtóry.',
          ),
        ),
        node(
          'ws',
          'realtime',
          t('WebSocket', 'WebSocket'),
          t('Двусторонняя доставка, ack, heartbeat, backoff-реконнект.', 'Two-way delivery, ack, heartbeat, backoff reconnect.'),
          t('SSE, если клиент только слушает, а отправка идёт HTTP.', 'SSE if the client only listens and send stays on HTTP.'),
          t('Как восстанавливаете пропуски после обрыва по messageId?', 'How do you recover gaps after a drop using messageId?'),
          t(
            'После reconnect отправляю lastSeenMessageId и прошу replay у сервера либо делаю HTTP catch-up до текущего края, затем снова слушаю сокет. Цена — короткий catch-up запрос и возможные дубли, которые стор уже дедуплицирует.',
            'After reconnect I send lastSeenMessageId and ask the server to replay, or I HTTP catch-up to the tip, then listen again. The cost is a short catch-up request and possible duplicates the store already dedupes.',
            'Po reconnect wysyłam lastSeenMessageId i proszę serwer o replay albo robię HTTP catch-up do bieżącej krawędzi, potem znów słucham socketu. Koszt to krótki request catch-up i możliwe duplikaty, które store i tak zdeduplikuje.',
          ),
        ),
        node(
          'api',
          'api',
          t('History API', 'History API'),
          t('Cursor-пагинация истории; идемпотентная отправка по clientId.', 'Cursor history; idempotent send by clientId.'),
          t('Полный dump переписки файлом — только для экспорта, не для UI.', 'A full transcript dump is for export, not for the UI.'),
          t('Какой TTL у курсора и что, если сообщение удалили в середине страницы?', 'What is the cursor TTL, and what if a message is deleted mid-page?'),
          t(
            'Курсор считаю непрозрачным и живучим часами, не минутами; дыру в середине страницы оставляю tombstone или пропуск по id, не перенумеровывая всю историю. Цена — UI должен уметь пустую дыру, зато курсоры соседей не ломаются.',
            'I treat the cursor as opaque and hours-long, not minutes; a mid-page delete stays a tombstone or a hole by id, without reindexing history. The cost is UI that can render a gap, but neighbour cursors stay valid.',
            'Kursor traktuję jako nieprzezroczysty i ważny godzinami, nie minutami; dziurę w środku strony zostawiam jako tombstone albo lukę po id, bez przerzucania całej historii. Koszt — UI musi umieć pustą lukę, za to kursory sąsiadów nie pękają.',
          ),
        ),
        node(
          'idb',
          'store',
          t('IndexedDB', 'IndexedDB'),
          t('Офлайн-очередь исходящих и кэш последних сообщений.', 'Offline outbox and a cache of recent messages.'),
          t('Только memory-очередь, если офлайн вне скоупа.', 'An in-memory queue only if offline is out of scope.'),
          t('Как чистите очередь после успешного ack и при конфликте clientId?', 'How do you drain the queue after ack and on a clientId conflict?'),
          t(
            'После ack удаляю запись outbox по clientId и подменяю временное сообщение серверным; при конфликте clientId помечаю локальную как failed и не реплею её вслепую. Цена — идемпотентность на сервере и явный UI «не доставлено».',
            'After ack I delete the outbox row by clientId and replace the temp message with the server one; on clientId conflict I mark local as failed and do not blindly replay. The cost is server idempotency and an explicit “not delivered” UI.',
            'Po ack usuwam rekord outbox po clientId i podmieniam tymczasową wiadomość na serwerową; przy konflikcie clientId oznaczam lokalną jako failed i nie replayuję jej na ślepo. Koszt — idempotencja na serwerze i jawny UI „nie dostarczono”.',
          ),
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
    title: t('Дашборд с графиками и фильтрами', 'Dashboard with charts and filters', 'Dashboard z wykresami i filtrami'),
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
          t(
            'Перед записью в URL и в query key сериализую фильтры канонически: пустые массивы и дефолтный период выкидываю, ключи сортирую. Цена — нужна одна функция normalizeFilters, иначе Back и расшаренные ссылки плодят кэш.',
            'Before writing URL and query keys I serialise filters canonically: drop empty arrays and the default period, sort keys. The cost is one normalizeFilters helper, or Back and shared links explode the cache.',
            'Zanim zapiszę URL i query key, serializuję filtry kanonicznie: puste tablice i domyślny okres wyrzucam, klucze sortuję. Koszt — jedna funkcja normalizeFilters, inaczej Back i współdzielone linki mnożą cache.',
          ),
        ),
        node(
          'registry',
          'ui',
          t('Widget registry', 'Widget registry'),
          t('Конфиг → компонент; ядро дашборда не знает конкретные графики.', 'Config → component; the dashboard core does not know concrete charts.'),
          t('Жёстко прошитый набор виджетов на ранней стадии.', 'A hardcoded widget set early on.'),
          t('Кто владеет контрактом конфига и как добавляют виджет без релиза ядра?', 'Who owns the config contract, and how do you add a widget without a core release?'),
          t(
            'Контракт конфига держит платформа дашборда: id, query key, loader и слот; виджет подключаю регистрацией модуля, без правки ядра. Цена — жёсткий контракт и поле version, зато новый график едет отдельным бандлом.',
            'The dashboard platform owns the config contract: id, query key, loader, slot; a widget is a module registration, not a core edit. The cost is a strict contract and a version field, but a new chart ships as its own bundle.',
            'Kontrakt configu należy do platformy dashboardu: id, query key, loader i slot; widget podpinam rejestracją modułu, bez edycji jądra. Koszt to twardy kontrakt i pole version, za to nowy wykres jedzie osobnym bundlem.',
          ),
        ),
        node(
          'query',
          'query',
          t('Query per widget', 'Query per widget'),
          t('Независимые запросы: свой loading/error, общий кэш по ключу фильтров.', 'Independent requests: own loading/error, shared cache by filter key.'),
          t('Один большой запрос на весь дашборд — дешевле, но падает всё сразу.', 'One big request for the whole dashboard is cheaper but fails all at once.'),
          t('Как отменяете запросы при смене периода, не мигая всеми виджетами?', 'How do you abort on period change without flashing every widget?'),
          t(
            'Ключ запроса меняю вместе с нормализованным периодом, keepPreviousData оставляю на виджет, abort идёт по ключу Query. Цена — виджеты показывают старые цифры с пометкой stale вместо спиннера на всю доску.',
            'I change the query key with the normalised period, keepPreviousData per widget, and abort by Query key. The cost is widgets showing stale numbers with a stale mark instead of a board-wide spinner.',
            'Zmieniam klucz zapytania razem z unormowanym okresem, keepPreviousData zostawiam na widgecie, abort idzie po kluczu Query. Koszt — widgety pokazują stare liczby ze znacznikiem stale zamiast spinnera na całą tablicę.',
          ),
        ),
        node(
          'api',
          'api',
          t('Aggregation API', 'Aggregation API'),
          t('Сервер считает ряды; клиент не складывает сырые события.', 'The server computes series; the client does not sum raw events.'),
          t('Предрасчитанный OLAP-куб / warehouse, если метрик много.', 'A precomputed OLAP cube / warehouse if there are many metrics.'),
          t('Какая гранулярность агрегации и что при слишком широком периоде?', 'What aggregation grain, and what happens on a too-wide period?'),
          t(
            'Зерно беру от длины периода: час для дня, день для месяца, иначе ряд слишком плотный. Слишком широкий период режу лимитом точек или downsampling на сервере и возвращаю предупреждение; цена — меньше детализации, зато клиент не рисует десятки тысяч точек.',
            'Grain follows period length: hour for a day, day for a month, or the series is too dense. A too-wide period is capped by a point limit or server downsampling plus a warning; the cost is less detail, but the client does not paint tens of thousands of points.',
            'Ziarnistość biorę od długości okresu: godzina dla dnia, dzień dla miesiąca, inaczej szereg jest za gęsty. Zbyt szeroki okres tnę limitem punktów albo downsamplingiem na serwerze i zwracam ostrzeżenie; koszt — mniej szczegółów, ale klient nie rysuje dziesiątek tysięcy punktów.',
          ),
        ),
        node(
          'worker',
          'app',
          t('Web Worker', 'Web Worker'),
          t('Тяжёлый пересчёт и подготовка точек вне main thread.', 'Heavy recalculation and point prep off the main thread.'),
          t('Готовые серии с API и сразу canvas, если считать нечего.', 'Ready series from the API straight to canvas if there is nothing to compute.'),
          t('Как сериализуете данные в Worker и не копируете гигантский массив дважды?', 'How do you serialise into the Worker without copying a huge array twice?'),
          t(
            'В Worker отдаю transferable ArrayBuffer или SharedArrayBuffer с точками, а не structured clone объекта рядов. Цена — после transfer основной поток теряет буфер, пока Worker не вернёт готовые точки, и контракт становится бинарным.',
            'I post a transferable ArrayBuffer or SharedArrayBuffer of points, not a structured clone of the series object. The cost is the main thread losing the buffer until the Worker returns prepared points, and the contract is binary.',
            'Do Workera oddaję transferable ArrayBuffer albo SharedArrayBuffer z punktami, nie structured clone obiektu szeregów. Koszt — po transferze wątek główny traci bufor, aż Worker zwróci gotowe punkty, i kontrakt jest binarny.',
          ),
        ),
      ],
      edges: [
        edge('url', 'registry', t('фильтры', 'filters')),
        edge('registry', 'query', t('ключ виджета', 'widget key')),
        edge('query', 'api', t('агрегация', 'aggregation', 'agregacja')),
        edge('api', 'query', t('series', 'series')),
        edge('query', 'worker', t('тяжёлый расчёт', 'heavy calc')),
        edge('worker', 'registry', t('точки для canvas', 'points for canvas')),
      ],
    },
  },
  shop: {
    id: 'shop',
    title: t('Интернет-магазин / каталог', 'Online shop / catalogue', 'Sklep internetowy / katalog'),
    summary: t(
      'Каталог с SEO: ISR/SSR, фильтры в URL, гостевая корзина, оплата вне скоупа.',
      'SEO catalogue: ISR/SSR, filters in the URL, guest cart, payment out of scope.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Каталог и карточка товара индексируются; фильтры шарятся ссылкой.', 'Catalogue and product page are indexed; filters are shareable via URL.'),
      t('Корзина для гостя, после логина сливается с серверной.', 'Guest cart merges with the server cart after login.'),
      t('Mobile web, медленная сеть учитываем.', 'Mobile web, slow networks count.'),
      t('Вне скоупа: платёжный шлюз и личный кабинет продавца.', 'Out of scope: payment gateway and seller cabinet.'),
    ],
    architecture: [
      t('Каталог — ISR/SSR, карточка — ISR по событию, кабинет покупателя — CSR.', 'Catalogue is ISR/SSR, product page ISR on event, buyer account is CSR.'),
      t('Фильтры и сортировка живут в URL; листинг читает Query по ключу из search params.', 'Filters and sort live in the URL; the listing reads Query keyed by search params.'),
      t('Корзина — клиентский стор + persist; после логина merge API.', 'Cart is a client store plus persist; merge API after login.'),
    ],
    data: [
      t('Product { id, slug, title, price, image, inStock }.', 'Product { id, slug, title, price, image, inStock }.'),
      t('CartItem { productId, qty }; гость — local/IndexedDB, юзер — сервер.', 'CartItem { productId, qty }; guest — local/IndexedDB, user — server.'),
      t('Facet counts приходят с листингом, не считаются на клиенте.', 'Facet counts arrive with the listing, not computed on the client.'),
    ],
    api: [
      t('GET /catalog?filters&cursor — items + nextCursor + facets.', 'GET /catalog?filters&cursor — items + nextCursor + facets.'),
      t('GET /product/:slug — ISR HTML + клиентский inStock через Query.', 'GET /product/:slug — ISR HTML + client inStock via Query.'),
      t('POST /cart/merge — идемпотентный merge гостевой корзины.', 'POST /cart/merge — idempotent merge of the guest cart.'),
    ],
    optimizations: [
      t('Hero и LCP картинка товара: preload, размеры против CLS.', 'Hero and product LCP image: preload, sizes against CLS.'),
      t('Streaming оболочки каталога, фильтры не блокируют HTML.', 'Stream the catalogue shell; filters do not block HTML.'),
      t('Виртуализация длинной выдачи; prefetch соседней страницы.', 'Virtualise a long listing; prefetch the next page.'),
      t('a11y фильтров: fieldset, клавиатура, live region для числа товаров.', 'Filter a11y: fieldset, keyboard, live region for result count.'),
    ],
    diagram: {
      nodes: [
        node(
          'cdn',
          'cdn',
          t('CDN / ISR', 'CDN / ISR'),
          t('Каталог и карточка как кэшируемый HTML.', 'Catalogue and product as cacheable HTML.'),
          t('CSR, если SEO не нужен.', 'CSR if SEO is not needed.'),
          t('Какой TTL и какой тег инвалидации у карточки?', 'What TTL and invalidation tag does the product page use?'),
          t(
            'Карточку кладу на ISR с тегом product:{id} и TTL от минут до часа: HTML может быть чуть старше, inStock добиваю клиентским Query. Цена — после смены цены короткая stale-страница, зато CDN держит низкий TTFB.',
            'The product page is ISR tagged product:{id} with a minutes-to-hour TTL: HTML may be slightly stale, inStock is filled by client Query. The cost is a short stale page after a price change, but the CDN keeps TTFB low.',
            'Kartę produktu kładę na ISR z tagiem product:{id} i TTL od minut do godziny: HTML może być trochę starszy, inStock dociągam client Query. Koszt — po zmianie ceny krótka stale-strona, ale CDN trzyma TTFB.',
          ),
        ),
        node(
          'app',
          'app',
          t('Listing / PDP', 'Listing / PDP'),
          t('Фильтры из URL, страница не держит второй стор выдачи.', 'Filters from the URL; the page does not keep a second listing store.'),
          t('Локальный useState фильтров, если шарить ссылку не нужно.', 'Local useState for filters if shareable links are not needed.'),
          t('Как не устроить водопад запросов фасетов?', 'How do you avoid a facet request waterfall?'),
          t(
            'Фасеты отдаю тем же ответом, что и items с cursor, одним ключом Query от нормализованных фильтров. Отдельный /facets после листинга — это водопад; цена — чуть более тяжёлый первый payload, зато один round-trip.',
            'Facets come in the same response as items and cursor, one Query key from normalised filters. A separate /facets after the listing is the waterfall; the cost is a slightly heavier first payload, but one round-trip.',
            'Facety oddaję w tej samej odpowiedzi co items i cursor, jednym kluczem Query od unormowanych filtrów. Osobny /facets po listingu to kaskada; koszt — trochę cięższy pierwszy payload, za to jeden round-trip.',
          ),
        ),
        node(
          'query',
          'query',
          t('TanStack Query', 'TanStack Query'),
          t('Листинг и остаток на складе — кэш Query.', 'Listing and stock live in the Query cache.'),
          t('Сырой fetch в компоненте карточки.', 'Raw fetch inside the product card.'),
          t('Какой ключ у листинга, когда меняется только сортировка?', 'What is the listing key when only sort changes?'),
          t(
            'В ключ листинга входят нормализованные фильтры и sort, курсор живёт только внутри страниц infinite query. Смена сортировки даёт новый ключ и не смешивает страницы; цена — холодный кэш на каждую сортировку.',
            'The listing key includes normalised filters and sort; the cursor stays inside infinite-query pages. A sort change is a new key and does not mix pages; the cost is a cold cache per sort.',
            'W klucz listingu wchodzą unormowane filtry i sort, kursor zostaje wewnątrz stron infinite query. Zmiana sortowania daje nowy klucz i nie miesza stron; koszt — zimny cache na każde sortowanie.',
          ),
        ),
        node(
          'cart',
          'store',
          t('Корзина', 'Cart'),
          t('Гость локально, после логина merge на сервер.', 'Guest locally, merge to the server after login.'),
          t('Только серверная корзина и логаут-стенка.', 'Server-only cart and a login wall.'),
          t('Что если merge конфликтует по qty?', 'What if merge conflicts on qty?'),
          t(
            'При merge беру max гостевого и серверного qty или сумму, если намерение явно «добавить», и возвращаю конфликтные строки клиенту. Цена — нужно показать пользователю итог, иначе логин сюрпризом меняет корзину.',
            'On merge I take the max of guest and server qty, or a sum if the intent is “add”, and return conflicted lines to the client. The cost is showing the user the result, or login surprises the cart.',
            'Przy merge biorę max z guestQty i serverQty albo sumę, jeśli intencja to „dodaj”, i zwracam konfliktowe pozycje klientowi. Koszt — trzeba pokazać użytkownikowi wynik, inaczej login zaskoczy koszykiem.',
          ),
        ),
      ],
      edges: [
        edge('cdn', 'app', t('HTML', 'HTML')),
        edge('app', 'query', t('listing key', 'listing key')),
        edge('query', 'cart', t('добавить', 'add')),
      ],
    },
  },
  kanban: {
    id: 'kanban',
    title: t('Канбан-доска', 'Kanban board', 'Tablica kanban'),
    summary: t(
      'Колонки и карточки: оптимистичный порядок, fractional indexing, realtime, a11y перетаскивания.',
      'Columns and cards: optimistic order, fractional indexing, realtime, drag a11y.',
    ),
    timeHint: TIME_HINT,
    opening: RADIO_OPENING,
    requirements: [
      t('Несколько колонок, перенос карточки, порядок внутри колонки.', 'Several columns, move a card, order inside a column.'),
      t('Realtime: видишь чужой перенос без перезагрузки.', 'Realtime: you see someone else move a card without a reload.'),
      t('Клавиатура: перемещение без мыши.', 'Keyboard: move cards without a mouse.'),
      t('Вне скоупа: вложения файлов и отчёты.', 'Out of scope: file attachments and reports.'),
    ],
    architecture: [
      t('BoardPage → ColumnList → Card; источник правды колонок — Query, порядок — мутация.', 'BoardPage → ColumnList → Card; column source of truth is Query, order is a mutation.'),
      t('Realtime события пишут в кэш Query, не во второй стор.', 'Realtime events write into the Query cache, not a second store.'),
      t('Drag-and-drop через библиотеку с keyboard sensors.', 'Drag-and-drop with a library that has keyboard sensors.'),
    ],
    data: [
      t('Card { id, columnId, rank, title } — rank дробный (fractional indexing).', 'Card { id, columnId, rank, title } — fractional rank.'),
      t('Column { id, title, wipLimit? }.', 'Column { id, title, wipLimit? }.'),
      t('Не нормализовать вручную, если карточек сотни; при тысячах — entity adapter / нормализация.', 'Do not hand-normalise at hundreds of cards; at thousands use an entity adapter.'),
    ],
    api: [
      t('GET /board/:id → columns + cards.', 'GET /board/:id → columns + cards.'),
      t('PATCH /cards/:id { columnId, rank } — идемпотентно по revision.', 'PATCH /cards/:id { columnId, rank } — idempotent on revision.'),
      t('WS/SSE card.moved; конфликт — 409 и refetch.', 'WS/SSE card.moved; conflict is 409 then refetch.'),
    ],
    optimizations: [
      t('Оптимистичный rank, откат при 409.', 'Optimistic rank, rollback on 409.'),
      t('Виртуализация длинной колонки.', 'Virtualise a long column.'),
      t('Один сокет на вкладки через BroadcastChannel/SharedWorker.', 'One socket across tabs via BroadcastChannel/SharedWorker.'),
      t(
        'a11y: управление с клавиатуры и альтернативные действия «Переместить», понятные инструкции; live region сообщает «карточка перемещена в колонку Review».',
        'a11y: keyboard controls and alternative “Move” actions, clear instructions; a live region announces “card moved to Review”.',
        'a11y: sterowanie klawiaturą i alternatywne akcje „Przenieś”, jasne instrukcje; live region ogłasza „kartę przeniesiono do kolumny Review”.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'board',
          'ui',
          t('BoardPage', 'BoardPage'),
          t('Собирает колонки, не считает rank.', 'Composes columns, does not compute rank.'),
          t('Один гигантский список без колонок.', 'One giant list without columns.'),
          t('Где живёт WIP-лимит — UI или сервер?', 'Where does the WIP limit live — UI or server?'),
          t(
            'WIP-лимит проверяю на сервере в PATCH карточки, UI только предупреждает заранее, иначе другая вкладка обойдёт правило. Цена — лишний 409 и откат optimistic, зато одно правило для всех клиентов.',
            'WIP is enforced on the server in the card PATCH; the UI only warns early, or another tab bypasses the limit. The cost is an extra 409 and optimistic rollback, but one rule for every client.',
            'Limit WIP egzekwuję na serwerze w PATCH karty, UI tylko wcześniej ostrzega, bo inaczej inna karta obejdzie limit. Koszt — dodatkowy 409 i rollback optimistic, za to jedna reguła dla wszystkich klientów.',
          ),
        ),
        node(
          'query',
          'query',
          t('TanStack Query', 'TanStack Query'),
          t('Карточки и колонки в кэше; realtime делает setQueryData.', 'Cards and columns in cache; realtime uses setQueryData.'),
          t('Отдельный realtime-стор.', 'A separate realtime store.'),
          t('Как мержите чужой move с локальным optimistic?', 'How do you merge a remote move with local optimistic state?'),
          t(
            'Локальный optimistic держу по cardId и revision; чужой move применяю через setQueryData, если удалённая revision новее, иначе игнорирую и жду ack. Цена — карточка может коротко моргнуть, зато порядок не рвётся.',
            'Local optimistic is keyed by cardId and revision; a remote move applies via setQueryData if remote revision is newer, else I ignore it and wait for ack. The cost is a brief flicker, but order does not tear.',
            'Lokalny optimistic trzymam po cardId i revision; cudzy move wkładam przez setQueryData, jeśli remote revision jest nowszy, inaczej ignoruję i czekam na ack. Koszt — karta może krótko mignąć, ale kolejność się nie rwie.',
          ),
        ),
        node(
          'live',
          'realtime',
          t('WS / SSE', 'WS / SSE'),
          t('События card.moved в кэш.', 'card.moved events into the cache.'),
          t('Polling раз в 10 секунд, если коллаборация редкая.', 'Poll every 10s if collaboration is rare.'),
          t('Что после реконнекта — snapshot или лог событий?', 'After reconnect — a snapshot or an event log?'),
          t(
            'После реконнекта беру snapshot доски, если пропуск мог быть большим, а короткий обрыв закрываю логом card.moved от lastRevision. Цена snapshot — тяжелее payload, цена лога — риск дыр после длинного офлайна.',
            'After reconnect I take a board snapshot if the gap may be large, and a short drop is closed with a card.moved log from lastRevision. Snapshot costs a heavier payload; the log risks holes after a long offline.',
            'Po reconnect biorę snapshot tablicy, jeśli luka mogła być duża, a krótki zanik zamykam logiem card.moved od lastRevision. Koszt snapshotu to cięższy payload, koszt logu — ryzyko dziur po długim offline.',
          ),
        ),
        node(
          'api',
          'api',
          t('PATCH rank', 'PATCH rank'),
          t('Сервер сериализует порядок, 409 при конфликте revision.', 'The server serialises order, 409 on revision conflict.'),
          t('Клиент сам перенумеровывает всех соседей целыми.', 'The client reindexes every neighbour with integers.'),
          t('Как не кончатся дробные rank?', 'How do you avoid running out of fractional ranks?'),
          t(
            'Rank — дробь между соседями; если мантисса кончается, сервер редко перенумеровывает колонку, клиент не трогает всех соседей на каждый drag. Цена — редкий тяжёлый PATCH колонки и короткий lock.',
            'Rank is a fraction between neighbours; when mantissa runs out the server rarely rebalances the column, the client does not reindex everyone on each drag. The cost is a rare heavy column PATCH and a short lock.',
            'Rank to ułamek między sąsiadami; gdy skończy się mantysa, serwer rzadko przerachowuje kolumnę, klient nie numeruje wszystkich sąsiadów przy każdym drag. Koszt — rzadki ciężki PATCH kolumny i krótki lock.',
          ),
        ),
      ],
      edges: [
        edge('board', 'query', t('карточки', 'cards')),
        edge('live', 'query', t('setQueryData', 'setQueryData')),
        edge('query', 'api', t('PATCH', 'PATCH')),
      ],
    },
  },
}

export function getRadioCase(id: RadioCaseId): RadioCase {
  return RADIO_CASES[id]
}

export const SPOTLIGHT_TASKS: SpotlightTask[] = [
  {
    title: t('Совместный редактор (Google Docs)', 'Collaborative editor (Google Docs)', 'Wspólny edytor (Google Docs)'),
    themes: t('CRDT/OT (Yjs), presence, конфликты, офлайн', 'CRDT/OT (Yjs), presence, conflicts, offline'),
  },
  {
    title: t('Загрузка файлов (Google Drive)', 'File upload (Google Drive)', 'Upload plików (Google Drive)'),
    themes: t(
      'Chunked/resumable upload, прогресс, параллелизм, отмена, превью',
      'Chunked/resumable upload, progress, parallelism, cancel, preview',
    ),
  },
  {
    title: t('Видео-плеер (YouTube)', 'Video player (YouTube)', 'Odtwarzacz wideo (YouTube)'),
    themes: t(
      'Adaptive streaming (HLS/DASH), буферизация, доступность, аналитика',
      'Adaptive streaming (HLS/DASH), buffering, accessibility, analytics',
    ),
  },
  {
    title: t('Календарь', 'Calendar', 'Kalendarz'),
    themes: t(
      'Часовые пояса, повторяющиеся события, раскладка пересечений',
      'Time zones, recurring events, overlap layout',
    ),
  },
  {
    title: t('Таблица с большими данными', 'Large data table', 'Tabela z dużymi danymi'),
    themes: t(
      'Виртуализация строк и колонок, серверная сортировка/фильтрация',
      'Row and column virtualisation, server-side sort/filter',
    ),
  },
]

export const RADIO_MISTAKES = [
  t('Сразу рисовать компоненты без требований.', 'Start drawing components without requirements.', 'Zacząć rysować komponenty bez wymagań.'),
  t('Уйти глубоко в одну деталь и не успеть остальное.', 'Go deep on one detail and run out of time for the rest.', 'Wejść głęboko w jeden szczegół i zabraknąć czasu na resztę.'),
  t('Не говорить вслух.', 'Stay silent instead of thinking out loud.', 'Milczeć zamiast myśleć na głos.'),
  t('Забыть про ошибки, доступность и мобильные устройства.', 'Forget errors, accessibility and mobile devices.', 'Zapomnieć o błędach, dostępności i urządzeniach mobilnych.'),
]
