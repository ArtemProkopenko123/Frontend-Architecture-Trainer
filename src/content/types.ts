export type Locale = 'ru' | 'en'

export type Localized = {
  ru: string
  en: string
}

export type TeamSize = '1-3' | '4-10' | '11+'
export type TeamsCount = '1' | '2-3' | '4+'
export type ProductType = 'admin' | 'public_content' | 'marketplace' | 'b2b_app'
export type SeoNeed = 'none' | 'critical'
export type DataFreshness = 'static' | 'infrequent' | 'realtime'
export type IndependentReleases = 'yes' | 'no'

export type SessionContext = {
  teamSize: TeamSize
  teamsCount: TeamsCount
  product: ProductType
  seo: SeoNeed
  dataFreshness: DataFreshness
  independentReleases: IndependentReleases
}

export type ContextKey = keyof SessionContext

export type AppMode = 'pipeline' | 'radio' | 'topics' | 'prep'

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

export type RadioCaseId = 'feed' | 'autocomplete' | 'chat' | 'dashboard'

export type TopicId =
  | 'structure'
  | 'state'
  | 'rendering'
  | 'api'
  | 'scale'
  | 'perf'
  | 'reliability'
  | 'security'
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
}

export type ContextQuestion = {
  key: ContextKey
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

export type Topic = {
  id: TopicId
  title: Localized
  thesis: Localized
  rows: TopicRow[]
  followUps: Localized[]
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
