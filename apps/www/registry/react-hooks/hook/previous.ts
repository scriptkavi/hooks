import * as React from "react"

export function usePrevious<T>(value: T): T | null {
  const [current, setCurrent] = React.useState<T>(value)
  const [previous, setPrevious] = React.useState<T | null>(null)

  if (value !== current) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}
