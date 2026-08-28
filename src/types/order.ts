import type { Product, ProductStore } from '@/types/product';

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
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
  items: OrderItem[];
};

export type CheckoutResult = {
  orders: Order[];
};
