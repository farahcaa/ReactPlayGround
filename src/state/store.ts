import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { postApiSlice } from "./posts/postsApiSlice";
import { getsApiSlice } from "./posts/getsApiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ counter: counterReducer })
);
export const store = configureStore({
  reducer: {
    rootReducer: persistedReducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [getsApiSlice.reducerPath]: getsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postApiSlice.middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
