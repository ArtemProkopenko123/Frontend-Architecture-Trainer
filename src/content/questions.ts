import type { ContextQuestion } from './types'

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    key: 'teamSize',
    prompt: {
      ru: 'Какой размер фронтенд-команды?',
      en: 'How large is the frontend team?',
    },
    options: [
      { value: '1-3', label: { ru: '1–3 человека', en: '1–3 people' } },
      { value: '4-10', label: { ru: '4–10 человек', en: '4–10 people' } },
      { value: '11+', label: { ru: '11+ человек', en: '11+ people' } },
    ],
  },
  {
    key: 'teamsCount',
    prompt: {
      ru: 'Сколько фронтенд-команд работает над продуктом?',
      en: 'How many frontend teams work on the product?',
    },
    options: [
      { value: '1', label: { ru: 'Одна команда', en: 'One team' } },
      { value: '2-3', label: { ru: '2–3 команды', en: '2–3 teams' } },
      { value: '4+', label: { ru: '4+ команды', en: '4+ teams' } },
    ],
  },
  {
    key: 'product',
    prompt: {
      ru: 'Какой тип продукта мы проектируем?',
      en: 'What kind of product are we designing for?',
    },
    options: [
      { value: 'admin', label: { ru: 'Админка / дашборд за логином', en: 'Admin / logged-in dashboard' } },
      {
        value: 'public_content',
        label: { ru: 'Публичный контент (маркетинг, блог, доки)', en: 'Public content (marketing, blog, docs)' },
      },
      { value: 'marketplace', label: { ru: 'Маркетплейс / каталог', en: 'Marketplace / catalogue' } },
      { value: 'b2b_app', label: { ru: 'B2B-приложение за логином', en: 'Logged-in B2B app' } },
    ],
  },
  {
    key: 'seo',
    prompt: {
      ru: 'Насколько критичен SEO и быстрый первый HTML?',
      en: 'How critical are SEO and a fast first HTML payload?',
    },
    options: [
      { value: 'none', label: { ru: 'SEO не важно (закрытый продукт)', en: 'SEO does not matter (private product)' } },
      { value: 'critical', label: { ru: 'SEO критичен', en: 'SEO is critical' } },
    ],
  },
  {
    key: 'dataFreshness',
    prompt: {
      ru: 'Как часто меняются данные на ключевых страницах?',
      en: 'How often does data on key pages change?',
    },
    options: [
      { value: 'static', label: { ru: 'Почти статика', en: 'Almost static' } },
      { value: 'infrequent', label: { ru: 'Редко, приемлем ISR', en: 'Infrequently — ISR is acceptable' } },
      { value: 'realtime', label: { ru: 'Свежие / персональные в реальном времени', en: 'Realtime / personalised' } },
    ],
  },
  {
    key: 'independentReleases',
    prompt: {
      ru: 'Нужны ли командам независимые релизы?',
      en: 'Do teams need independent releases?',
    },
    options: [
      { value: 'no', label: { ru: 'Нет, общий релизный цикл', en: 'No, a shared release cycle is fine' } },
      { value: 'yes', label: { ru: 'Да, команды блокируют друг друга', en: 'Yes, teams block each other otherwise' } },
    ],
  },
]
