import { createSlice } from "@reduxjs/toolkit";
import { attachFileToMessageThunk } from "./chatOperations";

const initialState = {
  messages: null,
  participantsData: null,
  activeData: null,
  attachedFilesToMessage: {
    isLoading: false,
    error: null,
    filesURL: [],
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    setUsers(state, { payload }) {
      state.participantsData = payload;
    },
    setActiveData(state, { payload }) {
      state.activeData = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [payload, ...state.messages];
    },
    clearAttachedFiles(state, _) {
      state.attachedFilesToMessage.filesURL = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attachFileToMessageThunk.pending, (state, _) => {
        state.attachedFilesToMessage.isLoading = true;
        state.attachedFilesToMessage.error = null;
      })
      .addCase(attachFileToMessageThunk.fulfilled, (state, { payload }) => {
        state.attachedFilesToMessage.isLoading = false;
        state.attachedFilesToMessage.filesURL = [
          ...state.attachedFilesToMessage.filesURL,
          payload,
        ];
      })
      .addCase(attachFileToMessageThunk.rejected, (state, { payload }) => {
        state.attachedFilesToMessage.isLoading = false;
        state.attachedFilesToMessage.error = payload;
      });
  },
});

export const {
  setMessages,
  setUsers,
  setActiveData,
  addMessage,
  clearAttachedFiles,
} = chatSlice.actions;
