import { createStore } from "redux";

const initialState = {
    totalPrice: 0,
    items: [],
    totalAmount: 0,
  }
const cartReducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
      const updatedItems = [...state.items];
      const updatedTotalPrice =
        state.totalPrice + action.item.price * action.item.amount;
      const updatedTotalAmount = state.totalAmount + action.item.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        const updatedExistingItem = { ...existingItem };
        updatedExistingItem.amount = existingItem.amount + action.item.amount;
        updatedItems[existingItemIndex] = updatedExistingItem;
      } else {
        updatedItems.push(action.item);
      }
      const cartObj = {
        totalPrice: updatedTotalPrice,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
      localStorage.cart = JSON.stringify(cartObj);
      return cartObj;
    }
    if (action.type === 'REMOVE') {
      const existingItem = state.items.find((item) => item.id === action.id);
      const updatedTotalPrice = state.totalPrice - existingItem.price;
      const updatedTotalAmount = state.totalAmount - 1;
      const existingItemIndex = state.items.indexOf(existingItem);
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedExistingItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedExistingItem;
      }
      const cartObj = {
        totalPrice: updatedTotalPrice,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
      localStorage.cart = JSON.stringify(cartObj);
      return cartObj;
    }
    if (action.type === 'CLEAR') {
      localStorage.removeItem('cart');
      return {
        totalPrice: 0,
        items: [],
        totalAmount: 0,
      };
    }
    localStorage.removeItem('cart');
    return initialState;
  };

const cartStore = createStore(cartReducer)

export default cartStore