import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    setChannels(state, action) {
      return action.payload;
    },
  },
});

export default channelsSlice.reducer;
export const { setChannels } = channelsSlice.actions;
