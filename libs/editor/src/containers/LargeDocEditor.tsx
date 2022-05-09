import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo
} from 'react'

import {
  Plate,
  PlateProvider,
  MentionCombobox,
  usePlateStore,
} from '@udecode/plate'

import {
  configLargeDoc,
  createTextAreaPlugins,
  LargeDocToolbar,
} from '@proto/editor-config'

import {
  serializeToHtml,
  serializeToPlaintext,
  EditorNode,
} from '@proto/editor-tools'

import {
  BallonToolbar,
} from '../components'


export interface LargeDocEditorRef {
  getValue: () => EditorNode[]
  serializeToHtml: () => string
  serializeToPlaintext: () => string
}

interface Props {
  id: string
  // ref?: MutableRefObject<LargeDocEditorRef>
  onBlur?: () => void
  onFocus?: () => void
}

const LargeDocEditorWrapped = forwardRef(({ id, onBlur, onFocus }: Props, ref: any) => {

  const state = usePlateStore(id)

  const { plugins } = useMemo(() => {
    return createTextAreaPlugins()
  }, [])

  const serializeHtml = useCallback(() => {
    const editor = state.get.editor()
    const value = state.get.value()
    return editor && value
      ? serializeToHtml(editor, value)
      : ''
  }, [state])

  const serializePlaintext = useCallback(() => {
    const value = state.get.value()
    return value
      ? serializeToPlaintext(value)
      : ''
  }, [state])

  const editableProps = useMemo(() => ({
    ...configLargeDoc.editableProps,
    onBlur,
    onFocus,
  }), [onBlur, onFocus])

  useEffect(() => {
    if ( ! ref) {
      return
    }
    ref.current = {
      getValue: () => state.get.value() || [],
      serializeToHtml: serializeHtml,
      serializeToPlaintext: serializePlaintext,
    }
  }, [ref, state, serializeHtml, serializePlaintext])

  return (
    <div>
      <Plate
        id={id}
        editableProps={editableProps} 
        plugins={plugins}>
        <LargeDocToolbar />
        <BallonToolbar />
        <MentionCombobox items={configLargeDoc.mentionItems} />
      </Plate>
    </div>
  )
})

export const LargeDocEditor = forwardRef(({ id, ...props }: Props, ref: any) => (
  <PlateProvider id={id}>
    <LargeDocEditorWrapped
      id={id}
      {...props}
      ref={ref} />
  </PlateProvider>
))
