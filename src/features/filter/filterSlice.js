import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: "asc",
  },
  reducers: {
    swap: (state, action) => {
      if(action.payload == "asc"){
        state.value = "asc";
      } else {
        state.value = "desc";
      }
    },
  },
});

export const { swap } = filterSlice.actions;
export const selectFilter = state => state.filter.value;
export default filterSlice.reducer;
