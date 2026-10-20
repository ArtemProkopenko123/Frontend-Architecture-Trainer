import { CONTEXT_QUESTIONS, isSessionComplete } from '../content/questions'
import type { ProfileId, SessionContext } from '../content/types'

const PROFILE_IDS = new Set<ProfileId>(['csr_spa', 'ssg_isr', 'ssr_app', 'mfe'])
const CONTEXT_KEYS = CONTEXT_QUESTIONS.map((question) => question.key)
const ALLOWED: Record<string, Set<string>> = Object.fromEntries(
  CONTEXT_QUESTIONS.map((question) => [
    question.key,
    new Set(question.options.map((option) => String(option.value))),
  ]),
)

export function encodeContext(
  ctx: Partial<SessionContext>,
  profileId?: ProfileId | null,
): string {
  const params = new URLSearchParams()
  for (const key of CONTEXT_KEYS) {
    const value = ctx[key]
    if (value === undefined || !ALLOWED[key]?.has(String(value))) continue
    params.set(`c.${key}`, String(value))
  }
  if (profileId && isSessionComplete(ctx)) params.set('c.profile', profileId)
  return params.toString()
}

export function decodeContext(raw: string): {
  context: Partial<SessionContext>
  profileId: ProfileId | null
} {
  const context: Partial<SessionContext> = {}
  let profileId: ProfileId | null = null
  try {
    const trimmed = raw.trim()
    const query = trimmed.startsWith('?') ? trimmed.slice(1) : trimmed
    const params = new URLSearchParams(query)
    for (const key of CONTEXT_KEYS) {
      const value = params.get(`c.${key}`)
      if (!value) continue
      if (!ALLOWED[key]?.has(value)) continue
      context[key] = value as never
    }
    const profile = params.get('c.profile')
    if (profile && PROFILE_IDS.has(profile as ProfileId) && isSessionComplete(context)) {
      profileId = profile as ProfileId
    }
  } catch {
    return { context: {}, profileId: null }
  }
  return { context, profileId }
}
