import * as React from "react"

export function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = React.useState(value)
  const lastUpdated = React.useRef<number | null>(null)

  React.useEffect(() => {
    const now = Date.now()

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now
        setThrottledValue(value)
      }, interval)

      return () => window.clearTimeout(id)
    }
  }, [value, interval])

  return throttledValue
}
