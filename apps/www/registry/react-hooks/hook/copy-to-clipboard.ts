import { useCallback, useState } from "react"

function oldSchoolCopy(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
}

export function useCopyToClipboard(): [string | null, (value: string) => void] {
  const [state, setState] = useState<string | null>(null)

  const copyToClipboard = useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
          setState(value)
        } else {
          throw new Error("writeText not supported")
        }
      } catch (e) {
        oldSchoolCopy(value)
        setState(value)
      }
    }

    handleCopy()
  }, [])

  return [state, copyToClipboard]
}
