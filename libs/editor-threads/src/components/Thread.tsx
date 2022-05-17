import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { UserCircle } from '@styled-icons/boxicons-regular/UserCircle'
import { css } from '@emotion/react'
import { ICommentThread, useDeselectComment } from '@proto/editor-comments'
import { AddComment } from './AddComment'
import { OutsideClick } from './OutsideClick'


interface Props extends ICommentThread {
  active?: boolean
  onAddComment: (id: string, userId: string, comment: string) => void
  onHighlightThread: () => void
  onRemoveComment: () => void
}

export const Thread = ({
  id,
  active,
  comments,
  onAddComment,
  onHighlightThread,
  onRemoveComment
}: Props) => {

  const onClickOutside = useDeselectComment()
  const hasComments = !! comments.length

  return (
    <OutsideClick
      onClickOutside={onClickOutside}>
      <div
        css={[styles.component, active && styles.active]}
        data-slate-comment={id}
        onClick={onHighlightThread}>
        {hasComments ? (
          <button
            css={styles.remove}
            onClick={onRemoveComment}>
            ✕
          </button>
        ) : (
          <h3 css={styles.name}>New Comment</h3>
        )}
        {comments.map((comment, index) => (
          <div
            key={index}
            css={styles.comment}>
            <div css={styles.header}>
              <UserCircle css={styles.avatar} />
              <div css={styles.user}>
                <h3 css={styles.name}>Marz</h3>
                <span css={styles.timeAgo}>
                  <ReactTimeAgo date={new Date(comment.createdAt)} />
                </span>
              </div>
            </div>
            <div css={styles.message}>
            {comment.comment}
            </div>
          </div>
        ))}
        <AddComment
          threadId={id}
          autofocus={ ! hasComments}
          onAddComment={onAddComment} />
      </div>
    </OutsideClick>
  )
}

const styles = {
  component: css`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 8px;
    padding: 8px;
    width: auto;
    border: 1px solid #efefef;
    border-radius: 8px;
    transition: border 0.2s ease-out;

    &:hover {
      border: 1px solid #ccc;
    }
  `,
  active: css`
    background: #fff;
    border: 1px solid rgba(252, 198, 3, 0.8);

    &:hover {
      border: 1px solid rgba(252, 198, 3, 0.8);
    }
  `,
  status: css`
    display: inline-block;
    padding: 2px 8px;
    color: #fff;
    font-size: 0.8rem;
    background: #1476DB;
    border-radius: 4px;
  `,
  comment: css`
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    cursor: pointer;

    h3 {
      transition: color 0.2s ease-out;
    }

    &:hover h3 {
      color: #1476DB;
    }

    svg {
      transition: fill 0.2s ease-out;
    }

    &:hover svg {
      fill: #1476DB;
    }
  `,
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  avatar: css`
    width: 20px;
    height: 20px;
  `,
  user: css`
    display: flex;
    flex-direction: column;
    padding-left: 5px;
  `,
  name: css`
    display: inline-block;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.3rem;
  `,
  timeAgo: css`
    display: inline-block;
    color: rgba(1, 1, 1, 0.5);
    font-size: 0.8rem;
  `,
  message: css`
    padding: 0px 0 0 25px;
    font-size: 1rem;
  `,
  remove: css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ccc;
    font-size: 18px;
    font-weight: 200;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease-out;

    &:hover {
      color: #f54242;
    }
  `,
}
