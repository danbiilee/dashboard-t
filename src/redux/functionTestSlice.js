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
      state[refType].list = [];
      if (refType === "chart") {
        state.detail.list = [];
      }
      state[refType].isError = false;
    },
    [fetchFunctionTests.fulfilled]: (state, action) => {
      const { refType } = action.meta.arg;
      const { payload } = action;
      state[refType].isLoading = false;
      state[refType].list = payload;
    },
    [fetchFunctionTests.rejected]: (state, action) => {
      const { refType } = action.meta.arg;
      state[refType].isError = true;
      state[refType].list = [];
      state[refType].isLoading = false;
    },
  },
});

export default functionTestSlice.reducer;
