import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const envConfig = import.meta.env;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: envConfig.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password, firstName, lastName, organizationName }) => ({
        url: "/sign-up",
        method: "POST",
        body: { email, password, firstName, lastName, organizationName },
      }),
    }),
    logout: builder.mutation({
      query: ({ accessToken }) => ({
        url: "/sign-out",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation
} = authApi;
