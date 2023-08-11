import { createSlice } from "@reduxjs/toolkit";
import { getAllSubjects, getNextThreeLessonsThunk, getTeachersForSubjectThunk } from "./subjectOperations";



const initialState = {
  groupSubjects: null,
  subjectsData: null,
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
      })

      .addCase(getTeachersForSubjectThunk.pending, (state, _) => {
        state.isLoading = true
        state.error = null
      })  
      .addCase(getTeachersForSubjectThunk.fulfilled, (state, {payload}) => {
        // state.groupSubjects = state.groupSubjects.map(subject=>{
        //   if (subject.id === payload.subjectId) {
        //     subject.
        //   }
        // })
      })
      .addCase(getTeachersForSubjectThunk.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })

      .addCase(getNextThreeLessonsThunk.pending, (state, _) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getNextThreeLessonsThunk.fulfilled, (state, {payload}) => {
        
      })
      .addCase(getNextThreeLessonsThunk.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })
  },
});
