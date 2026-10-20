import type { ContextQuestion, Localized, QuestionGroup, SessionContext } from './types'

export const QUESTION_GROUPS: { id: QuestionGroup; label: Localized }[] = [
  { id: 'org', label: { ru: 'Команда и поставка', en: 'Team and delivery', pl: 'Zespół i dostawa' } },
  { id: 'product', label: { ru: 'Продукт и данные', en: 'Product and data', pl: 'Produkt i dane' } },
  { id: 'experience', label: { ru: 'Опыт и ограничения', en: 'Experience and constraints', pl: 'Doświadczenie i ograniczenia' } },
]

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    key: 'teamSize',
    group: 'org',
    prompt: {
      ru: 'Какой размер фронтенд-команды?',
      en: 'How large is the frontend team?',
      pl: 'Jaki jest rozmiar zespołu frontendowego?',
    },
    options: [
      { value: '1-3', label: { ru: '1–3 человека', en: '1–3 people', pl: '1–3 osoby' } },
      { value: '4-10', label: { ru: '4–10 человек', en: '4–10 people', pl: '4–10 osób' } },
      { value: '11+', label: { ru: '11+ человек', en: '11+ people', pl: '11+ osób' } },
    ],
  },
  {
    key: 'teamsCount',
    group: 'org',
    prompt: {
      ru: 'Сколько фронтенд-команд работает над продуктом?',
      en: 'How many frontend teams work on the product?',
      pl: 'Ile zespołów frontendowych pracuje nad produktem?',
    },
    options: [
      { value: '1', label: { ru: 'Одна команда', en: 'One team', pl: 'Jeden zespół' } },
      { value: '2-3', label: { ru: '2–3 команды', en: '2–3 teams', pl: '2–3 zespoły' } },
      { value: '4+', label: { ru: '4+ команды', en: '4+ teams', pl: '4+ zespoły' } },
    ],
  },
  {
    key: 'independentReleases',
    group: 'org',
    prompt: {
      ru: 'Нужны ли командам независимые релизы?',
      en: 'Do teams need independent releases?',
      pl: 'Czy zespoły potrzebują niezależnych wydań?',
    },
    options: [
      {
        value: 'no',
        label: { ru: 'Нет, общий релизный цикл', en: 'No, a shared release cycle is fine', pl: 'Nie, wspólny cykl wydań wystarczy' },
      },
      {
        value: 'yes',
        label: {
          ru: 'Да, команды блокируют друг друга',
          en: 'Yes, teams block each other otherwise',
          pl: 'Tak, inaczej zespoły się blokują',
        },
      },
    ],
  },
  {
    key: 'deadline',
    group: 'org',
    prompt: { ru: 'Какое давление по срокам?', en: 'How much deadline pressure is there?', pl: 'Jaki jest nacisk terminów?' },
    options: [
      {
        value: 'speed',
        label: { ru: 'Скорость важнее: стартап / дедлайн', en: 'Speed first: startup / deadline', pl: 'Szybkość ważniejsza: startup / deadline' },
      },
      {
        value: 'balanced',
        label: { ru: 'Баланс фич и качества', en: 'Balance features and quality', pl: 'Balans funkcji i jakości' },
      },
      {
        value: 'longevity',
        label: {
          ru: 'Система должна жить годы и команды',
          en: 'The system must last years and teams',
          pl: 'System ma żyć latami i zespołami',
        },
      },
    ],
  },
  {
    key: 'product',
    group: 'product',
    prompt: {
      ru: 'Какой тип продукта мы проектируем?',
      en: 'What kind of product are we designing for?',
      pl: 'Jaki typ produktu projektujemy?',
    },
    options: [
      {
        value: 'admin',
        label: { ru: 'Админка / дашборд за логином', en: 'Admin / logged-in dashboard', pl: 'Admin / dashboard za logowaniem' },
      },
      {
        value: 'public_content',
        label: {
          ru: 'Публичный контент (маркетинг, блог, доки)',
          en: 'Public content (marketing, blog, docs)',
          pl: 'Treść publiczna (marketing, blog, docs)',
        },
      },
      { value: 'marketplace', label: { ru: 'Маркетплейс / каталог', en: 'Marketplace / catalogue', pl: 'Marketplace / katalog' } },
      {
        value: 'b2b_app',
        label: { ru: 'B2B-приложение за логином', en: 'Logged-in B2B app', pl: 'Aplikacja B2B za logowaniem' },
      },
    ],
  },
  {
    key: 'seo',
    group: 'product',
    prompt: {
      ru: 'Насколько критичен SEO и быстрый первый HTML?',
      en: 'How critical are SEO and a fast first HTML payload?',
      pl: 'Jak krytyczne są SEO i szybki pierwszy HTML?',
    },
    options: [
      {
        value: 'none',
        label: { ru: 'SEO не важно (закрытый продукт)', en: 'SEO does not matter (private product)', pl: 'SEO nie gra roli (produkt zamknięty)' },
      },
      { value: 'critical', label: { ru: 'SEO критичен', en: 'SEO is critical', pl: 'SEO jest krytyczne' } },
    ],
  },
  {
    key: 'dataFreshness',
    group: 'product',
    prompt: {
      ru: 'Как часто меняются данные на ключевых страницах?',
      en: 'How often does data on key pages change?',
      pl: 'Jak często zmieniają się dane na kluczowych stronach?',
    },
    options: [
      { value: 'static', label: { ru: 'Почти статика', en: 'Almost static', pl: 'Prawie statyka' } },
      {
        value: 'infrequent',
        label: { ru: 'Редко, приемлем ISR', en: 'Infrequently — ISR is acceptable', pl: 'Rzadko — ISR jest OK' },
      },
      {
        value: 'realtime',
        label: {
          ru: 'Свежие / персональные на каждый запрос',
          en: 'Fresh / personalised per request',
          pl: 'Świeże / spersonalizowane na każde żądanie',
        },
      },
    ],
  },
  {
    key: 'liveUpdates',
    group: 'product',
    prompt: {
      ru: 'Нужны ли живые обновления без перезагрузки?',
      en: 'Do we need live updates without a reload?',
      pl: 'Czy potrzebne są żywe aktualizacje bez przeładowania?',
    },
    options: [
      {
        value: 'none',
        label: { ru: 'Нет, достаточно обычного запроса', en: 'No, a normal request is enough', pl: 'Nie, zwykłe żądanie wystarczy' },
      },
      {
        value: 'needed',
        label: {
          ru: 'Да: лента, чат, статусы, коллаборация',
          en: 'Yes: feed, chat, statuses, collaboration',
          pl: 'Tak: feed, czat, statusy, współpraca',
        },
      },
    ],
  },
  {
    key: 'offline',
    group: 'experience',
    prompt: {
      ru: 'Нужен ли офлайн или очередь действий без сети?',
      en: 'Do we need offline or a queue of actions without a network?',
      pl: 'Czy potrzebny jest offline albo kolejka działań bez sieci?',
    },
    options: [
      {
        value: 'none',
        label: { ru: 'Нет, без сети продукт бесполезен', en: 'No, the product is useless offline', pl: 'Nie, bez sieci produkt jest bezużyteczny' },
      },
      {
        value: 'needed',
        label: {
          ru: 'Да: черновики, очередь, повтор отправки',
          en: 'Yes: drafts, a queue, retry on reconnect',
          pl: 'Tak: szkice, kolejka, ponowienie po reconnect',
        },
      },
    ],
  },
  {
    key: 'network',
    group: 'experience',
    prompt: { ru: 'Какую сеть считаем целевой?', en: 'What network do we design for?', pl: 'Jaką sieć przyjmujemy za docelową?' },
    options: [
      {
        value: 'good',
        label: { ru: 'Обычный broadband / офис', en: 'Typical broadband / office', pl: 'Zwykły broadband / biuro' },
      },
      {
        value: 'mobile_slow',
        label: { ru: 'Медленный мобильный интернет', en: 'Slow mobile networks', pl: 'Wolny internet mobilny' },
      },
    ],
  },
  {
    key: 'a11y',
    group: 'experience',
    prompt: { ru: 'Какой уровень доступности?', en: 'What accessibility bar?', pl: 'Jaki próg dostępności?' },
    options: [
      {
        value: 'standard',
        label: { ru: 'Базовый: семантика, клавиатура', en: 'Baseline: semantics and keyboard', pl: 'Bazowy: semantyka, klawiatura' },
      },
      {
        value: 'strict',
        label: { ru: 'Жёсткий: WCAG, скринридер, фокус', en: 'Strict: WCAG, screen reader, focus', pl: 'Ostry: WCAG, czytnik ekranu, fokus' },
      },
    ],
  },
  {
    key: 'i18n',
    group: 'experience',
    prompt: { ru: 'Сколько языков и локалей?', en: 'How many languages and locales?', pl: 'Ile języków i locale?' },
    options: [
      { value: 'single', label: { ru: 'Один язык', en: 'One language', pl: 'Jeden język' } },
      {
        value: 'multi',
        label: { ru: 'Несколько языков, локаль в URL', en: 'Several languages, locale in the URL', pl: 'Kilka języków, locale w URL' },
      },
    ],
  },
]

export function isSessionComplete(ctx: Partial<SessionContext>): ctx is SessionContext {
  return CONTEXT_QUESTIONS.every((question) => Boolean(ctx[question.key]))
}
