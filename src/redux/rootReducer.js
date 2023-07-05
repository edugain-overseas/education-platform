import { combineReducers } from "@reduxjs/toolkit"
import { userSlice } from "./user/userSlice"
import { chatSlice } from "./chat/chatSlice"

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    chat: chatSlice.reducer
})