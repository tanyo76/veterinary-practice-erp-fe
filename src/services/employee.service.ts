import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: rtkBaseQuery,
  tagTypes: ["Employees", "Users"],
  endpoints: (builder) => ({
    deleteEmployee: builder.mutation({
      query: ({ userIds, clinicId }) => ({
        url: `/employeeToClinic`,
        method: "POST",
        body: { userIds, clinicId },
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
    getAllUsers: builder.query<void, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    addEmployeeToClinic: builder.mutation({
      query: ({ userId, clinicId }) => ({
        url: `/clinics/${clinicId}`,
        method: "POST",
        body: { userId, clinicId },
      }),
      invalidatesTags: ["Employees"],
    }),
    createGlobalUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useDeleteEmployeeMutation,
  useGetClinicEmployeesQuery,
  useLazyGetClinicEmployeesQuery,
  useGetAllUsersQuery,
  useAddEmployeeToClinicMutation,
  useCreateGlobalUserMutation,
} = employeeApi;
