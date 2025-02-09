/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    addToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
    },
  },
});

export const { addToken } = authSlice.actions;
export default authSlice.reducer;
