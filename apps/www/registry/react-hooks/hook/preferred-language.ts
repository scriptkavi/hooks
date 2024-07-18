import * as React from "react"

const usePreferredLanguageSubscribe = (cb: () => void): (() => void) => {
  window.addEventListener("languagechange", cb)
  return () => window.removeEventListener("languagechange", cb)
}

const getPreferredLanguageSnapshot = (): string => {
  return navigator.language
}

const getPreferredLanguageServerSnapshot = (): never => {
  throw Error("usePreferredLanguage is a client-only hook")
}

export function usePreferredLanguage(): string {
  return React.useSyncExternalStore(
    usePreferredLanguageSubscribe,
    getPreferredLanguageSnapshot,
    getPreferredLanguageServerSnapshot
  )
}
