import { createSlice } from "@reduxjs/toolkit";
import { getStartDate, convertDateFormat } from "../utils";
import { NAV_LEVEL2, NAV_LEVEL3 } from "../constants/nav";

const MAX_END_DATE_STR = "2021-07-14";

const initialState = {
  inputs: {
    level1: "기능테스트",
    level2: NAV_LEVEL2.filter((menu) => menu.active).sort(
      (a, b) => a.order - b.order
    )[0],
    level3: undefined,
    level3Res: NAV_LEVEL3.RESPONSE_MALL.find(
      (menu) => menu.active && menu.order === 1
    ),
    startDate: convertDateFormat(getStartDate(new Date(MAX_END_DATE_STR))),
    endDate: MAX_END_DATE_STR,
  },
  validList: {
    dates: [],
    devices: [],
    langs: [],
  },
};
initialState.inputs.level3 = NAV_LEVEL3[initialState.inputs.level2.menuId].find(
  (menu) => menu.active && menu.order === 1
);

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    setInputs: (state, { payload }) => {
      state.inputs = payload;
    },
    setValidList: (state, { payload }) => {
      const { type, list } = payload;
      state.validList[type] = list;
    },
  },
});

export const { setInputs, setValidList } = controlSlice.actions;

export default controlSlice.reducer;
