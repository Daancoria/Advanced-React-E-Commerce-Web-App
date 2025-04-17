// Represents the structure of a product object in the application
import { Timestamp } from "firebase/firestore";
export interface Product {
    id: string; // 
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity?: number; // Optional for non-cart contexts
    createdAt?: Date;
    updatedAt?: Date;
}

// Represents a cart-specific product (adds required quantity field)
export interface CartItem extends Product {
    quantity: number;
}

export interface OrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
}
  
export interface Order {
    id: string;
    createdAt: Timestamp;
    total: number;
    items: OrderItem[];
}
  