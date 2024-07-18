"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { CodeStyle } from "@/registry/codestyles"

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  styleName?: CodeStyle["name"]
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
  const [config] = useConfig()

  if (!styleName || config.codestyle === styleName) {
    return <>{children}</>
  }

  return null
}
