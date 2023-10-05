import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSchedule, getTeacherSchedule } from "../../services/scheduleServices";

export const getScheduleThunk = createAsyncThunk(
  "schedule/getAll",
  async (groupName, { rejectWithValue }) => {
    try {
      const response = await getSchedule(groupName);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getTeacherScheduleThunk = createAsyncThunk(
  "teacherSchedule/getAll",
  async (teacherId, { rejectWithValue }) => {
    try {
      const response = await getTeacherSchedule(teacherId);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
