import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { globalConfig } from "../../config/global.config";
import { callAPI } from "../utils";

const initialState = {
  isLoading: false,
  list: {
    aos: [],
    ios: [],
  },
  isError: false,
};

export const fetchResponses = createAsyncThunk(
  "response/fetchResponses",
  async () => {
    const res = await callAPI(`${globalConfig.API_URL.local}/response.json`);
    return res.data;
  }
);

export const responseSlice = createSlice({
  name: "response",
  initialState,
  extraReducers: {
    [fetchResponses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchResponses.fulfilled]: (state, { payload }) => {
      const aos = payload.filter((item) =>
        item.PLATFORM_VERSION.toLowerCase().includes("android")
      );
      const ios = payload.filter((item) =>
        item.PLATFORM_VERSION.toLowerCase().includes("ios")
      );
      state.isLoading = false;
      state.list = {
        aos,
        ios,
      };
    },
    [fetchResponses.rejected]: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export default responseSlice.reducer;
