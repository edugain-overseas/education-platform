import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addHomeworkPartToLecture,
  addImagesPartToLecture,
  addMultipleFilesPartToLecture,
  addSingleFilePartToLecture,
  addTextPartToLecture,
  deleteLectureFile,
  deleteSection,
  getLectureByTaskId,
  getTestByTaskId,
  updateLectureFiles,
  updateLectureImages,
  updateLectureLink,
  updateLectureSingleFile,
  updateLectureText,
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

export const addHomeworkPartToLectureThunk = createAsyncThunk(
  "task/addHomeworkPartLessonId",
  async ({ lectureId, partData }, { rejectWithValue }) => {
    try {
      const response = await addHomeworkPartToLecture(lectureId, partData);
      return { lectureId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLectureTextThunk = createAsyncThunk(
  "task/updateLectureText",
  async ({ attrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLectureText(attrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLectureSingleFileThunk = createAsyncThunk(
  "task/updateLectureSingleFile",
  async ({ attrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLectureSingleFile(attrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLectureFilesThunk = createAsyncThunk(
  "task/updateLectureFiles",
  async ({ attrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLectureFiles(attrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLectureImagesThunk = createAsyncThunk(
  "task/updateLectureImages",
  async ({ attrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLectureImages(attrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLectureLinkThunk = createAsyncThunk(
  "task/updateLectureLink",
  async ({ attrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLectureLink(attrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLectureFileThunk = createAsyncThunk(
  "task/deleteLectureFile",
  async (filePath, { rejectWithValue }) => {
    try {
      const response = await deleteLectureFile(filePath);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSectionThunk = createAsyncThunk(
  "task/deleteSection",
  async (attrId, { rejectWithValue }) => {
    try {
      const response = await deleteSection(attrId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
