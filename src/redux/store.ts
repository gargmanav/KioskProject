import { configureStore } from '@reduxjs/toolkit';
import ridesReducer from './ridesSlice';

const store = configureStore({
  reducer: {
    rides: ridesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
