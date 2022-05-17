import create, { SetState, GetState } from 'zustand'
import { devtools, subscribeWithSelector, StoreApiWithSubscribeWithSelector } from 'zustand/middleware'


interface IComment {
  userId: string
  createdAt: string,
  comment: string
}

export interface ICommentThread {
  id: string,
  createdAt: string,
  status: string,
  comments: IComment[]
}

interface ICommentThreads {
  [id: string]: ICommentThread
}

interface IEditorCommentStore {
  activeThreadId: string | null
  threadIds: string[]
  threads: ICommentThreads
  addCommentThread: (nextThreadId: string) => void
  removeCommentThread: (nextThreadId: string) => void
  selectCommentThread: (threadId: string | null) => void
  deselectCommentThread: () => void
  addComment: (threadId: string, userId: string, comment: string) => void
  getThreadsByDate: () => ICommentThread[]
}

export const useEditorCommentStore = create<IEditorCommentStore>((set, get) => ({
  activeThreadId: null,
  threadIds: [],
  threads: {},
  addCommentThread: (threadId: string) => {
    set(state => ({
      threadIds: [...state.threadIds, threadId],
      threads: {
        ...state.threads,
        [threadId]: {
          id: threadId,
          createdAt: (new Date()).toISOString(),
          status: 'open',
          comments: [],
        }
      },
    }))
  },
  removeCommentThread: (threadId: string) => {

    const nextThreads = {
      ...get().threads,
    }
  
    delete nextThreads[threadId]
  
    set(state => ({
      activeThreadId: null,
      threadIds: get().threadIds.filter(id => id !== threadId),
      threads: nextThreads,
    }))
  },
  selectCommentThread: (threadId: string | null) => {
    set(state => ({
      activeThreadId: threadId,
    }))
  },
  deselectCommentThread: () => {
    const threadIds = get().threadIds
    const threads = get().threads

    const nextThreadIds: string[] = []
    const nextThreads: ICommentThreads = {}

    threadIds.forEach(id => {
      if (threads[id].comments.length) {
        nextThreadIds.push(id)
        nextThreads[id] = threads[id]
      }
    })

    set(state => ({
      activeThreadId: null,
      threadIds: nextThreadIds,
      threads: nextThreads,
    }))
  },
  addComment: (threadId: string, userId: string, comment: string) => {
    set(state => ({
      threads: {
        ...state.threads,
        [threadId]: {
          ...state.threads[threadId],
          comments: [
            ...state.threads[threadId].comments,
            {
              userId,
              createdAt: (new Date()).toISOString(),
              comment,
            }
          ]
        }
      },
    }))
  },
  getThreadsByDate: () => {
    const threads = Object.keys(get().threads)
      .map(key => get().threads[key])
      .sort((a, b) => a.createdAt > b.createdAt ? - 1 : 1)
    return threads
  }
}))

// TODO
// Look into why the below will not compile at build time.
/* export const useEditorCommentStore = create<
  IEditorCommentStore,
  SetState<IEditorCommentStore>,
  GetState<IEditorCommentStore>,
  StoreApiWithSubscribeWithSelector<IEditorCommentStore>
>(devtools(subscribeWithSelector((set, get) => ({
  activeThreadId: null,
  threadIds: [],
  threads: {},
  addCommentThread: (threadId: string) => {
    set(state => ({
      threadIds: [...state.threadIds, threadId],
      threads: {
        ...state.threads,
        [threadId]: {
          id: threadId,
          createdAt: (new Date()).toISOString(),
          status: 'open',
          comments: [],
        }
      },
    }), false, {
      type: 'ADD_COMMENT_THREAD',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      payload: threadId,
    })
  },
  removeCommentThread: (threadId: string) => {

    const nextThreads = {
      ...get().threads,
    }
  
    delete nextThreads[threadId]
  
    set(state => ({
      activeThreadId: null,
      threadIds: get().threadIds.filter(id => id !== threadId),
      threads: nextThreads,
    }), false, {
      type: 'REMOVE_COMMENT_THREAD',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      payload: threadId,
    })
  },
  selectCommentThread: (threadId: string | null) => {
    set(state => ({
      activeThreadId: threadId,
    }), false, {
      type: 'SELECT_COMMENT_THREAD',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      payload: threadId,
    })
  },
  deselectCommentThread: () => {
    const threadIds = get().threadIds
    const threads = get().threads

    const nextThreadIds: string[] = []
    const nextThreads: ICommentThreads = {}

    threadIds.forEach(id => {
      if (threads[id].comments.length) {
        nextThreadIds.push(id)
        nextThreads[id] = threads[id]
      }
    })

    set(state => ({
      activeThreadId: null,
      threadIds: nextThreadIds,
      threads: nextThreads,
    }), false, {
      type: 'DESELECT_COMMENT_THREAD',
    })
  },
  addComment: (threadId: string, userId: string, comment: string) => {
    set(state => ({
      threads: {
        ...state.threads,
        [threadId]: {
          ...state.threads[threadId],
          comments: [
            ...state.threads[threadId].comments,
            {
              userId,
              createdAt: (new Date()).toISOString(),
              comment,
            }
          ]
        }
      },
    }), false, {
      type: 'ADD_COMMENT',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      payload: threadId,
    })
  },
  getThreadsByDate: () => {
    const threads = Object.keys(get().threads)
      .map(key => get().threads[key])
      .sort((a, b) => a.createdAt > b.createdAt ? - 1 : 1)
    return threads
  }
}), {
  name: 'EditorCommentStore',
}))) */
