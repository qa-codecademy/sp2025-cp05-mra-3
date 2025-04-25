import { z } from 'zod';
export const createContentSchema = z.object({
    name: z
        .string(),
    german: z
        .string(),
    english: z
        .string(),
    spanish: z
        .string(),
    french: z
        .string(),
    macedonian: z
        .string(),
})
export const updateContentSchema = createContentSchema.partial();
