import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserAvatarThunk,
  getUserInfoThunk,
  loginThunk,
  logoutThunk,
} from "./userOperations";

const initialState = {
  userName: null,
  userId: null,
  userAvatar: null,
  userType: null,
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
      .addCase(loginThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.userName = payload.user.username;
        state.userId = payload.user.id;
        state.userType = payload.user.type;
        state.token = payload.access_token;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getUserInfoThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.info = payload.info;
      })
      .addCase(getUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        state.token = null;
      })
      .addCase(changeUserAvatarThunk.pending, (state, _) => {
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
      })
      .addCase(logoutThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, _) => {
        state.isLoading = false;
        state.error = null;
        state.info = null;
        state.token = null;
        state.userAvatar = null;
        state.userId = null;
        state.userName = null;
        state.userType = null;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
