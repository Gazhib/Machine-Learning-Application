import { configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./segmentedImage-actions";
import uiSlice from "./ui-actions";
const store = configureStore({
  reducer: { image: imagesSlice.reducer, ui: uiSlice.reducer },
});

export const imageActions = imagesSlice.actions;
export const uiActions = uiSlice.actions;
export default store;
