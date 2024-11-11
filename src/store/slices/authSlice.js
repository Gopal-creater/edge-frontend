import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    loading: false,
    error: null,
    data: undefined,
  },
  login: {
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.auth.loading = true;
    },
    setAuthError: (state, action) => {
      state.auth.loading = false;
      state.auth.error = action.payload;
      state.auth.data = undefined;
    },
    setAuthData: (state, action) => {
      state.auth.loading = false;
      state.auth.error = null;
      state.auth.data = action.payload;
    },
    setLoginLoading: (state) => {
      state.login.loading = true;
    },
    setLoginError: (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },
    setLoginData: (state, action) => {
      state.login.loading = false;
      state.login.error = null;
      state.auth.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthLoading,
  setAuthError,
  setAuthData,
  setLoginLoading,
  setLoginError,
  setLoginData,
} = authSlice.actions;
export default authSlice.reducer;
