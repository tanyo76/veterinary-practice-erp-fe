import { createApi } from "@reduxjs/toolkit/query/react";
import rtkBaseQuery from "./baseQuery";


type AccessTokenResponse = {
  success: boolean;
  token: string;
  userId: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: rtkBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AccessTokenResponse, LoginInput>({
      query: ({ email, password }) => ({
        url: "/auth",
        method: "PUT",
        cache: "no-cache",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password, firstName, lastName, role }) => ({
        url: "/auth",
        method: "POST",
        cache: "no-cache",
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
