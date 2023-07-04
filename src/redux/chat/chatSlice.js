import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
  participantsData: null
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      console.log(payload);
      state.messages = payload;
    },
    setUsers(state, {payload}) {
      console.log(payload);
      state.participantsData = payload;
    }
  },
});

export const { setMessages, setUsers } = chatSlice.actions;
