import path from "path"
import { Config } from "../get-config"
// import {
//   registryBaseColorSchema,
//   registryIndexSchema,
//   registryItemWithContentSchema,
//   registryWithContentSchema,
//   stylesSchema,
// } from "@/src/utils/registry/schema"
import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"
import { z } from "zod"
import { codeStylesSchema, registryIndexSchema, registryItemWithContentSchema, registryWithContentSchema } from "./schema"

const baseUrl = process.env.HOOKS_REGISTRY_URL ?? "https://hooks.scriptkavi.com"
const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined

export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(["index.json"])

    return registryIndexSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch hooks from registry.`)
  }
}

export async function getRegistryCodeStyles() {
  try {
    const [result] = await fetchRegistry(["codestyles/index.json"])

    return codeStylesSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch code styles from registry.`)
  }
}

export async function resolveTree(
  index: z.infer<typeof registryIndexSchema>,
  names: string[]
) {
  const tree: z.infer<typeof registryIndexSchema> = []

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name)

    if (!entry) {
      continue
    }

    tree.push(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      tree.push(...dependencies)
    }
  }

  return tree.filter(
    (hook, index, self) =>
      self.findIndex((c) => c.name === hook.name) === index
  )
}

export async function fetchTree(
  codestyle: string,
  tree: z.infer<typeof registryIndexSchema>
) {
  try {
    const paths = tree.map((item) => `codestyles/${codestyle}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return registryWithContentSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch tree from registry.`)
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemWithContentSchema>, "type">,
  override?: string
) {
  if (override) {
    return override
  }

  const [parent, type] = item.type.split(":")
  if (!(parent in config.resolvedPaths)) {
    return null
  }

  return path.join(
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths],
    type
  )
}

async function fetchRegistry(paths: string[]) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/registry/${path}`, {
          agent,
        })
        return await response.json()
      })
    )

    return results
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
}
