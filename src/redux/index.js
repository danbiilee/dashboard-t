import { configureStore } from "@reduxjs/toolkit";
import gnbReducer from "./gnbSlice";

export const store = configureStore({
  reducer: {
    gnb: gnbReducer,
  },
});
