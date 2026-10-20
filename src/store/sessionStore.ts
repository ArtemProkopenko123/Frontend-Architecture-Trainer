import { create } from 'zustand'
import { isSessionComplete } from '../content/questions'
import { TOPIC_ORDER } from '../content/topics'
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
import { decodeContext, encodeContext } from '../engine/contextUrl'
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

const MODES = new Set<AppMode>(['pipeline', 'radio', 'topics', 'prep', 'guide'])
const PREP_SECTIONS = new Set<PrepSection>(['story', 'traps', 'flags', 'ask', 'checklist'])
const PREP_STORAGE = 'fe-arch-trainer-prep'
const STEP_SET = new Set<SessionStep>(STEPS)
const RADIO_STEP_SET = new Set<RadioStep>(RADIO_STEPS)
const CASE_SET = new Set<RadioCaseId>(['feed', 'autocomplete', 'chat', 'dashboard', 'shop', 'kanban'])
const TOPIC_SET = new Set<TopicId>(TOPIC_ORDER)

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
  return TOPIC_ORDER[0]
}

function localeFromStorage(): Locale {
  const raw = window.localStorage.getItem('locale')
  if (raw === 'en' || raw === 'pl' || raw === 'ru') return raw
  return 'ru'
}

function prepSectionFromUrl(): PrepSection {
  const raw = readSearch().get('prep')
  if (raw && PREP_SECTIONS.has(raw as PrepSection)) return raw as PrepSection
  return 'story'
}

function asStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const out: Record<string, string> = {}
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (typeof item === 'string') out[key] = item
  }
  return out
}

function asBoolRecord(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const out: Record<string, boolean> = {}
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (typeof item === 'boolean') out[key] = item
  }
  return out
}

function loadPrep(): {
  checklist: Record<string, boolean>
  story: Record<string, string>
  rubric: Record<string, boolean>
} {
  try {
    const raw = window.localStorage.getItem(PREP_STORAGE)
    if (!raw) return { checklist: {}, story: {}, rubric: {} }
    const parsed = JSON.parse(raw) as { checklist?: unknown; story?: unknown; rubric?: unknown }
    return {
      checklist: asBoolRecord(parsed.checklist),
      story: asStringRecord(parsed.story),
      rubric: asBoolRecord(parsed.rubric),
    }
  } catch {
    return { checklist: {}, story: {}, rubric: {} }
  }
}

function savePrep(
  checklist: Record<string, boolean>,
  story: Record<string, string>,
  rubric: Record<string, boolean>,
) {
  window.localStorage.setItem(PREP_STORAGE, JSON.stringify({ v: 2, checklist, story, rubric }))
}

function contextFromUrl(): { context: Partial<SessionContext>; profileId: ProfileId | null } {
  return decodeContext(window.location.search.replace(/^\?/, ''))
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
  rubric: Record<string, boolean>
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
  toggleRubric: (id: string) => void
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

function writeContextParams(
  params: URLSearchParams,
  context: Partial<SessionContext> | undefined,
  profileId: ProfileId | null | undefined,
) {
  for (const key of [...params.keys()]) {
    if (key.startsWith('c.')) params.delete(key)
  }
  if (!context || !isSessionComplete(context)) return
  const encoded = new URLSearchParams(encodeContext(context, profileId ?? null))
  encoded.forEach((value, key) => params.set(key, value))
}

function syncUrl(state: {
  mode: AppMode
  step: SessionStep
  radioStep: RadioStep
  radioCaseId: RadioCaseId | null
  topicId: TopicId
  prepSection: PrepSection
  selectedTrickId?: string
  context?: Partial<SessionContext>
  selectedProfileId?: ProfileId | null
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
  } else if (state.mode === 'prep') {
    params.set('prep', state.prepSection)
    if (state.selectedTrickId) params.set('trick', state.selectedTrickId)
    params.delete('step')
    params.delete('radioStep')
    params.delete('case')
    params.delete('topic')
  } else {
    params.delete('step')
    params.delete('radioStep')
    params.delete('case')
    params.delete('topic')
    params.delete('prep')
    params.delete('trick')
  }
  writeContextParams(params, state.context, state.selectedProfileId)
  window.history.replaceState({}, '', url)
}

const persistedPrep = loadPrep()
const bootContext = contextFromUrl()

export const useSessionStore = create<SessionState>((set, get) => ({
  locale: localeFromStorage(),
  mode: modeFromUrl(),
  step: stepFromUrl(),
  radioStep: radioStepFromUrl(),
  radioCaseId: radioCaseFromUrl(),
  topicId: topicFromUrl(),
  prepSection: prepSectionFromUrl(),
  selectedTrickId: readSearch().get('trick') || 'best-arch',
  checklist: persistedPrep.checklist,
  story: persistedPrep.story,
  rubric: persistedPrep.rubric,
  context: bootContext.context,
  selectedProfileId: bootContext.profileId,
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
  setSelectedTrickId: (selectedTrickId) => {
    syncUrl({ ...get(), selectedTrickId })
    set({ selectedTrickId })
  },
  toggleChecklist: (id) => {
    const checklist = { ...get().checklist, [id]: !get().checklist[id] }
    savePrep(checklist, get().story, get().rubric)
    set({ checklist })
  },
  toggleRubric: (id) => {
    const rubric = { ...get().rubric, [id]: !get().rubric[id] }
    savePrep(get().checklist, get().story, rubric)
    set({ rubric })
  },
  setStoryField: (id, value) => {
    const story = { ...get().story, [id]: value }
    savePrep(get().checklist, story, get().rubric)
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
    const context = { ...get().context, [key]: value }
    const selectedProfileId = null
    syncUrl({ ...get(), context, selectedProfileId })
    set({ context, selectedProfileId })
  },
  setSelectedProfileId: (id) => {
    syncUrl({ ...get(), selectedProfileId: id })
    set({ selectedProfileId: id })
  },
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
  isContextComplete: () => isSessionComplete(get().context),
}))

export const STEP_ORDER = STEPS
export const RADIO_STEP_ORDER = RADIO_STEPS
export const PREP_SECTION_ORDER = ['story', 'traps', 'flags', 'ask', 'checklist'] as const
