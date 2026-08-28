import type { StorePurchaseBuyer } from '@/types/purchase';
import type { Product, ProductStore } from '@/types/product';

export type OrderItem = {
  id: string;
  productId?: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  productName?: string;
  product?: Product;
};

export type Order = {
  id: string;
  storeId?: string;
  storeName?: string;
  store?: ProductStore;
  status?: string;
  notes?: string;
  totalPrice?: string;
  createdAt?: string;
  buyer?: StorePurchaseBuyer | null;
  items: OrderItem[];
};

export type CheckoutResult = {
  orders: Order[];
};
