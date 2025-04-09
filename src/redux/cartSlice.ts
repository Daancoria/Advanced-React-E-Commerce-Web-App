import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

// Get initial cart state from sessionStorage
const savedCart = sessionStorage.getItem('cart');
const initialState: {
    items: Product[];
} = {
    items: savedCart ? JSON.parse(savedCart) : [],
    };

const saveToSession = (items: Product[]) => {
    sessionStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
        const existing = state.items.find(item => item.id === action.payload.id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
        saveToSession(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        saveToSession(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const item = state.items.find(item => item.id === action.payload.id);
        if (item) {
            item.quantity = action.payload.quantity;
            saveToSession(state.items);
        }
        },
        clearCart: (state) => {
        state.items = [];
        sessionStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
