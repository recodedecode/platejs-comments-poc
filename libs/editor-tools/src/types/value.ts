import { TNode } from '@udecode/plate'


type EditorNodeMeta = {
  meta?: Record<string, any>
}

export type EditorNode = TNode & EditorNodeMeta & {
  imageId?: string
  bold?: boolean
  italic?: boolean
  strikethrough?: boolean
}
