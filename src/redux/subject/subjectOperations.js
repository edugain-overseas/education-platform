import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSubjectsByGroupName,
  getSubjectAbout,
  getSubjectTapesById,
} from "../../services/subjectServices";

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
