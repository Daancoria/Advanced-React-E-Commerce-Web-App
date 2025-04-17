import { Timestamp } from 'firebase/firestore';

// 🛒 Base product structure
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// 🛒 Cart-specific product (quantity required)
export interface CartItem extends Product {
  quantity: number;
}

// 📦 Order item type
export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

// 📄 Order record structure
export interface Order {
  id: string;
  createdAt: Timestamp;
  total: number;
  items: OrderItem[];
}

// 🌐 Product context state
export interface ProductState {
  products: Product[];
  selectedCategory: string;
}

// 📤 Product context actions
export type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };

// 🧠 Context hook type
export interface ProductContextType extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}
