import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: null,
  data: undefined,
  selectedList: null,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setListLoading: (state) => {
      state.loading = true;
    },
    setListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = undefined;
    },
    setListData: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    addListData: (state, action) => {
      state.data.docs = [action.payload, ...(state?.data?.docs || [])];
    },
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
    deleteListData: (state, action) => {
      if (state.data && state.data.docs) {
        // Filter out the item with the matching _id
        state.data.docs = state.data.docs.filter(
          (item) => item._id !== action.payload
        );
        state.selectedList = null;
      }
    },
    updateListData: (state, action) => {
      if (state.data && state.data.docs) {
        // Find the index of the item with the matching _id
        const index = state.data.docs.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          // Replace the item at the found index with the updated data
          state.data.docs[index] = action.payload;
        }
        state.selectedList = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setListLoading,
  setListError,
  setListData,
  addListData,
  setSelectedList,
  deleteListData,
  updateListData,
} = listSlice.actions;
export default listSlice.reducer;
