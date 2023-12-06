import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addHomeworkPartToLecture,
  addImagesPartToLecture,
  addMultipleFilesPartToLecture,
  addSingleFilePartToLecture,
  addTextPartToLecture,
  crateTestQuestions,
  createTest,
  deleteLectureFile,
  deleteQuestion,
  deleteSection,
  getLectureByTaskId,
  getTestByTaskId,
  updateLectureFiles,
  updateLectureImages,
  updateLectureLink,
  updateLectureSingleFile,
  updateLectureText,
  updateQuestion,
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
  async ({ lessonId, userType }, { rejectWithValue }) => {
    try {
      const response = await getTestByTaskId(lessonId, userType);
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

export const createTestThunk = createAsyncThunk(
  "task/createTest",
  async (config, { rejectWithValue }) => {
    try {
      const response = await createTest(config);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crateTestQuestionsThunk = createAsyncThunk(
  "task/crateTestQuestions",
  async ({ testId, data }, { rejectWithValue }) => {
    try {
      const response = await crateTestQuestions(testId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuestionThunk = createAsyncThunk(
  "task/updateQuestion",
  async ({ questionId, questionData }, { rejectWithValue }) => {
    try {
      const response = await updateQuestion(questionId, questionData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestionThunk = createAsyncThunk(
  "task/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await deleteQuestion(questionId);
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
