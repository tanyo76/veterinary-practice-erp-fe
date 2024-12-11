import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";

export const clinicApi = createApi({
  reducerPath: "clinicApi",
  baseQuery: rtkBaseQuery,
  endpoints: (builder) => ({
    createClinic: builder.mutation({
      query: (payload) => ({
        url: "/clinics",
        method: "POST",
        cache: "no-cache",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateClinicMutation } = clinicApi;
