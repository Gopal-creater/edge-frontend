import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: undefined,
};

export const listItemSlice = createSlice({
  name: "listItem",
  initialState,
  reducers: {
    setListItemLoading: (state) => {
      state.loading = true;
    },
    setListItemError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = undefined;
    },
    setListItemData: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    addListItemData: (state, action) => {
      state.data.docs = [action.payload, ...(state?.data?.docs || [])];
    },
    deleteAllListItemData: (state) => {
      state.data = undefined;
    },
    deleteListItemData: (state, action) => {
      if (state.data && state.data.docs) {
        // Filter out the item with the matching _id
        state.data.docs = state.data.docs.filter(
          (item) => item._id !== action.payload
        );
      }
    },
    updateListItemdata: (state, action) => {
      if (state.data && state.data.docs) {
        // Find the index of the item with the matching _id
        const index = state.data.docs.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          // Replace the item at the found index with the updated data
          state.data.docs[index] = action.payload;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setListItemLoading,
  setListItemError,
  setListItemData,
  addListItemData,
  deleteAllListItemData,
  deleteListItemData,
  updateListItemdata,
} = listItemSlice.actions;
export default listItemSlice.reducer;
