import { useCallback } from 'react'
import { getRootProps } from '@udecode/plate-styled-components'
import { usePlateEditorRef } from '@udecode/plate'
import { useEditorCommentStore } from '../store'

import {
  getSmallestCommentThreadAtTextNode,
  matchesCommentThreadsOnTextNode
} from '../utils'


export const CommentLeaf = (
  props: any,
) => {

  const { attributes, children, leaf, nodeProps } = props
  const rootProps = getRootProps(props)

  const editor = usePlateEditorRef()
  const commentsStore = useEditorCommentStore()

  const onClick = useCallback(() => {
    const shortestThreadId = getSmallestCommentThreadAtTextNode(editor, leaf)
    commentsStore.selectCommentThread(shortestThreadId)
  }, [commentsStore, editor, leaf])

  const isActive = commentsStore.activeThreadId
    ? matchesCommentThreadsOnTextNode(commentsStore.activeThreadId, leaf)
    : false
  const activeClass = isActive ? 'editor-comment-active' : ''

  return (
    <span
      {...attributes}
      {...rootProps}
      {...nodeProps}
      className={`editor-comment ${activeClass}`}
      onClick={onClick}>
      {children}
    </span>
  )
}
