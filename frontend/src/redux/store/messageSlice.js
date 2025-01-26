import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
  },
});

export default messageSlice.reducer;
export const { setMessages } = messageSlice.actions;
