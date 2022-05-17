import React, { useCallback } from 'react'
import { css } from '@emotion/react'
import { usePlateEditorState } from '@udecode/plate'
import { Thread, ThreadPanel } from '../components'
import { useEditorCommentStore, useRemoveCommentListener } from '@proto/editor-comments'


interface Props {
  id: string
}

export const CommentThreads = ({ id }: Props) => {

  const editor = usePlateEditorState(id)
  const commentsStore = useEditorCommentStore()
  const threads = commentsStore.getThreadsByDate()

  useRemoveCommentListener(editor)

  const onHighlightThread = useCallback((id: string) => {
    commentsStore.selectCommentThread(id)
  }, [commentsStore])

  const onRemoveComment = useCallback((id: string) => {
    commentsStore.removeCommentThread(id)
  }, [commentsStore])

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
