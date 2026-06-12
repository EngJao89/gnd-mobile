import { z } from 'zod';

export const signInSchema = z.object({
  phone: z.string().trim().min(1, 'Phone number is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
