import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSchedule } from "../../services/scheduleServices";

export const getScheduleThunk = createAsyncThunk(
  "schedule/getAll",
  async (groupName, { rejectWithValue }) => {
    try {
      const response = await getSchedule(groupName);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
