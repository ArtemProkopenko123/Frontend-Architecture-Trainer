import { useEffect } from 'react'
import { CONTEXT_QUESTIONS } from '../../content/questions'
import { getProfile } from '../../content/profiles'
import type {
  ArchitectureProfile,
  ContextKey,
  ContextQuestion,
  Locale,
  ProfileId,
  SessionContext,
} from '../../content/types'
import { buildAnswerScript } from '../../engine/answerScript'
import { recommend } from '../../engine/recommend'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'
import { VoiceRecorder } from '../radio/VoiceRecorder'

const PROFILE_FIELDS = ['why', 'rendering', 'structure', 'repo', 'state'] as const

const FIELD_LABELS: Record<(typeof PROFILE_FIELDS)[number], { ru: string; en: string }> = {
  why: { ru: 'Почему', en: 'Why' },
  rendering: { ru: 'Рендеринг', en: 'Rendering' },
  structure: { ru: 'Структура', en: 'Structure' },
  repo: { ru: 'Репозиторий', en: 'Repository' },
  state: { ru: 'Состояние', en: 'State' },
}

function completeContext(partial: Partial<SessionContext>): SessionContext | null {
  const { teamSize, teamsCount, product, seo, dataFreshness, independentReleases } = partial
  if (!teamSize || !teamsCount || !product || !seo || !dataFreshness || !independentReleases) {
    return null
  }
  return { teamSize, teamsCount, product, seo, dataFreshness, independentReleases }
}

function pickContextValue(
  setContextField: <K extends keyof SessionContext>(key: K, value: SessionContext[K]) => void,
  question: ContextQuestion,
  value: SessionContext[ContextKey],
) {
  switch (question.key) {
    case 'teamSize':
      setContextField(question.key, value as SessionContext['teamSize'])
      return
    case 'teamsCount':
      setContextField(question.key, value as SessionContext['teamsCount'])
      return
    case 'product':
      setContextField(question.key, value as SessionContext['product'])
      return
    case 'seo':
      setContextField(question.key, value as SessionContext['seo'])
      return
    case 'dataFreshness':
      setContextField(question.key, value as SessionContext['dataFreshness'])
      return
    case 'independentReleases':
      setContextField(question.key, value as SessionContext['independentReleases'])
      return
  }
}

function ProfileCards({
  locale,
  optionIds,
  recommendedId,
  selectedProfileId,
  showYourChoice,
  onSelect,
}: {
  locale: Locale
  optionIds: ProfileId[]
  recommendedId: ProfileId
  selectedProfileId: ProfileId | null
  showYourChoice?: boolean
  onSelect: (id: ProfileId) => void
}) {
  return (
    <div className="card-list">
      {optionIds.map((id) => {
        const profile = getProfile(id)
        const selected = selectedProfileId === id
        return (
          <button
            key={id}
            type="button"
            className={selected ? 'option-card selected' : 'option-card'}
            onClick={() => onSelect(id)}
          >
            {id === recommendedId ? <span className="badge">{t(ui.recommended, locale)}</span> : null}
            {showYourChoice && selected ? (
              <span className="badge">{t(ui.yourChoice, locale)}</span>
            ) : null}
            <h3>{t(profile.title, locale)}</h3>
            <p>{t(profile.summary, locale)}</p>
          </button>
        )
      })}
    </div>
  )
}

function ProfileDetails({ profile, locale }: { profile: ArchitectureProfile; locale: Locale }) {
  return (
    <div>
      {PROFILE_FIELDS.map((field) => (
        <section key={field} className="question">
          <h3>{t(FIELD_LABELS[field], locale)}</h3>
          <p>{t(profile[field], locale)}</p>
        </section>
      ))}
    </div>
  )
}

function Nav({
  locale,
  showBack,
  showNext,
  nextDisabled,
  onBack,
  onNext,
}: {
  locale: Locale
  showBack?: boolean
  showNext?: boolean
  nextDisabled?: boolean
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="nav-row">
      {showBack ? (
        <button type="button" className="secondary" onClick={onBack}>
          {t(ui.back, locale)}
        </button>
      ) : null}
      {showNext ? (
        <button type="button" className="primary" disabled={nextDisabled} onClick={onNext}>
          {t(ui.next, locale)}
        </button>
      ) : null}
    </div>
  )
}

