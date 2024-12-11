import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";
import { getLocalstorageKey } from "../utils/localstorage.utils";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: rtkBaseQuery,
  tagTypes: ["Employees", "Clinics"],
  endpoints: (builder) => ({
    getClinics: builder.query({
      query: () => ({
        url: `/clinics/${getLocalstorageKey("userId")}`,
        method: "GET",
      }),
      providesTags: ["Clinics"],
      keepUnusedDataFor: 0,
    }),
    deleteEmployee: builder.mutation({
      query: ({ userId, clinicId }) => ({
        url: `/employeeToClinic/${userId}/${clinicId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    getClinicEmployees: builder.query({
      query: (clinicId) => ({
        url: `/employeeToClinic/${clinicId}`,
        method: "GET",
      }),
      providesTags: ["Employees"],
    }),
  }),
});

export const {
  useDeleteEmployeeMutation,
  useGetClinicEmployeesQuery,
  useGetClinicsQuery,
  useLazyGetClinicEmployeesQuery,
} = employeeApi;
