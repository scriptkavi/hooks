import fs, { pathExists } from "fs-extra"
import path from "path"
import { Config, RawConfig, getConfig, resolveConfigPaths } from "./get-config"
import { loadConfig } from "tsconfig-paths"
import fg from "fast-glob"

// TODO: Add support for more frameworks.
// We'll start with Next.js for now.
const PROJECT_TYPES = [
  "next-app",
  "next-app-src",
  "next-pages",
  "next-pages-src",
] as const

type ProjectType = (typeof PROJECT_TYPES)[number]

const PROJECT_SHARED_IGNORE = [
  "**/node_modules/**",
  ".next",
  "public",
  "dist",
  "build",
]

export async function getProjectConfig(cwd: string): Promise<Config | null> {
  // Check for existing hook config.
  const existingConfig = await getConfig(cwd)
  if (existingConfig) {
    return existingConfig
  }

  const projectType = await getProjectType(cwd)
  const tsConfigAliasPrefix = await getTsConfigAliasPrefix(cwd)
  if (!projectType) {
    return null
  }

  const isTsx = await isTypeScriptProject(cwd)

  const config: RawConfig = {
    $schema: "https://hooks.scriptkavi.com/schema.json",
    codestyle: "react-hooks",
    tsx: isTsx,
    aliases: {
      utils: `${tsConfigAliasPrefix}/lib/utils`,
      hooks: `${tsConfigAliasPrefix}/hooks`,
    },
  }

  return await resolveConfigPaths(cwd, config)
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const tsConfig = await loadConfig(cwd)

  if (tsConfig?.resultType === "failed" || !tsConfig?.paths) {
    return null
  }

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (paths.includes("./*") || paths.includes("./src/*")) {
      return alias.at(0)
    }
  }

  return null
}

export async function getProjectType(cwd: string): Promise<ProjectType | null> {
  const files = await fg.glob("**/*", {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  })

  const isNextProject = files.find((file) => file.startsWith("next.config."))
  if (!isNextProject) {
    return null
  }

  const isUsingSrcDir = await fs.pathExists(path.resolve(cwd, "src"))
  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isUsingSrcDir ? "src/" : ""}app`)
  )

  if (isUsingAppDir) {
    return isUsingSrcDir ? "next-app-src" : "next-app"
  }

  return isUsingSrcDir ? "next-pages-src" : "next-pages"
}

export async function isTypeScriptProject(cwd: string) {
  // Check if cwd has a tsconfig.json file.
  return pathExists(path.resolve(cwd, "tsconfig.json"))
}