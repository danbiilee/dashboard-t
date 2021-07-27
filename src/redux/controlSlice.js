import { createSlice } from "@reduxjs/toolkit";
import { getStartDate, convertDateFormat } from "../utils";

const initialState = {
  inputs: {
    level1: "기능테스트",
    level2: window.CONFIG_NAV.TREE.parent
      .filter((menu) => !menu.isResponse && menu.active)
      .sort((a, b) => a.order - b.order)[0],
    level3: undefined,
    startDate: convertDateFormat(getStartDate()),
    endDate: convertDateFormat(new Date()),
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
