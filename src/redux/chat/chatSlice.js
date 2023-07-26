import { createSlice } from "@reduxjs/toolkit";
import { attachFileToMessageThunk } from "./chatOperations";

const initialState = {
  messages: null,
  participantsData: null,
  activeData: null,
  attachedFilesToMessage: {
    isLoading: false,
    error: null,
    filesData: [],
  },
  isFeedback: false,
  feedbackTo: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      state.participantsData = payload;
    },
    setActiveData(state, { payload }) {
      state.activeData = payload;
    },
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      const newMessage = {
        ...payload,
        answers: []
      }
      state.messages = [newMessage, ...state.messages];
    },
    setFeedback(state, { payload }) {
      if (payload) {
        state.isFeedback = true;
        state.feedbackTo = payload;
      } else {
        state.isFeedback = false;
        state.feedbackTo = null;
      }
    },
    addFeedback(state, { payload }) {
      const newAnswer = {
        answer_id: payload.answer_id,
        answer: payload.answer_text,
        answer_datetime: payload.answer_datetime,
        sender_id: payload.sender_id,
        sender_type: payload.sender_type,
        read_by: payload.read_by,
        attach_file: payload.attach_files,
      };

      state.messages.forEach((message) => {
        if (message.message_id === payload.message_id) {
          message.answers = [...message.answers, newAnswer]
        }
      });
    },
    clearAttachedFiles(state, _) {
      state.attachedFilesToMessage.filesData = [];
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
        state.attachedFilesToMessage.filesData = [
          ...state.attachedFilesToMessage.filesData,
          payload,
        ];
        console.log(JSON.stringify(state.attachedFilesToMessage.filesData));
      })
      .addCase(attachFileToMessageThunk.rejected, (state, { payload }) => {
        state.attachedFilesToMessage.isLoading = false;
        state.attachedFilesToMessage.error = payload;
      });
  },
});

export const {
  setUsers,
  setActiveData,
  setMessages,
  addMessage,
  setFeedback,
  addFeedback,
  clearAttachedFiles,
} = chatSlice.actions;
