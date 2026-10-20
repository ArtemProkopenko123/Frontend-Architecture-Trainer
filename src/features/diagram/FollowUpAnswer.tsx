import { useRef } from 'react'
import type { Locale, Localized } from '../../content/types'
import { t, ui } from '../../i18n/ui'

export function FollowUpAnswer({
  question,
  answer,
  locale,
  onOpenChange,
}: {
  question: Localized
  answer: Localized
  locale: Locale
  onOpenChange?: (open: boolean) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className="ghost"
        onClick={() => {
          dialog.current?.showModal()
          onOpenChange?.(true)
        }}
      >
        {t(ui.showFollowUpAnswer, locale)}
      </button>
      <dialog
        ref={dialog}
        className="follow-up-dialog"
        aria-label={t(ui.showFollowUpAnswer, locale)}
        onClose={() => onOpenChange?.(false)}
      >
        <h3>{t(question, locale)}</h3>
        <p className="script">{t(answer, locale)}</p>
        <form method="dialog">
          <button type="submit" className="ghost">
            {t(ui.closeNode, locale)}
          </button>
        </form>
      </dialog>
    </>
  )
}
