export interface ICartItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imageUrl: string;
}

export interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}
