import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewLesson,
  createSubjectAbout,
  createSubjectInstructionCategory,
  getAllSubjectsByGroupName,
  getDopSubjectsByStudentId,
  getListOfParticipant,
  getSubjectAbout,
  getSubjectById,
  getSubjectIcons,
  getSubjectInstructions,
  getSubjectTapesById,
  updateSubjectAbout,
  updateSubjectById,
  updateSubjectImage,
  updateSubjectInstructionCategory,
  updateSubjectLogo,
  uploadSubjectIcon,
} from "../../services/subjectServices";
import { instance } from "../../services/instance";
import { createLecture } from "../../services/taskServices";

export const getAllSubjectsThunk = createAsyncThunk(
  "subject/getAll",
  async (groupName, { rejectWithValue }) => {
    try {
      const response = await getAllSubjectsByGroupName(groupName);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getDopSubjectsByStudentIdThunk = createAsyncThunk(
  "subject/getDopById",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await getDopSubjectsByStudentId(studentId);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getSubjectTapesByIdThunk = createAsyncThunk(
  "subject/getTapesById",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectTapesById(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectAboutThunk = createAsyncThunk(
  "subject/getAbout",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectAbout(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSubjectAboutThunk = createAsyncThunk(
  "subject/createAbout",
  async ({ id, updatedSubjectAbout }, { rejectWithValue }) => {
    try {
      const response = await createSubjectAbout(id, updatedSubjectAbout);
      return { response, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectAboutThunk = createAsyncThunk(
  "subject/updateAbout",
  async ({ id, updatedSubjectAbout }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectAbout(id, updatedSubjectAbout);
      console.log(response);
      return { response, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getListOfParticipantsThunk = createAsyncThunk(
  "subject/getParticipants",
  async ({ groupId, subjectId }, { rejectWithValue }) => {
    try {
      const response = await getListOfParticipant(groupId, subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectInstructionsThunk = createAsyncThunk(
  "subject/getInstructions",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectInstructions(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSubjectInstructionCategoryThunk = createAsyncThunk(
  "subject/createInstructionCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await createSubjectInstructionCategory(newCategory);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectInstructionCategoryThunk = createAsyncThunk(
  "subject/updateInstructionCategory",
  async ({ categoryId, credentials }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectInstructionCategory(
        categoryId,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectIconsThunk = createAsyncThunk(
  "subject/getIcons",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectIcons(subjectId);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadSubjectIconThunk = createAsyncThunk(
  "subject/uploadIcon",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await uploadSubjectIcon(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectByIdThunk = createAsyncThunk(
  "subject/getById",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectById(subjectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectByIdThunk = createAsyncThunk(
  "subject/updateById",
  async ({ subjectId, subjectData }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectById(subjectId, subjectData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectImageThunk = createAsyncThunk(
  "subject/updateImage",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await updateSubjectImage(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      instance.defaults.headers["Content-Type"] = "application/json";
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectLogoThunk = createAsyncThunk(
  "subject/updateLogo",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      console.log("adadasd");
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await updateSubjectLogo(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewLessonThunk = createAsyncThunk(
  "subject/addLesson",
  async ({ subjectId, data }, { rejectWithValue }) => {
    try {
      const response = await addNewLesson(data);
      const { id: lessonId, lesson_type: lessonType } = response;
      switch (lessonType) {
        case "lecture":
          const lecture = await createLecture(lessonId);
          response.lectureId = lecture.id;
          break;

        default:
          break;
      }
      console.log(response);
      return { subjectId, data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
