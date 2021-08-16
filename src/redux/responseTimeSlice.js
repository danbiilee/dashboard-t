import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirestoreDatabase from "../service/firestore_database";

const initialState = {
  isLoading: false,
  list: {
    aos: [],
    ios: [],
  },
  isError: false,
};

export const fetchResponseTimes = createAsyncThunk(
  "response/fetchResponseTimes",
  async (params) => {
    const db = new FirestoreDatabase();
    const result = await db.getResponseTime(params);
    return result;
  }
);

export const responseTimeSlice = createSlice({
  name: "response",
  initialState: initialState,
  extraReducers: {
    [fetchResponseTimes.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchResponseTimes.fulfilled]: (state, { payload }) => {
      const aos = [];
      const ios = [];
      for (let item of payload) {
        const ver = item.PLATFORM_VERSION.toLowerCase();
        if (ver.includes("android")) {
          aos.push(item);
        } else if (ver.includes("ios")) {
          ios.push(item);
        }
      }

      state.isLoading = false;
      state.list = {
        aos,
        ios,
      };
    },
    [fetchResponseTimes.rejected]: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export default responseTimeSlice.reducer;
