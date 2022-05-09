import { AutoformatRule } from '@udecode/plate'


export const autoformatComparison: AutoformatRule[] = [
  {
    mode: 'text',
    match: '!>',
    format: '≯',
  },
  {
    mode: 'text',
    match: '!<',
    format: '≮',
  },
  {
    mode: 'text',
    match: '>=',
    format: '≥',
  },
  {
    mode: 'text',
    match: '<=',
    format: '≤',
  },
  {
    mode: 'text',
    match: '!>=',
    format: '≱',
  },
  {
    mode: 'text',
    match: '!<=',
    format: '≰',
  },
]
