import {
  AutoformatPlugin,
  createPlateUI,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ExitBreakPlugin,
  IndentPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
  NormalizeTypesPlugin,
  PlatePlugin,
  ResetNodePlugin,
  SelectOnBackspacePlugin,
  SoftBreakPlugin,
  TrailingBlockPlugin,
} from '@udecode/plate'

import { Partial } from 'rollup-plugin-typescript2/dist/partial'
import { EditableProps } from 'slate-react/dist/components/editable'
import { autoformatRules } from '../autoformat'
import { MENTIONABLES } from '../mentionables'


const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
}

interface ConfigTextarea {
  components: Record<string, any>
  editableProps: EditableProps
  align: Partial<PlatePlugin>
  autoformat: Partial<PlatePlugin<{}, AutoformatPlugin>>
  exitBreak: Partial<PlatePlugin<{}, ExitBreakPlugin>>
  forceLayout: Partial<PlatePlugin<{}, NormalizeTypesPlugin>>
  indent: Partial<PlatePlugin<{}, IndentPlugin>>
  lineHeight: Partial<PlatePlugin>
  mentionItems: any
  resetBlockType: Partial<PlatePlugin<{}, ResetNodePlugin>>
  selectOnBackspace: Partial<PlatePlugin<{}, SelectOnBackspacePlugin>>
  softBreak: Partial<PlatePlugin<{}, SoftBreakPlugin>>
  trailingBlock: Partial<PlatePlugin<{}, TrailingBlockPlugin>>
}

export const configTextArea: ConfigTextarea = {
  editableProps: {
    autoFocus: false,
    spellCheck: false,
    placeholder: 'Type...',
    style: {
      padding: '15px',
    },
  },
  components: createPlateUI(),
  align: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
        ],
      },
    },
  },
  indent: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_BLOCKQUOTE,
        ],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: 'normal',
        validTypes: [
          ELEMENT_PARAGRAPH,
        ],
      },
    },
  },
  resetBlockType: {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Enter',
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Backspace',
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
  softBreak: {
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    },
  },
  exitBreak: {
    options: {
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          hotkey: 'mod+shift+enter',
          before: true,
        },
        {
          hotkey: 'enter',
          query: {
            start: true,
            end: true,
            allow: KEYS_HEADING,
          },
        },
      ],
    },
  },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_IMAGE, ELEMENT_HR],
      },
    },
  },
  autoformat: {
    options: {
      rules: autoformatRules,
    },
  },
  mentionItems: MENTIONABLES,
  forceLayout: {
    options: {
      rules: [
        // { path: [0], strictType: ELEMENT_H1 }
      ],
    },
  },
}
