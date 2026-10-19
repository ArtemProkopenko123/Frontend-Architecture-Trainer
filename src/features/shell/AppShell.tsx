import type { AppMode } from '../../content/types'
import { t, ui } from '../../i18n/ui'
import {
  PREP_SECTION_ORDER,
  RADIO_STEP_ORDER,
  STEP_ORDER,
  useSessionStore,
} from '../../store/sessionStore'
import { ArchitectureDiagram } from '../diagram/ArchitectureDiagram'
import { PrepAside, PrepPanel } from '../prep/PrepPanel'
import { RoundTimer } from '../radio/RoundTimer'
import { RadioWizard } from '../radio/RadioWizard'
import { TopicsPanel } from '../topics/TopicsPanel'
import { Wizard } from '../wizard/Wizard'

const MODES: AppMode[] = ['pipeline', 'radio', 'topics', 'prep']

function subtitle(mode: AppMode) {
  if (mode === 'radio') return ui.radioSubtitle
  if (mode === 'topics') return ui.topicsSubtitle
  if (mode === 'prep') return ui.prepSubtitle
  return ui.appSubtitle
}

export function AppShell() {
  const locale = useSessionStore((s) => s.locale)
  const mode = useSessionStore((s) => s.mode)
  const step = useSessionStore((s) => s.step)
  const radioStep = useSessionStore((s) => s.radioStep)
  const radioCaseId = useSessionStore((s) => s.radioCaseId)
  const setLocale = useSessionStore((s) => s.setLocale)
  const setMode = useSessionStore((s) => s.setMode)
  const setStep = useSessionStore((s) => s.setStep)
  const setRadioStep = useSessionStore((s) => s.setRadioStep)
  const prepSection = useSessionStore((s) => s.prepSection)
  const setPrepSection = useSessionStore((s) => s.setPrepSection)
  const contextComplete = useSessionStore((s) => s.isContextComplete())

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>{t(ui.appTitle, locale)}</h1>
          <p>{t(subtitle(mode), locale)}</p>
        </div>
        <div className="topbar-actions">
          <div className="locale-toggle" role="group" aria-label="Mode">
            {MODES.map((item) => (
              <button
                key={item}
                type="button"
                className={mode === item ? 'active' : ''}
                onClick={() => setMode(item)}
              >
                {t(ui.modes[item], locale)}
              </button>
            ))}
          </div>
          <div className="locale-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={locale === 'ru' ? 'active' : ''}
              onClick={() => setLocale('ru')}
            >
              {ui.langRu.ru}
            </button>
            <button
              type="button"
              className={locale === 'en' ? 'active' : ''}
              onClick={() => setLocale('en')}
            >
              {ui.langEn.en}
            </button>
          </div>
        </div>
      </header>
      {mode === 'pipeline' ? (
        <nav className="stepper" aria-label="Pipeline">
          {STEP_ORDER.map((item) => {
            const currentIndex = STEP_ORDER.indexOf(step)
            const itemIndex = STEP_ORDER.indexOf(item)
            const blocked = itemIndex >= 2 && !contextComplete
            return (
              <button
                key={item}
                type="button"
                className={item === step ? 'current' : itemIndex < currentIndex ? 'done' : ''}
                disabled={blocked}
                onClick={() => {
                  if (!blocked) setStep(item)
                }}
              >
                {t(ui.steps[item], locale)}
              </button>
            )
          })}
        </nav>
      ) : null}
      {mode === 'radio' ? (
        <nav className="stepper radio-stepper" aria-label="RADIO">
          {RADIO_STEP_ORDER.map((item) => {
            const currentIndex = RADIO_STEP_ORDER.indexOf(radioStep)
            const itemIndex = RADIO_STEP_ORDER.indexOf(item)
            const blocked = item !== 'pick' && !radioCaseId
            return (
              <button
                key={item}
                type="button"
                className={item === radioStep ? 'current' : itemIndex < currentIndex ? 'done' : ''}
                disabled={blocked}
                onClick={() => {
                  if (!blocked) setRadioStep(item)
                }}
              >
                {t(ui.radioSteps[item], locale)}
              </button>
            )
          })}
        </nav>
      ) : null}
      {mode === 'radio' ? <RoundTimer /> : null}
      {mode === 'prep' ? (
        <nav className="stepper radio-stepper prep-stepper" aria-label="Prep">
          {PREP_SECTION_ORDER.map((item) => (
            <button
              key={item}
              type="button"
              className={item === prepSection ? 'current' : ''}
              onClick={() => setPrepSection(item)}
            >
              {t(ui.prepSections[item], locale)}
            </button>
          ))}
        </nav>
      ) : null}
      <main className="workspace">
        <section className="wizard-pane">
          {mode === 'pipeline' ? <Wizard /> : null}
          {mode === 'radio' ? <RadioWizard /> : null}
          {mode === 'topics' ? <TopicsPanel /> : null}
          {mode === 'prep' ? <PrepPanel /> : null}
        </section>
        <section className="diagram-pane">
          {mode === 'prep' ? <PrepAside /> : <ArchitectureDiagram />}
        </section>
      </main>
    </div>
  )
}
