import { Node } from 'slate'
import { EditorNode } from '../types'


export const serializeToPlaintext = (nodes: EditorNode[]) => {
  return nodes
    .map(n => Node.string(n))
    .join('\n')
}
