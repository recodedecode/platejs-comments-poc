import { Editor, Location, Node, NodeEntry, Range, Text } from 'slate'
import { PlateEditor } from '@udecode/plate'
import { MARK_COMMENT_THREAD_PREFIX } from '../constants'


type TextNode = Node & Record<string, any>

const isCommentThreadIdMark = (possibleCommentThreadId: string) =>
  possibleCommentThreadId.indexOf(MARK_COMMENT_THREAD_PREFIX) === 0

export const getCommentThreadsOnTextNode = (node: TextNode) => {
  return Array.from(new Set(
    Object.keys(node)
      .filter(isCommentThreadIdMark)
      .map(mark => mark.replace(MARK_COMMENT_THREAD_PREFIX, ''))
  ))
}

export const matchesCommentThreadsOnTextNode = (threadId: string, node: TextNode) => {
  const commentThreadIds = getCommentThreadsOnTextNode(node)
  return commentThreadIds.includes(threadId)
}

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

     // All comment threads we're looking for have already ended meaning
    // reached an uncommented text node OR a commented text node which
    // has none of the comment threads we care about.
    if (intersection.length === 0) {
      break
    }

    // update thread lengths for comment threads we did find on this
    // text node.
    for (let i = 0; i < intersection.length; i ++) {
      map.set(intersection[i], map.get(intersection[i]) + nextNode.text.length)
    }

    // call the iterator to get the next text node to consider
    nextNodeEntry = nodeIterator(editor, nextNodeEntry[1])
  }

  return map
}

export const getSmallestCommentThreadAtTextNode = (editor: PlateEditor, textNode: TextNode) => {

  const commentThreadIds = getCommentThreadsOnTextNode(textNode)
  let shortestCommentThreadID = commentThreadIds[0]

  const traverseTextNodeIterator = (direction: string): NodeIterator => (slateEditor: PlateEditor, nodePath?: Location) => {
    const method = direction === 'reverse'
      ? Editor.previous
      : Editor.next
    return method(slateEditor, {
      at: nodePath,
      mode: 'lowest',
      match: Text.isText,
    })
  }

  /* const reverseTextNodeIterator: NodeIterator = (slateEditor: PlateEditor, nodePath?: Location) =>
    Editor.previous(slateEditor, {
      at: nodePath,
      mode: 'lowest',
      match: Text.isText,
    })

  const forwardTextNodeIterator: NodeIterator = (slateEditor: PlateEditor, nodePath?: Location) =>
    Editor.next(slateEditor, {
      at: nodePath,
      mode: 'lowest',
      match: Text.isText,
    }) */

  if (commentThreadIds.length > 1) {

    // The map here tracks the lengths of the comment threads.
    // We initialize the lengths with length of current text node
    // since all the comment threads span over the current text node
    // at the least.
    const commentThreadsLengthByID = new Map(
      commentThreadIds.map((id) => [id, textNode.text.length])
    )

    // traverse in the reverse direction and update the map
    updateCommentThreadLengthMap(
      editor,
      commentThreadIds,
      traverseTextNodeIterator('reverse'),
      commentThreadsLengthByID
    )

    // traverse in the forward direction and update the map
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
