// Define the Product interface
// Represents the structure of a product object in the application
export interface Product {
    id: string; // Unique identifier for the product
    title: string; // Name of the product
    price: number; // Price of the product
    description: string; // Detailed description of the product
    category: string; // Category to which the product belongs
    image: string; // URL of the product's image
    rating: {
        rate: number; // Average rating of the product
        count: number; // Number of reviews for the product
    };
    quantity?: number; // Optional: Quantity of the product in the cart
    createdAt?: Date; // Optional: Timestamp for when the product was created
    updatedAt?: Date; // Optional: Timestamp for when the product was last updated
}