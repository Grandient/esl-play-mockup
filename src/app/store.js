import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import downloadEventReducer from '../features/downloadEvent/downloadEventSlice';
import downloadMatchesReducer from '../features/downloadMatches/downloadMatchesSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    downloadEvent: downloadEventReducer,
    downloadMatches: downloadMatchesReducer
  },
});
