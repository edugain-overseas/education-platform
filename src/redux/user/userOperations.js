import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/userServices";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credenrials, thunkAPI) => {
    try {
      const response = await login(credenrials);
      return response;
    } catch (error) {
        return thunkAPI(error)
    }
  }
);
