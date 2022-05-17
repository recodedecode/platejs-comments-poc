import { getRootProps } from '@udecode/plate-styled-components'
import { CommentLeaf } from './CommentLeaf'
import { getCommentThreadsOnTextNode } from '../utils'


export const TextLeaf = (
  props: any,
) => {

  const { attributes, children, leaf, nodeProps } = props
  const rootProps = getRootProps(props)
  const hasComments = getCommentThreadsOnTextNode(leaf)

  if (hasComments.length) {
    return (
      <CommentLeaf {...props}>
        {children}
      </CommentLeaf>
    )
  }

  return (
    <span
      {...attributes}
      {...rootProps}
      {...nodeProps}>
      {children}
    </span>
  )
}
