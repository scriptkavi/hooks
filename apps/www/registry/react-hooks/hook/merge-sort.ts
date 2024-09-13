import { useCallback, useState } from "react"

interface UseMergeSortReturn<T> {
  sortedArray: T[]
  isSorting: boolean
  startSort: (
    array: T[],
    comparator?: (a: T, b: T) => number,
    onComplete?: (sorted: T[]) => void
  ) => void
  reset: () => void
}

function useMergeSort<T = number>(): UseMergeSortReturn<T> {
  const [sortedArray, setSortedArray] = useState<T[]>([])
  const [isSorting, setIsSorting] = useState<boolean>(false)

  // Default comparator
  const defaultComparator = (a: T, b: T): number => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  const merge = useCallback(
    (left: T[], right: T[], comparator: (a: T, b: T) => number): T[] => {
      let result: T[] = []
      let leftIndex = 0
      let rightIndex = 0

      while (leftIndex < left.length && rightIndex < right.length) {
        if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
          result.push(left[leftIndex])
          leftIndex++
        } else {
          result.push(right[rightIndex])
          rightIndex++
        }
      }

      return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex))
    },
    []
  )

  const mergeSort = useCallback(
    (array: T[], comparator: (a: T, b: T) => number): T[] => {
      if (array.length <= 1) {
        return array
      }

      const middle = Math.floor(array.length / 2)
      const left = array.slice(0, middle)
      const right = array.slice(middle)

      return merge(
        mergeSort(left, comparator),
        mergeSort(right, comparator),
        comparator
      )
    },
    [merge]
  )

  const startSort = useCallback(
    (
      array: T[],
      comparator: (a: T, b: T) => number = defaultComparator,
      onComplete?: (sorted: T[]) => void
    ) => {
      if (!Array.isArray(array)) {
        throw new Error("Input must be an array")
      }
      setIsSorting(true)
      const sorted = mergeSort(array, comparator)
      setSortedArray(sorted)
      setIsSorting(false)
      if (onComplete) onComplete(sorted)
    },
    [mergeSort]
  )

  const reset = useCallback(() => {
    setSortedArray([])
    setIsSorting(false)
  }, [])

  return {
    sortedArray,
    isSorting,
    startSort,
    reset,
  }
}

export default useMergeSort
