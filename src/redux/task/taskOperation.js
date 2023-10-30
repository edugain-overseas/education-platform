import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addImagesPartToLecture,
  addMultipleFilesPartToLecture,
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
  "task/addTextPartByLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addTextPartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addImagesPartToLectureThunk = createAsyncThunk(
  "task/addPicturePartByLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addImagesPartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSingleFilePartToLectureThunk = createAsyncThunk(
  "task/addSingleFilePartByLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addSingleFilePartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMultipleFilesPartToLectureThunk = createAsyncThunk(
  "task/addMultipleFilesPartLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addMultipleFilesPartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
