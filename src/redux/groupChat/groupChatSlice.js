import { createSlice } from "@reduxjs/toolkit";
import {
  attachFileToMessageThunk,
  loadMoreMessagesThunk,
  readAnswerThunk,
  readMessageThunk,
} from "./groupChatOperations";

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
  isLoading: false,
  error: null,
  historyEnd: false,
};

export const groupChatSlice = createSlice({
  name: "groupChat",
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
        answers: [],
      };
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
          message.answers = [...message.answers, newAnswer];
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
      })
      .addCase(attachFileToMessageThunk.rejected, (state, { payload }) => {
        state.attachedFilesToMessage.isLoading = false;
        state.attachedFilesToMessage.error = payload;
      })

      .addCase(readMessageThunk.pending, (state, _) => {
        state.error = null;
      })
      .addCase(readMessageThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        const updatedMessages = state.messages.map((message) => {
          if (message.message_id === payload.id) {
            return { ...message, read_by: payload.read_by.split(", ") };
          }
          return message;
        });
        state.messages = updatedMessages;
      })
      .addCase(readMessageThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(readAnswerThunk.pending, (state, _) => {
        state.error = null;
      })
      .addCase(readAnswerThunk.fulfilled, (state, { payload }) => {
        const updatedMessages = state.messages.map((message) => {
          message.answers = message.answers.map((answer) => {
            if (answer.answer_id === payload.id) {
              return { ...answer, read_by: payload.read_by.split(", ") };
            }
            return answer;
          });
          return message;
        });
        state.messages = updatedMessages;
      })
      .addCase(readAnswerThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(loadMoreMessagesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMoreMessagesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.messages.length === 0) {
          state.historyEnd = true;
          return;
        }
        state.messages = [...state.messages, ...payload.messages];
      })
      .addCase(loadMoreMessagesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
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
} = groupChatSlice.actions;
