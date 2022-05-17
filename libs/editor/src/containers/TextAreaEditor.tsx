import {
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Plate,
  PlateEditor,
  PlateProvider,
  MentionCombobox,
  usePlateStore,
} from '@udecode/plate'

import {
  configTextArea,
  createTextAreaPlugins,
  TextareaToolbar,
} from '@proto/editor-config'

import {
  EditorNode,
} from '@proto/editor-tools'

import {
  CommentThreads
} from '@proto/editor-threads'


export interface TextAreaEditorRef {
  get: {
    editor: () => PlateEditor
    value: () => EditorNode[]
  }
}

interface Props {
  id: string
  comments?: boolean
  onBlur?: () => void
  onFocus?: () => void
  onChange?: (nodes: EditorNode[]) => void
}

const TextAreaEditorWrapped = forwardRef(({
  id,
  comments,
  onBlur,
  onFocus,
  ...props
}: Props, ref: any) => {

  const state = usePlateStore(id)
  const [focussed, setFocussed] = useState(false)
  console.log('TextAreaEditor - render')

  const { plugins } = useMemo(() => {
    return createTextAreaPlugins()
  }, [])

  const editableProps = useMemo(() => ({
    ...configTextArea.editableProps,
    onBlur: () => {
      setFocussed(false)
      onBlur && onBlur()
    },
    onFocus: () => {
      setFocussed(true)
      onFocus && onFocus()
    },
  }), [onBlur, onFocus])

  useEffect(() => {
    if ( ! ref) {
      return
    }
    ref.current = {
      get: {
        editor: () => state.get.editor(),
        value: () => state.get.value() || [],
      },
    }
  }, [ref, state])

  return (
    <div className="editor">
      <Plate
        id={id}
        editableProps={editableProps} 
        plugins={plugins}
        {...props}>
        <div className={`editor-toolbar ${focussed ? 'editor-toolbar-active' : ''}`}>
          <TextareaToolbar comments={comments} />
        </div>
        <MentionCombobox items={configTextArea.mentionItems} />
      </Plate>
      {comments && (
        <CommentThreads id={id} />
      )}
    </div>
  )
})

export const TextAreaEditor = memo(forwardRef(({ id, ...props }: Props, ref: any) => (
  <PlateProvider id={id}>
    <TextAreaEditorWrapped
      id={id}
      {...props}
      ref={ref} />
  </PlateProvider>
)))
