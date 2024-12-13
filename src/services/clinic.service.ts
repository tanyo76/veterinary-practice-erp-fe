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
    getClinicById: builder.query({
      query: (clinicId) => ({
        url: `/clinics?clinicId=${clinicId}`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
  }),
});

export const { useCreateClinicMutation, useGetClinicByIdQuery } = clinicApi;
