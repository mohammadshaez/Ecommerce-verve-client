import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.quantity += 1;
      state.total += action.payload.price;
    },
    deleteProduct: (state, action) => {
      const deletedProduct = state.products[action.payload.index];

      if (deletedProduct) {
        if (deletedProduct.quantity > 1) {
          deletedProduct.quantity -= 1;
          state.quantity -= 1;
          state.total -= deletedProduct.price;
        } else {
          state.products.splice(action.payload.index, 1);
          state.quantity -= 1;
          state.total -= deletedProduct.price;
        }
      }
    },
    disableCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, disableCart } = cartSlice.actions;
export default cartSlice.reducer;
