import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSingleFilePartToLecture,
  addTextPartToLecture,
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

export const getTestByTaskIdThunk = createAsyncThunk(
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

export const addTextPartToLectureThunk = createAsyncThunk(
  "task/getTestByLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addTextPartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSingleFilePartToLectureThunk = createAsyncThunk(
  "task/getTestByLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addSingleFilePartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
