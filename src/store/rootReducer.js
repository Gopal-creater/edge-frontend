// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listReducer from "./slices/listSlice";
import listItemReducer from "./slices/listItemSlice";

const appReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  listItem: listItemReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // Reset state to initial state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
