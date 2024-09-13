import { useCallback, useState } from "react"

interface UseDepthFirstSearchReturn {
  exploredNodes: string[]
  path: string[] | null
  isProcessing: boolean
  startDFS: (
    graph: Record<string, string[]>,
    start: string,
    target?: string,
    onComplete?: (path: string[] | null) => void
  ) => void
  reset: () => void
}

function useDepthFirstSearch(): UseDepthFirstSearchReturn {
  const [exploredNodes, setExploredNodes] = useState<string[]>([])
  const [path, setPath] = useState<string[] | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // DFS algorithm implementation
  const dfs = useCallback(
    (
      graph: Record<string, string[]>,
      start: string,
      target?: string
    ): { exploredNodes: string[]; path: string[] | null } => {
      const explored = new Set<string>()
      const resultPath: string[] = []

      const traverse = (node: string, currentPath: string[]): boolean => {
        explored.add(node)
        currentPath.push(node)

        if (node === target) {
          resultPath.push(...currentPath) // Found the target, copy the current path
          return true // Stop further traversal
        }

        for (const neighbor of graph[node] || []) {
          if (!explored.has(neighbor)) {
            if (traverse(neighbor, currentPath)) {
              return true // Stop if target is found in a deeper recursion
            }
          }
        }

        currentPath.pop() // Backtrack
        return false // Target not found in this branch
      }

      traverse(start, [])
      return {
        exploredNodes: Array.from(explored),
        path: resultPath.length > 0 ? resultPath : null,
      }
    },
    []
  )

  // Start DFS traversal
  const startDFS = useCallback(
    (
      graph: Record<string, string[]>,
      start: string,
      target?: string,
      onComplete?: (path: string[] | null) => void
    ) => {
      if (!graph || typeof graph !== "object") {
        throw new Error("Graph must be a valid adjacency list")
      }
      if (!graph[start]) {
        throw new Error("Start node is not in the graph")
      }

      setIsProcessing(true)
      const { exploredNodes, path } = dfs(graph, start, target)
      setExploredNodes(exploredNodes)
      setPath(path)
      setIsProcessing(false)

      if (onComplete) onComplete(path)
    },
    [dfs]
  )

  // Reset the state
  const reset = useCallback(() => {
    setExploredNodes([])
    setPath(null)
    setIsProcessing(false)
  }, [])

  return {
    exploredNodes,
    path,
    isProcessing,
    startDFS,
    reset,
  }
}

export default useDepthFirstSearch
