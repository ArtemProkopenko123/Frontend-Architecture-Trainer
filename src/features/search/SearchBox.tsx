import { useMemo, useState } from 'react'
import type { AppMode, PrepSection, RadioCaseId, TopicId } from '../../content/types'
import { buildSearchIndex, filterSearchHits, type SearchHit } from '../../engine/search'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

const INDEX = buildSearchIndex()

function applyHit(hit: SearchHit) {
  const url = new URL(hit.href, 'https://trainer.local')
  const mode = url.searchParams.get('mode') as AppMode | null
  const store = useSessionStore.getState()
  if (!mode) return
  store.setMode(mode)
  const topic = url.searchParams.get('topic') as TopicId | null
  if (topic) store.setTopicId(topic)
  const radioCase = url.searchParams.get('case') as RadioCaseId | null
  if (radioCase) store.setRadioCase(radioCase)
  const prep = url.searchParams.get('prep') as PrepSection | null
  if (prep) store.setPrepSection(prep)
  const trick = url.searchParams.get('trick')
  if (trick) store.setSelectedTrickId(trick)
  const hash = url.hash.replace('#', '')
  if (hash) {
    window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 0)
  }
}

export function SearchBox() {
  const locale = useSessionStore((s) => s.locale)
  const [query, setQuery] = useState('')
  const hits = useMemo(() => filterSearchHits(INDEX, query, locale), [query, locale])

  return (
    <div className="search-box">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
        placeholder={t(ui.searchPlaceholder, locale)}
        aria-label={t(ui.searchPlaceholder, locale)}
      />
      {query.trim().length >= 2 ? (
        <ul className="search-hits">
          {hits.length === 0 ? <li className="note">{t(ui.searchEmpty, locale)}</li> : null}
          {hits.slice(0, 8).map((hit) => (
            <li key={hit.id}>
              <button
                type="button"
                onClick={() => {
                  applyHit(hit)
                  setQuery('')
                }}
              >
                {t(hit.title, locale)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
