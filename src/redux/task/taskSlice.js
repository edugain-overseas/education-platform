import { createSlice } from "@reduxjs/toolkit";
import {
  getTestByTaskIdThunk,
  getLectureByTaskIdThunk,
  updateLectureTextThunk,
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

      .addCase(getTestByTaskIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestByTaskIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = [
          ...state.tasks.filter((task) => task.id !== payload.id),
          payload,
        ];
      })
      .addCase(getTestByTaskIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateLectureTextThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLectureTextThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        // state.tasks = [
        //   ...state.tasks.filter((task) => task.id !== payload.id),
        //   payload,
        // ];
      })
      .addCase(updateLectureTextThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
