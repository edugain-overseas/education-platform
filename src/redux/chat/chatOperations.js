import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/instance";
import { attachFileToMessage } from "../../services/chatServices";

export const attachFileToMessageThunk = createAsyncThunk(
  "chat/attachFile",
  async (file, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await attachFileToMessage(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
