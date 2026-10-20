import { t } from './diagram'
import type { Localized } from './types'

export type RubricItem = {
  id: string
  label: Localized
}

export const RUBRIC: RubricItem[] = [
  { id: 'context', label: t('Назвал ограничения до библиотек', 'Named constraints before libraries', 'Najpierw nazwał ograniczenia, potem biblioteki') },
  { id: 'options', label: t('Дал 2–3 варианта, не один любимый стек', 'Gave 2–3 options, not one favourite stack', 'Dał 2–3 warianty, nie jeden ulubiony stack') },
  { id: 'cost', label: t('Сам назвал цену решения', 'Named the trade-off without a prompt', 'Sam nazwał koszt decyzji') },
  { id: 'evolution', label: t('Сказал, при каком сигнале пересмотрит', 'Said what signal would make them revisit it', 'Powiedział, przy jakim sygnale zmieni decyzję') },
  { id: 'evidence', label: t('Опёрся на цифры или свой вклад', 'Used numbers or personal ownership', 'Oparł się na liczbach albo własnym wkładzie') },
]
