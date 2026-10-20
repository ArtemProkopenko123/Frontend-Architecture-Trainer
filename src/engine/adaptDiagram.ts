import { edge, node, t } from '../content/diagram'
import type { DiagramSpec, SessionContext } from '../content/types'

export function adaptDiagram(base: DiagramSpec, context: SessionContext): DiagramSpec {
  const nodes = [...base.nodes]
  const edges = [...base.edges]
  const ids = new Set(nodes.map((item) => item.id))

  if (context.liveUpdates === 'needed' && !ids.has('live')) {
    nodes.push(
      node(
        'live',
        'realtime',
        t('SSE / WebSocket', 'SSE / WebSocket'),
        t(
          'Сервер пушит события в кэш Query, UI не держит второй источник правды.',
          'The server pushes events into the Query cache; the UI does not keep a second source of truth.', 'Serwer pushuje zdarzenia do cache Query; UI nie trzyma drugiego źródła prawdy.',
        ),
        t('Polling, если обновления редкие и протокол не стоит сложности.', 'Polling if updates are rare and the protocol is not worth the complexity.', 'Polling, jeśli aktualizacje są rzadkie i protokół nie wart złożoności.'),
        t('Как восстанавливаете пропущенные события после реконнекта?', 'How do you recover missed events after a reconnect?', 'Jak odzyskujecie pominięte zdarzenia po reconnect?'),
      ),
    )
    const queryId = nodes.find((item) => item.kind === 'query')?.id
    if (queryId) edges.push(edge('live', queryId, t('setQueryData', 'setQueryData')))
    ids.add('live')
  }

  if (context.offline === 'needed' && !ids.has('offline')) {
    nodes.push(
      node(
        'offline',
        'store',
        t('IndexedDB очередь', 'IndexedDB queue', 'Kolejka IndexedDB'),
        t(
          'Действия без сети копятся локально и доигрываются с идемпотентным clientId.',
          'Actions without a network queue locally and replay with an idempotent clientId.', 'Akcje bez sieci zbierają się lokalnie i odtwarzają z idempotentnym clientId.',
        ),
        t('Если офлайн не нужен — не заводите вторую базу в браузере.', 'If offline is not required, do not add a second browser database.', 'Jeśli offline nie jest potrzebny — nie zakładaj drugiej bazy w przeglądarce.'),
        t('Что происходит с очередью при конфликте версий после реконнекта?', 'What happens to the queue on version conflict after reconnect?', 'Co dzieje się z kolejką przy konflikcie wersji po reconnect?'),
      ),
    )
    const appId = nodes.find((item) => item.kind === 'app' || item.kind === 'ui')?.id
    if (appId) edges.push(edge(appId, 'offline', t('очередь', 'queue', 'kolejka')))
  }

  return { nodes, edges }
}
