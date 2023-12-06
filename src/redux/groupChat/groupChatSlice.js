import { createSlice } from "@reduxjs/toolkit";
import {
  attachFileToMessageThunk,
  deleteFileThunk,
  loadMoreMessagesThunk,
  readAnswerThunk,
  readMessageThunk,
} from "./groupChatOperations";
// import { message } from "antd";

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
    deleteMessage(state, { payload: str }) {
      const id = parseInt(str.split(" ")[3]);

      state.messages.forEach((message) => {
        if (message.messageId === id) {
          message.deleted = true;
        }
      });
    },
    deleteAnswer(state, { payload: str }) {
      const id = parseInt(str.split(" ")[3]);

      state.messages.forEach((message) => {
        message.answers.forEach((answer) => {
          if (answer.answerId === id) {
            answer.deleted = true;
          }
        });
      });
    },
    addFeedback(state, { payload }) {
      const newAnswer = {
        answerId: payload.answerId,
        answer: payload.answerText,
        answerDatetime: payload.answerDatetime,
        senderId: payload.senderId,
        senderType: payload.senderType,
        readBy: payload.readBy,
        attachFiles: payload.attachFiles,
      };
      console.log(payload);

      state.messages.forEach((message) => {
        if (message.messageId === payload.messageId) {
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
        const updatedMessages = state.messages.map((message) => {
          if (message.messageId === payload.id) {
            return { ...message, readBy: payload.read_by.split(", ") };
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
            if (answer.answerId === payload.id) {
              return { ...answer, readBy: payload.read_by.split(", ") };
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
      })

      .addCase(deleteFileThunk.pending, (state, _) => {
        state.attachedFilesToMessage.isLoading = true;
        state.attachedFilesToMessage.error = null;
      })
      .addCase(deleteFileThunk.fulfilled, (state, { payload }) => {
        const { filePath } = payload;
        state.attachedFilesToMessage.filesData = [
          ...state.attachedFilesToMessage.filesData.filter(
            (fileData) => fileData.path !== filePath
          ),
        ];
        state.attachedFilesToMessage.isLoading = false;
      })
      .addCase(deleteFileThunk.rejected, (state, { payload }) => {
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
  deleteMessage,
  deleteAnswer,
} = groupChatSlice.actions;
