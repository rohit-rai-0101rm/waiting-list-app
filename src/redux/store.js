import { configureStore } from "@reduxjs/toolkit";
import waitlistReducer from "./slices/waitlistSlice.js";

export const store = configureStore({
  reducer: {
    waitlist: waitlistReducer,
  },
});

export default store;
