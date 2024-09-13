import { useCallback, useState } from "react"

interface Point {
  x: number
  y: number
}

interface UseGrahamScanReturn {
  convexHull: Point[]
  isProcessing: boolean
  startScan: (points: Point[], onComplete?: (hull: Point[]) => void) => void
  reset: () => void
}

function useGrahamScan(): UseGrahamScanReturn {
  const [convexHull, setConvexHull] = useState<Point[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const crossProduct = (o: Point, a: Point, b: Point): number => {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
  }

  const polarAngleSort = (points: Point[], start: Point): Point[] => {
    return points.sort((a, b) => {
      const cross = crossProduct(start, a, b)
      if (cross === 0) {
        // If the points are collinear, sort by distance from the start point
        const distA = (a.x - start.x) ** 2 + (a.y - start.y) ** 2
        const distB = (b.x - start.x) ** 2 + (b.y - start.y) ** 2
        return distA - distB
      }
      return cross < 0 ? 1 : -1 // Sort by polar angle
    })
  }

  const grahamScan = useCallback((points: Point[]): Point[] => {
    if (points.length < 3) return points

    // Step 1: Find the point with the lowest y-coordinate (leftmost in case of tie)
    const start = points.reduce((lowest, point) =>
      point.y < lowest.y || (point.y === lowest.y && point.x < lowest.x)
        ? point
        : lowest
    )

    // Step 2: Sort the points by polar angle with the start point
    const sortedPoints = polarAngleSort(
      points.filter((p) => p !== start),
      start
    )

    // Step 3: Initialize the convex hull with the first three points
    const hull: Point[] = [start, sortedPoints[0], sortedPoints[1]]

    // Step 4: Process the remaining points
    for (let i = 2; i < sortedPoints.length; i++) {
      const point = sortedPoints[i]
      while (
        hull.length >= 2 &&
        crossProduct(hull[hull.length - 2], hull[hull.length - 1], point) <= 0
      ) {
        hull.pop() // Remove the last point from the hull
      }
      hull.push(point) // Add the current point to the hull
    }

    return hull
  }, [])

  const startScan = useCallback(
    (points: Point[], onComplete?: (hull: Point[]) => void) => {
      if (!Array.isArray(points) || points.length < 3) {
        throw new Error(
          "At least 3 points are required to compute the convex hull"
        )
      }

      setIsProcessing(true)
      const hull = grahamScan(points)
      setConvexHull(hull)
      setIsProcessing(false)

      if (onComplete) onComplete(hull)
    },
    [grahamScan]
  )

  const reset = useCallback(() => {
    setConvexHull([])
    setIsProcessing(false)
  }, [])

  return {
    convexHull,
    isProcessing,
    startScan,
    reset,
  }
}

export default useGrahamScan
