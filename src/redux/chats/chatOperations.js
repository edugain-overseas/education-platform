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
  "chats/attachFile",
  async ({ subjectId, data: file }, { rejectWithValue }) => {
    try {
      console.log(subjectId, file);
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await attachFileToSubjectMessage(file);
      instance.defaults.headers["Content-Type"] = "application/json";
      const mediaDataObj = {
        path: response.filePath,
        type: file.get("file").type,
        filename: response.fileName,
        size: response.fileSize,
      };
      return { subjectId, data: mediaDataObj };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readMessageThunk = createAsyncThunk(
  "chats/readMessage",
  async ({ subjectId, data: messageId }, { rejectWithValue }) => {
    try {
      const response = await readSubjectMessage(messageId);
      return { subjectId, data: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readAnswerThunk = createAsyncThunk(
  "chats/readAnswer",
  async ({ subjectId, data: answerId }, { rejectWithValue }) => {
    try {
      console.log(subjectId, answerId);
      const response = await readSubjectAnswer(answerId);
      return { subjectId, data: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadMoreMessagesThunk = createAsyncThunk(
  "chats/loadMoreMessages",
  async ({ _, data }, { rejectWithValue }) => {
    try {
      const { subjectId, lastMessageId } = data;
      const response = await loadMoreSubjectMessages(subjectId, lastMessageId);
      console.log(response);
      return { subjectId, data: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSubjectFileThunk = createAsyncThunk(
  "chats/deleteFile",
  async ({ subjectId, data: filePath }, { rejectWithValue }) => {
    try {
      const response = await deleteSubjectFile(filePath);
      return { subjectId, data: { response, filePath } };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
