import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { UserCircle } from '@styled-icons/boxicons-regular/UserCircle'
import { css } from '@emotion/react'
import { ICommentThread, useOnClickOutside } from '@proto/editor-comments'
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

  const onClickOutside = useOnClickOutside()

  return (
    <OutsideClick
      onClickOutside={onClickOutside}>
      <div
        css={[styles.component, active && styles.active]}
        data-slate-comment={id}
        onClick={onHighlightThread}>
        <button
          onClick={onRemoveComment}>
          Remove
        </button>
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
          autofocus={comments.length === 0}
          onAddComment={onAddComment} />
      </div>
    </OutsideClick>
  )
}

const styles = {
  component: css`
    display: flex;
    flex-direction: column;
    margin: 8px;
    padding: 8px;
    width: auto;
    border: 1px solid #efefef;
    border-radius: 8px;
  `,
  active: css`
    background: #fff;
    border: 1px solid rgba(252, 198, 3, 0.8);
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
}