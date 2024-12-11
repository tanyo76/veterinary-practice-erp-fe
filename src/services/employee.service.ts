import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";
import { getLocalstorageKey } from "../utils/localstorage.utils";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: rtkBaseQuery,
  endpoints: (builder) => ({
    getClinicEmployees: builder.query({
      query: () => ({
        url: `/clinics/${getLocalstorageKey("clinicId")}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    deleteEmployee: builder.query({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        cache: "default",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLazyDeleteEmployeeQuery, useGetClinicEmployeesQuery } =
  employeeApi;
