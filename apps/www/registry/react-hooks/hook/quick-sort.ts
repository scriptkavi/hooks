import { useCallback, useState } from "react"

interface UseQuickSortReturn<T> {
  sortedArray: T[]
  isSorting: boolean
  startSort: (
    array: T[],
    comparator?: (a: T, b: T) => number,
    onComplete?: (sortedArray: T[]) => void
  ) => void
  reset: () => void
}

function useQuickSort<T = number>(): UseQuickSortReturn<T> {
  const [sortedArray, setSortedArray] = useState<T[]>([])
  const [isSorting, setIsSorting] = useState<boolean>(false)

  // Default comparator for primitive types
  const defaultComparator = (a: T, b: T): number => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  // Quick sort algorithm implementation
  const quickSort = useCallback(
    (array: T[], comparator: (a: T, b: T) => number): T[] => {
      if (array.length <= 1) {
        return array
      }

      const pivotIndex = Math.floor(array.length / 2)
      const pivot = array[pivotIndex]

      const left = array.filter(
        (item, index) => index !== pivotIndex && comparator(item, pivot) < 0
      )
      const right = array.filter(
        (item, index) => index !== pivotIndex && comparator(item, pivot) >= 0
      )

      return [
        ...quickSort(left, comparator),
        pivot,
        ...quickSort(right, comparator),
      ]
    },
    []
  )

  // Start sorting function
  const startSort = useCallback(
    (
      array: T[],
      comparator: (a: T, b: T) => number = defaultComparator,
      onComplete?: (sortedArray: T[]) => void
    ) => {
      if (!Array.isArray(array)) {
        throw new Error("Input must be an array")
      }
      if (!array.length) {
        setSortedArray([])
        if (onComplete) onComplete([])
        return
      }

      setIsSorting(true)
      const sorted = quickSort(array, comparator)
      setSortedArray(sorted)
      setIsSorting(false)

      if (onComplete) onComplete(sorted)
    },
    [quickSort]
  )

  // Reset the hook state
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

export default useQuickSort
