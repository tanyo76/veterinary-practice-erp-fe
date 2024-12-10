import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalstorageKey } from "../utils/localstorage.utils";

const envConfig = import.meta.env;

export const clinicApi = createApi({
  reducerPath: "clinicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.VITE_BACKEND_URL,
    prepareHeaders(headers) {
      headers.set(
        "authorization",
        `Bearer ${getLocalstorageKey("accessToken")}`
      );
    },
  }),
  endpoints: (builder) => ({
    createClinic: builder.mutation({
      query: (payload) => ({
        url: "/clinics",
        method: "POST",
        cache: "no-cache",
        body: payload,
      }),
    }),
    getClinic: builder.query({
      query: () => ({
        url: `/clinics/${getLocalstorageKey("clinicId")}`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
    getClinicEmployees: builder.query({
      query: () => ({
        url: `/employeeToClinic/${getLocalstorageKey("clinicId")}`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useGetClinicQuery,
  useGetClinicEmployeesQuery,
  useCreateClinicMutation,
} = clinicApi;
