import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";
import { clinicApi } from "../services/clinic.service";
import { employeeApi } from "../services/employee.service";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(clinicApi.middleware)
      .concat(employeeApi.middleware),
});

setupListeners(store.dispatch);

export default store;
