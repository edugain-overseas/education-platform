import { configureStore } from "@reduxjs/toolkit";
// import { rootReducer } from "./rootReducer";
import { userSlice } from "./user/userSlice";
import { chatSlice } from "./chat/chatSlice";

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
import storage from "redux-persist/lib/storage";
import { scheduleSlice } from "./schedule/scheduleSlice";
import { subjectSlice } from "./subject/subjectSlice";

const persistConfig = {
  key: "persisted-user",
  storage,
  whitelist: ["token", "userName", "userId", "userType"],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    chat: chatSlice.reducer,
    schedule: scheduleSlice.reducer,
    subject: subjectSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
