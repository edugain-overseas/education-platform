import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/instance";
import {
  attachFileToSubjectMessage,
  deleteSubjectFile,
  loadMoreSubjectMessages,
  readSubjectAnswer,
  readSubjectMessage,
} from "../../services/groupChatServices";

export const attachFileToMessageThunk = createAsyncThunk(
  "subjectChat/attachFile",
  async (file, { rejectWithValue }) => {
    try {
      console.log(file);
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await attachFileToSubjectMessage(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      const mediaDataObj = {
        path: response,
        "mime-type": file.get("file").type,
      };
      return mediaDataObj;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readMessageThunk = createAsyncThunk(
  "subjectChat/readMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await readSubjectMessage(messageId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readAnswerThunk = createAsyncThunk(
  "subjectChat/readAnswer",
  async (answerId, { rejectWithValue }) => {
    try {
      const response = await readSubjectAnswer(answerId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadMoreMessagesThunk = createAsyncThunk(
  "subjectChat/loadMoreMessages",
  async ({ subjectId, lastMessageId }, { rejectWithValue }) => {
    try {
      console.log(subjectId, lastMessageId);
      const response = await loadMoreSubjectMessages(subjectId, lastMessageId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSubjectFileThunk = createAsyncThunk(
  "subjectChat/deleteFile",
  async (filePath, { rejectWithValue }) => {
    try {
      const response = await deleteSubjectFile(filePath);
      return {response, filePath};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
