import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLectureByTaskId } from "../../services/taskServices";

export const getLectureByTaskIdThunk = createAsyncThunk(
  "task/getLectureById",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await getLectureByTaskId(lessonId);
      console.log(response);
      return { data: response, id: lessonId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
