import * as React from "react"

export function useFavicon(url: string): void {
  React.useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>(`link[rel~="icon"]`)

    if (!link) {
      link = document.createElement("link")
      link.type = "image/x-icon"
      link.rel = "icon"
      link.href = url
      document.head.appendChild(link)
    } else {
      link.href = url
    }
  }, [url])
}
