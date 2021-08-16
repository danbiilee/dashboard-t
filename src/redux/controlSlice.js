import { createSlice } from "@reduxjs/toolkit";
import { getStartDate, convertDateFormat } from "../utils";

const MAX_END_DATE_STR = "2021-07-14";

const initialState = {
  inputs: {
    level1: "기능테스트",
    level2: window.CONFIG_NAV.TREE.parent
      .filter((menu) => menu.active)
      .sort((a, b) => a.order - b.order)[0],
    level3: undefined,
    level3Res: window.CONFIG_NAV.TREE.children.RESPONSE_MALL.find(
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
initialState.inputs.level3 = window.CONFIG_NAV.TREE.children[
  initialState.inputs.level2.menuId
].find((menu) => menu.active && menu.order === 1);

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
