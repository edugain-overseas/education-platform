import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
  participantsData: null,
  activeData: null
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    setUsers(state, {payload}) {
      state.participantsData = payload;
    },
    setActiveData(state, {payload}) {
      state.activeData = payload;
    },
    addMessage(state, {payload}) {
      state.messages = [payload, ...state.messages];
    }
  },
});

export const { setMessages, setUsers, setActiveData, addMessage } = chatSlice.actions;
