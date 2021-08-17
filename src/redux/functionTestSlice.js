import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirestoreDatabase from "../service/firestore_database";

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
  async ({ refType, params }) => {
    const db = new FirestoreDatabase();
    let result;
    if (refType === "chart") {
      result = await db.getFuncTest(params);
    } else {
      result = await db.getFuncTestDetil(params);
    }
    return result;
  }
);

export const functionTestSlice = createSlice({
  name: "function",
  initialState: functionTestState,
  extraReducers: {
    [fetchFunctionTests.pending]: (state, action) => {
      const { refType } = action.meta.arg;
      state[refType].isLoading = true;
      state[refType].isError = false;
      state[refType].list = [];
      if (refType === "chart") {
        state.detail.list = [];
      }
    },
    [fetchFunctionTests.fulfilled]: (state, action) => {
      const { refType } = action.meta.arg;
      const { payload } = action;
      state[refType].list = payload;
      state[refType].isLoading = false;
      state[refType].isError = false;
    },
    [fetchFunctionTests.rejected]: (state, action) => {
      const { refType } = action.meta.arg;
      state[refType].isError = true;
      state[refType].isLoading = false;
      state[refType].list = [];
    },
  },
});

export default functionTestSlice.reducer;
