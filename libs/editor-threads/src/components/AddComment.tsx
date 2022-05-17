import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { css } from '@emotion/react'


interface Props {
  threadId: string
  autofocus?: boolean
  onAddComment: (id: string, userId: string, comment: string) => void
}

export const AddComment = memo(({ threadId, autofocus, onAddComment }: Props) => {

  const ref = useRef<any>()
  const [value, setValue] = useState('')
  const disabled = ! value.length

  const onClick = useCallback(() => {
    if (ref?.current?.value) {
      onAddComment(threadId, 'user-01', value)
      ref.current.value = ''
      setValue('')
    }
  }, [value, threadId, onAddComment])

  const onChange = useCallback((event: any) => {
    setValue(event.target.value)
  }, [])

  useEffect(() => {
    if ( ! ref?.current || ! autofocus) {
      return
    }

    const timeoutId = setTimeout(() => {
      ref.current.focus()
    }, 50)
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, [ref, autofocus])

  return (
    <div css={styles.component}>
      <TextareaAutosize
        css={styles.textarea}
        maxRows={15}
        minRows={1}
        placeholder={'Comment here...'}
        onChange={onChange}
        ref={ref} />
      <button
        css={styles.button}
        disabled={disabled}
        onClick={onClick}>
        Comment
      </button>
    </div>
  )
})

const styles = {
  component: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  textarea: css`
    display: flex;
    margin: 10px 0;
    padding: 5px 10px;
    font-family: ui-sans-serif, system-ui;
    font-size: 1rem;
    line-height: 1.4rem;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 4px;
    resize: none;

    &:focus {
      border: 1px solid rgba(230, 230, 230, 1);
      box-shadow: none;
      outline: none;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  `,
  button: css`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    background-color: #1476DB;
    transition: background-color 0.3s ease-out;

    &:hover {
      background-color: #0d64bd;
    }

    &:disabled {
      background-color: #efefef;
    }
  `,
}
