import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { globalConfig } from "../../config/global.config";
import { callAPI } from "../utils";

const initialState = {
  isLoading: false,
  list: {
    app: [],
    brand: [],
  },
  isError: false,
};

export const fetchFeatures = createAsyncThunk(
  "feature/fetchFeatures",
  async () => {
    const list = [];
    let tsquare = await callAPI(`${globalConfig.API_URL.local}/tsquare.json`);
    let details = await callAPI(`${globalConfig.API_URL.local}/detail.json`);

    details.data.forEach((detail) => {
      const t = tsquare.data.find(
        (item) => item.ID === detail.AMORE_TSQUARE_ID
      );
      if (t) {
        list.push({ ...t, ...detail });
      }
    });
    return list;
  }
);

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  extraReducers: {
    [fetchFeatures.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFeatures.fulfilled]: (state, { payload }) => {
      const app = payload.filter((item) => item.TYPE === "APPLICATION");
      const brand = payload.filter((item) => item.TYPE === "BRAND");
      state.isLoading = false;
      state.list = {
        app,
        brand,
      };
    },
    [fetchFeatures.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default featureSlice.reducer;
