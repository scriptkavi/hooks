import * as React from "react"

interface RenderInfo {
  name: string
  renders: number
  sinceLastRender: number
  timestamp: number
}

export function useRenderInfo(name = "Unknown"): RenderInfo | undefined {
  const count = React.useRef(0)
  const lastRender = React.useRef<number | undefined>()
  const now = Date.now()

  count.current++

  React.useEffect(() => {
    lastRender.current = Date.now()
  })

  const sinceLastRender = lastRender.current ? now - lastRender.current : 0

  if (process.env.NODE_ENV !== "production") {
    const info = {
      name,
      renders: count.current,
      sinceLastRender,
      timestamp: now,
    }

    console.log(info)

    return info
  }
}
