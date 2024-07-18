import * as React from "react"

interface WindowScrollState {
  x: number | null
  y: number | null
}

export function useWindowScroll(): [
  WindowScrollState,
  (scroll: ScrollToOptions | [number, number]) => void
] {
  const [state, setState] = React.useState<WindowScrollState>({
    x: null,
    y: null,
  })

  const scrollTo = React.useCallback(
    (scroll: ScrollToOptions | [number, number]) => {
      if (Array.isArray(scroll)) {
        const [x, y] = scroll
        window.scrollTo(x, y)
      } else {
        window.scrollTo(scroll)
      }
    },
    []
  )

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return [state, scrollTo]
}
