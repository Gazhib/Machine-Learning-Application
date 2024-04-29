import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-actions";
const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

export const uiActions = uiSlice.actions;
export default store;
