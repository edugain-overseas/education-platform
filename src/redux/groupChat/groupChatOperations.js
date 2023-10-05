import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/instance";
import {
  attachFileToMessage,
  deleteFile,
  loadMoreMessages,
  readAnswer,
  readMessage,
} from "../../services/groupChatServices";

export const attachFileToMessageThunk = createAsyncThunk(
  "groupChat/attachFile",
  async (file, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await attachFileToMessage(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      const mediaDataObj = {
        path: response.filePath,
        type: file.get("file").type,
        filename: response.fileName,
        size: response.fileSize
      };
      return mediaDataObj;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readMessageThunk = createAsyncThunk(
  "groupChat/readMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      console.log('thunk');
      const response = await readMessage(messageId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readAnswerThunk = createAsyncThunk(
  "groupChat/readAnswer",
  async (answerId, { rejectWithValue }) => {
    try {
      const response = await readAnswer(answerId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadMoreMessagesThunk = createAsyncThunk(
  "groupChat/loadMoreMessages",
  async ({ groupName, lastMessageId }, { rejectWithValue }) => {
    try {
      console.log(groupName, lastMessageId);
      const response = await loadMoreMessages(groupName, lastMessageId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFileThunk = createAsyncThunk(
  "groupChat/deleteFile",
  async (filePath, { rejectWithValue }) => {
    try {
      const response = await deleteFile(filePath);
      console.log({response, filePath});
      return {response, filePath};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
