import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

// Get initial cart state from sessionStorage
// If a cart exists in sessionStorage, parse it; otherwise, initialize with an empty array
const savedCart = sessionStorage.getItem('cart');
const initialState: {
    items: Product[];
} = {
    items: savedCart ? JSON.parse(savedCart) : [],
};

// Utility function to save cart items to sessionStorage
// Keeps the cart state persistent across page reloads
const saveToSession = (items: Product[]) => {
    sessionStorage.setItem('cart', JSON.stringify(items));
};

// Create the cart slice
// Defines the initial state, reducers, and actions for managing the cart
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add a product to the cart
        // If the product already exists, increment its quantity; otherwise, add it with a quantity of 1
        addToCart: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveToSession(state.items); // Save updated cart to sessionStorage
        },

        // Remove a product from the cart
        // Filters out the product with the specified ID
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== String(action.payload));
            saveToSession(state.items); // Save updated cart to sessionStorage
        },

        // Update the quantity of a product in the cart
        // Finds the product by ID and updates its quantity
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
              item.quantity = quantity;
            }
          },
        // Clear the cart
        // Removes all items from the cart and clears sessionStorage
        clearCart: (state) => {
            state.items = [];
            sessionStorage.removeItem('cart');
        },
    },
});

// Export the actions and reducer
// Allows other parts of the application to dispatch cart actions and access the reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