export function Wizard() {
  const locale = useSessionStore((s) => s.locale)
  const step = useSessionStore((s) => s.step)
  const context = useSessionStore((s) => s.context)
  const selectedProfileId = useSessionStore((s) => s.selectedProfileId)
  const showAltScript = useSessionStore((s) => s.showAltScript)
  const goNext = useSessionStore((s) => s.goNext)
  const goBack = useSessionStore((s) => s.goBack)
  const setContextField = useSessionStore((s) => s.setContextField)
  const setSelectedProfileId = useSessionStore((s) => s.setSelectedProfileId)
  const toggleAltScript = useSessionStore((s) => s.toggleAltScript)
  const reset = useSessionStore((s) => s.reset)

  const session = completeContext(context)
  const recommendation = session ? recommend(session) : null
  const recommendedId = recommendation?.recommendedId

  useEffect(() => {
    if ((step !== 'options' && step !== 'choice') || recommendedId === undefined) return
    if (selectedProfileId !== null) return
    setSelectedProfileId(recommendedId)
  }, [step, recommendedId, selectedProfileId, setSelectedProfileId])

  const selectedId = selectedProfileId ?? recommendation?.recommendedId ?? null
  const selectedProfile = selectedId ? getProfile(selectedId) : null
  const altLocale: Locale = locale === 'ru' ? 'en' : 'ru'

  if (step === 'start') {
    return (
      <>
        <h2>{t(ui.steps.start, locale)}</h2>
        <p>{t(ui.appSubtitle, locale)}</p>
        <ol>
          <li>{t(ui.steps.context, locale)}</li>
          <li>{t(ui.steps.options, locale)}</li>
          <li>{t(ui.steps.choice, locale)}</li>
          <li>{t(ui.steps.tradeoffs, locale)}</li>
          <li>{t(ui.steps.evolution, locale)}</li>
        </ol>
        <div className="checks">
          <strong>{t(ui.interviewerChecks, locale)}</strong>
          <p>{t(ui.startChecks, locale)}</p>
        </div>
        <p className="note">{t(ui.headerLangNote, locale)}</p>
        <div className="nav-row">
          <button type="button" className="primary" onClick={goNext}>
            {t(ui.start, locale)}
          </button>
        </div>
      </>
    )
  }

  if (step === 'context') {
    return (
      <>
        <h2>{t(ui.steps.context, locale)}</h2>
        {CONTEXT_QUESTIONS.map((question) => (
          <div key={question.key} className="question">
            <h3>{t(question.prompt, locale)}</h3>
            <div className="choices">
              {question.options.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  className={context[question.key] === option.value ? 'selected' : ''}
                  onClick={() => pickContextValue(setContextField, question, option.value)}
                >
                  {t(option.label, locale)}
                </button>
              ))}
            </div>
          </div>
        ))}
        {!session ? <p className="warn">{t(ui.needContext, locale)}</p> : null}
        <Nav
          locale={locale}
          showBack
          showNext
          nextDisabled={!session}
          onBack={goBack}
          onNext={goNext}
        />
      </>
    )
  }

  if (!session || !recommendation) {
    return (
      <>
        <p className="warn">{t(ui.needContext, locale)}</p>
        <Nav locale={locale} showBack onBack={goBack} onNext={goNext} />
      </>
    )
  }

  if (step === 'options') {
    return (
      <>
        <h2>{t(ui.steps.options, locale)}</h2>
        <ProfileCards
          locale={locale}
          optionIds={recommendation.optionIds}
          recommendedId={recommendation.recommendedId}
          selectedProfileId={selectedProfileId}
          onSelect={setSelectedProfileId}
        />
        <Nav
          locale={locale}
          showBack
          showNext
          nextDisabled={!selectedProfileId}
          onBack={goBack}
          onNext={goNext}
        />
      </>
    )
  }

  if (step === 'choice') {
    return (
      <>
        <h2>{t(ui.steps.choice, locale)}</h2>
        <ProfileCards
          locale={locale}
          optionIds={recommendation.optionIds}
          recommendedId={recommendation.recommendedId}
          selectedProfileId={selectedProfileId}
          showYourChoice
          onSelect={setSelectedProfileId}
        />
        {selectedProfile ? <ProfileDetails profile={selectedProfile} locale={locale} /> : null}
        <Nav
          locale={locale}
          showBack
          showNext
          nextDisabled={!selectedProfileId}
          onBack={goBack}
          onNext={goNext}
        />
      </>
    )
  }

  if (!selectedProfile) {
    return (
      <>
        <p className="warn">{t(ui.needContext, locale)}</p>
        <Nav locale={locale} showBack onBack={goBack} onNext={goNext} />
      </>
    )
  }

  if (step === 'tradeoffs') {
    return (
      <>
        <h2>{t(ui.steps.tradeoffs, locale)}</h2>
        <ul>
          {selectedProfile.tradeoffs.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ul>
        <Nav locale={locale} showBack showNext onBack={goBack} onNext={goNext} />
      </>
    )
  }

  if (step === 'evolution') {
    return (
      <>
        <h2>{t(ui.steps.evolution, locale)}</h2>
        <ul>
          {selectedProfile.evolution.map((item) => (
            <li key={item.ru}>{t(item, locale)}</li>
          ))}
        </ul>
        <Nav locale={locale} showBack showNext onBack={goBack} onNext={goNext} />
      </>
    )
  }

  return (
    <>
      <h2>{t(ui.steps.rehearse, locale)}</h2>
      <div className="script">{buildAnswerScript(session, selectedProfile, locale)}</div>
      {showAltScript ? (
        <div className="script">{buildAnswerScript(session, selectedProfile, altLocale)}</div>
      ) : null}
      <div className="nav-row">
        <button type="button" className="secondary" onClick={goBack}>
          {t(ui.back, locale)}
        </button>
        <button type="button" className="secondary" onClick={toggleAltScript}>
          {t(ui.otherLanguage, locale)}
        </button>
        <button type="button" className="primary" onClick={reset}>
          {t(ui.restart, locale)}
        </button>
      </div>
      <VoiceRecorder />
    </>
  )
}
