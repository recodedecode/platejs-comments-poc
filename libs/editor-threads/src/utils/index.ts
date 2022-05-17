import { Editor, Text } from 'slate'
import { getCommentThreadsOnTextNode } from '@proto/editor-comments'


export const normalizeComments = async (editor: Editor, removableMarkId: string) => {

  let removedMark = false

  const textNodesWithComments = Editor.nodes(editor, {
    at: [],
    mode: 'lowest',
    match: (n) => Text.isText(n) && getCommentThreadsOnTextNode(n).length > 0,
  })

  let textNodeEntry = textNodesWithComments.next().value
  
  while (textNodeEntry != null) {

    const [node, path] = textNodeEntry
    const offset = (node as any)?.text?.length || 0
    const threadIds = getCommentThreadsOnTextNode(textNodeEntry[0])

    for (const threadId of threadIds) {
      if (threadId === removableMarkId) {
        editor.selection = {
          anchor: { path, offset: 0 },
          focus: { path, offset },
        }
        editor.removeMark(`comment_thread_${threadId}`)
        removedMark = true
        break
      }
    }

    if ( ! removedMark) {
      textNodeEntry = textNodesWithComments.next().value
    }
    else {
      textNodeEntry = null as any as void
    }
  }

  if (removedMark) {
    normalizeComments(editor, removableMarkId)
  }
}
