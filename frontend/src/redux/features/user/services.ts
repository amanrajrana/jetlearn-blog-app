import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";
import ApiClient from "@/services/apiClient";
import { getCookie } from "@/utils/cookie";

const baseUrl = "/api/v1/users";

export const getCurrentUser = createAsyncThunk<UserState["user"]>(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    const headers = new Headers();

    const token = getCookie("token");
    if (!token) {
      rejectWithValue("");
    }

    headers.set("Authorization", `Bearer ${token}`);
    const res = await ApiClient.get<UserState["user"]>(
      `${baseUrl}/me`,
      headers
    );

    if (!res.success) {
      rejectWithValue(res.message);
    }

    return res.data;
  }
);

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(getCurrentUser.pending, (state) => {
      state.authStatus = "pending";
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.authStatus = "authorized";
      state.user = action.payload;
    })
    .addCase(getCurrentUser.rejected, (state, errorMessage) => {
      console.log(errorMessage);
      state.authStatus = "unauthorized";
      state.message = errorMessage.payload as string;
    });
};
