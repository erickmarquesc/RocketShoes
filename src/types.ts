export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  size?: string;
  category?: string;
}

export interface Stock {
  id: number;
  amount: number;
}
