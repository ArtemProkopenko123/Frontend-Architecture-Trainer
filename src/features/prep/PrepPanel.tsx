import {
  ASK_INTERVIEWER,
  CHECKLIST,
  RED_FLAGS,
  STAR_HINT,
  STORY_PROMPTS,
  TRAPS_INTRO,
  TRICK_QUESTIONS,
} from '../../content/prep'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

export function PrepPanel() {
  const locale = useSessionStore((s) => s.locale)
  const section = useSessionStore((s) => s.prepSection)
  const checklist = useSessionStore((s) => s.checklist)
  const story = useSessionStore((s) => s.story)
  const toggleChecklist = useSessionStore((s) => s.toggleChecklist)
  const setStoryField = useSessionStore((s) => s.setStoryField)
  const selectedTrickId = useSessionStore((s) => s.selectedTrickId)
  const setSelectedTrickId = useSessionStore((s) => s.setSelectedTrickId)

  if (section === 'story') {
    return (
      <>
        <h2>{t(ui.prepSections.story, locale)}</h2>
        <p>{t(ui.prepStoryIntro, locale)}</p>
        <p className="note">{t(STAR_HINT, locale)}</p>
        {STORY_PROMPTS.map((prompt) => (
          <label key={prompt.id} className="story-field">
            <strong>{t(prompt.title, locale)}</strong>
            <span className="note">{t(prompt.hint, locale)}</span>
            <textarea
              value={story[prompt.id] ?? ''}
              onChange={(event) => setStoryField(prompt.id, event.target.value)}
              rows={4}
            />
          </label>
        ))}
      </>
    )
  }

  if (section === 'traps') {
    return (
      <>
        <h2>{t(ui.prepSections.traps, locale)}</h2>
        <p>{t(TRAPS_INTRO, locale)}</p>
        <div className="card-list">
          {TRICK_QUESTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selectedTrickId ? 'option-card selected' : 'option-card'}
              onClick={() => setSelectedTrickId(item.id)}
            >
              <h3>{t(item.question, locale)}</h3>
            </button>
          ))}
        </div>
      </>
    )
  }

  if (section === 'flags') {
    return (
      <>
        <h2>{t(ui.prepRedFlagTitle, locale)}</h2>
        <ul>
          {RED_FLAGS.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ul>
      </>
    )
  }

  if (section === 'ask') {
    return (
      <>
        <h2>{t(ui.prepSections.ask, locale)}</h2>
        <p>{t(ui.prepAskIntro, locale)}</p>
        <ul>
          {ASK_INTERVIEWER.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ul>
      </>
    )
  }

  const done = CHECKLIST.filter((item) => checklist[item.id]).length

  return (
    <>
      <h2>{t(ui.prepSections.checklist, locale)}</h2>
      <p className="note">
        {done}/{CHECKLIST.length} {t(ui.prepProgress, locale)}
      </p>
      <ul className="checklist">
        {CHECKLIST.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(checklist[item.id])}
                onChange={() => toggleChecklist(item.id)}
              />
              {t(item.label, locale)}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export function PrepAside() {
  const locale = useSessionStore((s) => s.locale)
  const section = useSessionStore((s) => s.prepSection)
  const checklist = useSessionStore((s) => s.checklist)
  const selectedTrickId = useSessionStore((s) => s.selectedTrickId)
  const trick = TRICK_QUESTIONS.find((item) => item.id === selectedTrickId) ?? TRICK_QUESTIONS[0]
  const copy =
    section === 'story'
      ? ui.prepAsideStory
      : section === 'traps'
        ? ui.prepAsideTraps
        : section === 'flags'
          ? ui.prepAsideFlags
          : section === 'ask'
            ? ui.prepAsideAsk
            : ui.prepAsideChecklist
  const done = CHECKLIST.filter((item) => checklist[item.id]).length

  return (
    <section>
      <h2>{t(ui.prepSections[section], locale)}</h2>
      <p className="note">{t(copy, locale)}</p>
      {section === 'traps' && trick ? <div className="script">{t(trick.answer, locale)}</div> : null}
      {section === 'checklist' ? (
        <p className="script">
          {done}/{CHECKLIST.length}
        </p>
      ) : null}
    </section>
  )
}
