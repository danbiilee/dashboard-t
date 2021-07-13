import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import gnbReducer from "./gnbSlice";
import responseReducer from "./responseSlice";
import featureReducer from "./featureSlice";

export const store = configureStore({
  reducer: {
    gnb: gnbReducer,
    response: responseReducer,
    feature: featureReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
