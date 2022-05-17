import { useCallback } from 'react'
import { Text } from 'slate'
import { ReactEditor } from 'slate-react'
import { usePlateEditorRef } from '@udecode/plate'
import { useEditorCommentStore } from '../store'
import { getCommentThreadsOnTextNode } from '../utils'


export const useOnClickOutside = () => {

  const editor = usePlateEditorRef()!
  const commentsStore = useEditorCommentStore()

  const onClickOutside = useCallback((event: any) => {

    const slateCommentDOMNode = event.target.hasAttribute('data-slate-comment')
      ? event.target
      : event.target.closest('[data-slate-comment]')

    if (slateCommentDOMNode) {
      return
    }
  
    const slateDOMNode = event.target.hasAttribute('data-slate-node')
      ? event.target
      : event.target.closest('[data-slate-node]')

    if (slateDOMNode == null) {
      commentsStore.deselectCommentThread()
      return
    }

    const slateNode = ReactEditor.toSlateNode(editor, slateDOMNode)

    if (Text.isText(slateNode)
      && getCommentThreadsOnTextNode(slateNode).length) {
      return
    }

    commentsStore.deselectCommentThread()

  }, [commentsStore, editor])

  return onClickOutside
}
