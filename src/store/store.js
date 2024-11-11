import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

//logout action creator
export const logout = () => ({ type: "LOGOUT" });
