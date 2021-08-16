import { configureStore } from "@reduxjs/toolkit";
import controlReducer from "./controlSlice";
import responseTimeReducer from "./responseTimeSlice";
import functionTestReducer from "./functionTestSlice";

export const store = configureStore({
  reducer: {
    control: controlReducer,
    responseTime: responseTimeReducer,
    functionTest: functionTestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
