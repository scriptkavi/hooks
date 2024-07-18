import * as React from "react"

export function useToggle(
  initialValue: boolean
): [boolean, (value?: boolean) => void] {
  const [on, setOn] = React.useState(initialValue)

  const handleToggle = React.useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      return setOn(value)
    }

    return setOn((v) => !v)
  }, [])

  return [on, handleToggle]
}
