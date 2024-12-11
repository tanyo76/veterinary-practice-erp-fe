import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteLocalstorageKey } from "../../utils/localstorage.utils";

type InitialStateType = {
  email: string;
  isLoggedIn: boolean;
  accessToken: string | null;
  addExistingUserToClinicDialogState: boolean;
};

const initialState: InitialStateType = {
  email: "",
  isLoggedIn: false,
  accessToken: null,
  addExistingUserToClinicDialogState: false,
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
      deleteLocalstorageKey("userId");
      return initialState;
    },
    toggleAddExistingUserToClinicDialog: (state) => {
      state.addExistingUserToClinicDialogState =
        !state.addExistingUserToClinicDialogState;
    },
  },
});

export const {
  clearAuthSliceState,
  setAuthState,
  clearAuthState,
  toggleAddExistingUserToClinicDialog,
} = authSlice.actions;

export default authSlice.reducer;
