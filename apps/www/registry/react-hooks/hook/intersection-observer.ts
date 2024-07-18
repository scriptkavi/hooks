import * as React from "react"

interface IntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | Document | null
  rootMargin?: string
}

export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [(node: Element | null) => void, IntersectionObserverEntry | null] {
  const { threshold = 1, root = null, rootMargin = "0px" } = options
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null
  )

  const previousObserver = React.useRef<IntersectionObserver | null>(null)

  const customRef = React.useCallback(
    (node: Element | null) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect()
        previousObserver.current = null
      }

      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setEntry(entry)
          },
          { threshold, root, rootMargin }
        )

        observer.observe(node)
        previousObserver.current = observer
      }
    },
    [threshold, root, rootMargin]
  )

  return [customRef, entry]
}
