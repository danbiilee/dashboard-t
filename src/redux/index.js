import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import controlReducer from "./controlSlice";
import responseTimeReducer from "./responseTimeSlice";
import functionTestReducer from "./functionTestSlice";

export const store = configureStore({
  reducer: {
    control: controlReducer,
    responseTime: responseTimeReducer,
    functionTest: functionTestReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
