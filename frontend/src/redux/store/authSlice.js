/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { addToken } = authSlice.actions;
export default authSlice.reducer;
