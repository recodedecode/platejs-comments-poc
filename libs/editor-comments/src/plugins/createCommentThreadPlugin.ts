import { createPluginFactory } from '@udecode/plate'
import { TextLeaf } from '../components'
import { MARK_COMMENT } from '../constants'


export const createCommentThreadPlugin = createPluginFactory({
  key: MARK_COMMENT,
  isLeaf: true,
  // component: CommentLeaf,
  // withOverrides: withComments,
})

export const createTextPlugin = createPluginFactory({
  key: 'text',
  isLeaf: true,
  component: TextLeaf,
})
