import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {
    currentChannelId: '1',
  },
  reducers: {
    setCurrentChannelId(state, action) {
      return { ...state, currentChannelId: action.payload };
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
