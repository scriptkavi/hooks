import * as React from "react"

export function useMap<K, V>(
  initialState?: readonly (readonly [K, V])[] | null
): Map<K, V> {
  const mapRef = React.useRef(new Map<K, V>(initialState))
  const [, reRender] = React.useReducer((x) => x + 1, 0)

  const originalSet = mapRef.current.set.bind(mapRef.current)
  mapRef.current.set = (key: K, value: V) => {
    originalSet(key, value)
    reRender()
    return mapRef.current
  }

  const originalClear = mapRef.current.clear.bind(mapRef.current)
  mapRef.current.clear = () => {
    originalClear()
    reRender()
  }

  const originalDelete = mapRef.current.delete.bind(mapRef.current)
  mapRef.current.delete = (key: K) => {
    const result = originalDelete(key)
    reRender()
    return result
  }

  return mapRef.current
}
