import { createSlice } from "@reduxjs/toolkit";
import {
  getScheduleThunk,
  getTeacherScheduleThunk,
} from "./scheduleOperations";

const initialState = {
  schedule: null,
  isLoading: false,
  error: null,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScheduleThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getScheduleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.schedule = payload;
      })
      .addCase(getScheduleThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getTeacherScheduleThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getTeacherScheduleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.schedule = payload;
      })
      .addCase(getTeacherScheduleThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
