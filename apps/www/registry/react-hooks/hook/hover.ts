import * as React from "react"

export function useHover<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean
] {
  const [hovering, setHovering] = React.useState(false)
  const previousNode = React.useRef<T | null>(null)

  const handleMouseEnter = React.useCallback(() => {
    setHovering(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setHovering(false)
  }, [])

  const customRef = React.useCallback(
    (node: T | null) => {
      if (previousNode.current?.nodeType === Node.ELEMENT_NODE) {
        previousNode.current.removeEventListener("mouseenter", handleMouseEnter)
        previousNode.current.removeEventListener("mouseleave", handleMouseLeave)
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        node.addEventListener("mouseenter", handleMouseEnter)
        node.addEventListener("mouseleave", handleMouseLeave)
      }

      previousNode.current = node
    },
    [handleMouseEnter, handleMouseLeave]
  )

  return [customRef, hovering]
}
