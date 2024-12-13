import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";
import { getLocalstorageKey } from "../utils/localstorage.utils";

export const clinicApi = createApi({
  reducerPath: "clinicApi",
  baseQuery: rtkBaseQuery,
  tagTypes: ["Clinic", "Clinics"],
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
      providesTags: ["Clinic"],
    }),
    updateClinic: builder.mutation({
      query: (body) => ({
        url: `/clinics`,
        method: "PUT",
        cache: "no-cache",
        body: body,
      }),
      invalidatesTags: ["Clinic", "Clinics"],
    }),
    getClinics: builder.query({
      query: () => ({
        url: `/clinics/${getLocalstorageKey("userId")}`,
        method: "GET",
      }),
      providesTags: ["Clinics"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateClinicMutation,
  useGetClinicByIdQuery,
  useGetClinicsQuery,
  useUpdateClinicMutation,
} = clinicApi;
