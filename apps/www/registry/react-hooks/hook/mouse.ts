import * as React from "react"

interface MouseState {
  x: number
  y: number
  elementX: number
  elementY: number
  elementPositionX: number
  elementPositionY: number
}

export function useMouse(): [MouseState, React.RefObject<Element>] {
  const [state, setState] = React.useState<MouseState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  })

  const ref = React.useRef<Element | null>(null)

  React.useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      }

      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect()
        const elementPositionX = left + window.scrollX
        const elementPositionY = top + window.scrollY
        const elementX = event.pageX - elementPositionX
        const elementY = event.pageY - elementPositionY

        newState.elementX = elementX
        newState.elementY = elementY
        newState.elementPositionX = elementPositionX
        newState.elementPositionY = elementPositionY
      }

      setState((s) => ({
        ...s,
        ...newState,
      }))
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return [state, ref]
}
