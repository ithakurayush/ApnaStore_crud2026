import { createSlice } from "@reduxjs/toolkit";
let cartSlice = createSlice({
  name: "cart",
  initialState: { products: [], totalCost: 0 },
  reducers: {
    addProduct: (state, action) => {
      let product = state.products.find(
        (product) => product._id === action.payload._id,
      );
      if (!product) {
        state.products.push(action.payload);
        state.totalCost = state.totalCost + parseInt(action.payload.originalPrice)
      }
    },
    deleteProduct: (state, action) => {
    let product = state.products.find((product) => product._id === action.payload)
    state.totalCost = state.totalCost - parseInt(product.originalPrice)
    state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
    },
  },
});
export const { addProduct, deleteProduct,totalCost } = cartSlice.actions;
export default cartSlice.reducer;