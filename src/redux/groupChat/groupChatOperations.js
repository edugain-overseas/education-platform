import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/instance";
import {
  attachFileToMessage,
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
  "groupChat/readMessage",
  async (messageId, { rejectWithValue }) => {
    try {
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
