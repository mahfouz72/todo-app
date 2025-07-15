import {z} from "zod";

export const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
    dueDate: z.coerce.date(),
});

export type Todo = z.infer<typeof todoSchema>;