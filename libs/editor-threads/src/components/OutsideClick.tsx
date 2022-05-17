import React, { useCallback, useEffect, useRef } from 'react'


interface Props {
  children: React.ReactElement
  onClickOutside: (event: any) => void
}

export const OutsideClick = ({ children, onClickOutside }: Props) => {

  const clickCaptured = useRef(false)

  const onInnerClick = useCallback(() => {
    clickCaptured.current = true
  }, [clickCaptured])

  const onDocumentClick = useCallback((event: any) => {
    if ( ! clickCaptured.current && onClickOutside) {
      onClickOutside(event)
    }
    clickCaptured.current = false
  }, [clickCaptured, onClickOutside])

  useEffect(() => {
    document.addEventListener('mousedown', onDocumentClick)
    document.addEventListener('touchstart', onDocumentClick)

    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      document.addEventListener('touchstart', onDocumentClick)
    }
  }, [onDocumentClick])

  return React.cloneElement(children, {
    onMouseDown: onInnerClick,
    onTouchStart: onInnerClick,
  })
}
