import { Transformer } from "./index"

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue()

    // Replace @/registry/[style] with the hooks alias.
    if (moduleSpecifier.startsWith("@/registry/")) {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(
          /^@\/registry\/[^/]+/,
          config.aliases.hooks
        )
      )
    }

    // Replace `import { cn } from "@/lib/utils"`
    if (moduleSpecifier == "@/lib/utils") {
      const namedImports = importDeclaration.getNamedImports()
      const cnImport = namedImports.find((i) => i.getName() === "cn")
      if (cnImport) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/lib\/utils/, config.aliases.utils)
        )
      }
    }
  }

  return sourceFile
}
