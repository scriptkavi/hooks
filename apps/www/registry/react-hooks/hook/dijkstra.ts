import { useCallback, useState } from "react"

interface UseDijkstraReturn {
  shortestPath: string[]
  distance: number | null
  isProcessing: boolean
  startDijkstra: (
    graph: Record<string, Record<string, number>>,
    start: string,
    target: string,
    onComplete?: (path: string[], distance: number | null) => void
  ) => void
  reset: () => void
}

function useDijkstra(): UseDijkstraReturn {
  const [shortestPath, setShortestPath] = useState<string[]>([])
  const [distance, setDistance] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // Dijkstra algorithm implementation
  const dijkstra = useCallback(
    (
      graph: Record<string, Record<string, number>>,
      start: string,
      target: string
    ): { path: string[]; distance: number | null } => {
      const distances: Record<string, number> = {}
      const previous: Record<string, string | null> = {}
      const unvisited = new Set(Object.keys(graph))

      for (const node of unvisited) {
        distances[node] = Infinity
        previous[node] = null
      }
      distances[start] = 0

      while (unvisited.size > 0) {
        const currentNode = Array.from(unvisited).reduce((minNode, node) =>
          distances[node] < distances[minNode] ? node : minNode
        )

        if (currentNode === target) break
        if (distances[currentNode] === Infinity) break

        unvisited.delete(currentNode)

        for (const neighbor in graph[currentNode]) {
          const newDistance =
            distances[currentNode] + graph[currentNode][neighbor]
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance
            previous[neighbor] = currentNode
          }
        }
      }

      const path: string[] = []
      let currentNode = target
      while (previous[currentNode]) {
        path.unshift(currentNode)
        currentNode = previous[currentNode]!
      }
      if (distances[target] === Infinity) {
        return { path: [], distance: null }
      }
      path.unshift(start)
      return { path, distance: distances[target] }
    },
    []
  )

  // Start Dijkstra's algorithm
  const startDijkstra = useCallback(
    (
      graph: Record<string, Record<string, number>>,
      start: string,
      target: string,
      onComplete?: (path: string[], distance: number | null) => void
    ) => {
      if (!graph || typeof graph !== "object") {
        throw new Error("Graph must be a valid adjacency list object")
      }
      if (!graph[start] || !graph[target]) {
        throw new Error("Start or target node is not in the graph")
      }

      setIsProcessing(true)
      const { path, distance } = dijkstra(graph, start, target)
      setShortestPath(path)
      setDistance(distance)
      setIsProcessing(false)

      if (onComplete) onComplete(path, distance)
    },
    [dijkstra]
  )

  // Reset the state
  const reset = useCallback(() => {
    setShortestPath([])
    setDistance(null)
    setIsProcessing(false)
  }, [])

  return {
    shortestPath,
    distance,
    isProcessing,
    startDijkstra,
    reset,
  }
}

export default useDijkstra
