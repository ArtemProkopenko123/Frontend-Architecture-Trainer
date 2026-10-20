import { t } from './diagram'
import type { AppMode, Localized, PrepSection, RadioCaseId, SessionStep, TopicId } from './types'

export type GuideDayId = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7'

export type GuideLink = {
  mode: Exclude<AppMode, 'guide'>
  step?: SessionStep
  topicId?: TopicId
  radioCaseId?: RadioCaseId
  prepSection?: PrepSection
}

export type GuideDay = {
  id: GuideDayId
  day: number
  title: Localized
  doneWhen: Localized
  link: GuideLink
}

export const GUIDE_DAYS: GuideDay[] = [
  {
    id: 'd1',
    day: 1,
    title: t('Комната: что такое архитектура', 'Room: what architecture is', 'Pokój: czym jest architektura'),
    doneWhen: t(
      'Проговорить вслух каркас: цель → варианты → выбор → цена → эволюция, не начиная с библиотек.',
      'Say out loud the frame: goal → options → choice → cost → evolution, without leading with libraries.',
      'Powiedz na głos szkielet: cel → warianty → wybór → koszt → ewolucja, bez zaczynania od bibliotek.',
    ),
    link: { mode: 'topics', topicId: 'architecture' },
  },
  {
    id: 'd2',
    day: 2,
    title: t('Конструктор: задать контекст', 'Constructor: set the context', 'Konstruktor: ustaw kontekst'),
    doneWhen: t(
      'Два прогона: админка без SEO и публичный каталог с SEO. Сравнить рекомендацию.',
      'Two runs: a logged-in admin without SEO and a public catalogue with SEO. Compare the recommendation.',
      'Dwa przebiegi: admin bez SEO i publiczny katalog z SEO. Porównaj rekomendację.',
    ),
    link: { mode: 'pipeline', step: 'context' },
  },
  {
    id: 'd3',
    day: 3,
    title: t('Комната: рендеринг', 'Room: rendering', 'Pokój: rendering'),
    doneWhen: t(
      'Выбрать CSR/SSR/ISR по странице и назвать, как измерите LCP до оптимизации.',
      'Pick CSR/SSR/ISR per page and say how you would measure LCP before optimising.',
      'Wybierz CSR/SSR/ISR per strona i powiedz, jak zmierzysz LCP przed optymalizacją.',
    ),
    link: { mode: 'topics', topicId: 'rendering' },
  },
  {
    id: 'd4',
    day: 4,
    title: t('Комната: доступность', 'Room: accessibility', 'Pokój: dostępność'),
    doneWhen: t(
      'Объяснить, как семантика, клавиатура и автопроверки в CI дополняют друг друга и что остаётся ручной проверке.',
      'Explain how semantics, keyboard support and CI checks complement each other, and what still needs manual testing.',
      'Wyjaśnij, jak semantyka, klawiatura i kontrole w CI się uzupełniają oraz co zostaje do testów ręcznych.',
    ),
    link: { mode: 'topics', topicId: 'a11y' },
  },
  {
    id: 'd5',
    day: 5,
    title: t('RADIO: лента с таймером', 'RADIO: feed with the timer', 'RADIO: feed z timerem'),
    doneWhen: t(
      '45 минут, вслух, схема к 10-й минуте. Не уходить в одну деталь.',
      '45 minutes, out loud, a diagram by minute 10. Do not sink into one detail.',
      '45 minut, na głos, schemat koło 10. minuty. Nie tonąć w jednym szczególe.',
    ),
    link: { mode: 'radio', radioCaseId: 'feed' },
  },
  {
    id: 'd6',
    day: 6,
    title: t('Рассказ о своём проекте', 'Your project story', 'Opowieść o swoim projekcie'),
    doneWhen: t(
      '3–5 минут сверху вниз, со слабым местом и своим вкладом; повторить на втором языке.',
      '3–5 minutes top down, with a weak spot and your contribution; repeat in a second language.',
      '3–5 minut z góry na dół, ze słabym miejscem i swoim wkładem; powtórz w drugim języku.',
    ),
    link: { mode: 'prep', prepSection: 'story' },
  },
  {
    id: 'd7',
    day: 7,
    title: t('Полный прогон: конструктор до скрипта', 'Full run: constructor to the script', 'Pełny przebieg: konstruktor do skryptu'),
    doneWhen: t(
      'Один контекст от старта до скрипта ответа без паузы на шпаргалку. Остальные комнаты (offline, i18n, API, безопасность…) — в Темах и поиске.',
      'One context from start to the answer script without pausing for notes. Other rooms (offline, i18n, API, security…) are under Topics and search.',
      'Jeden kontekst od startu do skryptu odpowiedzi bez pauzy na ściągę. Pozostałe pokoje (offline, i18n, API, bezpieczeństwo…) są w Tematach i wyszukiwarce.',
    ),
    link: { mode: 'pipeline', step: 'start' },
  },
]

export function hrefForGuideLink(link: GuideLink): string {
  const params = new URLSearchParams()
  params.set('mode', link.mode)
  if (link.step) params.set('step', link.step)
  if (link.topicId) params.set('topic', link.topicId)
  if (link.radioCaseId) params.set('case', link.radioCaseId)
  if (link.prepSection) params.set('prep', link.prepSection)
  return `?${params.toString()}`
}
