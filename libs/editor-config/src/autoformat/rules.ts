import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  // autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate'

import { autoformatBlocks } from './blocks'
import { autoformatEmoji } from './emoji'
import { autoformatLists } from './lists'
import { autoformatMarks } from './marks'


export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatLists,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  // ...autoformatMath,
  ...autoformatEmoji,
]
