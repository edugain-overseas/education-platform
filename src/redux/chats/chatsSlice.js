import { createSlice } from "@reduxjs/toolkit";
import {
  attachFileToMessageThunk,
  deleteSubjectFileThunk,
  loadMoreMessagesThunk,
  readAnswerThunk,
  readMessageThunk,
} from "./chatOperations";

const chatInitialState = {
  subjectId: null,
  messages: [],
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

const initialState = [];

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addNewSubjectChat(state, { payload }) {
      state.push({ ...chatInitialState, subjectId: payload });
    },
    deleteSubjectChat(state, { payload }) {
      state = [...state.filter((chat) => chat.subjectId !== payload)];
    },
    setUsers(state, { payload }) {
      state = [
        ...state,
        (state.find(
          (chat) => chat.subjectId === payload.subjectId
        ).participantsData = payload.data),
      ];
      state.participantsData = payload;
    },
    setActiveData(state, { payload }) {
      state = [
        ...state,
        (state.find((chat) => chat.subjectId === payload.subjectId).activeData =
          payload.data),
      ];
    },
    setMessages(state, { payload }) {
      state = [
        ...state,
        (state.find((chat) => chat.subjectId === payload.subjectId).messages =
          payload.data),
      ];
    },
    addMessage(state, { payload }) {
      const newMessage = {
        ...payload.data,
        answers: [],
      };
      state = [
        ...state,
        (state.find((chat) => chat.subjectId === payload.subjectId).messages = [
          newMessage,
          ...state.find((chat) => chat.subjectId === payload.subjectId)
            .messages,
        ]),
      ];
    },
    deleteMessage(state, { payload }) {
      const { subjectId, data: message } = payload;
      const messageId = parseInt(message.split(" ")[3]);
      const chat = state.find((chat) => chat.subjectId === subjectId);
      if (chat) {
        const messageIndex = chat.messages.findIndex(
          (msg) => msg.messageId === messageId
        );
        if (messageIndex !== -1) {
          chat.messages[messageIndex].deleted = true;
        }
      }
    },
    deleteAnswer(state, { payload }) {
      console.log(payload);
      const { subjectId, data: message } = payload;
      const answerId = parseInt(message.split(" ")[3]);
      const chat = state.find((chat) => chat.subjectId === subjectId);
      if (chat) {
        chat.messages.forEach((message) => {
          message.answers.forEach((answer) => {
            if (answer.answerId === answerId) {
              answer.deleted = true;
            }
          });
        });
      }
    },
    setFeedback(state, { payload }) {
      if (payload.data) {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).isFeedback = true),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).feedbackTo = payload.data),
        ];
      } else {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).isFeedback = false),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).feedbackTo = null),
        ];
      }
    },
    addFeedback(state, { payload }) {
      const newAnswer = {
        answerId: payload.data.answerId,
        answer: payload.data.answerText,
        answerDatetime: payload.data.answerDatetime,
        senderId: payload.data.senderId,
        senderType: payload.data.senderType,
        readBy: payload.data.readBy,
        attachFiles: payload.data.attachFiles,
      };
      state = [
        ...state,
        state
          .find((chat) => chat.subjectId === payload.subjectId)
          .messages.forEach((message) => {
            if (message.messageId === payload.data.messageId) {
              message.answers = [...message.answers, newAnswer];
            }
          }),
      ];
    },
    clearAttachedFiles(state, { payload }) {
      state = [
        ...state,
        (state.find(
          (chat) => chat.subjectId === payload.subjectId
        ).attachedFilesToMessage.filesData = []),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attachFileToMessageThunk.pending, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.isLoading = true),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.error = null),
        ];
      })
      .addCase(attachFileToMessageThunk.fulfilled, (state, { payload }) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).attachedFilesToMessage.isLoading = false),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).attachedFilesToMessage.filesData = [
            ...state.find((chat) => chat.subjectId === payload.subjectId)
              .attachedFilesToMessage.filesData,
            payload.data,
          ]),
        ];
      })
      .addCase(attachFileToMessageThunk.rejected, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.isLoading = false),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.error = action.payload),
        ];
      })
      //
      .addCase(readMessageThunk.pending, (state, action) => {
        const subjectId = action.meta.arg.subjectId;
        state = [
          ...state,
          (state.find((chat) => chat.subjectId === subjectId).error = null),
        ];
      })
      .addCase(readMessageThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        const updatedMessages = state
          .find((chat) => chat.subjectId === payload.subjectId)
          .messages.map((message) => {
            if (message.messageId === payload.data.id) {
              return { ...message, readBy: payload.data.read_by.split(", ") };
            }
            return message;
          });
        state = [
          ...state,
          (state.find(
            (chat) => chat?.subjectId === payload.subjectId
          ).messages = updatedMessages),
        ];
      })
      .addCase(readMessageThunk.rejected, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).error = action.payload),
        ];
      })
      //
      .addCase(readAnswerThunk.pending, (state, action) => {
        const subjectId = action.meta.arg.subjectId;
        state = [
          ...state,
          (state.find((chat) => chat.subjectId === subjectId).error = null),
        ];
      })
      .addCase(readAnswerThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        const updatedMessages = state
          .find((chat) => chat.subjectId === payload.subjectId)
          .messages.map((message) => {
            message.answers = message.answers.map((answer) => {
              if (answer.answerId === payload.data.id) {
                return { ...answer, readBy: payload.data.read_by.split(", ") };
              }
              return answer;
            });
            return message;
          });

        state = [
          ...state,
          (state.find((chat) => chat.subjectId === payload.subjectId).messages =
            updatedMessages),
        ];
      })
      .addCase(readAnswerThunk.rejected, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).error = action.payload),
        ];
      })
      //
      .addCase(loadMoreMessagesThunk.pending, (state, action) => {
        const subjectId = action.meta.arg.subjectId;
        state = [
          ...state,
          (state.find((chat) => chat.subjectId === subjectId).isLoading = true),
        ];
        state = [
          ...state,
          (state.find((chat) => chat.subjectId === subjectId).error = null),
        ];
      })
      .addCase(loadMoreMessagesThunk.fulfilled, (state, { payload }) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).isLoading = false),
        ];
        if (payload.data.messages.length === 0) {
          state = [
            ...state,
            (state.find(
              (chat) => chat.subjectId === payload.subjectId
            ).historyEnd = true),
          ];
          return;
        }
        state = [
          ...state,
          (state.find((chat) => chat.subjectId === payload.subjectId).messages =
            [
              ...state.find((chat) => chat.subjectId === payload.subjectId)
                .messages,
              ...payload.data.messages,
            ]),
        ];
      })
      .addCase(loadMoreMessagesThunk.rejected, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).isLoading = false),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).error = action.payload),
        ];
      })
      //
      .addCase(deleteSubjectFileThunk.pending, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.isLoading = true),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.error = null),
        ];
      })
      .addCase(deleteSubjectFileThunk.fulfilled, (state, { payload }) => {
        const { filePath } = payload.data;
        console.log(filePath);
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).attachedFilesToMessage.filesData = state
            .find((chat) => chat.subjectId === payload.subjectId)
            .attachedFilesToMessage.filesData.filter(
              (fileData) => fileData.path !== filePath
            )),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === payload.subjectId
          ).attachedFilesToMessage.isLoading = false),
        ];
      })
      .addCase(deleteSubjectFileThunk.rejected, (state, action) => {
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.isLoading = false),
        ];
        state = [
          ...state,
          (state.find(
            (chat) => chat.subjectId === action.meta.arg.subjectId
          ).attachedFilesToMessage.error = action.payload),
        ];
      });
  },
});

export const {
  addNewSubjectChat,
  deleteSubjectChat,
  setUsers,
  setActiveData,
  setMessages,
  addMessage,
  setFeedback,
  addFeedback,
  clearAttachedFiles,
  deleteMessage,
  deleteAnswer,
} = chatsSlice.actions;
