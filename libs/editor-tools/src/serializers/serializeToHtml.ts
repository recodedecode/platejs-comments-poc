import { PlateEditor, serializeHtml } from '@udecode/plate'
import { EditorNode } from '../types'


export const serializeToHtml = (
  editor: PlateEditor,
  nodes: EditorNode[] | null,
) => {
  return serializeHtml(editor, {
    nodes: nodes || [],
  })
}
