import { configureStore } from "@reduxjs/toolkit";
import gifReducer from "../features/gif/gifSlice";

export const store = configureStore({
  reducer: {
    //defines the root reducer obj
    gifs: gifReducer,
  },
});
