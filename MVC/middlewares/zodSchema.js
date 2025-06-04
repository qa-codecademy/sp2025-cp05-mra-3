// /MVC/middlewares/zodSchema.js
import { z } from 'zod';

// Define the validation schema for the content
export const contentSchema = z.object({
  id: z.string().min(1, 'Id is required'),  // Title is required
  german: z.string().min(1, 'German translation is required'), // German translation is required
  english: z.string().min(1, 'English translation is required'), // English translation is required
  macedonian: z.string().min(1, 'Macedonian translation is required') // Macedonian translation is required
});
export const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  createdAt: z.string(),
});
export const userCreateSchema  = z.object({
  name: z.string().min(1, 'Name is required'),  
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  enabled: z.string(),
  password: z.string().min(6, 'Password is required'),
});

export const userUpdateSchema = userCreateSchema.extend({
  id: z.string().min(1, 'Id is required')
});

export const cardCreateSchema  = z.object({
  title: z.string().min(1, 'Title is required'),  
  description: z.string().min(1, 'Description is required'),
  picture: z.string().min(1, 'Picture is required'),
});

export const cardUpdateSchema = cardCreateSchema.extend({
  id: z.string().min(1, 'Id is required')
});
