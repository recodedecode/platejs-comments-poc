import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { TextAreaEditor, TextAreaEditorRef } from '@proto/editor'

import {
  EditorNode,
  countChars,
  countWords,
  serializeToHtml,
  serializeToPlaintext
} from '@proto/editor-tools'


export const CommentsScreen = () => {

  const editorRef = useRef<TextAreaEditorRef>()
  const [value, setValue] = useState<EditorNode[]>([])
  const [preview, setPreview] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  const [plaintext, setPlaintext] = useState('')
  const [html, setHtml] = useState('')

  const onHidePreview = useCallback(() => {
    setPreview(false)
  }, [])

  const onSave = useCallback(() => {
    if ( ! editorRef?.current) {
      return
    }
    setPlaintext(serializeToPlaintext(value))
    setHtml(serializeToHtml(editorRef.current.get.editor(), value))
    setPreview(true)
  }, [editorRef, value])

  const onChange = useCallback((nodes: EditorNode[]) => {
    setValue(nodes)
    const string = serializeToPlaintext(nodes)
    setCharCount(countChars(string))
    setWordCount(countWords(string))
  }, [])

  const wordCountColor = wordCount > 50
    ? 'error'
    : wordCount > 40
      ? 'warning'
      : 'info'

  return (
    <main className="app app-comments">
      <Link href="/" passHref>
        <a className="back">
          &larr; Home
        </a>
      </Link>
      <div className="container">
        <div className="intro">
          <h1>Demo Rich Text Editor</h1>
          <p>
            The below is a proof of concept rich &#34;textarea&#34;.
            With this component it&#39;s possible to modify the way content is displayed inside,
            including for image and media elements which are currently not included in this demo.
          </p>
          <p>
            Content can be saved in AST like format, plaintext or html
            - you can see a partial demonstration of this when entering text and selecting the save button.
            You can also set character and word limits - try typing more than 50 words below to see the effect.
          </p>
        </div>
        <TextAreaEditor
          id="textareaplayground"
          comments
          ref={editorRef}
          onChange={onChange} />
        <div className={`editor-meta ${wordCountColor}`}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </div>
        <div className="actions">
          <button
            className="action action-primary"
            onClick={onSave}>
            Preview
          </button>
          <button
            className="action pad-left-1"
            onClick={onHidePreview}>
            Hide
          </button>
        </div>
        {preview && (
          <>
            <div className="preview">
              <h2>Plaintext</h2>
              <div dangerouslySetInnerHTML={{ __html: plaintext }}/>
            </div>
            <div className="preview">
              <h2>HTML</h2>
              <div dangerouslySetInnerHTML={{ __html: html }}/>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default CommentsScreen
