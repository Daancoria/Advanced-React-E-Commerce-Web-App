// Represents the structure of a product object in the application
export interface Product {
    id: number; // Use number here to match CartItem and consistency across app
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
