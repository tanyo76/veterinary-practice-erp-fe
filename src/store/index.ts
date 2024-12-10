import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";
import { clinicApi } from "../services/clinic.service";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(clinicApi.middleware),
});

setupListeners(store.dispatch);

export default store;
