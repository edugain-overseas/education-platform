import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sender: null,
    messageText: null,
    to: null,
}

export const newMessageSlice = createSlice({
    name: 'newMessage',
    initialState,
    reducers: {
        addMessageText(state, {payload}) {
            state.messageText = payload;
        }
    },
})

