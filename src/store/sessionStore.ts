import { create } from 'zustand'
import type {
  AppMode,
  Locale,
  PrepSection,
  ProfileId,
  RadioCaseId,
  RadioStep,
  SessionContext,
  SessionStep,
  TopicId,
} from '../content/types'
const STEPS: SessionStep[] = [
  'start',
  'context',
  'options',
  'choice',
  'tradeoffs',
  'evolution',
  'rehearse',
]

const RADIO_STEPS: RadioStep[] = [
  'pick',
  'requirements',
  'architecture',
  'data',
  'interface',
  'optimizations',
]

const MODES = new Set<AppMode>(['pipeline', 'radio', 'topics', 'prep'])
const PREP_SECTIONS = new Set<PrepSection>(['story', 'traps', 'flags', 'ask', 'checklist'])
const PREP_STORAGE = 'fe-arch-trainer-prep'
const STEP_SET = new Set<SessionStep>(STEPS)
const RADIO_STEP_SET = new Set<RadioStep>(RADIO_STEPS)
const CASE_SET = new Set<RadioCaseId>(['feed', 'autocomplete', 'chat', 'dashboard'])
const TOPIC_SET = new Set<TopicId>([
  'structure',
  'state',
  'rendering',
  'api',
  'scale',
  'perf',
  'reliability',
  'security',
  'leadership',
])

function readSearch() {
  return new URLSearchParams(window.location.search)
}

function modeFromUrl(): AppMode {
  const raw = readSearch().get('mode')
  if (raw && MODES.has(raw as AppMode)) return raw as AppMode
  return 'pipeline'
}

function stepFromUrl(): SessionStep {
  const raw = readSearch().get('step')
  if (raw && STEP_SET.has(raw as SessionStep)) return raw as SessionStep
  return 'start'
}

function radioStepFromUrl(): RadioStep {
  const raw = readSearch().get('radioStep')
  if (raw && RADIO_STEP_SET.has(raw as RadioStep)) return raw as RadioStep
  return 'pick'
}

function radioCaseFromUrl(): RadioCaseId | null {
  const raw = readSearch().get('case')
  if (raw && CASE_SET.has(raw as RadioCaseId)) return raw as RadioCaseId
  return null
}

function topicFromUrl(): TopicId {
  const raw = readSearch().get('topic')
  if (raw && TOPIC_SET.has(raw as TopicId)) return raw as TopicId
  return 'structure'
}

function localeFromStorage(): Locale {
  const raw = window.localStorage.getItem('locale')
  return raw === 'en' ? 'en' : 'ru'
}

function prepSectionFromUrl(): PrepSection {
  const raw = readSearch().get('prep')
  if (raw && PREP_SECTIONS.has(raw as PrepSection)) return raw as PrepSection
  return 'story'
}

function loadPrep(): { checklist: Record<string, boolean>; story: Record<string, string> } {
  try {
    const raw = window.localStorage.getItem(PREP_STORAGE)
    if (!raw) return { checklist: {}, story: {} }
    const parsed = JSON.parse(raw) as { checklist?: unknown; story?: unknown }
    return {
      checklist:
        parsed.checklist && typeof parsed.checklist === 'object' && !Array.isArray(parsed.checklist)
          ? (parsed.checklist as Record<string, boolean>)
          : {},
      story:
        parsed.story && typeof parsed.story === 'object' && !Array.isArray(parsed.story)
          ? (parsed.story as Record<string, string>)
          : {},
    }
  } catch {
    return { checklist: {}, story: {} }
  }
}

function savePrep(checklist: Record<string, boolean>, story: Record<string, string>) {
  window.localStorage.setItem(PREP_STORAGE, JSON.stringify({ checklist, story }))
}

