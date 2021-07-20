import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI, getListConvertedKey } from "../utils";

const initialState = {
  isLoading: false,
  list: [],
  isError: false,
};

const functionTestState = {
  chart: initialState,
  detail: initialState,
};

export const fetchFunctionTests = createAsyncThunk(
  "function/fetchFunctionTests",
  async ({ flag, date, name, type, application_name, success }) => {
    const { NODE_ENV, BASE_URL, REST_URL, DATA_KEY } = window.CONFIG_GLOBAL;
    let url = `${BASE_URL[NODE_ENV]}/${REST_URL[flag][NODE_ENV]}?date=${date}&name=${name}&type=${type}`;
    if (flag === "detail") {
      url += `&success=${success}&application_name=${application_name}`;
    }
    url = url.replace(/\+/g, "%2B"); // 특수문자(+) 퍼센트 인코딩

    const response = await callAPI(url);
    const result = getListConvertedKey(response[DATA_KEY[NODE_ENV]]);
    return result.sort(
      (a, b) => new Date(a.START_TIME) - new Date(b.START_TIME)
    );
  }
);

export const functionTestSlice = createSlice({
  name: "function",
  initialState: functionTestState,
  extraReducers: {
    [fetchFunctionTests.pending]: (state, action) => {
      const { flag } = action.meta.arg;
      state[flag].isLoading = true;
      state[flag].list = [];
      if (flag === "chart") {
        state.detail.list = [];
      }
      state[flag].isError = false;
    },
    [fetchFunctionTests.fulfilled]: (state, action) => {
      const { flag } = action.meta.arg;
      const { payload } = action;
      state[flag].isLoading = false;
      state[flag].list = payload;
    },
    [fetchFunctionTests.rejected]: (state, action) => {
      const { flag } = action.meta.arg;
      state[flag].isError = true;
      state[flag].list = [];
      state[flag].isLoading = false;
    },
  },
});

export default functionTestSlice.reducer;
