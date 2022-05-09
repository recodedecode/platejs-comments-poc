import { AutoformatRule } from '@udecode/plate'


export const autoformatEquality: AutoformatRule[] = [
  {
    mode: 'text',
    match: '!=',
    format: '≠',
  },
  {
    mode: 'text',
    match: '==',
    format: '≡',
  },
  {
    mode: 'text',
    match: ['!==', '≠='],
    format: '≢',
  },
  {
    mode: 'text',
    match: '~=',
    format: '≈',
  },
  {
    mode: 'text',
    match: '!~=',
    format: '≉',
  },
]
