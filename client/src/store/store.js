import { configureStore } from "@reduxjs/toolkit";
import getProductReducer from "./productSlice";

const store = configureStore({
  reducer: {
    getProductData: getProductReducer,
  },
});

export default store;
