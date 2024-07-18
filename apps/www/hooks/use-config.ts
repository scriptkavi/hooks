import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { CodeStyle } from "@/registry/codestyles"

type Config = {
  codestyle: CodeStyle["name"]
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  codestyle: "react-hooks",
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}
