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
        t(
          'После реконнекта запрашиваю события с последнего cursor или timestamp и вливаю их в Query через setQueryData; полный рефетч — только если курсор потерян. UI не хранит второй источник правды. Цена — идемпотентный обработчик и короткий разрыв, пока догоняем пропуски.',
          'After a reconnect I fetch events since the last cursor or timestamp and fold them into Query with setQueryData; a full refetch only if the cursor is lost. The UI does not keep a second source of truth. The cost is an idempotent handler and a short gap while we catch up.',
          'Po reconnect pobieram zdarzenia od ostatniego cursora albo timestamp i wlewam je do Query przez setQueryData; pełny refetch tylko, gdy kursor zginął. UI nie trzyma drugiego źródła prawdy. Koszt to idempotentny handler i krótka luka, zanim dogonimy pominięte zdarzenia.',
        ),
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
        t(
          'При конфликте версий очередь не перезаписывает сервер молча: конфликтные мутации помечаются, UI просит выбрать, а успехи с тем же clientId пропускаются как уже применённые. Идемпотентный clientId защищает от двойной отправки. Цена — экран разрешения конфликтов и ручная работа пользователя.',
          'On a version conflict the queue does not silently overwrite the server: conflicting mutations are flagged, the UI asks the user to choose, and successes with the same clientId are skipped as already applied. The idempotent clientId prevents a double submit. The cost is a conflict-resolution screen and manual user work.',
          'Przy konflikcie wersji kolejka nie nadpisuje serwera po cichu: konfliktowe mutacje są oznaczane, UI prosi o wybór, a sukcesy z tym samym clientId pomijamy jako już zastosowane. Idempotentny clientId chroni przed podwójnym wysłaniem. Koszt to ekran rozwiązywania konfliktów i ręczna praca użytkownika.',
        ),
      ),
    )
    const appId = nodes.find((item) => item.kind === 'app' || item.kind === 'ui')?.id
    if (appId) edges.push(edge(appId, 'offline', t('очередь', 'queue', 'kolejka')))
  }

  return { nodes, edges }
}
