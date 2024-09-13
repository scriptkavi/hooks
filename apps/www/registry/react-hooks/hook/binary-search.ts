import { useCallback, useState } from "react"

interface UseBinarySearchReturn<T> {
  foundIndex: number | null
  isSearching: boolean
  startSearch: (
    array: T[],
    target: T,
    comparator?: (a: T, b: T) => number,
    onComplete?: (index: number | null) => void
  ) => void
  reset: () => void
}

function useBinarySearch<T = number>(): UseBinarySearchReturn<T> {
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const defaultComparator = (a: T, b: T): number => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  const binarySearch = useCallback(
    (
      array: T[],
      target: T,
      comparator: (a: T, b: T) => number
    ): number | null => {
      let low = 0
      let high = array.length - 1

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const comparison = comparator(array[mid], target)

        if (comparison === 0) {
          return mid
        } else if (comparison < 0) {
          low = mid + 1
        } else {
          high = mid - 1
        }
      }
      return null
    },
    []
  )

  const startSearch = useCallback(
    (
      array: T[],
      target: T,
      comparator: (a: T, b: T) => number = defaultComparator,
      onComplete?: (index: number | null) => void
    ) => {
      if (!Array.isArray(array)) {
        throw new Error("Input must be an array")
      }
      if (!array.length) {
        setFoundIndex(null)
        if (onComplete) onComplete(null)
        return
      }

      setIsSearching(true)
      const index = binarySearch(array, target, comparator)
      setFoundIndex(index)
      setIsSearching(false)

      if (onComplete) onComplete(index)
    },
    [binarySearch]
  )

  const reset = useCallback(() => {
    setFoundIndex(null)
    setIsSearching(false)
  }, [])

  return {
    foundIndex,
    isSearching,
    startSearch,
    reset,
  }
}

export default useBinarySearch
