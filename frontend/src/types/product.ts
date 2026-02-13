export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
