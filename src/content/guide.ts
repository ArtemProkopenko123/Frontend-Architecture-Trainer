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
    title: t('Каркас ответа', 'The answer frame', 'Szkielet odpowiedzi'),
    doneWhen: t(
      'Проговорить вслух: контекст → варианты → выбор → цена → эволюция.',
      'Say out loud: context → options → choice → cost → evolution.', 'Powiedz na głos: kontekst → warianty → wybór → koszt → ewolucja.',
    ),
    link: { mode: 'pipeline', step: 'start' },
  },
  {
    id: 'd2',
    day: 2,
    title: t('Конструктор: прогнать 2 контекста', 'Constructor: run two contexts', 'Konstruktor: przepuść 2 konteksty'),
    doneWhen: t(
      'Один прогон — админка без SEO, второй — публичный каталог с SEO. Сравнить рекомендацию.',
      'One run for a logged-in admin without SEO, one for a public catalogue with SEO. Compare the recommendation.', 'Jeden przebieg — admin bez SEO, drugi — publiczny katalog z SEO. Porównaj rekomendację.',
    ),
    link: { mode: 'pipeline', step: 'context' },
  },
  {
    id: 'd3',
    day: 3,
    title: t('Комната: структура + состояние', 'Room: structure + state', 'Pokój: struktura + stan'),
    doneWhen: t(
      'Ответить на «как организуешь проект» и «где живёт стейт» без списка библиотек первым предложением.',
      'Answer “how do you structure a project” and “where does state live” without leading with a library list.', 'Odpowiedz na „jak organizujesz projekt” i „gdzie żyje stan” bez listy bibliotek w pierwszym zdaniu.',
    ),
    link: { mode: 'topics', topicId: 'structure' },
  },
  {
    id: 'd4',
    day: 4,
    title: t('Комната: рендеринг + API + perf', 'Room: rendering + API + perf', 'Pokój: rendering + API + perf'),
    doneWhen: t(
      'Выбрать CSR/SSR/ISR по странице и назвать, как измерите LCP до оптимизации.',
      'Pick CSR/SSR/ISR per page and say how you would measure LCP before optimising.', 'Wybierz CSR/SSR/ISR per strona i powiedz, jak zmierzysz LCP przed optymalizacją.',
    ),
    link: { mode: 'topics', topicId: 'rendering' },
  },
  {
    id: 'd5',
    day: 5,
    title: t('RADIO: лента с таймером', 'RADIO: feed with the timer', 'RADIO: feed z timerem'),
    doneWhen: t(
      '45 минут, вслух, схема к 10-й минуте. Не уходить в одну деталь.',
      '45 minutes, out loud, a diagram by minute 10. Do not sink into one detail.', '45 minut, na głos, schemat koło 10. minuty. Nie tonąć w jednym szczególe.',
    ),
    link: { mode: 'radio', radioCaseId: 'feed' },
  },
  {
    id: 'd6',
    day: 6,
    title: t('Рассказ о своём проекте', 'Your project story', 'Opowieść o swoim projekcie'),
    doneWhen: t(
      '3–5 минут сверху вниз, RU и EN, со слабым местом и своим вкладом.',
      '3–5 minutes top down, RU and EN, with a weak spot and your contribution.', '3–5 minut z góry na dół, RU, EN i PL, ze słabym miejscem i swoim wkładem.',
    ),
    link: { mode: 'prep', prepSection: 'story' },
  },
  {
    id: 'd7',
    day: 7,
    title: t('Полный прогон: пайплайн + RADIO', 'Full run: pipeline + RADIO', 'Pełny przebieg: pipeline + RADIO'),
    doneWhen: t(
      'Один конструктор до скрипта и один RADIO-кейс без паузы на шпаргалку.',
      'One constructor through to the script and one RADIO case without pausing for notes.', 'Jeden konstruktor do skryptu i jeden case RADIO bez pauzy na ściągę.',
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
