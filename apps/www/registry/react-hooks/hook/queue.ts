import * as React from "react"

export function useQueue<T>(initialValue: T[] = []): {
  add: (element: T) => void
  remove: () => T | undefined
  clear: () => void
  first: T | undefined
  last: T | undefined
  size: number
  queue: T[]
} {
  const [queue, setQueue] = React.useState<T[]>(initialValue)

  const add = React.useCallback((element: T) => {
    setQueue((q) => [...q, element])
  }, [])

  const remove = React.useCallback((): T | undefined => {
    let removedElement: T | undefined

    setQueue(([first, ...q]) => {
      removedElement = first
      return q
    })

    return removedElement
  }, [])

  const clear = React.useCallback(() => {
    setQueue([])
  }, [])

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  }
}
