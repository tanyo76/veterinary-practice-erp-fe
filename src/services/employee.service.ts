import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";
import { getLocalstorageKey } from "../utils/localstorage.utils";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: rtkBaseQuery,
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getClinicEmployees: builder.query({
      query: () => ({
        url: `/clinics/${getLocalstorageKey("userId")}`,
        method: "GET",
      }),
      providesTags: ["Employees"],
      keepUnusedDataFor: 0,
    }),
    deleteEmployee: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useDeleteEmployeeMutation, useGetClinicEmployeesQuery } =
  employeeApi;
