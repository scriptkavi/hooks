import { existsSync, promises as fs } from "fs"
import path from "path"
import { getPackageManager } from "../utils/get-package-manager"
import { handleError } from "../utils/handle-error"
import { logger } from "../utils/logger"
import chalk from "chalk"
import { Command } from "commander"
import { execa } from "execa"
import template from "lodash.template"
import ora from "ora"
import prompts from "prompts"
import { z } from "zod"
import { getProjectConfig } from "../utils/get-project-info"
import { DEFAULT_HOOKS, DEFAULT_UTILS, getConfig, rawConfigSchema, resolveConfigPaths, type Config } from "../utils/get-config"
import { getRegistryCodeStyles } from "../utils/registry"

const PROJECT_DEPENDENCIES: never[] = []

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
})

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults,", "use default configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const projectConfig = await getProjectConfig(cwd)

      if (projectConfig) {
        const config = await promptForMinimalConfig(
          cwd,
          projectConfig,
          opts.defaults
        )
        await runInit(cwd, config)
      } else {
        // Read config.
        const existingConfig = await getConfig(cwd)
        const config = await promptForConfig(cwd, existingConfig, options.yes)
        await runInit(cwd, config)
      }

      logger.info("")
      logger.info(
        `${chalk.green(
          "Success!"
        )} Project initialization completed. You may now add hooks.`
      )
      logger.info("")

    } catch (error) {
      handleError(error)
    }
})

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false
) {
  const highlight = (text: string) => chalk.cyan(text)
  const codestyles = await getRegistryCodeStyles()

  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlight(
        "TypeScript"
      )} (recommended)?`,
      initial: defaultConfig?.tsx ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "select",
      name: "codestyle",
      message: `Which ${highlight("codestyle")} would you like to use?`,
      choices: codestyles.map((codestyle) => ({
        title: codestyle.label,
        value: codestyle.name,
      })),
    },
    {
      type: "text",
      name: "hooks",
      message: `Configure the import alias for ${highlight("hooks")}:`,
      initial: defaultConfig?.aliases["hooks"] ?? DEFAULT_HOOKS,
    },
    {
      type: "text",
      name: "utils",
      message: `Configure the import alias for ${highlight("utils")}:`,
      initial: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
    },
  ])

  const config = rawConfigSchema.parse({
    $schema: "https://hooks.scriptkavi.com/schema.json",
    codestyle: options.codestyle,
    tsx: options.typescript,
    aliases: {
      utils: options.utils,
      hooks: options.hooks,
    },
  })

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight(
        "hooks.json"
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Write to file.
  logger.info("")
  const spinner = ora(`Writing hooks.json...`).start()
  const targetPath = path.resolve(cwd, "hooks.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function promptForMinimalConfig(
  cwd: string,
  defaultConfig: Config,
  defaults = false
) {
  const highlight = (text: string) => chalk.cyan(text)
  let codestyle = defaultConfig.codestyle

  if (!defaults) {
    const codestyles = await getRegistryCodeStyles()
    const options = await prompts([
      {
        type: "select",
        name: "codestyle",
        message: `Which ${highlight("codestyle")} would you like to use?`,
        choices: codestyles.map((codestyle) => ({
          title: codestyle.label,
          value: codestyle.name,
        })),
      },
    ])

    codestyle = options.codestyle
  }

  const config = rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    codestyle,
    tsx: defaultConfig?.tsx,
    aliases: defaultConfig?.aliases,
  })

  // Write to file.
  logger.info("")
  const spinner = ora(`Writing hooks.json...`).start()
  const targetPath = path.resolve(cwd, "hooks.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Initializing project...`)?.start()

  // Ensure all resolved paths directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === "utils" && resolvedPath.endsWith("/utils")) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, "")
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  const extension = config.tsx ? "ts" : "js"

  spinner?.succeed()

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start()
  const packageManager = await getPackageManager(cwd)

  // TODO: add support for other icon libraries.
  const deps = [
    ...PROJECT_DEPENDENCIES
  ]

  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...deps],
    {
      cwd,
    }
  )
  dependenciesSpinner?.succeed()
}