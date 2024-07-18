import * as React from "react"

export function useSet<T>(values?: Iterable<T>): Set<T> {
  const setRef = React.useRef(new Set(values))
  const [, reRender] = React.useReducer((x) => x + 1, 0)

  const originalAdd = setRef.current.add.bind(setRef.current)
  setRef.current.add = (value: T) => {
    const res = originalAdd(value)
    reRender()
    return res
  }

  const originalClear = setRef.current.clear.bind(setRef.current)
  setRef.current.clear = () => {
    originalClear()
    reRender()
  }

  const originalDelete = setRef.current.delete.bind(setRef.current)
  setRef.current.delete = (value: T) => {
    const res = originalDelete(value)
    reRender()
    return res
  }

  return setRef.current
}
