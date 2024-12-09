import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
