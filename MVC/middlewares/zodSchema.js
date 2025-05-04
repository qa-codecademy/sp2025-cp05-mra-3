// /MVC/middlewares/zodSchema.js
import { z } from 'zod';

// Define the validation schema for the content
export const contentSchema = z.object({
  title: z.string().min(1, 'Title is required'),  // Title is required
  german: z.string().min(1, 'German translation is required'), // German translation is required
  english: z.string().min(1, 'English translation is required'), // English translation is required
  macedonian: z.string().min(1, 'Macedonian translation is required') // Macedonian translation is required
});
