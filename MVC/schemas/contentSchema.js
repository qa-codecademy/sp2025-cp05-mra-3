import { z } from 'zod';
export const createContentSchema = z.object({
    name: z
        .string(),
    german: z
        .string(),
    english: z
        .string(),
    macedonian: z
        .string(),
})
export const updateContentSchema = createContentSchema.partial();
