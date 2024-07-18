import * as React from "react"

interface HistoryState<T> {
  past: T[]
  present: T | null
  future: T[]
}

type HistoryAction<T> =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: T }
  | { type: "CLEAR"; initialPresent: T }

const initialUseHistoryStateState = <T>(
  initialPresent: T
): HistoryState<T> => ({
  past: [],
  present: initialPresent,
  future: [],
})

function useHistoryStateReducer<T>(
  state: HistoryState<T>,
  action: HistoryAction<T>
): HistoryState<T> {
  const { past, present, future } = state

  switch (action.type) {
    case "UNDO":
      if (past.length === 0) return state
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1] ?? null,
        future: present !== null ? [present, ...future] : future,
      }
    case "REDO":
      if (future.length === 0) return state
      return {
        past: present !== null ? [...past, present] : past,
        present: future[0] ?? null,
        future: future.slice(1),
      }
    case "SET":
      if (action.newPresent === present) return state
      return {
        past: present !== null ? [...past, present] : past,
        present: action.newPresent,
        future: [],
      }
    case "CLEAR":
      return initialUseHistoryStateState(action.initialPresent)
    default:
      throw new Error("Unsupported action type")
  }
}

export function useHistoryState<T>(initialPresent: T): {
  state: T | unknown | null
  set: (newPresent: T) => void
  undo: () => void
  redo: () => void
  clear: () => void
  canUndo: boolean
  canRedo: boolean
} {
  const initialPresentRef = React.useRef(initialPresent)

  const [state, dispatch] = React.useReducer(
    useHistoryStateReducer,
    initialUseHistoryStateState(initialPresentRef.current)
  )

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = React.useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" })
    }
  }, [canUndo])

  const redo = React.useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" })
    }
  }, [canRedo])

  const set = React.useCallback(
    (newPresent: T) => dispatch({ type: "SET", newPresent }),
    []
  )

  const clear = React.useCallback(
    () =>
      dispatch({ type: "CLEAR", initialPresent: initialPresentRef.current }),
    []
  )

  return { state: state.present, set, undo, redo, clear, canUndo, canRedo }
}
