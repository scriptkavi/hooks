import * as React from "react"

const useVisibilityChangeSubscribe = (callback: () => void): (() => void) => {
  document.addEventListener("visibilitychange", callback)

  return () => {
    document.removeEventListener("visibilitychange", callback)
  }
}

const getVisibilityChangeSnapshot = (): DocumentVisibilityState => {
  return document.visibilityState
}

const getVisibilityChangeServerSnapshot = (): never => {
  throw Error("useVisibilityChange is a client-only hook")
}

export function useVisibilityChange(): boolean {
  const visibilityState = React.useSyncExternalStore(
    useVisibilityChangeSubscribe,
    getVisibilityChangeSnapshot,
    getVisibilityChangeServerSnapshot
  )

  return visibilityState === "visible"
}
