/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
  },
  reducers: {
    addCurrentUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { addCurrentUser } = authSlice.actions;
export default authSlice.reducer;
