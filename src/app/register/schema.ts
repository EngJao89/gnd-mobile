import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  surname: z.string().trim().min(1, 'Surname is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().trim().min(1, 'Phone number is required'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
