import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import EventReducer from '../features/download/downloadSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,

  },
});
