import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSubjectsByGroupName,
  getListOfParticipant,
  getSubjectAbout,
  getSubjectById,
  getSubjectIcons,
  getSubjectTapesById,
  updateSubjectAbout,
  updateSubjectById,
  updateSubjectImage,
  updateSubjectLogo,
  uploadSubjectIcon,
} from "../../services/subjectServices";
import { instance } from "../../services/instance";

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
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectLogoThunk = createAsyncThunk(
  "subject/updateLogo",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await updateSubjectLogo(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
