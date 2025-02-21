// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/types';

// Define the initial state type
interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null, // Default state for user
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export the actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
