/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    currentChannelName: 'general',
    defaultChannelId: '1',
    modal: {
      isOpen: false,
      type: null,
      extra: {
        channelId: null,
        channelName: null,
      },
    },
  },
  reducers: {
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload.id;
      state.currentChannelName = action.payload.name;
    },
    openModal(state, action) {
      if (action.payload.channelName) state.modal.extra.channelName = action.payload.channelName;
      if (action.payload.channelId) state.modal.extra.channelId = action.payload.channelId;
      state.modal.type = action.payload.type;
      state.modal.isOpen = true;
    },
    closeModal(state) {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.extra.channelId = null;
      state.modal.extra.channelName = null;
    },
  },
});

export const { setCurrentChannelId, openModal, closeModal } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
