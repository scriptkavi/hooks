import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react"

export function useClickAway<T extends HTMLElement>(
  cb: (e: MouseEvent | TouchEvent) => void
): MutableRefObject<T | null> {
  const ref = useRef<T>(null)
  const refCb = useRef(cb)

  useLayoutEffect(() => {
    refCb.current = cb
  })

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current
      if (element && !element.contains(e.target as Node)) {
        refCb.current(e)
      }
    }

    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [])

  return ref
}
