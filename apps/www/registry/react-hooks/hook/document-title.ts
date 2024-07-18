import * as React from "react"

export function useDocumentTitle(title: string): void {
  React.useEffect(() => {
    document.title = title
  }, [title])
}
