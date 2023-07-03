import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserAvatarThunk,
  getUserInfoThunk,
  loginThunk,
} from "./userOperations";

const initialState = {
  userName: null,
  userId: null,
  userAvatar: null,
  userType: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  token: null,
  info: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.userName = payload.user.username;
        state.userId = payload.user.id;
        state.userType = payload.user.type;
        state.token = payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getUserInfoThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.info = payload.info;
      })
      .addCase(getUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(changeUserAvatarThunk.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserAvatarThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.info.image_path = payload;
      })
      .addCase(changeUserAvatarThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
