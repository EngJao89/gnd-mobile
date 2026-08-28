export type Order = {
  id: string;
  storeId?: string;
  status?: string;
  notes?: string;
};

export type CheckoutResult = {
  orders: Order[];
};
