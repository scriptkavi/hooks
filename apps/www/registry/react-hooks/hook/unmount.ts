import { useEffect } from "react"

import useLatest from "./latest"

const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function"

const isDev =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"

const useUnmount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useUnmount expected parameter is a function, got ${typeof fn}`
      )
    }
  }

  const fnRef = useLatest(fn)

  useEffect(
    () => () => {
      fnRef.current()
    },
    []
  )
}

export default useUnmount
