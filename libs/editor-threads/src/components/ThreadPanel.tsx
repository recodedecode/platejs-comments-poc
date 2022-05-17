import React from 'react'
import { css } from '@emotion/react'


interface Props {
  children: React.ReactNode,
}

export const ThreadPanel = ({ children }: Props) => {
  return (
    <div css={styles.component}>
      {children}
    </div>
  )
}

const styles = {
  component: css`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 340px;
    height: 100vh;
    background: #fcfcfc;
    border: 1px solid #efefef;
    border-right: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    z-index: 999;
  `,
}
