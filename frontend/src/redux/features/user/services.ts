import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";
import ApiClient from "@/services/apiClient";
import { getCookie } from "@/utils/cookie";
import config from "@/config/config";

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
      `${config.apiBaseUrl}/api/v1/users/me`,
      headers
    );

    if (!res.success) {
      rejectWithValue(res.message);
    }

    console.log("user: ", res.data);

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
