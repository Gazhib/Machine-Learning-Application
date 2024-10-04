import { createSlice } from "@reduxjs/toolkit";
const initialUiState = { sideBar: true, isLight: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    sideBar(state) {
      state.sideBar = !state.sideBar;
    },
    lightNight(state) {
      state.isLight = !state.isLight;
    },
  },
});

export default uiSlice;
