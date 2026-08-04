import type { TFunction } from 'i18next';
import { z } from 'zod';

export function createRegisterSchema(t: TFunction) {
  return z.object({
    firstName: z.string().trim().min(1, t('validation.firstNameRequired')),
    surname: z.string().trim().min(1, t('validation.surnameRequired')),
    password: z.string().min(6, t('validation.passwordMin')),
    phone: z.string().trim().min(1, t('validation.phoneRequired')),
  });
}

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
