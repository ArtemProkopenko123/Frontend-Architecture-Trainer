import {
  getRadioCase,
  RADIO_CASES,
  RADIO_MISTAKES,
  RADIO_OPENING,
  SPOTLIGHT_TASKS,
} from '../../content/radio'
import type { Locale, Localized, RadioCase, RadioCaseId, RadioStep } from '../../content/types'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'
import { RubricList } from '../prep/RubricList'
import { VoiceRecorder } from './VoiceRecorder'

const CASE_IDS = Object.keys(RADIO_CASES) as RadioCaseId[]

function bullets(items: Localized[], locale: Locale) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.ru}>{t(item, locale)}</li>
      ))}
    </ul>
  )
}

function sectionBody(radioStep: RadioStep, radioCase: RadioCase, locale: Locale) {
  if (radioStep === 'requirements') return bullets(radioCase.requirements, locale)
  if (radioStep === 'architecture') return bullets(radioCase.architecture, locale)
  if (radioStep === 'data') return bullets(radioCase.data, locale)
  if (radioStep === 'interface') return bullets(radioCase.api, locale)
  return bullets(radioCase.optimizations, locale)
}

export function RadioWizard() {
  const locale = useSessionStore((s) => s.locale)
  const radioStep = useSessionStore((s) => s.radioStep)
  const radioCaseId = useSessionStore((s) => s.radioCaseId)
  const setRadioCase = useSessionStore((s) => s.setRadioCase)
  const goNext = useSessionStore((s) => s.goNext)
  const goBack = useSessionStore((s) => s.goBack)
  const reset = useSessionStore((s) => s.reset)
  const radioCase = radioCaseId ? getRadioCase(radioCaseId) : null

  if (radioStep === 'pick' || !radioCase) {
    return (
      <>
        <h2>{t(ui.radioPickTitle, locale)}</h2>
        <p className="note">{t(ui.radioTiming, locale)}</p>
        <div className="script">{t(RADIO_OPENING, locale)}</div>
        <div className="card-list" style={{ marginTop: 16 }}>
          {CASE_IDS.map((id) => {
            const item = RADIO_CASES[id]
            return (
              <button
                key={id}
                type="button"
                className={radioCaseId === id ? 'option-card selected' : 'option-card'}
                onClick={() => setRadioCase(id)}
              >
                <span className="badge">{t(ui.radioChoose, locale)}</span>
                <h3>{t(item.title, locale)}</h3>
                <p>{t(item.summary, locale)}</p>
              </button>
            )
          })}
        </div>
        <h3>{t(ui.radioSpotlight, locale)}</h3>
        <ul>
          {SPOTLIGHT_TASKS.map((task) => (
            <li key={task.title.ru}>
              <strong>{t(task.title, locale)}</strong>
              {' — '}
              {t(task.themes, locale)}
            </li>
          ))}
        </ul>
        <div className="checks">
          <strong>{t(ui.radioMistakes, locale)}</strong>
          {bullets(RADIO_MISTAKES, locale)}
        </div>
        <VoiceRecorder />
      </>
    )
  }

  const isLast = radioStep === 'optimizations'

  return (
    <>
      <p className="badge">{t(radioCase.title, locale)}</p>
      <h2>{t(ui.radioSteps[radioStep], locale)}</h2>
      <p className="note">{t(radioCase.timeHint, locale)}</p>
      {radioStep === 'requirements' ? (
        <div className="script">{t(radioCase.opening, locale)}</div>
      ) : null}
      {sectionBody(radioStep, radioCase, locale)}
      {isLast ? <RubricList /> : null}
      <div className="nav-row">
        <button type="button" className="secondary" onClick={goBack}>
          {t(ui.back, locale)}
        </button>
        {isLast ? (
          <button type="button" className="primary" onClick={reset}>
            {t(ui.restart, locale)}
          </button>
        ) : (
          <button type="button" className="primary" onClick={goNext}>
            {t(ui.next, locale)}
          </button>
        )}
      </div>
      <VoiceRecorder />
    </>
  )
}
