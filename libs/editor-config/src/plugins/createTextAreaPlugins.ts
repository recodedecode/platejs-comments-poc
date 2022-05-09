import {
  createParagraphPlugin,
  createBlockquotePlugin,
  createTodoListPlugin,
  createHeadingPlugin,
  createImagePlugin,
  createHorizontalRulePlugin,
  createLineHeightPlugin,
  createLinkPlugin,
  createListPlugin,
  createAlignPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createHighlightPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createKbdPlugin,
  createNodeIdPlugin,
  createIndentPlugin,
  createAutoformatPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,
  createNormalizeTypesPlugin,
  createTrailingBlockPlugin,
  createSelectOnBackspacePlugin,
  createComboboxPlugin,
  createMentionPlugin,
  createJuicePlugin,
  createPlateUI,
  createPlugins,
} from '@udecode/plate'

import { configTextArea} from '../configs'


export const createTextAreaPlugins = () => {

  const components = createPlateUI()

  const plugins = createPlugins([
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createTodoListPlugin(),
    createHeadingPlugin(),
    createImagePlugin(),
    createHorizontalRulePlugin(),
    createLineHeightPlugin(configTextArea.lineHeight),
    createLinkPlugin(),
    createListPlugin(),
    createAlignPlugin(configTextArea.align),
    createBoldPlugin(),
    createItalicPlugin(),
    createHighlightPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createIndentPlugin(configTextArea.indent),
    createAutoformatPlugin(configTextArea.autoformat),
    createResetNodePlugin(configTextArea.resetBlockType),
    createSoftBreakPlugin(configTextArea.softBreak),
    createExitBreakPlugin(configTextArea.exitBreak),
    createNormalizeTypesPlugin(configTextArea.forceLayout),
    createTrailingBlockPlugin(configTextArea.trailingBlock),
    createSelectOnBackspacePlugin(configTextArea.selectOnBackspace),
    createComboboxPlugin(),
    createMentionPlugin(),
    createJuicePlugin(),
  ], {
    components,
  })

  return { components, plugins }
}
