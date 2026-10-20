import { describe, expect, it } from 'vitest'
import { buildExportMarkdown, exportFilename } from './exportMarkdown'

describe('exportMarkdown', () => {
  it('includes story, profile, ticked rubric and no undefined', () => {
    const md = buildExportMarkdown({
      locale: 'en',
      story: { product: 'B2B logistics, 40k users' },
      context: { product: 'b2b_app', seo: 'none' },
      profileId: 'csr_spa',
      script: 'If this context holds, I would pick a CSR SPA.',
      notes: [{ ru: 'слои', en: 'layers', pl: 'warstwy' }],
      rubric: { context: true, options: false, cost: true, evolution: false, evidence: false },
    })
    expect(md).toContain('B2B logistics, 40k users')
    expect(md.toLowerCase()).toMatch(/vite|csr/)
    expect(md).toContain('[x] Named constraints')
    expect(md).toContain('[ ] Gave 2–3 options')
    expect(md).not.toContain('undefined')
    expect(exportFilename('ru')).toBe('architecture-drill-ru.md')
  })
})
