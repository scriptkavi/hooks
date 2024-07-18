import { z } from "zod"

// TODO: Extract this to a shared package.
export const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  type: z.enum(["hooks:hook"]),
})

export const registryIndexSchema = z.array(registryItemSchema)

export const registryItemWithContentSchema = registryItemSchema.extend({
  files: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
    })
  ),
})

export const registryWithContentSchema = z.array(registryItemWithContentSchema)

export const codeStylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
  })
)