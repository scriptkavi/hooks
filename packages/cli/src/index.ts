#!/usr/bin/env node
import { add } from "./commands/add"
import { diff } from "./commands/diff"
import { init } from "./commands/init"
import { Command } from "commander"

import { getPackageInfo } from "./utils/get-package-info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo()

  const program = new Command()
    .name("scriptkavi-hooks")
    .description("add hooks and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init).addCommand(add).addCommand(diff)

  program.parse()
}

main()
