import { AutoformatRule } from '@udecode/plate'


export const autoformatHandFingersClosed: AutoformatRule[] = [
  {
    mode: 'text',
    match: ':+1',
    format: '👍',
  },
  {
    mode: 'text',
    match: ':thumbsup:',
    format: '👍',
  },
  {
    mode: 'text',
    match: ':-1',
    format: '👎',
  },
  {
    mode: 'text',
    match: ':thumbsdown:',
    format: '👎',
  },
  {
    mode: 'text',
    match: ':fist:',
    format: '✊',
  },
  {
    mode: 'text',
    match: ':fist_raised:',
    format: '✊',
  },
  {
    mode: 'text',
    match: ':punch:',
    format: '👊',
  },
  {
    mode: 'text',
    match: ':fist_left:',
    format: '🤛',
  },
  {
    mode: 'text',
    match: ':fist_right:',
    format: '🤜',
  },
]
