import { AutoformatRule } from '@udecode/plate'


const autoformatDivision: AutoformatRule[] = [
  // This is a stupid shortcut that will prevent you typing in links - duh
  {
    mode: 'text',
    match: '////',
    format: '÷',
  },
]

export const autoformatOperation: AutoformatRule[] = [
  {
    mode: 'text',
    match: '+-',
    format: '±',
  },
  {
    mode: 'text',
    match: '%%',
    format: '‰',
  },
  {
    mode: 'text',
    match: ['%%%', '‰%'],
    format: '‱',
  },
  // ...autoformatDivision,
]
