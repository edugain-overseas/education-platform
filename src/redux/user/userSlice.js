import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./userOperations";

const initialState = {
    userName: null,
    userId: null,
    userAvatar: null,
    userType: null,
    isAuthenticated: false,
    error: null,
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, {payload}) => {
                state.isLoading = true;
            })
            .addCase(loginThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.userName = payload.username;
                state.userId = payload.id
                state.userType = payload.type
                state.isAuthenticated = true;
            })
            .addCase(loginThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload
            })
    }
})

