import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubjectsThunk,
  getSubjectTapesByIdThunk,
} from "./subjectOperations";
import { v4 } from "uuid";

const subjectAbout = [
  {
    id: v4(),
    text: "Title1",
    items: [
      {
        id: v4(),
        text: "text1",
      },
      {
        id: v4(),
        text: "text2",
      },
      {
        id: v4(),
        text: "text3",
      },
      {
        id: v4(),
        text: "text4",
      },
    ],
  },
  {
    id: v4(),
    text: "Title2",
    items: [
      {
        id: v4(),
        text: "text1",
      },
      {
        id: v4(),
        text: "text2",
      },
      {
        id: v4(),
        text: "text3",
      },
    ],
  },
  {
    id: v4(),
    text: "ExamTitle",
  },
];

const initialState = {
  groupSubjects: [],
  subjectsData: [],
  isLoading: false,
  subjectAbout,
  error: null,
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjectsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSubjectsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.groupSubjects = payload;
      })
      .addCase(getAllSubjectsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getSubjectTapesByIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectTapesByIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const { response, subjectId } = payload;
        state.subjectsData = state.subjectsData.filter(subject=>subject.id !== subjectId)
        state.subjectsData = [
          ...state.subjectsData,
          { id: subjectId, ...response },
        ];
      })
      .addCase(getSubjectTapesByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
