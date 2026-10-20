import { edge, node, t } from './diagram'
import type { ArchitectureProfile, ProfileId } from './types'

const queryNode = node(
  'query',
  'query',
  t('TanStack Query', 'TanStack Query'),
  t(
    'Серверные данные — это кэш, не глобальный стор: загрузка, дедупликация, рефетч и инвалидация живут в Query.',
    'Server data is a cache, not a global store: loading, deduplication, refetch and invalidation live in Query.', 'Dane serwerowe to cache, nie globalny store: ładowanie, deduplikacja, refetch i invalidacja żyją w Query.',
  ),
  t(
    'RTK Query или SWR решают ту же задачу; серверный кэш — не место для Redux.',
    'RTK Query or SWR solve the same job; server cache does not belong in Redux.', 'RTK Query albo SWR rozwiązują to samo zadanie; cache serwera to nie miejsce na Redux.',
  ),
  t(
    'Как инвалидируете связанные ключи после мутации и где живёт URL-состояние фильтров?',
    'How do you invalidate related keys after a mutation, and where do filter URL params live?', 'Jak invalidujecie powiązane klucze po mutacji i gdzie żyje stan filtrów w URL?',
  ),
  t(
    'После мутации инвалидирую связанные ключи префиксом queryKey или predicate, не одним id, чтобы список и деталь остались согласованы. Фильтры и пагинация живут в URL, чтобы кэш Query совпадал с шаримой ссылкой. Цена — дисциплина ключей: неверный префикс даёт лишний рефетч или устаревший список.',
    'After a mutation I invalidate related keys by queryKey prefix or predicate, not a single id, so list and detail stay consistent. Filters and pagination live in the URL so the Query cache matches a shareable link. The cost is key discipline: a wrong prefix either over-fetches or leaves a stale list.',
    'Po mutacji invaliduję powiązane klucze prefiksem queryKey albo predicate, nie pojedynczym id, żeby lista i detal były spójne. Filtry i paginacja żyją w URL, aby cache Query zgadzał się z udostępnianym linkiem. Koszt to dyscyplina kluczy: zły prefiks daje zbędny refetch albo nieświeżą listę.',
  ),
)

const apiNode = node(
  'api',
  'api',
  t('HTTP API / OpenAPI', 'HTTP API / OpenAPI'),
  t(
    'Компоненты не знают про HTTP: транспорт, доменные модули и сгенерированные типы отделены от UI.',
    'Components do not know about HTTP: transport, domain modules and generated types sit below the UI.', 'Komponenty nie znają HTTP: transport, moduły domenowe i wygenerowane typy są oddzielone od UI.',
  ),
  t('GraphQL, если много клиентов с разными формами данных и команда готова вести схему.', 'GraphQL when many clients need different shapes and the team will own the schema.', 'GraphQL, jeśli wielu klientów ma różne kształty danych i zespół jest gotów prowadzić schemat.'),
  t('Где маппятся DTO в модели фронта и кто ловит расхождение контракта в CI?', 'Where are DTOs mapped to frontend models, and how does CI catch contract drift?', 'Gdzie DTO mapują się na modele frontu i kto łapie rozjazd kontraktu w CI?'),
  t(
    'DTO маппятся в модели фронта в слое транспорта или feature-api, не в компонентах: UI видит уже нормализованный тип. Расхождение контракта ловит CI генерацией OpenAPI-типов и падением сборки при рассинхроне. Цена — пайплайн и регенерация клиентов после каждого изменения схемы.',
    'DTOs map to frontend models in the transport or feature-api layer, never in components: the UI only sees a normalised type. CI catches contract drift by generating OpenAPI types and failing the build on mismatch. The cost is a pipeline and client regeneration after every schema change.',
    'DTO mapują się na modele frontu w warstwie transportu albo feature-api, nigdy w komponentach: UI widzi już znormalizowany typ. Rozjazd kontraktu łapie CI, generując typy OpenAPI i wywalając build przy niezgodności. Koszt to pipeline i regeneracja klientów po każdej zmianie schematu.',
  ),
)

const ciNode = node(
  'ci',
  'ci',
  t('CI / CDN-выкладка', 'CI / CDN deploy', 'CI / wdrożenie CDN'),
  t('Сборка, линтеры границ модулей и выкладка артефакта — часть архитектуры, не «потом».', 'Build, module-boundary lint and shipping the artefact are architecture, not an afterthought.', 'Build, lint granic modułów i wdrożenie artefaktu to część architektury, nie „potem”.'),
  t('Отдельные пайплайны на команду, если релизы действительно независимы.', 'Per-team pipelines if releases are genuinely independent.', 'Osobne pipeline’y per zespół, jeśli releasy naprawdę są niezależne.'),
  t('Что именно проверяет CI кроме тестов: границы модулей, типы OpenAPI, бюджет бандла?', 'Besides tests, what does CI enforce — module boundaries, OpenAPI types, bundle budget?', 'Co dokładnie sprawdza CI oprócz testów: granice modułów, typy OpenAPI, budżet bundle?'),
  t(
    'Кроме тестов CI ломает сборку на импорт через границу модуля, на устаревшие OpenAPI-типы и на превышение бюджета бандла. Так архитектура живёт в репозитории, а не в голове автора. Цена — более медленный пайплайн и ложные падения, пока пороги не откалиброваны.',
    'Besides tests, CI fails the build on a cross-boundary import, stale OpenAPI types and a bundle that exceeds the budget. That keeps architecture in the repo, not in the author\'s head. The cost is a slower pipeline and false failures until the thresholds are calibrated.',
    'Oprócz testów CI wywala build przy imporcie przez granicę modułu, nieaktualnych typach OpenAPI i przekroczeniu budżetu bundle. To trzyma architekturę w repozytorium, nie w głowie autora. Koszt to wolniejszy pipeline i fałszywe spadki, dopóki progi nie są skalibrowane.',
  ),
)

