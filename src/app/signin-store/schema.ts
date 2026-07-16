import { z } from 'zod';

export const signInStoreSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInStoreFormData = z.infer<typeof signInStoreSchema>;
