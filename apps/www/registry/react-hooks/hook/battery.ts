import React from "react"

export interface BatteryState {
  supported: boolean
  loading: boolean
  level: number | null
  charging: boolean | null
  chargingTime: number | null
  dischargingTime: number | null
}

// Define the BatteryManager interface
export interface BatteryManager extends EventTarget {
  level: number
  charging: boolean
  chargingTime: number
  dischargingTime: number
  addEventListener(
    type:
      | "levelchange"
      | "chargingchange"
      | "chargingtimechange"
      | "dischargingtimechange",
    listener: (this: BatteryManager, ev: Event) => any
  ): void
  removeEventListener(
    type:
      | "levelchange"
      | "chargingchange"
      | "chargingtimechange"
      | "dischargingtimechange",
    listener: (this: BatteryManager, ev: Event) => any
  ): void
}

// Extend Navigator interface to include getBattery method
export interface Navigator {
  getBattery?: () => Promise<BatteryManager>
}

// Extend window.navigator with the getBattery method
declare const navigator: Navigator

export function useBattery() {
  const [state, setState] = React.useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  })

  React.useEffect(() => {
    if (!navigator.getBattery) {
      setState((s) => ({
        ...s,
        supported: false,
        loading: false,
      }))
      return
    }

    let battery: BatteryManager | null = null

    const handleChange = () => {
      if (battery) {
        setState({
          supported: true,
          loading: false,
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        })
      }
    }

    navigator.getBattery().then((b) => {
      battery = b
      handleChange()

      b.addEventListener("levelchange", handleChange)
      b.addEventListener("chargingchange", handleChange)
      b.addEventListener("chargingtimechange", handleChange)
      b.addEventListener("dischargingtimechange", handleChange)
    })

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange)
        battery.removeEventListener("chargingchange", handleChange)
        battery.removeEventListener("chargingtimechange", handleChange)
        battery.removeEventListener("dischargingtimechange", handleChange)
      }
    }
  }, [])

  return state
}
