import { createSlice } from "@reduxjs/toolkit";
import {
  getTestByTaskIdThunk,
  getLectureByTaskIdThunk,
  updateLectureTextThunk,
  createTestThunk,
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
      })
      .addCase(updateLectureTextThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createTestThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestThunk.fulfilled, (state, action) => {
        const { lesson_id: lessonId } = action.meta.arg;
        const {
          attempts,
          deadline,
          id,
          is_published,
          min_score,
          set_timer,
          show_answer,
          shuffle_answer,
          timer,
        } = action.payload;

        const testConfig = {
          attempts,
          deadline,
          testId: id,
          isPublished: is_published,
          minScore: min_score,
          setTimer: set_timer,
          showAnswer: show_answer,
          shuffleAnswer: shuffle_answer,
          timer,
          testQuestions: [],
        };
        console.log(testConfig);

        state.isLoading = false;
        state.tasks = [
          ...state.tasks.map((lesson) => {
            console.log(lesson);
            if (+lesson.id === lessonId) {
              console.log(lesson);
              console.log({
                ...lesson,
                data: { ...lesson.data, ...testConfig },
              });
              return { ...lesson, data: { ...lesson.data, ...testConfig } };
            }
            return lesson;
          }),
        ];
      })
      .addCase(createTestThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
