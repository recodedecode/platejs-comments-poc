import { Editor, Location, Node, NodeEntry, Range, Text } from 'slate'
import { PlateEditor } from '@udecode/plate'
import { MARK_COMMENT } from '../constants'


type TextNode = Node & Record<string, any>

const isCommentMark = (key: string) =>
  key.includes(MARK_COMMENT)

export const getCommentThreadsOnTextNode = (node: TextNode) =>
  Array.from(new Set(
    Object.keys(node)
      .filter(isCommentMark)
      .map(mark => mark.replace(MARK_COMMENT, ''))
  ))

export const matchesCommentThreadsOnTextNode = (threadId: string, node: TextNode) =>
  getCommentThreadsOnTextNode(node).includes(threadId)

export const shouldAllowNewCommentThreadAtSelection = (editor: PlateEditor) => {

  if (editor.selection == null || Range.isCollapsed(editor.selection)) {
    return false
  }

  const textNodeIterator = Editor.nodes(editor, {
    at: editor.selection,
    mode: "lowest",
  })

  let nextTextNodeEntry = textNodeIterator.next().value
  const textNodeEntriesInSelection = []

  while (nextTextNodeEntry != null) {
    textNodeEntriesInSelection.push(nextTextNodeEntry)
    nextTextNodeEntry = textNodeIterator.next().value
  }

  if (textNodeEntriesInSelection.length === 0) {
    return false
  }

  return textNodeEntriesInSelection.some(
    ([textNode]) => getCommentThreadsOnTextNode(textNode).length === 0
  )
}


type NodeIterator = (slateEditor: PlateEditor, nodePath?: Location) => NodeEntry<any> | undefined

export const updateCommentThreadLengthMap = (
  editor: PlateEditor,
  commentThreadIds: string[],
  nodeIterator: NodeIterator,
  map: Map<string, number>
) => {

  let nextNodeEntry = nodeIterator(editor)

  while (nextNodeEntry != null) {
    const nextNode = nextNodeEntry[0]
    const commentThreadsOnNextNode = getCommentThreadsOnTextNode(nextNode)

    const intersection = [...commentThreadsOnNextNode]
      .filter(id => commentThreadIds.includes(id))

    if (intersection.length === 0) {
      break
    }

    for (let i = 0; i < intersection.length; i ++) {
      map.set(intersection[i], map.get(intersection[i]) + nextNode.text.length)
    }

    nextNodeEntry = nodeIterator(editor, nextNodeEntry[1])
  }

  return map
}

export const getSmallestCommentThreadAtTextNode = (editor: PlateEditor, textNode: TextNode) => {

  const commentThreadIds = getCommentThreadsOnTextNode(textNode)
  let shortestCommentThreadID = commentThreadIds[0]

  const traverseTextNodeIterator = (direction: string): NodeIterator =>
    (slateEditor: PlateEditor, nodePath?: Location) => {
      const method = direction === 'reverse'
        ? Editor.previous
        : Editor.next
      return method(slateEditor, {
        at: nodePath,
        mode: 'lowest',
        match: Text.isText,
      })
    }

  if (commentThreadIds.length > 1) {

    const commentThreadsLengthByID = new Map(
      commentThreadIds.map((id) => [id, textNode.text.length])
    )

    // Traverse in the reverse direction and update the map
    updateCommentThreadLengthMap(
      editor,
      commentThreadIds,
      traverseTextNodeIterator('reverse'),
      commentThreadsLengthByID
    )

    // Traverse in the forward direction and update the map
    updateCommentThreadLengthMap(
      editor,
      commentThreadIds,
      traverseTextNodeIterator('forward'),
      commentThreadsLengthByID
    )

    let minLength = Number.POSITIVE_INFINITY

    // Find the thread with the shortest length
    for (const [threadID, length] of commentThreadsLengthByID) {
      if (length < minLength) {
        shortestCommentThreadID = threadID
        minLength = length
      }
    }
  }

  return shortestCommentThreadID
}

export const removeCommentMarks = async (editor: PlateEditor, removableMarkId: string) => {

  let removedMark = false

  const textNodesWithComments = Editor.nodes(editor, {
    at: [],
    mode: 'lowest',
    match: (node) => Text.isText(node)
      && !! getCommentThreadsOnTextNode(node).length,
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
        const mark = `${MARK_COMMENT}${threadId}`
        editor.removeMark(mark)
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
    removeCommentMarks(editor, removableMarkId)
  }
}
