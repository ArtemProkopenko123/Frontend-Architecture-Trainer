export type Locale = 'ru' | 'en' | 'pl'

export const LOCALES: Locale[] = ['ru', 'en', 'pl']

export type Localized = {
  ru: string
  en: string
  pl: string
}

export type TeamSize = '1-3' | '4-10' | '11+'
export type TeamsCount = '1' | '2-3' | '4+'
export type ProductType = 'admin' | 'public_content' | 'marketplace' | 'b2b_app'
export type SeoNeed = 'none' | 'critical'
export type DataFreshness = 'static' | 'infrequent' | 'realtime'
export type IndependentReleases = 'yes' | 'no'
export type LiveUpdates = 'none' | 'needed'
export type OfflineNeed = 'none' | 'needed'
export type A11yLevel = 'standard' | 'strict'
export type I18nNeed = 'single' | 'multi'
export type NetworkProfile = 'good' | 'mobile_slow'
export type DeadlinePressure = 'speed' | 'balanced' | 'longevity'

export type SessionContext = {
  teamSize: TeamSize
  teamsCount: TeamsCount
  product: ProductType
  seo: SeoNeed
  dataFreshness: DataFreshness
  independentReleases: IndependentReleases
  liveUpdates: LiveUpdates
  offline: OfflineNeed
  a11y: A11yLevel
  i18n: I18nNeed
  network: NetworkProfile
  deadline: DeadlinePressure
}

export type ContextKey = keyof SessionContext

export type AppMode = 'pipeline' | 'radio' | 'topics' | 'prep' | 'guide'

export type PrepSection = 'story' | 'traps' | 'flags' | 'ask' | 'checklist'

export type SessionStep =
  | 'start'
  | 'context'
  | 'options'
  | 'choice'
  | 'tradeoffs'
  | 'evolution'
  | 'rehearse'

export type RadioStep =
  | 'pick'
  | 'requirements'
  | 'architecture'
  | 'data'
  | 'interface'
  | 'optimizations'

export type RadioCaseId = 'feed' | 'autocomplete' | 'chat' | 'dashboard' | 'shop' | 'kanban'

export type TopicId =
  | 'architecture'
  | 'structure'
  | 'state'
  | 'rendering'
  | 'api'
  | 'scale'
  | 'perf'
  | 'reliability'
  | 'security'
  | 'a11y'
  | 'offline'
  | 'i18n'
  | 'leadership'

export type ProfileId = 'csr_spa' | 'ssg_isr' | 'ssr_app' | 'mfe'

export type DiagramNodeKind =
  | 'browser'
  | 'cdn'
  | 'app'
  | 'bff'
  | 'api'
  | 'ci'
  | 'query'
  | 'mfe'
  | 'ui'
  | 'realtime'
  | 'store'

export type DiagramNodeSpec = {
  id: string
  kind: DiagramNodeKind
  label: Localized
  why: Localized
  alternative: Localized
  followUp: Localized
}

export type DiagramEdgeSpec = {
  source: string
  target: string
  label?: Localized
}

export type DiagramSpec = {
  nodes: DiagramNodeSpec[]
  edges: DiagramEdgeSpec[]
}

export type ArchitectureProfile = {
  id: ProfileId
  title: Localized
  summary: Localized
  rendering: Localized
  structure: Localized
  repo: Localized
  state: Localized
  why: Localized
  tradeoffs: Localized[]
  evolution: Localized[]
  diagram: DiagramSpec
}

export type RecommendResult = {
  recommendedId: ProfileId
  optionIds: ProfileId[]
  notes: Localized[]
}

export type QuestionGroup = 'org' | 'product' | 'experience'

export type ContextQuestion = {
  key: ContextKey
  group: QuestionGroup
  prompt: Localized
  options: { value: SessionContext[ContextKey]; label: Localized }[]
}

export type RadioCase = {
  id: RadioCaseId
  title: Localized
  summary: Localized
  timeHint: Localized
  opening: Localized
  requirements: Localized[]
  architecture: Localized[]
  data: Localized[]
  api: Localized[]
  optimizations: Localized[]
  diagram: DiagramSpec
}

export type SpotlightTask = {
  title: Localized
  themes: Localized
}

export type TopicRow = {
  label: Localized
  body: Localized
}

export type AnswerCard = {
  id: string
  title: Localized
  checks: Localized
  structure: Localized[]
  sample: Localized
}

export type Topic = {
  id: TopicId
  title: Localized
  thesis: Localized
  checks: Localized
  structure: Localized[]
  sample: Localized
  rows: TopicRow[]
  followUps: Localized[]
  cards: AnswerCard[]
  redFlag?: Localized
  diagram?: DiagramSpec
}

export type StoryPrompt = {
  id: string
  title: Localized
  hint: Localized
}

export type TrickQuestion = {
  id: string
  question: Localized
  answer: Localized
}

export type ChecklistItem = {
  id: string
  label: Localized
}
