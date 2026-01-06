import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const persistedToken = localStorage.getItem("token");
const persistedUser = localStorage.getItem("user");

const preloadedState = {
  auth: {
    user: persistedUser ? JSON.parse(persistedUser) : null,
    token: persistedToken || null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
