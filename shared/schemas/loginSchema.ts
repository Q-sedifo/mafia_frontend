import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email("Incorrect email"),
  password: z
    .string()
    .min(5, "Password nust contain at least 5 characters")
    .max(32, 'Password too long'),
})

export type LoginFormValues = z.infer<typeof loginSchema>