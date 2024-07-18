import * as React from "react"

interface WindowSize {
  width: number | null
  height: number | null
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = React.useState<WindowSize>({
    width: null,
    height: null,
  })

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return size
}
