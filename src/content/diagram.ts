import type { DiagramEdgeSpec, DiagramNodeKind, DiagramNodeSpec, Localized } from './types'

export const t = (ru: string, en: string, pl: string = en): Localized => ({ ru, en, pl })

export function node(
  id: string,
  kind: DiagramNodeKind,
  label: Localized,
  why: Localized,
  alternative: Localized,
  followUp: Localized,
): DiagramNodeSpec {
  return { id, kind, label, why, alternative, followUp }
}

export function edge(source: string, target: string, label?: Localized): DiagramEdgeSpec {
  return label ? { source, target, label } : { source, target }
}
