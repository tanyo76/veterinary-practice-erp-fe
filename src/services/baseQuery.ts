import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  deleteLocalstorageKey,
  getLocalstorageKey,
} from "../utils/localstorage.utils";

const envConfig = import.meta.env;
const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.VITE_BACKEND_URL,
  prepareHeaders(headers) {
    headers.set("authorization", `Bearer ${getLocalstorageKey("accessToken")}`);
  },
});

const rtkBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status == "FETCH_ERROR")
  ) {
    deleteLocalstorageKey("accessToken");
    deleteLocalstorageKey("email");
    deleteLocalstorageKey("userId");
    window.location.href = envConfig.VITE_FRONTEND_URL;
  }
  return result;
};

export default rtkBaseQuery;
