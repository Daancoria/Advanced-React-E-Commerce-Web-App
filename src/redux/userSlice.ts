import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string | null;
    email: string | null;
    }

    const savedUser = sessionStorage.getItem('user');

    const initialState: UserState = savedUser
    ? JSON.parse(savedUser)
    : { name: null, email: null };

    const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ name: string; email: string }>) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        sessionStorage.setItem('user', JSON.stringify(state));
        },
        logout: (state) => {
        state.name = null;
        state.email = null;
        sessionStorage.removeItem('user');
        },
        updateProfile: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            sessionStorage.setItem('user', JSON.stringify(state));
        }          
    },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
