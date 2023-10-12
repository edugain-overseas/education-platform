import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLectureByTaskId,
  getTestByTaskId,
} from "../../services/taskServices";

export const getLectureByTaskIdThunk = createAsyncThunk(
  "task/getLectureByLessonId",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await getLectureByTaskId(lessonId);
      return { data: response, id: lessonId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLTestByTaskIdThunk = createAsyncThunk(
  "task/getTestByLessonId",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await getTestByTaskId(lessonId);
      return { data: response, id: lessonId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
