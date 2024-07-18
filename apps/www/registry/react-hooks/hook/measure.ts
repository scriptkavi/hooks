import * as React from "react"

interface Dimensions {
  width: number | null
  height: number | null
}

export function useMeasure(): [(node: Element | null) => void, Dimensions] {
  const [dimensions, setDimensions] = React.useState<Dimensions>({
    width: null,
    height: null,
  })

  const previousObserver = React.useRef<ResizeObserver | null>(null)

  const customRef = React.useCallback((node: Element | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect()
      previousObserver.current = null
    }

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize && entry.borderBoxSize.length > 0) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0]
          setDimensions({ width, height })
        } else if (entry.contentRect) {
          const { width, height } = entry.contentRect
          setDimensions({ width, height })
        }
      })

      observer.observe(node)
      previousObserver.current = observer
    }
  }, [])

  return [customRef, dimensions]
}
