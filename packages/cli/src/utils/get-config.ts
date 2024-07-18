import { z } from "zod"
import { cosmiconfig } from "cosmiconfig"
import { loadConfig } from "tsconfig-paths"
import { resolveImport } from "../utils/resolve-import"

export const DEFAULT_STYLE = "react-hooks"
export const DEFAULT_HOOKS = "@/hooks"
export const DEFAULT_UTILS = "@/lib/utils"

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple hooks.json file would be nice.
const explorer = cosmiconfig("hooks", {
  searchPlaces: ["hooks.json"],
})

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    codestyle: z.string(),
    tsx: z.coerce.boolean().default(true),
    aliases: z.object({
      hooks: z.string(),
      utils: z.string(),
    }),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    utils: z.string(),
    hooks: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd)

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim()
    )
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      hooks: await resolveImport(config.aliases["hooks"], tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return rawConfigSchema.parse(configResult.config)
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/hooks.json.`)
  }
}