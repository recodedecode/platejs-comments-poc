import React, { useCallback } from 'react'
import { css } from '@emotion/react'
import { usePlateEditorState } from '@udecode/plate'
import { Thread, ThreadPanel } from '../components'
import { useEditorCommentStore } from '@proto/editor-comments'
import { normalizeComments } from '../utils'


export const CommentThreads = () => {

  // TODO refactor
  const editor = usePlateEditorState('textareaplayground')
  const commentsStore = useEditorCommentStore()
  const threads = commentsStore.getThreadsByDate()

  const onHighlightThread = (id: string) => {
    commentsStore.selectCommentThread(id)
  }

  const onRemoveComment = useCallback((id: string) => {
    if ( ! editor) return
    commentsStore.removeCommentThread(id)
    normalizeComments(editor, id)
  }, [commentsStore, editor])

  return (
    <ThreadPanel>
      <h2 css={styles.title}>Comments</h2>
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          active={commentsStore.activeThreadId === thread.id}
          onAddComment={commentsStore.addComment}
          onHighlightThread={() => onHighlightThread(thread.id)}
          onRemoveComment={() => onRemoveComment(thread.id)}
          {...thread} />
      ))}
    </ThreadPanel>
  )
}


const styles = {
  title: css`
    margin: 20px 0 10px 0;
    padding: 0px 0 0 25px;
    font-size: 1.2rem;
    line-height: 1.3rem;
  `,
}
