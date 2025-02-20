import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';

// Configure the store with the reducer
const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

// Infer the RootState type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the AppDispatch type from the store itself
export type AppDispatch = typeof store.dispatch;

export default store;
