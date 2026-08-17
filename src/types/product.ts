export type ProductStore = {
  id: string;
  name: string;
  legalName: string;
  cnpj: string;
  ownerName: string;
  email: string;
  street: string;
  numberOrBlock: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  brand: string;
  sector: string;
  storeId: string;
  created_at: string;
  store: ProductStore;
};
