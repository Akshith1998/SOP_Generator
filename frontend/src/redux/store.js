import { configureStore } from "@reduxjs/toolkit";
import { sectionSlice } from "./SectionSlice.js";

const store = configureStore({
  reducer: {
    section: sectionSlice.reducer,
  },
});

export default store;
