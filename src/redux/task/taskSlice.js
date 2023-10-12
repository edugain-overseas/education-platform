import { createSlice } from "@reduxjs/toolkit";
import {
  getLTestByTaskIdThunk,
  getLectureByTaskIdThunk,
} from "./taskOperation";

const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLectureByTaskIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLectureByTaskIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = [
          ...state.tasks.filter((task) => task.id !== payload.id),
          payload,
        ];
      })
      .addCase(getLectureByTaskIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getLTestByTaskIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLTestByTaskIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = [
          ...state.tasks.filter((task) => task.id !== payload.id),
          payload,
        ];
      })
      .addCase(getLTestByTaskIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
