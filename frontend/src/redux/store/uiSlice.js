import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    modal: {
      isOpen: false,
      type: null,
      extra: null,
    },
  },
  reducers: {
    setCurrentChannelId(state, action) {
      return { ...state, currentChannelId: action.payload };
    },
    openModal(state, action) {
      return { ...state, modal: { ...action.payload, isOpen: true } };
    },
    closeModal(state) {
      return { ...state, modal: { type: null, extra: null, isOpen: false } };
    },
  },
});

export const { setCurrentChannelId, openModal, closeModal } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
