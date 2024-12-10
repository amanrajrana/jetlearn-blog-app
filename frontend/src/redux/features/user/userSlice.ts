import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./services";
import { deleteCookie } from "@/utils/cookie";

export interface UserState {
  authStatus: "idle" | "pending" | "authorized" | "unauthorized";
  message: string | null;
  user: {
    id: number;
    username: string;
  } | null;
}

const initialState: UserState = {
  message: null,
  authStatus: "idle",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: UserState) => {
      deleteCookie("token");
      state.authStatus = "unauthorized";
      state.user = null;
    },
  },
  extraReducers,
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
