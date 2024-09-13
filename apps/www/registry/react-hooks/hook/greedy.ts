import { useCallback, useState } from "react"

interface UseGreedyAlgorithmReturn<T> {
  solution: T[]
  isProcessing: boolean
  startGreedy: (
    problemData: T[],
    greedyChoice: (data: T[]) => T,
    isFeasible?: (solution: T[], nextStep: T) => boolean,
    onComplete?: (solution: T[]) => void
  ) => void
  reset: () => void
}

function useGreedyAlgorithm<T = number>(): UseGreedyAlgorithmReturn<T> {
  const [solution, setSolution] = useState<T[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const greedyAlgorithm = useCallback(
    (
      data: T[],
      greedyChoice: (data: T[]) => T,
      isFeasible?: (solution: T[], nextStep: T) => boolean
    ): T[] => {
      let solution: T[] = []

      while (data.length > 0) {
        const nextStep = greedyChoice(data)
        if (!isFeasible || isFeasible(solution, nextStep)) {
          solution.push(nextStep)
        }
        data = data.filter((item) => item !== nextStep)
      }

      return solution
    },
    []
  )

  const startGreedy = useCallback(
    (
      problemData: T[],
      greedyChoice: (data: T[]) => T,
      isFeasible?: (solution: T[], nextStep: T) => boolean,
      onComplete?: (solution: T[]) => void
    ) => {
      if (!Array.isArray(problemData)) {
        throw new Error("Input must be an array")
      }
      if (!problemData.length) {
        setSolution([])
        if (onComplete) onComplete([])
        return
      }

      setIsProcessing(true)
      const sortedSolution = greedyAlgorithm(
        [...problemData],
        greedyChoice,
        isFeasible
      )
      setSolution(sortedSolution)
      setIsProcessing(false)

      if (onComplete) onComplete(sortedSolution)
    },
    [greedyAlgorithm]
  )

  const reset = useCallback(() => {
    setSolution([])
    setIsProcessing(false)
  }, [])

  return {
    solution,
    isProcessing,
    startGreedy,
    reset,
  }
}

export default useGreedyAlgorithm
