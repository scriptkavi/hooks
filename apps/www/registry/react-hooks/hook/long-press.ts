import * as React from "react"

interface LongPressOptions {
  threshold?: number
  onStart?: (event: React.MouseEvent | React.TouchEvent) => void
  onFinish?: (event: React.MouseEvent | React.TouchEvent) => void
  onCancel?: (event: React.MouseEvent | React.TouchEvent) => void
}

function isTouchEvent(
  event: React.MouseEvent | React.TouchEvent
): event is React.TouchEvent {
  return window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : "touches" in event.nativeEvent
}

function isMouseEvent(
  event: React.MouseEvent | React.TouchEvent
): event is React.MouseEvent {
  return event.nativeEvent instanceof MouseEvent
}

export function useLongPress(
  callback: (event: React.MouseEvent | React.TouchEvent) => void,
  options: LongPressOptions = {}
): {
  onMouseDown: (event: React.MouseEvent) => void
  onMouseUp: (event: React.MouseEvent) => void
  onMouseLeave: (event: React.MouseEvent) => void
  onTouchStart: (event: React.TouchEvent) => void
  onTouchEnd: (event: React.TouchEvent) => void
} {
  const { threshold = 400, onStart, onFinish, onCancel } = options
  const isLongPressActive = React.useRef(false)
  const isPressed = React.useRef(false)
  const timerId = React.useRef<number | undefined>()

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {} as any
    }

    const start = (event: React.MouseEvent | React.TouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (onStart) {
        onStart(event)
      }

      isPressed.current = true
      timerId.current = window.setTimeout(() => {
        callback(event)
        isLongPressActive.current = true
      }, threshold)
    }

    const cancel = (event: React.MouseEvent | React.TouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event)
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event)
        }
      }

      isLongPressActive.current = false
      isPressed.current = false

      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    }

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    }

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    }

    return {
      ...mouseHandlers,
      ...touchHandlers,
    }
  }, [callback, threshold, onCancel, onFinish, onStart])
}
