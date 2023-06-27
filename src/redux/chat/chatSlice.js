import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      console.log(payload);
      state.messages = payload;
    },
  },
});

export const { setMessages } = chatSlice.actions;
