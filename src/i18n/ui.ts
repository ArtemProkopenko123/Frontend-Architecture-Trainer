import type { AppMode, Localized, PrepSection, RadioStep, SessionStep } from '../content/types'

export const ui = {
  appTitle: { ru: 'Тренажёр архитектуры фронтенда', en: 'Frontend architecture trainer' },
  appSubtitle: {
    ru: 'Каркас ответа: контекст → варианты → выбор → цена → эволюция',
    en: 'Answer frame: context → options → choice → cost → evolution',
  },
  langRu: { ru: 'RU', en: 'RU' },
  langEn: { ru: 'EN', en: 'EN' },
  back: { ru: 'Назад', en: 'Back' },
  next: { ru: 'Далее', en: 'Next' },
  start: { ru: 'Начать', en: 'Start' },
  restart: { ru: 'Заново', en: 'Start over' },
  recommended: { ru: 'Рекомендация', en: 'Recommended' },
  yourChoice: { ru: 'Ваш выбор', en: 'Your choice' },
  otherLanguage: { ru: 'Показать EN', en: 'Show RU' },
  diagramTitle: { ru: 'Схема системы', en: 'System diagram' },
  diagramHint: {
    ru: 'Перетащите блок, чтобы разложить схему. Клик — зачем он нужен, чем заменить, типичное уточнение.',
    en: 'Drag a block to rearrange the diagram. Click it for why it exists, what could replace it, and a typical follow-up.',
  },
  diagramEmpty: {
    ru: 'Ответьте на вопросы контекста — схема появится вместе с вариантами.',
    en: 'Answer the context questions and the diagram will appear with the options.',
  },
  nodeWhy: { ru: 'Зачем', en: 'Why' },
  nodeAlt: { ru: 'Чем заменить', en: 'What instead' },
  nodeFollowUp: { ru: 'Уточнение', en: 'Follow-up' },
  closeNode: { ru: 'Закрыть', en: 'Close' },
  needContext: {
    ru: 'Сначала заполните весь контекст — без него варианты будут «it depends» без содержания.',
    en: 'Fill in the full context first — without it, options are “it depends” with no substance.',
  },
  interviewerChecks: { ru: 'Что проверяют', en: 'What they look for' },
  startChecks: {
    ru: 'Интервьюер хочет услышать ход рассуждения, а не список библиотек.',
    en: 'The interviewer wants reasoning, not a library list.',
  },
  headerLangNote: {
    ru: 'Переключатель RU/EN уже в шапке.',
    en: 'The RU/EN toggle is already in the header.',
  },
  modes: {
    pipeline: { ru: 'Пайплайн', en: 'Pipeline' },
    radio: { ru: 'RADIO', en: 'RADIO' },
    topics: { ru: 'Комнаты', en: 'Rooms' },
    prep: { ru: 'Подготовка', en: 'Prep' },
  } satisfies Record<AppMode, Localized>,
  prepSubtitle: {
    ru: 'Рассказ о проекте, каверзные вопросы, чек-лист. Сохраняется в этом браузере.',
    en: 'Project story, trick questions, checklist. Saved in this browser.',
  },
  prepSections: {
    story: { ru: 'Рассказ', en: 'Story' },
    traps: { ru: 'Каверзные', en: 'Tricks' },
    flags: { ru: 'Флаги', en: 'Flags' },
    ask: { ru: 'Вопросы им', en: 'Ask them' },
    checklist: { ru: 'Чек-лист', en: 'Checklist' },
  } satisfies Record<PrepSection, Localized>,
  prepStoryIntro: {
    ru: '3–5 минут, сверху вниз — от продукта к коду. В каждом пункте отметь свой вклад. Черновик остаётся в браузере.',
    en: '3–5 minutes, top down — product then code. Mark your contribution in every point. The draft stays in the browser.',
  },
  prepRedFlagTitle: { ru: 'Красные флаги в ответах', en: 'Red flags in answers' },
  prepAskIntro: {
    ru: 'Они тоже показывают уровень — спрашивай про архитектуру и процесс.',
    en: 'These also show seniority — ask about architecture and process.',
  },
  prepProgress: { ru: 'готово', en: 'done' },
  prepAsideStory: {
    ru: 'Красный флаг: рассказ начинается со списка библиотек и папок, без продукта, масштаба и причин.',
    en: 'Red flag: the story starts with libraries and folders, with no product, scale or reasons.',
  },
  prepAsideTraps: {
    ru: 'Выберите вопрос слева — справа образец хода мысли, не заучивание.',
    en: 'Pick a question on the left — the right side is a reasoning sample, not a script to memorise.',
  },
  prepAsideFlags: {
    ru: 'Интервьюер ловит ход мысли. Trade-off без подсказки и цифры из опыта — сильные сигналы.',
    en: 'The interviewer is scoring the reasoning. Unprompted trade-offs and real numbers are strong signals.',
  },
  prepAsideAsk: {
    ru: 'Не спрашивай только про соцпакет. Вопросы про ADR, ownership и релизы показывают, что ты думаешь как senior.',
    en: 'Do not only ask about perks. Questions about ADRs, ownership and releases show senior-level thinking.',
  },
  prepAsideChecklist: {
    ru: 'Отмеченные пункты сохраняются локально. RADIO-раунд с таймером — в режиме RADIO.',
    en: 'Checked items persist locally. The timed RADIO round lives in RADIO mode.',
  },
  radioSubtitle: {
    ru: 'System design: Requirements → Architecture → Data → Interface → Optimizations',
    en: 'System design: Requirements → Architecture → Data → Interface → Optimizations',
  },
  topicsSubtitle: {
    ru: 'Главы архитектуры: границы, стейт, рендер, API, масштаб, качество',
    en: 'Architecture rooms: boundaries, state, rendering, API, scale, quality',
  },
  radioPickTitle: { ru: 'Выберите задачу раунда', en: 'Pick a round problem' },
  radioTiming: { ru: 'Тайминг раунда 45–60 мин', en: 'Round timing 45–60 min' },
  radioMistakes: { ru: 'Типичные ошибки', en: 'Typical mistakes' },
  radioSpotlight: { ru: 'Другие задачи — на что смотреть', en: 'Other problems — what to watch' },
  radioChoose: { ru: 'Разобрать', en: 'Walk through' },
  radioDiagramEmpty: {
    ru: 'Выберите задачу — справа появится схема, которую стоит нарисовать к 10-й минуте.',
    en: 'Pick a problem — the board sketch you should draw around minute 10 appears here.',
  },
  topicDiagramEmpty: {
    ru: 'У этой комнаты нет отдельной схемы — ориентируйтесь на таблицу слева.',
    en: 'This room has no extra diagram — use the table on the left.',
  },
  timerRound: { ru: 'Раунд 45 мин', en: '45 min round' },
  timerIdle: { ru: 'Часы стартуют, когда выберете задачу', en: 'The clock starts when you pick a problem' },
  timerOver: { ru: 'Время раунда вышло — договорите мысль и остановитесь', en: 'Round time is up — finish the thought and stop' },
  timerMin: { ru: 'мин', en: 'min' },
  timerPause: { ru: 'Пауза', en: 'Pause' },
  timerResume: { ru: 'Продолжить', en: 'Resume' },
  timerReset: { ru: 'Сбросить часы', en: 'Reset clock' },
  voiceTitle: { ru: 'Репетиция вслух', en: 'Speak it out' },
  voiceHint: {
    ru: 'Запись только в браузере, никуда не уходит. На раунде важно говорить, а не молча рисовать.',
    en: 'Recording stays in the browser and is never uploaded. The round rewards thinking out loud, not silent drawing.',
  },
  voiceStart: { ru: 'Записать', en: 'Record' },
  voiceStop: { ru: 'Стоп', en: 'Stop' },
  voiceDiscard: { ru: 'Удалить запись', en: 'Delete take' },
  voiceDenied: {
    ru: 'Микрофон недоступен — разрешите доступ или репетируйте без записи.',
    en: 'Microphone unavailable — allow access or rehearse without recording.',
  },
  radioSteps: {
    pick: { ru: 'Задача', en: 'Problem' },
    requirements: { ru: 'R · Требования', en: 'R · Requirements' },
    architecture: { ru: 'A · Архитектура', en: 'A · Architecture' },
    data: { ru: 'D · Данные', en: 'D · Data' },
    interface: { ru: 'I · API', en: 'I · Interface' },
    optimizations: { ru: 'O · Оптимизации', en: 'O · Optimizations' },
  } satisfies Record<RadioStep, Localized>,
  steps: {
    start: { ru: 'Старт', en: 'Start' },
    context: { ru: 'Контекст', en: 'Context' },
    options: { ru: 'Варианты', en: 'Options' },
    choice: { ru: 'Выбор', en: 'Choice' },
    tradeoffs: { ru: 'Цена', en: 'Cost' },
    evolution: { ru: 'Эволюция', en: 'Evolution' },
    rehearse: { ru: 'Ответ', en: 'Answer' },
  } satisfies Record<SessionStep, Localized>,
} as const

export function t(text: Localized, locale: 'ru' | 'en'): string {
  return text[locale]
}
