import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changeAvatar,
  changeTeacherAvatar,
  getUserInfo,
  login,
  logout,
} from "../../services/userServices";
import { instance } from "../../services/instance";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credenrials, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] =
        "application/x-wwww-form-urlencoded";
      const response = await login(credenrials);

      instance.defaults.headers["Content-Type"] = "application/json";
      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.access_token}`;

      return response;
    } catch (error) {
      return rejectWithValue(error);
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
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;

      const userType = getState().user.userType;

      const response = await getUserInfo(userType);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeUserAvatarThunk = createAsyncThunk(
  "user/changeAvatar",
  async (file, { rejectWithValue, getState }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const userType = getState().user.userType;
      const response =
        userType === "student"
          ? await changeAvatar(file)
          : await changeTeacherAvatar(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response.photo_path;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      instance.defaults.headers["Authorization"] = "";
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
