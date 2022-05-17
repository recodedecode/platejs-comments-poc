import { Comment } from '@styled-icons/boxicons-regular/Comment'
import { FormatAlignCenter } from '@styled-icons/material/FormatAlignCenter'
import { FormatAlignLeft } from '@styled-icons/material/FormatAlignLeft'
import { FormatAlignRight } from '@styled-icons/material/FormatAlignRight'
import { FormatBold } from '@styled-icons/material/FormatBold'
import { FormatItalic } from '@styled-icons/material/FormatItalic'
import { FormatListBulleted } from '@styled-icons/material/FormatListBulleted'
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered'
import { FormatQuote } from '@styled-icons/material/FormatQuote'
import { FormatStrikethrough } from '@styled-icons/material/FormatStrikethrough'
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined'

import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_OL,
  ELEMENT_UL,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  MarkToolbarButton,
  AlignToolbarButton,
  BlockToolbarButton,
  ListToolbarButton,
  getPluginType,
  usePlateEditorRef,
} from '@udecode/plate'

import {
  useInsertCommentThread,
  MARK_COMMENT_THREAD,
} from '@proto/editor-comments'


export const TextareaToolbar = () => {

  const editor = usePlateEditorRef()!
  const { onAddComment } = useInsertCommentThread(editor)

  return (
    <>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FormatStrikethrough />} />
      <div className="editor-toolbar-divider" />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />} />
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_UL)}
        icon={<FormatListBulleted />} />
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumbered />} />
      <div className="editor-toolbar-divider" />
      <AlignToolbarButton
        value="left"
        icon={<FormatAlignLeft />} />
      <AlignToolbarButton
        value="center"
        icon={<FormatAlignCenter />} />
      <AlignToolbarButton
        value="right"
        icon={<FormatAlignRight />} />
      <div className="editor-toolbar-divider" />
      <div data-slate-comment={true}>
        <MarkToolbarButton
          type={getPluginType(editor, MARK_COMMENT_THREAD)}
          icon={<Comment />}
          onMouseDown={onAddComment} />
      </div>
    </>
  )
}

