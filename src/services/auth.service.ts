import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const envConfig = import.meta.env;

type AccessTokenResponse = {
  success: boolean;
  token: string;
  clinic: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: envConfig.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<AccessTokenResponse, LoginInput>({
      query: ({ email, password }) => ({
        url: "/auth",
        method: "PUT",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password, firstName, lastName, role }) => ({
        url: "/auth",
        method: "POST",
        body: { email, password, firstName, lastName, role },
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

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
