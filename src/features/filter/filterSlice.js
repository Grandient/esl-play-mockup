import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: "asc",
    reducers: {
      ascend: "asc",
      descend: "desc"
    }
})

export default filterSlice.reducer;