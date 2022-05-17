import { Element, Node, Text, Transforms } from 'slate'
import { createPluginFactory } from '@udecode/plate'
import { CommentLeaf, TextLeaf } from '../components'
import { MARK_COMMENT_THREAD } from '../constants'


const withComments = (editor: any) => {

  const { normalizeNode } = editor

  editor.normalizeNode = entry => {
    const [node, path] = entry
    
    if (Element.isElement(node) && node.type === 'p') {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Text.isText(child) && child?.comment) {
          console.log('[is text]', node, childPath)
          Transforms.unwrapNodes(editor, {
            at: childPath,
            match: (n) => Text.isText(n) && n.comment
          })
        }
      }
    }

    normalizeNode(entry)
  }
  return editor
}

export const createCommentThreadPlugin = createPluginFactory({
  key: MARK_COMMENT_THREAD,
  isLeaf: true,
  // component: CommentLeaf,
  // withOverrides: withComments,
})

export const createTextPlugin = createPluginFactory({
  key: 'text',
  isLeaf: true,
  component: TextLeaf,
})
