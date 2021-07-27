import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI, getListConvertedKey } from "../utils";

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
  async ({ name, date }) => {
    const { NODE_ENV, BASE_URL, REST_URL, DATA_KEY } = window.CONFIG_GLOBAL;
    let url = `${BASE_URL[NODE_ENV]}/${REST_URL.responseTime[NODE_ENV]}?date=${date}`;
    if (name !== "전체") {
      url += `&name=${name}`;
    }
    url = url.replace(/\+/g, "%2B"); // 특수문자(+) 퍼센트 인코딩

    const response = await callAPI(url);
    const result = getListConvertedKey(response[DATA_KEY[NODE_ENV]]);
    return result.sort(
      (a, b) => new Date(a.START_TIME) - new Date(b.START_TIME)
    );
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
