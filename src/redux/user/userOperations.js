import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changeAvatar,
  getUserInfo,
  login,
  logout,
} from "../../services/userServices";
import { instance } from "../../services/instance";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credenrials, thunkAPI) => {
    try {
      const response = await login(credenrials);

      instance.defaults.headers["Content-Type"] = "application/json";
      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.access_token}`;

      return response;
    } catch (error) {
      return thunkAPI(error);
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  "user/info",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      if (!token) {
        return rejectWithValue("No token");
      }

      instance.defaults.headers["Content-Type"] = "application/json";
      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await getUserInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeUserAvatarThunk = createAsyncThunk(
  "user/changeAvatar",
  async (file, thunkAPI) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await changeAvatar(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      console.log(response.photo_path);
      return response.photo_path;
    } catch (error) {
      return thunkAPI(error);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      instance.defaults.headers["Authorization"] = "";
      return response;
    } catch (error) {
      return thunkAPI(error);
    }
  }
);
