
import { createSlice } from '@reduxjs/toolkit';
import getMatches from '../../models/Matches';

export const downloadMatchesSlice = createSlice({
  name: 'downloadMatches',
  initialState: [],
  reducers: {
    recieveMatches: (state, action) => action.payload
  }
});

export const { recieveMatches } = downloadMatchesSlice.actions;

export const fetchMatches = () => async dispatch => {
    try {
        let result = await getMatches('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161/results')
        dispatch(recieveMatches(result))
    } catch(err) {
        console.log(err)
    }
};
  
export const matchesFound = state => state.downloadMatches;
export default downloadMatchesSlice.reducer;