export type SessionState = {
  locale: Locale
  mode: AppMode
  step: SessionStep
  radioStep: RadioStep
  radioCaseId: RadioCaseId | null
  topicId: TopicId
  prepSection: PrepSection
  selectedTrickId: string
  checklist: Record<string, boolean>
  story: Record<string, string>
  context: Partial<SessionContext>
  selectedProfileId: ProfileId | null
  showAltScript: boolean
  timerElapsedMs: number
  timerRunning: boolean
  timerStartedAt: number | null
  setLocale: (locale: Locale) => void
  setMode: (mode: AppMode) => void
  setStep: (step: SessionStep) => void
  setRadioStep: (step: RadioStep) => void
  setRadioCase: (id: RadioCaseId) => void
  setTopicId: (id: TopicId) => void
  setPrepSection: (section: PrepSection) => void
  setSelectedTrickId: (id: string) => void
  toggleChecklist: (id: string) => void
  setStoryField: (id: string, value: string) => void
  goNext: () => void
  goBack: () => void
  setContextField: <K extends keyof SessionContext>(
    key: K,
    value: SessionContext[K],
  ) => void
  setSelectedProfileId: (id: ProfileId) => void
  toggleAltScript: () => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  reset: () => void
  isContextComplete: () => boolean
}

function syncUrl(state: {
  mode: AppMode
  step: SessionStep
  radioStep: RadioStep
  radioCaseId: RadioCaseId | null
  topicId: TopicId
  prepSection: PrepSection
}) {
  const url = new URL(window.location.href)
  const params = url.searchParams
  params.set('mode', state.mode)
  if (state.mode === 'pipeline') {
    params.set('step', state.step)
    params.delete('radioStep')
    params.delete('case')
    params.delete('topic')
    params.delete('prep')
  } else if (state.mode === 'radio') {
    params.set('radioStep', state.radioStep)
    if (state.radioCaseId) params.set('case', state.radioCaseId)
    else params.delete('case')
    params.delete('step')
    params.delete('topic')
    params.delete('prep')
  } else if (state.mode === 'topics') {
    params.set('topic', state.topicId)
    params.delete('step')
    params.delete('radioStep')
    params.delete('case')
    params.delete('prep')
  } else {
    params.set('prep', state.prepSection)
    params.delete('step')
    params.delete('radioStep')
    params.delete('case')
    params.delete('topic')
  }
  window.history.replaceState({}, '', url)
}

