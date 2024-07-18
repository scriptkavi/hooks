import * as React from "react"

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }))
}

const setLocalStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getLocalStorageItem = (key: string): string | null => {
  return window.localStorage.getItem(key)
}

const useLocalStorageSubscribe = (callback: (event: StorageEvent) => void) => {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

const getLocalStorageServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook")
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (v: T | ((prevValue: T) => T)) => void] {
  const getSnapshot = () => getLocalStorageItem(key)

  const store = React.useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot
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
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store, initialValue]
  )

  React.useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store ? (JSON.parse(store) as T) : initialValue, setState]
}
