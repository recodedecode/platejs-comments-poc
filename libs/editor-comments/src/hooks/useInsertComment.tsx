import { useCallback } from 'react'
import intformat from 'biguint-format'
import FlakeId from 'flake-idgen'
import { PlateEditor } from '@udecode/plate'
import { MARK_COMMENT } from '../constants'
import { useEditorCommentStore } from '../store'
import { shouldAllowNewCommentThreadAtSelection } from '../utils'


const flakeIdGen = new FlakeId()

export const useInsertComment = (editor: PlateEditor) => {

  const commentsStore = useEditorCommentStore()

  const onAddComment = useCallback(() => {
    const isAllowed = shouldAllowNewCommentThreadAtSelection(editor)
    if ( ! isAllowed) return
    const commentId = intformat(flakeIdGen.next(), 'dec')
    const mark = `${MARK_COMMENT}${commentId}`
    editor.addMark(mark, true)
    commentsStore.addCommentThread(commentId)
    commentsStore.selectCommentThread(commentId)
  }, [commentsStore, editor])

  return { onAddComment }
}

