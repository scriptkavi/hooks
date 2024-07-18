import { existsSync, promises as fs } from "fs"
import path from "path"
import { Config, getConfig } from "../utils/get-config"
import { handleError } from "../utils/handle-error"
import { logger } from "../utils/logger"
import {
  fetchTree,
  getItemTargetPath,
  getRegistryIndex,
} from "../utils/registry"
import { registryIndexSchema } from "../utils/registry/schema"
import { transform } from "../utils/transformers"
import chalk from "chalk"
import { Command } from "commander"
import { diffLines, type Change } from "diff"
import { z } from "zod"

const updateOptionsSchema = z.object({
  hook: z.string().optional(),
  yes: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
})

export const diff = new Command()
  .name("diff")
  .description("check for updates against the registry")
  .argument("[hook]", "the hook name")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (name, opts) => {
    try {
      const options = updateOptionsSchema.parse({
        component: name,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green(
            `init`
          )} to create a hooks.json file.`
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      if (!options.hook) {
        const targetDir = config.resolvedPaths.hooks

        // Find all hooks that exist in the project.
        const projectHooks = registryIndex.filter((item) => {
          for (const file of item.files) {
            const filePath = path.resolve(targetDir, file)
            if (existsSync(filePath)) {
              return true
            }
          }

          return false
        })

        // Check for updates.
        const hooksWithUpdates = []
        for (const hook of projectHooks) {
          const changes = await diffComponent(hook, config)
          if (changes.length) {
            hooksWithUpdates.push({
              name: hook.name,
              changes,
            })
          }
        }

        if (!hooksWithUpdates.length) {
          logger.info("No updates found.")
          process.exit(0)
        }

        logger.info("The following hooks have updates available:")
        for (const hook of hooksWithUpdates) {
          logger.info(`- ${hook.name}`)
          for (const change of hook.changes) {
            logger.info(`  - ${change.filePath}`)
          }
        }
        logger.break()
        logger.info(
          `Run ${chalk.green(`diff <hook>`)} to see the changes.`
        )
        process.exit(0)
      }

      // Show diff for a single component.
      const hook = registryIndex.find(
        (item) => item.name === options.hook
      )

      if (!hook) {
        logger.error(
          `The hook ${chalk.green(options.hook)} does not exist.`
        )
        process.exit(1)
      }

      const changes = await diffComponent(hook, config)

      if (!changes.length) {
        logger.info(`No updates found for ${options.hook}.`)
        process.exit(0)
      }

      for (const change of changes) {
        logger.info(`- ${change.filePath}`)
        await printDiff(change.patch)
        logger.info("")
      }

    } catch (error) {
      handleError(error)
    }
  })

  async function diffComponent(
    hook: z.infer<typeof registryIndexSchema>[number],
    config: Config
  ) {
  const payload = await fetchTree(config.codestyle, [hook])

  const changes = []

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item)

    if (!targetDir) {
      continue
    }

    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file.name)

      if (!existsSync(filePath)) {
        continue
      }

      const fileContent = await fs.readFile(filePath, "utf8")

      const registryContent = await transform({
        filename: file.name,
        raw: file.content,
        config
      })

      const patch = diffLines(registryContent as string, fileContent)
      if (patch.length > 1) {
        changes.push({
          file: file.name,
          filePath,
          patch,
        })
      }
    }
  }

  return changes
}

async function printDiff(diff: Change[]) {
  diff.forEach((part) => {
    if (part) {
      if (part.added) {
        return process.stdout.write(chalk.green(part.value))
      }
      if (part.removed) {
        return process.stdout.write(chalk.red(part.value))
      }

      return process.stdout.write(part.value)
    }
  })
}