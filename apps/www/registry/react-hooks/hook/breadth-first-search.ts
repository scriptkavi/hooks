import { useCallback, useState } from "react"

interface UseBreadthFirstSearchReturn {
  exploredNodes: string[]
  path: string[] | null
  isProcessing: boolean
  startBFS: (
    graph: Record<string, string[]>,
    start: string,
    target?: string,
    onComplete?: (path: string[] | null) => void
  ) => void
  reset: () => void
}

function useBreadthFirstSearch(): UseBreadthFirstSearchReturn {
  const [exploredNodes, setExploredNodes] = useState<string[]>([])
  const [path, setPath] = useState<string[] | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // BFS algorithm implementation
  const bfs = useCallback(
    (
      graph: Record<string, string[]>,
      start: string,
      target?: string
    ): { exploredNodes: string[]; path: string[] | null } => {
      const queue: string[][] = [[start]] // Queue holds paths, not just nodes
      const explored = new Set<string>()
      explored.add(start)

      while (queue.length > 0) {
        const currentPath = queue.shift()! // Get the first path from the queue
        const currentNode = currentPath[currentPath.length - 1] // Last node in the current path

        if (currentNode === target) {
          return { exploredNodes: Array.from(explored), path: currentPath } // Return the path if the target is found
        }

        for (const neighbor of graph[currentNode] || []) {
          if (!explored.has(neighbor)) {
            explored.add(neighbor)
            queue.push([...currentPath, neighbor]) // Add the neighbor to the current path and enqueue it
          }
        }
      }

      return { exploredNodes: Array.from(explored), path: target ? null : [] } // Return all explored nodes and null if no path to target
    },
    []
  )

  // Start BFS traversal
  const startBFS = useCallback(
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
      const { exploredNodes, path } = bfs(graph, start, target)
      setExploredNodes(exploredNodes)
      setPath(path)
      setIsProcessing(false)

      if (onComplete) onComplete(path)
    },
    [bfs]
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
    startBFS,
    reset,
  }
}

export default useBreadthFirstSearch
