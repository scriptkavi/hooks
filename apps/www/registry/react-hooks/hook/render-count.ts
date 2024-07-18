import * as React from "react"

export function useRenderCount(): number {
  const count = React.useRef(0)

  count.current++

  return count.current
}
