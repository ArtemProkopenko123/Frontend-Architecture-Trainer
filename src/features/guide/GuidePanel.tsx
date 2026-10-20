import { GUIDE_DAYS, type GuideDay, type GuideLink } from '../../content/guide'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

function openGuideLink(link: GuideLink) {
  const store = useSessionStore.getState()
  store.setMode(link.mode)
  if (link.step) store.setStep(link.step)
  if (link.topicId) store.setTopicId(link.topicId)
  if (link.radioCaseId) store.setRadioCase(link.radioCaseId)
  if (link.prepSection) store.setPrepSection(link.prepSection)
}

function DayCard({ day }: { day: GuideDay }) {
  const locale = useSessionStore((s) => s.locale)
  return (
    <button type="button" className="option-card" onClick={() => openGuideLink(day.link)}>
      <span className="badge">
        {locale === 'ru' ? `День ${day.day}` : locale === 'pl' ? `Dzień ${day.day}` : `Day ${day.day}`}
      </span>
      <h3>{t(day.title, locale)}</h3>
      <p>{t(day.doneWhen, locale)}</p>
    </button>
  )
}

export function GuidePanel() {
  const locale = useSessionStore((s) => s.locale)
  return (
    <>
      <h2>{t(ui.modes.guide, locale)}</h2>
      <p>{t(ui.guideIntro, locale)}</p>
      <div className="card-list">
        {GUIDE_DAYS.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}
      </div>
    </>
  )
}

export function GuideAside() {
  const locale = useSessionStore((s) => s.locale)
  return (
    <>
      <h2>{t(ui.guideAsideTitle, locale)}</h2>
      <p>{t(ui.guideAside, locale)}</p>
    </>
  )
}
