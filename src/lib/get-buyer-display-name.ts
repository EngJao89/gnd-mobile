import type { StorePurchaseBuyer } from '@/types/purchase';

export function getBuyerDisplayName(buyer?: StorePurchaseBuyer | null) {
  if (!buyer) {
    return '';
  }

  const fullName = [buyer.firstName, buyer.surname].filter(Boolean).join(' ').trim();

  return fullName || buyer.email || '';
}
