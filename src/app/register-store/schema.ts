import { z } from 'zod';

export const registerStoreSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  legalName: z.string().trim().min(1, 'Legal name is required'),
  cnpj: z.string().trim().min(1, 'CNPJ is required'),
  ownerName: z.string().trim().min(1, 'Owner name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  street: z.string().trim().min(1, 'Street is required'),
  numberOrBlock: z.string().trim().min(1, 'Number or block is required'),
  neighborhood: z.string().trim().min(1, 'Neighborhood is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  zipCode: z.string().trim().min(1, 'ZIP code is required'),
});

export type RegisterStoreFormData = z.infer<typeof registerStoreSchema>;
