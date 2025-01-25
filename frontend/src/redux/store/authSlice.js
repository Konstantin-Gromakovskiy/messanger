import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    logIn(state) {
      return { ...state, isAuth: true };
    },
    logOut(state) {
      return { ...state, token: null };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
