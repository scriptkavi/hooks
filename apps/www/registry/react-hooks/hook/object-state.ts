import * as React from "react"

function isPlainObject(value: any): value is Record<string, any> {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export function useObjectState<T extends Record<string, any>>(
  initialValue: T
): [T, (arg: Partial<T> | ((state: T) => Partial<T>)) => void] {
  const [state, setState] = React.useState<T>(initialValue)

  const handleUpdate = React.useCallback(
    (arg: Partial<T> | ((state: T) => Partial<T>)) => {
      if (typeof arg === "function") {
        setState((s) => {
          const newState = arg(s)

          if (isPlainObject(newState)) {
            return {
              ...s,
              ...newState,
            }
          }
          return s
        })
      } else if (isPlainObject(arg)) {
        setState((s) => ({
          ...s,
          ...arg,
        }))
      }
    },
    []
  )

  return [state, handleUpdate]
}
