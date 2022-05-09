  
import { autoformatComparison } from './comparison'
import { autoformatEquality } from './equality'
import { autoformatFraction } from './fraction'
import { autoformatOperation } from './operation'

import {
  autoformatSubscriptNumbers,
  autoformatSubscriptSymbols,
} from './subscript'

import {
  autoformatSuperscriptNumbers,
  autoformatSuperscriptSymbols,
} from './superscript'


export const autoformatMath = [
  ...autoformatComparison,
  ...autoformatEquality,
  ...autoformatOperation,
  ...autoformatFraction,
  ...autoformatSuperscriptSymbols,
  ...autoformatSubscriptSymbols,
  ...autoformatSuperscriptNumbers,
  ...autoformatSubscriptNumbers,
]
