import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteLocalstorageKey } from "../../utils/localstorage.utils";

type InitialStateType = {
  email: string;
  isLoggedIn: boolean;
  accessToken: string | null;
};

const initialState: InitialStateType = {
  email: "",
  isLoggedIn: false,
  accessToken: null,
};

type ActionAuthInfo = Omit<InitialStateType, "isLoggedIn">;

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearAuthSliceState: () => initialState,
    setAuthState: (state, action: PayloadAction<ActionAuthInfo>) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    clearAuthState: () => {
      deleteLocalstorageKey("accessToken");
      deleteLocalstorageKey("email");
      return initialState;
    },
  },
});

export const { clearAuthSliceState, setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
