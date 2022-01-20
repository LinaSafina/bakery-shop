import { createSlice } from "@reduxjs/toolkit";

let initialToken;
const savedToken = localStorage.getItem("token");
if (savedToken) {
  initialToken = savedToken;
}
let isLoggedIn = !!initialToken;

const initialAuthState = {
  token: initialToken,
  isLoggedIn: isLoggedIn,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
