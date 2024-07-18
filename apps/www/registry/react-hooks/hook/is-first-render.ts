import * as React from "react"

export function useIsFirstRender(): boolean {
  const renderRef = React.useRef(true)

  if (renderRef.current === true) {
    renderRef.current = false
    return true
  }

  return false
}
