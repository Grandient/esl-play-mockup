import { createSlice } from '@reduxjs/toolkit';
import getEvent from '../../models/Event';

export const downloadEventSlice = createSlice({
  name: 'downloadEvent',
  initialState: {
    name: "LOADING...",
    start_date: "LOADING..."
  },
  reducers: {
    recieveEvent: (state, action) => {
      state.name = action.payload.name;
      state.start_date = action.payload.start_date;
    }
  }
});

export const { recieveEvent } = downloadEventSlice.actions;

export const fetchEvent = () => async dispatch => {
    try {
        let result = await getEvent('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161')
        dispatch(recieveEvent(result))
    } catch(err) {
        console.log(err)
    }
};
  
export const eventFound = state => state.downloadEvent;
export default downloadEventSlice.reducer;
