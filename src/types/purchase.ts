import type { Product } from '@/types/product';

export type StorePurchaseBuyer = {
  id: string;
  firstName?: string;
  surname?: string;
  email?: string;
};

export type StorePurchase = {
  id: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  createdAt: string;
  product: Product;
  buyer?: StorePurchaseBuyer | null;
};
