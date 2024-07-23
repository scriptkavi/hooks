import { useState } from "react"
import Cookies from "js-cookie"

import useMemoizedFn from "./memoized-fn"

export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function"

export const isString = (value: unknown): value is string =>
  typeof value === "string"

export type State = string | undefined

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State)
}

function useCookie(cookieKey: string, options: Options = {}) {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey)

    if (isString(cookieValue)) return cookieValue

    if (isFunction(options.defaultValue)) {
      return options.defaultValue()
    }

    return options.defaultValue
  })

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {}
    ) => {
      const { defaultValue = "", ...restOptions } = {
        ...options,
        ...newOptions,
      }
      const value = isFunction(newValue) ? newValue(state) : newValue

      setState(value)

      if (value === undefined) {
        Cookies.remove(cookieKey)
      } else {
        Cookies.set(cookieKey, value, restOptions)
      }
    }
  )

  return [state, updateState] as const
}

export default useCookie
