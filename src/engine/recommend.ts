import type { ProfileId, RecommendResult, SessionContext } from '../content/types'

function pickRecommended(context: SessionContext): ProfileId {
  if (context.seo === 'critical') {
    return context.dataFreshness === 'realtime' ? 'ssr_app' : 'ssg_isr'
  }
  return 'csr_spa'
}

function contrastOf(id: ProfileId): ProfileId {
  return id === 'csr_spa' ? 'ssr_app' : 'csr_spa'
}

function shouldOfferMfe(context: SessionContext): boolean {
  return context.teamsCount === '4+' && context.independentReleases === 'yes'
}

export function recommend(context: SessionContext): RecommendResult {
  const recommendedId = pickRecommended(context)
  const optionIds: ProfileId[] = [recommendedId]
  const contrast = contrastOf(recommendedId)
  if (!optionIds.includes(contrast)) optionIds.push(contrast)
  if (shouldOfferMfe(context) && !optionIds.includes('mfe')) optionIds.push('mfe')
  return { recommendedId, optionIds }
}
