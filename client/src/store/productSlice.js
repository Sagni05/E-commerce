import { createSlice } from "@reduxjs/toolkit";

export const STATUES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: STATUES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    // remove(state, action) {
    //   return state.filter((item) => item.id !== action.payload);
    // }
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunk

export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUES.LOADING));
    try {
      const res = await fetch("/getproducts");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUES.ERROR));
    }
  };
}
