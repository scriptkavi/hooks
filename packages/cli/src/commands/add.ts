import { existsSync, promises as fs } from "fs"
import path from "path"
import chalk from "chalk"
import { Command } from "commander"
import { execa } from "execa"
import ora from "ora"
import prompts from "prompts"
import { z } from "zod"
import { getConfig } from "../utils/get-config"
import { getPackageManager } from "../utils/get-package-manager"
import { handleError } from "../utils/handle-error"
import { logger } from "../utils/logger"
import { fetchTree, getItemTargetPath, getRegistryIndex, resolveTree } from "../utils/registry"
import { transform } from "../utils/transformers"

const addOptionsSchema = z.object({
  hooks: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
})

export const add = new Command()
  .name("add")
  .description("add a hook to your project")
  .argument("[hooks...]", "the hooks to add")
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available hooks", false)
  .option("-p, --path <path>", "the path to add the hook to.")
  .action(async (hooks, opts) => {
    try {
      const options = addOptionsSchema.parse({
        hooks,
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

      let selectedHooks = options.all
        ? registryIndex.map((entry) => entry.name)
        : options.hooks

      if (!options.hooks?.length && !options.all) {
        const { hooks } = await prompts({
          type: "multiselect",
          name: "hooks",
          message: "Which hooks would you like to add?",
          hint: "Space to select. A to toggle all. Enter to submit.",
          instructions: false,
          choices: registryIndex.map((entry) => ({
            title: entry.name,
            value: entry.name,
            selected: options.all
              ? true
              : options.hooks?.includes(entry.name),
          })),
        })
        selectedHooks = hooks
      }

      if (!selectedHooks?.length) {
        logger.warn("No hooks selected. Exiting.")
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedHooks)
      const payload = await fetchTree(config.codestyle, tree)

      if (!payload.length) {
        logger.warn("Selected hooks not found. Exiting.")
        process.exit(0)
      }

      if (!options.yes) {
        const { proceed } = await prompts({
          type: "confirm",
          name: "proceed",
          message: `Ready to install hooks and dependencies. Proceed?`,
          initial: true,
        })

        if (!proceed) {
          process.exit(0)
        }
      }

      const spinner = ora(`Installing hooks...`).start()
      for (const item of payload) {
        spinner.text = `Installing ${item.name}...`
        const targetDir = await getItemTargetPath(
          config,
          item,
          options.path ? path.resolve(cwd, options.path) : undefined
        )

        if (!targetDir) {
          continue
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true })
        }

        const existingHook = item.files.filter((file) =>
          existsSync(path.resolve(targetDir, file.name))
        )

        if (existingHook.length && !options.overwrite) {
          if (selectedHooks.includes(item.name)) {
            spinner.stop()
            const { overwrite } = await prompts({
              type: "confirm",
              name: "overwrite",
              message: `Hook ${item.name} already exists. Would you like to overwrite?`,
              initial: false,
            })

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  "--overwrite"
                )} flag.`
              )
              continue
            }

            spinner.start(`Installing ${item.name}...`)
          } else {
            continue
          }
        }

        for (const file of item.files) {
          let filePath = path.resolve(targetDir, file.name)

          // Run transformers.
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config
          })

          if (!config.tsx) {
            filePath = filePath.replace(/\.tsx$/, ".jsx")
            filePath = filePath.replace(/\.ts$/, ".js")
          }

          await fs.writeFile(filePath, content)
        }

        const packageManager = await getPackageManager(cwd)

        // Install dependencies.
        if (item.dependencies?.length) {
          await execa(
            packageManager,
            [
              packageManager === "npm" ? "install" : "add",
              ...item.dependencies,
            ],
            {
              cwd,
            }
          )
        }

        // Install devDependencies.
        if (item.devDependencies?.length) {
          await execa(
            packageManager,
            [
              packageManager === "npm" ? "install" : "add",
              "-D",
              ...item.devDependencies,
            ],
            {
              cwd,
            }
          )
        }
      }
      spinner.succeed(`Done.`)
    } catch (error) {
      handleError(error)
    }
  })