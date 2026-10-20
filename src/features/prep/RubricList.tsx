import { RUBRIC } from '../../content/rubric'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

export function RubricList() {
  const locale = useSessionStore((s) => s.locale)
  const rubric = useSessionStore((s) => s.rubric)
  const toggleRubric = useSessionStore((s) => s.toggleRubric)
  return (
    <div className="checks">
      <strong>{t(ui.rubricTitle, locale)}</strong>
      <ul className="rubric-list">
        {RUBRIC.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(rubric[item.id])}
                onChange={() => toggleRubric(item.id)}
              />{' '}
              {t(item.label, locale)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
