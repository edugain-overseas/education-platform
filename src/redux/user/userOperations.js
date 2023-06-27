import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, login } from "../../services/userServices";
import { instance } from "../../services/instance";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credenrials, thunkAPI) => {
    try {
      const response = await login(credenrials);

      instance.defaults.headers['Content-Type'] = 'application/json';
      instance.defaults.headers['Authorization'] = `Bearer ${response.access_token}`;
      
      return response;
    } catch (error) {
        return thunkAPI(error)
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  'user/info',
  async(_, thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response
    } catch (error) {
      return thunkAPI(error)
    }
  }
)