export const useSessionStore = create<SessionState>((set, get) => ({
  locale: localeFromStorage(),
  mode: modeFromUrl(),
  step: stepFromUrl(),
  radioStep: radioStepFromUrl(),
  radioCaseId: radioCaseFromUrl(),
  topicId: topicFromUrl(),
  prepSection: prepSectionFromUrl(),
  selectedTrickId: 'best-arch',
  checklist: loadPrep().checklist,
  story: loadPrep().story,
  context: {},
  selectedProfileId: null,
  showAltScript: false,
  timerElapsedMs: 0,
  timerRunning: false,
  timerStartedAt: null,
  setLocale: (locale) => {
    window.localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
    set({ locale })
  },
  setMode: (mode) => {
    const current = get()
    const next = { ...current, mode }
    if (mode === 'radio' && next.radioStep !== 'pick' && !next.radioCaseId) {
      next.radioStep = 'pick'
    }
    syncUrl(next)
    if (mode !== 'radio' && current.timerRunning && current.timerStartedAt !== null) {
      set({
        mode,
        radioStep: next.radioStep,
        timerRunning: false,
        timerStartedAt: null,
        timerElapsedMs: current.timerElapsedMs + Date.now() - current.timerStartedAt,
      })
      return
    }
    set({ mode, radioStep: next.radioStep })
  },
  setStep: (step) => {
    syncUrl({ ...get(), step })
    set({ step })
  },
  setRadioStep: (radioStep) => {
    if (radioStep !== 'pick' && !get().radioCaseId) return
    syncUrl({ ...get(), radioStep })
    set({ radioStep })
  },
  setRadioCase: (id) => {
    const radioStep = get().radioStep === 'pick' ? 'requirements' : get().radioStep
    syncUrl({ ...get(), radioCaseId: id, radioStep })
    set({
      radioCaseId: id,
      radioStep,
      timerElapsedMs: 0,
      timerRunning: true,
      timerStartedAt: Date.now(),
    })
  },
  setTopicId: (topicId) => {
    syncUrl({ ...get(), topicId })
    set({ topicId })
  },
  setPrepSection: (prepSection) => {
    syncUrl({ ...get(), prepSection })
    set({ prepSection })
  },
  setSelectedTrickId: (selectedTrickId) => set({ selectedTrickId }),
  toggleChecklist: (id) => {
    const checklist = { ...get().checklist, [id]: !get().checklist[id] }
    savePrep(checklist, get().story)
    set({ checklist })
  },
  setStoryField: (id, value) => {
    const story = { ...get().story, [id]: value }
    savePrep(get().checklist, story)
    set({ story })
  },
  goNext: () => {
    const state = get()
    if (state.mode === 'radio') {
      const index = RADIO_STEPS.indexOf(state.radioStep)
      const next = RADIO_STEPS[Math.min(index + 1, RADIO_STEPS.length - 1)]
      if (next !== 'pick' && !state.radioCaseId) return
      syncUrl({ ...state, radioStep: next })
      set({ radioStep: next })
      return
    }
    const index = STEPS.indexOf(state.step)
    const next = STEPS[Math.min(index + 1, STEPS.length - 1)]
    if (next === 'options' && !state.isContextComplete()) return
    syncUrl({ ...state, step: next })
    set({ step: next, showAltScript: false })
  },
  goBack: () => {
    const state = get()
    if (state.mode === 'radio') {
      const index = RADIO_STEPS.indexOf(state.radioStep)
      const prev = RADIO_STEPS[Math.max(index - 1, 0)]
      syncUrl({ ...state, radioStep: prev })
      set({ radioStep: prev })
      return
    }
    const index = STEPS.indexOf(state.step)
    const prev = STEPS[Math.max(index - 1, 0)]
    syncUrl({ ...state, step: prev })
    set({ step: prev, showAltScript: false })
  },
  setContextField: (key, value) => {
    set((state) => ({
      context: { ...state.context, [key]: value },
      selectedProfileId: null,
    }))
  },
  setSelectedProfileId: (id) => set({ selectedProfileId: id }),
  toggleAltScript: () => set((state) => ({ showAltScript: !state.showAltScript })),
  startTimer: () => {
    const state = get()
    if (state.timerRunning) return
    set({ timerRunning: true, timerStartedAt: Date.now() })
  },
  pauseTimer: () => {
    const state = get()
    if (!state.timerRunning || state.timerStartedAt === null) return
    set({
      timerRunning: false,
      timerStartedAt: null,
      timerElapsedMs: state.timerElapsedMs + Date.now() - state.timerStartedAt,
    })
  },
  resetTimer: () =>
    set({ timerElapsedMs: 0, timerRunning: false, timerStartedAt: null }),
  reset: () => {
    const state = get()
    if (state.mode === 'radio') {
      syncUrl({ ...state, radioStep: 'pick', radioCaseId: null })
      set({
        radioStep: 'pick',
        radioCaseId: null,
        timerElapsedMs: 0,
        timerRunning: false,
        timerStartedAt: null,
      })
      return
    }
    syncUrl({ ...state, step: 'start' })
    set({
      step: 'start',
      context: {},
      selectedProfileId: null,
      showAltScript: false,
    })
  },
  isContextComplete: () => {
    const { context } = get()
    return Boolean(
      context.teamSize &&
        context.teamsCount &&
        context.product &&
        context.seo &&
        context.dataFreshness &&
        context.independentReleases,
    )
  },
}))

export const STEP_ORDER = STEPS
export const RADIO_STEP_ORDER = RADIO_STEPS
export const PREP_SECTION_ORDER = ['story', 'traps', 'flags', 'ask', 'checklist'] as const
