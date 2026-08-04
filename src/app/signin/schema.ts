import type { TFunction } from 'i18next';
import { z } from 'zod';

export function createSignInSchema(t: TFunction) {
  return z.object({
    email: z.email(t('validation.invalidEmail')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });
}

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
