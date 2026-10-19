import { useEffect, useRef, useState } from 'react'
import { t, ui } from '../../i18n/ui'
import { useSessionStore } from '../../store/sessionStore'

type Status = 'idle' | 'recording' | 'ready' | 'denied'

export function VoiceRecorder() {
  const locale = useSessionStore((s) => s.locale)
  const [status, setStatus] = useState<Status>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const urlRef = useRef<string | null>(null)
  urlRef.current = url

  useEffect(() => {
    return () => {
      recorderRef.current?.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('denied')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        setUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous)
          return URL.createObjectURL(blob)
        })
        setStatus('ready')
      }
      recorderRef.current = recorder
      recorder.start()
      setStatus('recording')
    } catch {
      setStatus('denied')
    }
  }

  function stop() {
    recorderRef.current?.stop()
    recorderRef.current = null
  }

  function discard() {
    if (url) URL.revokeObjectURL(url)
    setUrl(null)
    setStatus('idle')
  }

  return (
    <section className="voice-recorder">
      <h3>{t(ui.voiceTitle, locale)}</h3>
      <p className="note">{t(ui.voiceHint, locale)}</p>
      {status === 'denied' ? <p className="warn">{t(ui.voiceDenied, locale)}</p> : null}
      <div className="nav-row">
        {status === 'recording' ? (
          <button type="button" className="primary" onClick={stop}>
            {t(ui.voiceStop, locale)}
          </button>
        ) : (
          <button type="button" className="secondary" onClick={start}>
            {t(ui.voiceStart, locale)}
          </button>
        )}
        {url ? (
          <button type="button" className="ghost" onClick={discard}>
            {t(ui.voiceDiscard, locale)}
          </button>
        ) : null}
      </div>
      {url ? <audio controls src={url} /> : null}
    </section>
  )
}
