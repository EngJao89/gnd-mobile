import type { TFunction } from 'i18next';
import { z } from 'zod';

export function createRegisterStoreSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(1, t('validation.nameRequired')),
    legalName: z.string().trim().min(1, t('validation.legalNameRequired')),
    cnpj: z.string().trim().min(1, t('validation.cnpjRequired')),
    ownerName: z.string().trim().min(1, t('validation.ownerNameRequired')),
    email: z.email(t('validation.invalidEmail')),
    password: z.string().min(6, t('validation.passwordMin')),
    street: z.string().trim().min(1, t('validation.streetRequired')),
    numberOrBlock: z.string().trim().min(1, t('validation.numberOrBlockRequired')),
    neighborhood: z.string().trim().min(1, t('validation.neighborhoodRequired')),
    city: z.string().trim().min(1, t('validation.cityRequired')),
    state: z.string().trim().min(1, t('validation.stateRequired')),
    zipCode: z.string().trim().min(1, t('validation.zipCodeRequired')),
  });
}

export type RegisterStoreFormData = z.infer<ReturnType<typeof createRegisterStoreSchema>>;
