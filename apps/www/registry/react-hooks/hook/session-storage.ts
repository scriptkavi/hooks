import * as React from "react"

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }))
}

const setSessionStorageItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value)
  window.sessionStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeSessionStorageItem = (key: string) => {
  window.sessionStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getSessionStorageItem = (key: string): string | null => {
  return window.sessionStorage.getItem(key)
}

const useSessionStorageSubscribe = (
  callback: (event: StorageEvent) => void
): (() => void) => {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

const getSessionStorageServerSnapshot = (): never => {
  throw Error("useSessionStorage is a client-only hook")
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  const getSnapshot = () => getSessionStorageItem(key)

  const store = React.useSyncExternalStore(
    useSessionStorageSubscribe,
    getSnapshot,
    getSessionStorageServerSnapshot
  )

  const setState = React.useCallback(
    (v: T | ((prevValue: T) => T)) => {
      try {
        const nextState =
          typeof v === "function"
            ? (v as (prevValue: T) => T)(
                store ? JSON.parse(store) : initialValue
              )
            : v

        if (nextState === undefined || nextState === null) {
          removeSessionStorageItem(key)
        } else {
          setSessionStorageItem(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store, initialValue]
  )

  React.useEffect(() => {
    if (
      getSessionStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setSessionStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store ? (JSON.parse(store) as T) : initialValue, setState]
}
