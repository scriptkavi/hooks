import { z } from "zod"

export const registryEntrySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  source: z.string().optional(),
  type: z.enum(["hooks:hook"]),
  category: z.string().optional(),
  subcategory: z.string().optional(),
})

export const registrySchema = z.array(registryEntrySchema)

export type RegistryEntry = z.infer<typeof registryEntrySchema>

export type Registry = z.infer<typeof registrySchema>
