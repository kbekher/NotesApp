import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import userReducer from './userSlice'; 

// Configure the store with the reducer
const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
