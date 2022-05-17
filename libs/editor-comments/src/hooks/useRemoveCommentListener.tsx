import { useEffect } from 'react'
import { PlateEditor } from '@udecode/plate'
import { useEditorCommentStore } from '../store'
import { removeCommentMarks } from '../utils'


export const useRemoveCommentListener = (editor: PlateEditor) => {
  
  useEffect(() => {
  
    const unsubscribe = useEditorCommentStore
      .subscribe(async (next, prev) => {
        const marksToRemove = prev.threadIds
          .filter(threadId => ! next.threadIds.includes(threadId))

        for (const markToRemove of marksToRemove) {
          await removeCommentMarks(editor, markToRemove)
        }
      })

    return unsubscribe
  }, [editor])

}

