import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';
import { CartItem } from '../types/types'; // ✅ New type

// Load cart from sessionStorage or start empty
const savedCart = sessionStorage.getItem('cart');
const initialState: {
  items: CartItem[];
} = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

// Utility to persist cart
const saveToSession = (items: CartItem[]) => {
  sessionStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
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
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveToSession(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
