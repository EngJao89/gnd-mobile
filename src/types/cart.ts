import type { Product } from '@/types/product';

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id?: string;
  items: CartItem[];
};
