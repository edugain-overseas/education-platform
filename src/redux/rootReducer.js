import { combineReducers } from "@reduxjs/toolkit"
import { userSlice } from "./user/userSlice"

export const rootReducer = combineReducers({
    user: userSlice.reducer
})