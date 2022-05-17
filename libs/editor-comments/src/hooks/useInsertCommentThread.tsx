import { useCallback } from 'react'
import intformat from 'biguint-format'
import FlakeId from 'flake-idgen'
import { PlateEditor } from '@udecode/plate'
import { MARK_COMMENT_THREAD_PREFIX } from '../constants'
import { useEditorCommentStore } from '../store'
import { shouldAllowNewCommentThreadAtSelection } from '../utils'


const flakeIdGen = new FlakeId()

export const useInsertCommentThread = (editor: PlateEditor) => {

  const commentsStore = useEditorCommentStore()

  const onAddComment = useCallback(() => {
    const isAllowed = shouldAllowNewCommentThreadAtSelection(editor)
    if ( ! isAllowed) return
    const commentThreadId = intformat(flakeIdGen.next(), 'dec')
    const markId = `${MARK_COMMENT_THREAD_PREFIX}${commentThreadId}`
    editor.addMark(markId, true)
    commentsStore.addCommentThread(commentThreadId)
    commentsStore.selectCommentThread(commentThreadId)
  }, [commentsStore, editor])

  return { onAddComment }
}

