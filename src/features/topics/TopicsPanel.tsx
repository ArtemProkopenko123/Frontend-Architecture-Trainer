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
      <div className="checks">
        <strong>{t(ui.interviewerChecks, locale)}</strong>
        <p>{t(topic.checks, locale)}</p>
      </div>
      <section className="question">
        <h3>{t(ui.topicStructure, locale)}</h3>
        <ol>
          {topic.structure.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ol>
      </section>
      <section className="question">
        <h3>{t(ui.topicSample, locale)}</h3>
        <div className="script">{t(topic.sample, locale)}</div>
      </section>
      {topic.rows.map((row) => (
        <section key={row.label.ru} className="question">
          <h3>{t(row.label, locale)}</h3>
          <p>{t(row.body, locale)}</p>
        </section>
      ))}
      {topic.cards.length > 0 ? (
        <>
          <h3 className="group-title">{t(ui.topicRelated, locale)}</h3>
          {topic.cards.map((card) => (
            <section key={card.id} id={card.id} className="question">
              <h3>{t(card.title, locale)}</h3>
              <p>
                <strong>{t(ui.interviewerChecks, locale)}. </strong>
                {t(card.checks, locale)}
              </p>
              <ol>
                {card.structure.map((item) => (
                  <li key={item.ru}>{t(item, locale)}</li>
                ))}
              </ol>
              <div className="script">{t(card.sample, locale)}</div>
            </section>
          ))}
        </>
      ) : null}
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
