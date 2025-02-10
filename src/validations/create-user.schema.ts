import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(3).max(40),
    email: z.string().email(),
    password: z.string().min(6).max(40),
    enterprise: z.string().min(3).max(40)
})