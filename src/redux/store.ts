import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

// Configure the Redux store
// Combines the cart and user reducers into a single store
export const store = configureStore({
    reducer: {
        cart: cartReducer, // Manages the state of the shopping cart
        user: userReducer, // Manages the state of the user (authentication, profile, etc.)
    },
});

// Define RootState type
// Represents the overall state structure of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
// Represents the dispatch function type for the Redux store
export type AppDispatch = typeof store.dispatch;
