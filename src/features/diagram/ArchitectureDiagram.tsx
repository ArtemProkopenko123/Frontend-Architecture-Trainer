import { useShallow } from 'zustand/react/shallow'
import { getProfile } from '../../content/profiles'
import { getRadioCase } from '../../content/radio'
import { getTopic } from '../../content/topics'
import type { SessionContext } from '../../content/types'
import { adaptDiagram } from '../../engine/adaptDiagram'
import { recommend } from '../../engine/recommend'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'
import { SystemDiagram } from './SystemDiagram'

export function ArchitectureDiagram() {
  const { locale, mode, step, context, selectedProfileId, radioCaseId, topicId } = useSessionStore(
    useShallow((s) => ({
      locale: s.locale,
      mode: s.mode,
      step: s.step,
      context: s.context,
      selectedProfileId: s.selectedProfileId,
      radioCaseId: s.radioCaseId,
      topicId: s.topicId,
    })),
  )
  const contextComplete = useSessionStore((s) => s.isContextComplete())

  if (mode === 'radio') {
    const diagram = radioCaseId ? getRadioCase(radioCaseId).diagram : null
    return (
      <SystemDiagram
        locale={locale}
        diagram={diagram}
        canvasKey={`radio-${radioCaseId ?? 'none'}-${locale}`}
        empty={t(ui.radioDiagramEmpty, locale)}
      />
    )
  }

  if (mode === 'topics') {
    const topic = getTopic(topicId)
    return (
      <SystemDiagram
        locale={locale}
        diagram={topic.diagram ?? null}
        canvasKey={`topic-${topicId}-${locale}`}
        empty={t(ui.topicDiagramEmpty, locale)}
      />
    )
  }

  const showGraph = contextComplete && step !== 'start'
  const session = showGraph ? (context as SessionContext) : null
  const profile = session
    ? getProfile(selectedProfileId ?? recommend(session).recommendedId)
    : null
  const diagram =
    profile && session
      ? adaptDiagram(profile.diagram, session)
      : null

  return (
    <SystemDiagram
      locale={locale}
      diagram={diagram}
      canvasKey={`pipe-${profile?.id ?? 'none'}-${session?.liveUpdates}-${session?.offline}-${locale}`}
      empty={t(ui.diagramEmpty, locale)}
    />
  )
}