export const PROFILES: Record<ProfileId, ArchitectureProfile> = {
  csr_spa: {
    id: 'csr_spa',
    title: t('CSR SPA на Vite', 'CSR SPA on Vite', 'CSR SPA na Vite'),
    summary: t(
      'Клиентский SPA: дешёвый CDN-хостинг, структура по фичам, серверные данные в Query и чуть Zustand.',
      'Client-rendered SPA: cheap CDN hosting, feature-based structure, server data in Query and a little Zustand.', 'Klienckie SPA: tani hosting CDN, struktura feature-based, dane serwerowe w Query i trochę Zustand.',
    ),
    rendering: t(
      'CSR: пустой HTML + JS рендерит в браузере. Страницы за логином, SEO не важно — этого достаточно и это дёшево.',
      'CSR: empty HTML plus JS renders in the browser. Logged-in pages where SEO does not matter — enough, and cheap.', 'CSR: pusty HTML + JS renderuje w przeglądarce. Strony za logowaniem, SEO nieważne — wystarczy i jest tanio.',
    ),
    structure: t(
      'По умолчанию код по фичам: компоненты, хуки, API и тесты рядом, наружу — публичный API через index-файл. Если команд 2–3 или 4+, усиливаю до FSD или облегчённых слоёв с правилом «импортировать только вниз» и eslint-plugin-boundaries.',
      'By default organise by feature: components, hooks, API and tests live together with a public index. With 2–3 or 4+ teams, move to FSD or a lighter layered variant with downward-only imports enforced by eslint-plugin-boundaries.', 'Domyślnie kod według funkcji: komponenty, hooki, API i testy obok siebie, na zewnątrz publiczne API przez index. Przy 2–3 albo 4+ zespołach wzmacniam do FSD albo lżejszych warstw z regułą „import tylko w dół” i eslint-plugin-boundaries.',
    ),
    repo: t(
      'Одно Vite + React + TypeScript приложение, статика на CDN. Монорепо не обязателен, пока нет нескольких приложений и общей дизайн-системы.',
      'A single Vite + React + TypeScript app, static files on a CDN. A monorepo is optional until there are several apps and a shared design system.', 'Jedna aplikacja Vite + React + TypeScript, statyki na CDN. Monorepo nie jest obowiązkowe, dopóki nie ma kilku aplikacji i wspólnego design systemu.',
    ),
    state: t(
      'Серверные данные — TanStack Query. Глобального клиентского состояния мало, его хватает Zustand. Фильтры и пагинация — в URL. Redux не используем как кэш сервера.',
      'Server data lives in TanStack Query. Little global client state sits in Zustand. Filters and pagination live in the URL. Redux is not the server cache.', 'Dane serwerowe — TanStack Query. Mało globalnego stanu klienckiego, starczy Zustand. Filtry i paginacja — w URL. Redux nie jest cache’em serwera.',
    ),
    why: t(
      'Админка и B2B за логином не нуждаются в SSR: нет SEO-требования, а CDN-хостинг и простая навигация после загрузки дешевле серверного рендера.',
      'Admin and logged-in B2B do not need SSR: no SEO requirement, and CDN hosting plus fast client navigation is cheaper than a render server.', 'Admin i B2B za logowaniem nie potrzebują SSR: nie ma wymagania SEO, a hosting CDN i prosta nawigacja po załadowaniu są tańsze niż render serwerowy.',
    ),
    tradeoffs: [
      t(
        'Цена — медленный первый показ, слабое SEO и зависимость от JS: пустой HTML, пока бандл не выполнится.',
        'The trade-off is a slow first paint, weak SEO and a JS dependency: empty HTML until the bundle runs.', 'Koszt — wolny pierwszy pokaz, słabe SEO i zależność od JS: pusty HTML, dopóki bundle się nie wykona.',
      ),
      t(
        'BFF не обязателен: если экраны не собирают каскад из микросервисов, лишний Node-слой только увеличивает стоимость.',
        'A BFF is not required: if screens do not fan out to many microservices, an extra Node layer only adds cost.', 'BFF nie jest obowiązkowy: jeśli ekrany nie zbierają kaskady mikroserwisów, zbędna warstwa Node tylko podnosi koszt.',
      ),
    ],
    evolution: [
      t(
        'Если появится публичный маркетинг с критичным SEO — вынесу эти маршруты в SSG/ISR, кабинет оставлю CSR.',
        'If public marketing with critical SEO appears, I would extract those routes to SSG/ISR and keep the app CSR.', 'Jeśli pojawi się publiczny marketing z krytycznym SEO — wyniosę te trasy do SSG/ISR, panel zostawię CSR.',
      ),
      t(
        'Сигнал пересмотра: LCP кабинета неприемлем даже после code splitting, или данные нужно отдавать ботам.',
        'Revisit when dashboard LCP stays poor even after code splitting, or when bots must see the HTML.', 'Sygnał do przeglądu: LCP panelu nieakceptowalny nawet po code splitting, albo dane trzeba oddać botom.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'browser',
          'browser',
          t('Браузер', 'Browser', 'Przeglądarka'),
          t('Всё рендерится на клиенте после загрузки бандла.', 'Everything renders on the client after the bundle loads.', 'Wszystko renderuje się na kliencie po załadowaniu bundle.'),
          t('SSR/RSC, если нужен HTML до JS.', 'SSR/RSC if HTML is needed before JS.', 'SSR/RSC, jeśli HTML jest potrzebny przed JS.'),
          t('Что видит пользователь при медленной сети до выполнения JS?', 'What does the user see on a slow network before JS runs?', 'Co widzi użytkownik przy wolnej sieci zanim wykona się JS?'),
          t(
            'На медленной сети до выполнения JS пользователь видит пустой или почти пустой HTML — скелетон в index.html, если мы его положили, иначе белый экран. Это выбор CSR: серверного HTML нет. Цена — худший LCP и ощущение, что ничего не произошло, пока бандл не скачается.',
            'On a slow network before JS runs the user sees empty or near-empty HTML — a skeleton in index.html if we put one there, otherwise a white screen. That is the CSR choice: no server HTML. The cost is a worse LCP and a feeling that nothing happened until the bundle downloads.',
            'Przy wolnej sieci zanim wykona się JS użytkownik widzi pusty albo prawie pusty HTML — szkielet w index.html, jeśli go włożymy, inaczej biały ekran. To wybór CSR: nie ma serwerowego HTML. Koszt to gorszy LCP i wrażenie, że nic się nie dzieje, dopóki bundle się nie pobierze.',
          ),
        ),
        node(
          'app',
          'app',
          t('Vite SPA', 'Vite SPA'),
          t('Приложение по фичам на React + TS, без обязательного BFF.', 'Feature-based React + TS app, no BFF required.', 'Aplikacja React + TS według funkcji, bez obowiązkowego BFF.'),
          t('Next.js, если позже понадобится гибридный рендер.', 'Next.js if hybrid rendering is needed later.', 'Next.js, jeśli później potrzebny będzie hybrydowy render.'),
          t('Как режете бандл: маршруты, фичи, тяжёлые графики?', 'How do you split the bundle: routes, features, heavy charts?', 'Jak tniecie bundle: trasy, funkcje, ciężkie wykresy?'),
          t(
            'Бандл режу по маршрутам через lazy-import страниц, затем по фичам и отдельно выношу тяжёлые графики и редакторы. Критический путь кабинета остаётся тонким. Цена — больше чанков и вспышка загрузки при первом заходе на редкий экран.',
            'I split the bundle by route with lazy page imports, then by feature, and I isolate heavy charts and editors. The dashboard critical path stays thin. The cost is more chunks and a loading flash the first time a rare screen opens.',
            'Bundle tnę po trasach lazy-importem stron, potem po funkcjach i osobno wynoszę ciężkie wykresy i edytory. Ścieżka krytyczna panelu zostaje cienka. Koszt to więcej chunków i błysk ładowania przy pierwszym wejściu na rzadki ekran.',
          ),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('browser', 'app', t('JS бандл', 'JS bundle', 'bundle JS')),
        edge('app', 'query', t('хуки данных', 'data hooks', 'hooki danych')),
        edge('query', 'api', t('HTTP', 'HTTP')),
        edge('ci', 'app', t('выкладка на CDN', 'deploy to CDN', 'wdrożenie na CDN')),
      ],
    },
  },
  ssg_isr: {
    id: 'ssg_isr',
    title: t('SSG/ISR на Next.js', 'Next.js SSG/ISR'),
    summary: t(
      'Статический HTML на CDN с фоновой перегенерацией: SEO и скорость статики при нечасто меняющихся данных.',
      'Static HTML on a CDN with background regeneration: SEO and static speed when data changes infrequently.', 'Statyczny HTML na CDN z regeneracją w tle: SEO i szybkość statyki przy rzadko zmieniających się danych.',
    ),
    rendering: t(
      'SSG на билде, ISR по времени или событию. Стратегия постраничная: лендинг — статика, каталог — ISR, кабинет можно оставить CSR.',
      'SSG at build, ISR on a timer or event. Choose per page: landing is static, catalogue is ISR, the account area can stay CSR.', 'SSG na buildzie, ISR po czasie albo zdarzeniu. Strategia per strona: landing — statyka, katalog — ISR, konto może zostać CSR.',
    ),
    structure: t(
      'Feature-based или лёгкий FSD: слои app → pages → widgets → features → entities → shared. Несколько команд — только вниз по импортам, публичный API слайса, ESLint/Nx boundaries.',
      'Feature-based or light FSD: app → pages → widgets → features → entities → shared. Several teams means downward-only imports, a public slice API, and ESLint/Nx boundaries.', 'Feature-based albo lekki FSD: warstwy app → pages → widgets → features → entities → shared. Kilka zespołów — tylko w dół po importach, publiczne API slice, granice ESLint/Nx.',
    ),
    repo: t(
      'Next.js приложение, HTML и ассеты на CDN. Для нескольких пакетов — монорепо Nx/Turborepo с affected-сборками.',
      'A Next.js app, HTML and assets on a CDN. With several packages, an Nx/Turborepo monorepo with affected builds.', 'Aplikacja Next.js, HTML i assety na CDN. Przy kilku pakietach — monorepo Nx/Turborepo z affected-buildami.',
    ),
    state: t(
      'Каталог и карточки кэширует TanStack Query на клиенте после гидрации; серверные данные не складываем в Redux. Редкое клиентское — Zustand, фильтры — URL.',
      'Catalogue and product pages use TanStack Query on the client after hydration; we do not dump server data into Redux. Rare client state is Zustand, filters live in the URL.', 'Katalog i karty cache’uje TanStack Query na kliencie po hydracji; danych serwerowych nie wsypujemy do Redux. Rzadki stan kliencki — Zustand, filtry — URL.',
    ),
    why: t(
      'SEO критичен, данные статичны или меняются нечасто: ISR даёт скорость статики и приемлемую свежесть без постоянного SSR.',
      'SEO is critical and data is static or infrequent: ISR gives static speed with acceptable freshness without always-on SSR.', 'SEO jest krytyczne, dane statyczne albo rzadko się zmieniają: ISR daje szybkość statyki i akceptowalną świeżość bez ciągłego SSR.',
    ),
    tradeoffs: [
      t(
        'Цена — возможна устаревшая версия до ревалидации, долгий билд на тысячи страниц и сложнее отладка кэша.',
        'The trade-off is a stale version until revalidation, long builds for thousands of pages, and harder cache debugging.', 'Koszt — możliwa nieświeża wersja do rewalidacji, długi build na tysiące stron i trudniejszy debug cache.',
      ),
    ],
    evolution: [
      t(
        'Если карточки станут персональными в реальном времени — эти маршруты перевожу на SSR/streaming, остальное оставляю ISR.',
        'If cards become personal and realtime, I move those routes to SSR/streaming and keep the rest on ISR.', 'Jeśli karty staną się personalne w czasie rzeczywistym — te trasy przenoszę na SSR/streaming, resztę zostawiam na ISR.',
      ),
      t(
        'Сигнал: перегенерация по событию не успевает за ценой/наличием, или TTFB персонализации требует сервера на каждый запрос.',
        'Signal: event-driven regeneration cannot keep up with price/stock, or personalisation TTFB needs a server on every request.', 'Sygnał: regeneracja po zdarzeniu nie nadąża za ceną/stanem magazynu, albo TTFB personalizacji wymaga serwera na każde żądanie.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'cdn',
          'cdn',
          t('CDN', 'CDN'),
          t('Раздаёт пререндеренный HTML и ассеты максимально близко к пользователю.', 'Serves prerendered HTML and assets as close to the user as possible.', 'Rozdaje prerenderowany HTML i assety jak najbliżej użytkownika.'),
          t('SSR на origin-сервере, если HTML должен быть персональным.', 'Origin SSR if HTML must be personalised.', 'SSR na origin, jeśli HTML ma być personalny.'),
          t('Какой Cache-Control у HTML и кто инвалидирует ISR?', 'What Cache-Control does HTML use, and who invalidates ISR?', 'Jaki Cache-Control ma HTML i kto invaliduje ISR?'),
          t(
            'Статический HTML отдаём с длинным Cache-Control и тегом, ISR-страницы — с s-maxage под интервал ревалидации. Инвалидацию запускает вебхук CMS или CI после публикации, не ручной purge. Цена — окно устаревания: пользователь может видеть старую карточку до следующего тика.',
            'Static HTML ships with a long Cache-Control and a tag; ISR pages use s-maxage matching the revalidation interval. Invalidation is a CMS webhook or CI after publish, not a manual purge. The cost is a staleness window: a user may see an old card until the next tick.',
            'HTML statyczny oddajemy z długim Cache-Control i tagiem, strony ISR — z s-maxage pod interwał rewalidacji. Invalidację odpala webhook CMS albo CI po publikacji, nie ręczny purge. Koszt to okno nieświeżości: użytkownik może zobaczyć starą kartę do następnego taktu.',
          ),
        ),
        node(
          'app',
          'app',
          t('Next.js SSG/ISR', 'Next.js SSG/ISR'),
          t('Страницы собираются на билде или пересобираются в фоне.', 'Pages are built at compile time or regenerated in the background.', 'Strony składane na buildzie albo przebudowywane w tle.'),
          t('CSR-остров для кабинета за логином.', 'A CSR island for the logged-in account area.', 'Wyspa CSR dla konta za logowaniem.'),
          t('Какие маршруты статика, какие ISR, какие клиентские?', 'Which routes are static, ISR, or client-only?', 'Które trasy są statyką, które ISR, które klienckie?'),
          t(
            'Лендинг и юридические страницы — чистая статика на билде, каталог и карточки — ISR по событию или TTL, кабинет за логином остаётся клиентским. Выбор по маршруту, не один режим на всё приложение. Цена — три модели кэша в одной кодовой базе и путаница, если маршрут перепутать.',
            'Landing and legal pages are pure build-time static, catalogue and cards are ISR on an event or TTL, and the logged-in account stays client-only. The choice is per route, not one mode for the whole app. The cost is three cache models in one codebase and confusion if a route is miscategorised.',
            'Landing i strony prawne to czysta statyka na buildzie, katalog i karty — ISR po zdarzeniu albo TTL, konto za logowaniem zostaje klienckie. Wybór per trasa, nie jeden tryb na całą aplikację. Koszt to trzy modele cache w jednej bazie kodu i pomyłka, jeśli trasę źle sklasyfikować.',
          ),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('cdn', 'app', t('HTML с CDN', 'HTML from CDN', 'HTML z CDN')),
        edge('app', 'query', t('клиентский кэш', 'client cache', 'cache klienta')),
        edge('query', 'api', t('ревалидация / запрос', 'revalidate / fetch', 'rewalidacja / żądanie')),
        edge('ci', 'cdn', t('публикация', 'publish', 'publikacja')),
      ],
    },
  },
  ssr_app: {
    id: 'ssr_app',
    title: t('SSR-приложение (Next + RSC)', 'SSR app (Next + RSC)', 'Aplikacja SSR (Next + RSC)'),
    summary: t(
      'HTML на каждый запрос, RSC по умолчанию, FSD-слои, Query на клиенте, BFF по желанию для агрегации микросервисов.',
      'HTML per request, RSC by default, FSD layers, Query on the client, optional BFF to aggregate microservices.', 'HTML na każde żądanie, RSC domyślnie, warstwy FSD, Query na kliencie, BFF opcjonalnie do agregacji mikroserwisów.',
    ),
    rendering: t(
      'SSR для SEO и свежих/персональных данных. В Next.js App Router серверные компоненты по умолчанию, клиентские — только где нужна интерактивность. Streaming снижает TTFB.',
      'SSR for SEO and fresh/personal data. In the Next.js App Router, Server Components are the default; Client Components only where interactivity is needed. Streaming lowers TTFB.', 'SSR dla SEO i świeżych/personalnych danych. W Next.js App Router serwerowe komponenty są domyślne, klienckie — tylko tam, gdzie potrzebna interakcja. Streaming obniża TTFB.',
    ),
    structure: t(
      'FSD-подобные слои с импортом только вниз: несколько команд не лезут в чужие слайсы. Публичный API, CODEOWNERS, границы в ESLint. Кабинет внутри того же Next-приложения.',
      'FSD-style layers with downward-only imports so several teams stay out of each other\'s slices. Public APIs, CODEOWNERS, ESLint boundaries. The account area lives in the same Next app.', 'Warstwy w stylu FSD z importem tylko w dół: kilka zespołów nie wchodzi w cudze slice. Publiczne API, CODEOWNERS, granice w ESLint. Konto w tej samej aplikacji Next.',
    ),
    repo: t(
      'Next.js, сервер в критическом пути: мониторинг и масштабирование обязательны. Общие пакеты — в монорепо, если команд больше одной.',
      'Next.js with the server on the critical path: monitoring and scaling are mandatory. Shared packages live in a monorepo if there is more than one team.', 'Next.js, serwer na ścieżce krytycznej: monitoring i skalowanie są obowiązkowe. Wspólne pakiety — w monorepo, jeśli zespołów jest więcej niż jeden.',
    ),
    state: t(
      'RSC читают данные на сервере; интерактивные острова используют TanStack Query. Zustand — для редкого клиентского. Не держим все серверные данные в Redux.',
      'RSC read data on the server; interactive islands use TanStack Query. Zustand covers rare client state. Do not keep all server data in Redux.', 'RSC czytają dane na serwerze; interaktywne wyspy używają TanStack Query. Zustand — na rzadki stan kliencki. Nie trzymaj wszystkich danych serwera w Redux.',
    ),
    why: t(
      'SEO критичен и данные realtime или персональные: статика устареет, нужен HTML с сервера на запрос плюс возможность BFF, чтобы убрать каскады с клиента.',
      'SEO is critical and data is realtime or personal: static HTML would go stale, so we need per-request HTML and an optional BFF to remove client waterfalls.', 'SEO jest krytyczne, a dane realtime albo personalne: statyka się zestarzeje, potrzebny HTML z serwera na żądanie plus opcjonalny BFF, żeby zdjąć kaskady z klienta.',
    ),
    tradeoffs: [
      t(
        'Цена SSR: hydration стоит времени на клиенте, а сервер становится частью критического пути — его надо мониторить и масштабировать.',
        'SSR cost: hydration takes time on the client, and the server becomes part of the critical path, so it needs monitoring and scaling.', 'Koszt SSR: hydracja zajmuje czas na kliencie, a serwer wchodzi na ścieżkę krytyczną — trzeba go monitorować i skalować.',
      ),
      t(
        'BFF — ещё один сервис у фронтенд-команды: оправдан, когда экран собирает много микросервисов или токены нельзя пускать в браузер.',
        'A BFF is another service the frontend team owns: justified when a screen aggregates many microservices or tokens must not reach the browser.', 'BFF to kolejny serwis zespołu frontendowego: uzasadniony, gdy ekran zbiera wiele mikroserwisów albo tokenów nie wolno puszczać do przeglądarki.',
      ),
    ],
    evolution: [
      t(
        'Неперсональные части вынесу на CDN/edge cache или ISR, чтобы не рендерить всё на origin.',
        'I would cache non-personal parts on CDN/edge or ISR so origin does not render everything.', 'Niepersonalne części wyniosę na CDN/edge cache albo ISR, żeby nie renderować wszystkiego na origin.',
      ),
      t(
        'Сигнал к упрощению: если персонализация ушла в клиентские острова и SEO-страницы снова статичны.',
        'Simplify when personalisation moves into client islands and SEO pages are static again.', 'Sygnał do uproszczenia: personalizacja poszła w wyspy klienckie, a strony SEO znów są statyczne.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'browser',
          'browser',
          t('Браузер', 'Browser', 'Przeglądarka'),
          t('Получает HTML сразу, затем гидратирует острова.', 'Gets HTML immediately, then hydrates islands.', 'Dostaje HTML od razu, potem hydruje wyspy.'),
          t('Чистый CSR, если страница за логином и SEO не нужно.', 'Pure CSR if the page is behind login and SEO is irrelevant.', 'Czysty CSR, jeśli strona jest za logowaniem i SEO niepotrzebne.'),
          t('Что стримится, а что ждёт медленный запрос?', 'What streams, and what waits on the slow request?', 'Co idzie streamingiem, a co czeka na wolne żądanie?'),
          t(
            'Стримится каркас страницы и быстрые RSC-блоки — шапка, навигация, попадания в кэш. Медленный персональный запрос уходит в Suspense и не блокирует первый байт. Цена — поэтапная гидрация и риск скачков layout, если скелетон не совпал с итогом.',
            'The page shell and fast RSC blocks stream first — header, nav, cache hits. The slow personal request sits behind Suspense and does not block the first byte. The cost is staged hydration and layout shift if the skeleton does not match the final UI.',
            'Streamingiem idzie szkielet strony i szybkie bloki RSC — nagłówek, nawigacja, trafienia cache. Wolne personalne żądanie czeka za Suspense i nie blokuje pierwszego bajtu. Koszt to etapowa hydracja i ryzyko skoków layoutu, jeśli szkielet nie zgadza się z wynikiem.',
          ),
        ),
        node(
          'app',
          'app',
          t('Next.js SSR / RSC', 'Next.js SSR / RSC'),
          t('Серверные компоненты по умолчанию, клиентские точечно.', 'Server Components by default, Client Components only where needed.', 'Komponenty serwerowe domyślnie, klienckie punktowo.'),
          t('Vite CSR для закрытых экранов.', 'Vite CSR for logged-in screens.', 'Vite CSR dla zamkniętych ekranów.'),
          t('Где проходит граница RSC и клиентского острова?', 'Where is the RSC vs client-island boundary?', 'Gdzie przebiega granica RSC i wyspy klienckiej?'),
          t(
            'Граница проходит там, где нужна браузерная интерактивность: формы, фильтры и виджеты с локальным стейтом — клиентские острова. Остальное, включая чтение данных, остаётся RSC. Цена — сериализация пропсов через границу и соблазн пометить слишком много файлов как client.',
            'The boundary sits where browser interactivity is required: forms, filters and widgets with local state become client islands. Everything else, including data reads, stays RSC. The cost is prop serialisation across the boundary and the temptation to mark too many files as client.',
            'Granica leży tam, gdzie potrzebna jest interakcja w przeglądarce: formularze, filtry i widgety z lokalnym stanem to wyspy klienckie. Reszta, w tym odczyt danych, zostaje RSC. Koszt to serializacja propsów przez granicę i pokusa oznaczenia zbyt wielu plików jako client.',
          ),
        ),
        node(
          'bff',
          'bff',
          t('BFF (опционально)', 'BFF (optional)', 'BFF (opcjonalnie)'),
          t('Агрегация под экран, кэш и токены на сервере, без каскадов из браузера.', 'Per-screen aggregation, cache and tokens on the server, no browser waterfalls.', 'Agregacja pod ekran, cache i tokeny na serwerze, bez kaskad z przeglądarki.'),
          t('Прямые запросы к API, если сервисов мало.', 'Direct API calls if there are few services.', 'Bezpośrednie żądania do API, jeśli serwisów jest mało.'),
          t('Что агрегирует BFF и какой у него SLA?', 'What does the BFF aggregate, and what SLA does it carry?', 'Co agreguje BFF i jaki ma SLA?'),
          t(
            'BFF собирает под экран данные нескольких микросервисов, прячет токены и отдаёт один контракт кабинету. SLA как у origin: он на критическом пути TTFB, поэтому таймауты и деградация обязательны. Цена — ещё один сервис у фронтенд-команды и ночные дежурства.',
            'The BFF aggregates several microservices into one screen contract, keeps tokens off the browser and hides the waterfall. Its SLA matches origin: it sits on the TTFB critical path, so timeouts and degradation are mandatory. The cost is another service the frontend team owns and on-call nights.',
            'BFF zbiera pod ekran dane kilku mikroserwisów, chowa tokeny i oddaje jeden kontrakt panelowi. SLA jak u origin: jest na ścieżce krytycznej TTFB, więc timeouty i degradacja są obowiązkowe. Koszt to kolejny serwis zespołu frontendowego i dyżury nocne.',
          ),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('browser', 'app', t('HTML + ответ RSC', 'HTML + RSC payload', 'HTML + odpowiedź RSC')),
        edge('app', 'bff', t('серверный запрос', 'server fetch', 'żądanie serwerowe')),
        edge('app', 'query', t('клиентские острова', 'client islands', 'wyspy klienckie')),
        edge('bff', 'api', t('агрегация', 'aggregation', 'agregacja')),
        edge('query', 'api', t('клиентский HTTP', 'client HTTP', 'HTTP klienta')),
        edge('ci', 'app', t('выкладка origin-сервера', 'deploy origin', 'wdrożenie serwera origin')),
      ],
    },
  },
  mfe: {
    id: 'mfe',
    title: t('Микрофронтенды: shell + Module Federation', 'Micro-frontends: shell + Module Federation', 'Mikrofrontendy: shell + Module Federation'),
    summary: t(
      'Общий shell, удалённые модули, общая дизайн-система. Query в каждом приложении, без общего глобального Redux.',
      'Shared shell, remote modules, shared design system. Query in each app, no global shared Redux.', 'Wspólny shell, zdalne moduły, wspólny design system. Query w każdej aplikacji, bez wspólnego globalnego Redux.',
    ),
    rendering: t(
      'Рендер выбирается по приложению: кабинет может быть CSR, витрина — SSR/ISR. Federation не заменяет выбор CSR/SSR.',
      'Rendering is chosen per app: the account area can be CSR, the storefront SSR/ISR. Federation does not replace the CSR/SSR choice.', 'Rendering wybierany per aplikacja: konto może być CSR, witryna — SSR/ISR. Federation nie zastępuje wyboru CSR/SSR.',
    ),
    structure: t(
      'Организационная нарезка: независимые команды и релизы. Внутри каждого MFE — FSD или feature-based с импортом только вниз. Между частями — контракт, не прямые импорты.',
      'An organisational split: independent teams and releases. Inside each MFE, FSD or feature-based structure with downward-only imports. Between parts — a contract, not direct imports.', 'Podział organizacyjny: niezależne zespoły i releasy. Wewnątrz każdego MFE — FSD albo feature-based z importem tylko w dół. Między częściami — kontrakt, nie bezpośrednie importy.',
    ),
    repo: t(
      'Общий shell загружает удалённые модули через Module Federation, общий React и дизайн-система. Сначала модульный монолит в монорепо с жёсткими границами; полирепо — только если циклы реально независимы.',
      'A shared shell loads remotes via Module Federation, with shared React and a design system. First a modular monolith in a monorepo with strict boundaries; polyrepo only if cycles are truly independent.', 'Wspólny shell ładuje zdalne moduły przez Module Federation, wspólny React i design system. Najpierw modularny monolit w monorepo z twardymi granicami; polirepo — tylko gdy cykle naprawdę są niezależne.',
    ),
    state: t(
      'У каждого MFE свой TanStack Query. Коммуникация — URL, события или тонкий контракт. Общего глобального Redux нет.',
      'Each MFE owns its TanStack Query. Communication is URL, events or a thin contract. There is no shared global Redux.', 'Każde MFE ma własne TanStack Query. Komunikacja — URL, zdarzenia albo cienki kontrakt. Wspólnego globalnego Redux nie ma.',
    ),
    why: t(
      'Микрофронтенды — прежде всего про организацию: 4+ команд блокируют релизы или разные циклы поставки. Для 1–3 человек это слишком дорого: модульный монолит даёт ~80% пользы.',
      'Micro-frontends are primarily organisational: 4+ teams blocking releases or different delivery cycles. For 1–3 people they are too expensive: a modular monolith gives about 80% of the benefit.', 'Mikrofrontendy to przede wszystkim organizacja: 4+ zespołów blokuje releasy albo różne cykle dostawy. Dla 1–3 osób to za drogo: modularny monolit daje ~80% korzyści.',
    ),
    tradeoffs: [
      t(
        'Цена серьёзная: дублирование зависимостей и рост бандла, рассинхрон версий React и дизайн-системы, сложнее общий стейт, роутинг, e2e-тесты и локальная разработка.',
        'The cost is significant: duplicated dependencies and bigger bundles, React and design-system version drift, harder shared state, routing, end-to-end tests and local development.', 'Koszt jest poważny: duplikacja zależności i wzrost bundle, rozjazd wersji React i design systemu, trudniejszy wspólny stan, routing, testy e2e i lokalny development.',
      ),
      t(
        'Сначала модульный монолит в монорепо с CODEOWNERS; MFE — когда независимые релизы доказанно нужны.',
        'Start with a modular monolith in a monorepo plus CODEOWNERS; MFE only when independent releases are proven necessary.', 'Najpierw modularny monolit w monorepo z CODEOWNERS; MFE — gdy niezależne releasy są udowodnione.',
      ),
    ],
    evolution: [
      t(
        'Если команды снова могут релизиться вместе — схлопываю remote обратно в пакеты монорепо.',
        'If teams can ship together again, I fold remotes back into monorepo packages.', 'Jeśli zespoły znowu mogą releasować razem — zwijam remote z powrotem do pakietów monorepo.',
      ),
      t(
        'Сигнал к MFE: постоянные конфликты ownership и блокировки релизов после границ в монолите.',
        'Signal to adopt MFE: persistent ownership conflicts and release locks after monolith boundaries.', 'Sygnał do MFE: stałe konflikty ownership i blokady releasów mimo granic w monolocie.',
      ),
    ],
    diagram: {
      nodes: [
        node(
          'shell',
          'mfe',
          t('Общий shell', 'Shared shell', 'Wspólny shell'),
          t('Общий layout, роутинг, авторизация и загрузка удалённых модулей.', 'Shared layout, routing, auth and remote module loading.', 'Wspólny layout, routing, autoryzacja i ładowanie zdalnych modułów.'),
          t('Одно SPA с границами модулей, если независимый деплой не нужен.', 'A single SPA with module boundaries if independent deploy is not needed.', 'Jedno SPA z granicami modułów, jeśli niezależny deploy nie jest potrzebny.'),
          t('Какие зависимости общие, и что будет при рассинхроне версий React?', 'Which dependencies are shared, and what happens on React version drift?', 'Które zależności są wspólne i co będzie przy rozjeździe wersji React?'),
          t(
            'Общими держим React, роутер и дизайн-систему одной мажорной версии; остальное каждый remote везёт сам. Рассинхрон React ломает хуки и дублирует рантайм — CI проверяет shared-матрицу до выкладки. Цена — жёсткий график апдейтов и блокировка релизов, пока все remote не подтянутся.',
            'We share React, the router and the design system on one major version; everything else each remote ships itself. React version drift breaks hooks and duplicates the runtime, so CI checks the shared matrix before deploy. The cost is a rigid upgrade calendar and blocked releases until every remote catches up.',
            'Wspólne trzymamy React, router i design system jednej wersji major; resztę każde remote wiezie samo. Rozjazd React psuje hooki i dubluje runtime — CI sprawdza macierz shared przed wdrożeniem. Koszt to sztywny kalendarz aktualizacji i blokada releasów, dopóki wszystkie remote nie dogonią.',
          ),
        ),
        node(
          'catalog-mfe',
          'mfe',
          t('Удалённый MFE', 'Remote MFE', 'Zdalne MFE'),
          t('Независимый деплой части продукта со своим Query.', 'Independently deployed product slice with its own Query.', 'Niezależny deploy części produktu z własnym Query.'),
          t('npm-пакет в монорепо без загрузки модулей в рантайме.', 'An npm package in the monorepo without runtime federation.', 'Pakiet npm w monorepo bez ładowania modułów w runtime.'),
          t('Как версионируете контракт shell ↔ удалённый модуль?', 'How do you version the shell ↔ remote contract?', 'Jak wersjonujecie kontrakt shell ↔ zdalny moduł?'),
          t(
            'Контракт shell ↔ remote версионируем как semver публичного API: события, слоты и общие типы в отдельном пакете. Ломающее изменение идёт мажором и dual-run, пока старый shell жив. Цена — медленнее эволюция интерфейса и поддержка двух версий контракта.',
            'The shell ↔ remote contract is semver of a public API: events, slots and shared types live in a dedicated package. A breaking change is a major with a dual-run until the old shell is gone. The cost is slower interface evolution and keeping two contract versions alive.',
            'Kontrakt shell ↔ remote wersjonujemy jak semver publicznego API: zdarzenia, sloty i wspólne typy w osobnym pakiecie. Łamiąca zmiana idzie majorem i dual-run, dopóki stary shell żyje. Koszt to wolniejsza ewolucja interfejsu i utrzymanie dwóch wersji kontraktu.',
          ),
        ),
        node(
          'app',
          'app',
          t('Host-приложение', 'Host app', 'Aplikacja hosta'),
          t('Собирает shell и регистрирует удалённые модули, не содержит чужой бизнес-логики.', 'Composes the shell and registers remotes; it does not own foreign business logic.', 'Składa shell i rejestruje zdalne moduły, nie zawiera cudzej logiki biznesowej.'),
          t('Серверная маршрутизация /shop vs /account без Federation.', 'Server routing /shop vs /account without Federation.', 'Serwerowy routing /shop vs /account bez Federation.'),
          t('Кто владеет общим роутингом и дизайн-системой?', 'Who owns shared routing and the design system?', 'Kto jest właścicielem wspólnego routingu i design systemu?'),
          t(
            'Общий роутинг и дизайн-систему владеет команда shell: они релизят пакет, остальные MFE только потребляют публичный API. Локальные обходы в remote запрещены линтером границ. Цена — очередь на изменения дизайн-системы и риск, что shell станет бутылочным горлышком.',
            'Shared routing and the design system are owned by the shell team: they ship the package, other MFEs only consume the public API. Local workarounds in a remote are blocked by boundary lint. The cost is a queue for design-system changes and the risk that shell becomes a bottleneck.',
            'Wspólnym routingiem i design systemem włada zespół shell: oni releasują pakiet, pozostałe MFE tylko konsumują publiczne API. Lokalne obejścia w remote blokuje lint granic. Koszt to kolejka na zmiany design systemu i ryzyko, że shell stanie się wąskim gardłem.',
          ),
        ),
        queryNode,
        apiNode,
        ciNode,
      ],
      edges: [
        edge('shell', 'catalog-mfe', t('Module Federation', 'Module Federation')),
        edge('shell', 'app', t('композиция', 'compose', 'kompozycja')),
        edge('app', 'query', t('кэш приложения', 'app cache', 'cache aplikacji')),
        edge('catalog-mfe', 'query', t('свой Query', 'own Query', 'własne Query')),
        edge('query', 'api', t('HTTP', 'HTTP')),
        edge('ci', 'shell', t('выкладка shell и удалённых модулей', 'deploy shell + remotes', 'wdrożenie shell i zdalnych modułów')),
      ],
    },
  },
}

export function getProfile(id: ProfileId): ArchitectureProfile {
  return PROFILES[id]
}
