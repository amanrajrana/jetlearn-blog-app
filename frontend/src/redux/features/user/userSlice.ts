import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./services";

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
  reducers: {},
  extraReducers,
});

export default userSlice.reducer;
