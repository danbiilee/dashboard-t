import { createSlice } from "@reduxjs/toolkit";
import { treemenu } from "../../config/nav.config";
import { getStartDate, convertDateFormat } from "../utils";

const initialState = {
  level1: "기능테스트",
  level2: "직영몰",
  level3: undefined,
  startDate: convertDateFormat(getStartDate()),
  endDate: convertDateFormat(new Date()),
};
initialState.level3 = treemenu[initialState.level2].find(
  (menu) => menu.active && menu.order === 1
);

export const gnbSlice = createSlice({
  name: "gnb",
  initialState,
  reducers: {
    setLevel1: (state, { payload }) => {
      state.level1 = payload;
      state.level2 = initialState.level2; // 초기화
      state.level3 = initialState.level3;
    },
    setLevel2: (state, { payload }) => {
      state.level2 = payload;
      state.level3 = treemenu[payload].find(
        (menu) => menu.active && menu.order === 1
      ); // 초기화
    },
    setLevel3: (state, { payload }) => {
      state.level3 = payload;
    },
    setDateRange: (state, { payload }) => {
      const { start, end } = payload;
      state.startDate = start;
      state.endDate = end;
    },
  },
});

export const { setLevel1, setLevel2, setLevel3, setDateRange } =
  gnbSlice.actions;

export default gnbSlice.reducer;
