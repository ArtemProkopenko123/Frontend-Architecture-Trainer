import { useEffect, useState } from 'react'
import { formatClock, remainingMs, ROUND_MS, STEP_BUDGET_MS } from '../../engine/timer'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

export function RoundTimer() {
  const locale = useSessionStore((s) => s.locale)
  const radioStep = useSessionStore((s) => s.radioStep)
  const radioCaseId = useSessionStore((s) => s.radioCaseId)
  const elapsedMs = useSessionStore((s) => s.timerElapsedMs)
  const running = useSessionStore((s) => s.timerRunning)
  const startedAt = useSessionStore((s) => s.timerStartedAt)
  const startTimer = useSessionStore((s) => s.startTimer)
  const pauseTimer = useSessionStore((s) => s.pauseTimer)
  const resetTimer = useSessionStore((s) => s.resetTimer)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [running])

  const left = remainingMs(now, {
    durationMs: ROUND_MS,
    elapsedMs,
    running,
    startedAt,
  })
  const overtime = left < 0
  const stepBudget = STEP_BUDGET_MS[radioStep]
  const idle = !radioCaseId && !running && elapsedMs === 0

  return (
    <div className={overtime ? 'round-timer overtime' : 'round-timer'}>
      <span className="round-timer-clock" aria-live="polite">
        {idle ? formatClock(ROUND_MS) : formatClock(left)}
      </span>
      <span className="note">
        {idle
          ? t(ui.timerIdle, locale)
          : overtime
            ? t(ui.timerOver, locale)
            : `${t(ui.timerRound, locale)}${stepBudget ? ` · ${t(ui.radioSteps[radioStep], locale)} ~${Math.round(stepBudget / 60000)} ${t(ui.timerMin, locale)}` : ''}`}
      </span>
      <div className="round-timer-actions">
        {running ? (
          <button type="button" className="ghost" onClick={pauseTimer}>
            {t(ui.timerPause, locale)}
          </button>
        ) : (
          <button type="button" className="ghost" onClick={startTimer} disabled={idle}>
            {t(ui.timerResume, locale)}
          </button>
        )}
        <button type="button" className="ghost" onClick={resetTimer} disabled={idle}>
          {t(ui.timerReset, locale)}
        </button>
      </div>
    </div>
  )
}
