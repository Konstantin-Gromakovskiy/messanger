import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    defaultChannelId: '1',
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
      console.log(action, 'action');
      return {
        ...state,
        modal: {
          extra: { channelId: action.payload.channelId },
          type: action.payload.type,
          isOpen: true,
        },
      };
    },
    closeModal(state) {
      return { ...state, modal: { type: null, extra: null, isOpen: false } };
    },
  },
});

export const { setCurrentChannelId, openModal, closeModal } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
