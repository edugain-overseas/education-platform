import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSubjectsByGroupName,
  getNextThreeLessons,
  getTeachersForSubject,
} from "../../services/subjectServices";

export const getAllSubjects = createAsyncThunk(
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

export const getTeachersForSubjectThunk = createAsyncThunk(
  "subject/getTeachers",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getTeachersForSubject(subjectId);
      return {response, subjectId};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getNextThreeLessonsThunk = createAsyncThunk(
  "subject/getNextThreeLessons",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getNextThreeLessons(subjectId);
      return {response, subjectId};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
