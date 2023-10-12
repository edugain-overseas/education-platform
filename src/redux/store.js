import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userSlice } from "./user/userSlice";
import { groupChatSlice } from "./groupChat/groupChatSlice";
import { scheduleSlice } from "./schedule/scheduleSlice";
import { subjectSlice } from "./subject/subjectSlice";
import { configSlice } from "./config/configSlice";
import { subjectChatSlice } from "./subjectChats/subjectChatSlice";
import { taskSlice } from "./task/taskSlice";
import { chatsSlice } from "./chats/chatsSlice";

const persistConfig = {
  key: "persisted-user",
  storage,
  whitelist: ["token", "userName", "userId", "userType"],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    groupChat: groupChatSlice.reducer,
    schedule: scheduleSlice.reducer,
    subject: subjectSlice.reducer,
    config: configSlice.reducer,
    subjectChat: subjectChatSlice.reducer,
    task: taskSlice.reducer,
    chats: chatsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
