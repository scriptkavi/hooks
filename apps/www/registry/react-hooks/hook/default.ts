import * as React from "react"

export function useDefault<T>(
  initialValue: T | undefined,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = React.useState<T | undefined>(initialValue)

  if (state === undefined || state === null) {
    return [defaultValue, setState]
  }

  return [state, setState]
}
