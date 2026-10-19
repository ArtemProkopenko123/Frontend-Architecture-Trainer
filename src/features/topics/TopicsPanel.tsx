import { getTopic, TOPIC_ORDER, TOPICS } from '../../content/topics'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

export function TopicsPanel() {
  const locale = useSessionStore((s) => s.locale)
  const topicId = useSessionStore((s) => s.topicId)
  const setTopicId = useSessionStore((s) => s.setTopicId)
  const topic = getTopic(topicId)

  return (
    <>
      <div className="choices" style={{ marginBottom: 20 }}>
        {TOPIC_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className={id === topicId ? 'selected' : ''}
            onClick={() => setTopicId(id)}
          >
            {t(TOPICS[id].title, locale)}
          </button>
        ))}
      </div>
      <h2>{t(topic.title, locale)}</h2>
      <p>{t(topic.thesis, locale)}</p>
      {topic.rows.map((row) => (
        <section key={row.label.ru} className="question">
          <h3>{t(row.label, locale)}</h3>
          <p>{t(row.body, locale)}</p>
        </section>
      ))}
      <div className="checks">
        <strong>{t(ui.interviewerChecks, locale)}</strong>
        <ul>
          {topic.followUps.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ul>
      </div>
      {topic.redFlag ? <p className="warn">{t(topic.redFlag, locale)}</p> : null}
    </>
  )
}
