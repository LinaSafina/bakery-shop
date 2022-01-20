import { createSlice } from "@reduxjs/toolkit";

let initialCartState;

const savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart) {
  initialCartState = savedCart;
} else {
  initialCartState = {
    totalPrice: 0,
    items: [],
    totalAmount: 0,
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      state.totalPrice += action.payload.price * action.payload.amount;
      state.totalAmount += action.payload.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        existingItem.amount += action.payload.amount;
        state.items[existingItemIndex] = existingItem;
      } else {
        state.items = state.items.concat(action.payload);
      }
      localStorage.cart = JSON.stringify({
        totalPrice: state.totalPrice,
        items: state.items,
        totalAmount: state.totalAmount,
      });
    },
    removeItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalPrice -= existingItem.price;
      state.totalAmount -= 1;
      const existingItemIndex = state.items.indexOf(existingItem);
      if (existingItem.amount === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        existingItem.amount -= 1;
        state.items[existingItemIndex] = existingItem;
      }

      localStorage.cart = JSON.stringify({
        totalPrice: state.totalPrice,
        items: state.items,
        totalAmount: state.totalAmount,
      });
    },
    clearCart(state) {
      localStorage.removeItem("cart");
      state.totalAmount = 0;
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
