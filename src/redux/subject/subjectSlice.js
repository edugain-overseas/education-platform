import { createSlice } from "@reduxjs/toolkit";
import { getAllSubjects } from "./subjectOperations";



const initialState = {
  groupSubjects: null,
  isLoading: false,
  error: null,
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjects.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSubjects.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.groupSubjects = payload;
      })
      .addCase(getAllSubjects.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
