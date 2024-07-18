export const codestyles = [
  {
    name: "react-hooks",
    label: "React Hooks",
  },
] as const

export type CodeStyle = (typeof codestyles)[number]
