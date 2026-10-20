import { STORY_PROMPTS } from '../content/prep'
import { getProfile } from '../content/profiles'
import { CONTEXT_QUESTIONS } from '../content/questions'
import { RUBRIC } from '../content/rubric'
import type { Locale, Localized, ProfileId, SessionContext } from '../content/types'

export type ExportInput = {
  locale: Locale
  story: Record<string, string>
  context: Partial<SessionContext>
  profileId: ProfileId | null
  script: string
  notes: Localized[]
  rubric: Record<string, boolean>
}

export function exportFilename(locale: Locale): string {
  return `architecture-drill-${locale}.md`
}

export function buildExportMarkdown(input: ExportInput): string {
  const { locale, story, context, profileId, script, notes, rubric } = input
  const lines: string[] = []
  const heading = {
    title: { ru: '# Тренажёр архитектуры фронтенда', en: '# Frontend architecture drill', pl: '# Trener architektury frontendu' },
    story: { ru: '## Рассказ о проекте', en: '## Project story', pl: '## Opowieść o projekcie' },
    empty: { ru: '_пусто_', en: '_empty_', pl: '_puste_' },
    builder: { ru: '## Конструктор', en: '## Constructor', pl: '## Konstruktor' },
    recommended: { ru: 'рекомендация', en: 'recommended', pl: 'rekomendacja' },
    script: { ru: '## Скрипт вслух', en: '## Spoken script', pl: '## Skrypt na głos' },
    noScript: { ru: '_нет скрипта_', en: '_no script_', pl: '_brak skryptu_' },
    notes: { ru: '## Как это меняет решение', en: '## How this changes the choice', pl: '## Jak to zmienia decyzję' },
    noNotes: { ru: '_нет заметок_', en: '_no notes_', pl: '_brak notatek_' },
    rubric: { ru: '## Рубрика', en: '## Rubric', pl: '## Rubryka' },
  } as const
  lines.push(heading.title[locale])
  lines.push('')
  lines.push(heading.story[locale])
  for (const prompt of STORY_PROMPTS) {
    lines.push(`### ${prompt.title[locale]}`)
    const body = (story[prompt.id] ?? '').trim()
    lines.push(body.length > 0 ? body : heading.empty[locale])
    lines.push('')
  }
  lines.push(heading.builder[locale])
  for (const question of CONTEXT_QUESTIONS) {
    const value = context[question.key]
    lines.push(`- ${question.key}: ${value ?? '—'}`)
  }
  if (profileId) {
    const profile = getProfile(profileId)
    lines.push(
      `- ${heading.recommended[locale]}: ${profile.title[locale]}`,
    )
  }
  lines.push('')
  lines.push(heading.script[locale])
  lines.push(script.replace(/undefined/g, '').trim() || heading.noScript[locale])
  lines.push('')
  lines.push(heading.notes[locale])
  if (notes.length === 0) lines.push(heading.noNotes[locale])
  else for (const note of notes) lines.push(`- ${note[locale]}`)
  lines.push('')
  lines.push(heading.rubric[locale])
  for (const item of RUBRIC) {
    const mark = rubric[item.id] ? 'x' : ' '
    lines.push(`- [${mark}] ${item.label[locale]}`)
  }
  lines.push('')
  return lines.join('\n')
}
