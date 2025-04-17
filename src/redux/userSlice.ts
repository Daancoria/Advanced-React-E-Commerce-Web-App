import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
// Includes `name` and `email` properties, which can be `null` if the user is not logged in
interface UserState {
    name: string | null;
    email: string | null;
}

// Retrieve the saved user state from sessionStorage
// If a user is saved, parse it; otherwise, initialize with `null` values
const savedUser = sessionStorage.getItem('user');
const initialState: UserState = savedUser
    ? JSON.parse(savedUser)
    : { name: null, email: null };

// Create the user slice
// Manages user-related state, including login, logout, and profile updates
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Login action
        // Updates the user's name and email in the state and saves it to sessionStorage
        login: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            sessionStorage.setItem('user', JSON.stringify(state));
        },

        // Logout action
        // Clears the user's name and email from the state and removes it from sessionStorage
        logout: (state) => {
            state.name = null;
            state.email = null;
            sessionStorage.removeItem('user');
        },

        // Update Profile action
        // Updates the user's name and email in the state and saves it to sessionStorage
        updateProfile: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            sessionStorage.setItem('user', JSON.stringify(state));
        },
    },
});

// Export the actions and reducer
// Allows other parts of the application to dispatch user actions and access the reducer
export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
