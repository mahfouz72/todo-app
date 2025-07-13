import {z} from 'zod';

export const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type User = z.infer<typeof userSchema>