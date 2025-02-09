/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    currentChannelName: 'general',
    defaultChannelId: '1',
    defaultChannelName: 'general',
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
    setCurrentChannelId(state, { payload: { id, name } }) {
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
    openModal(state, { payload: { type, channelId, channelName } }) {
      if (channelName) state.modal.extra.channelName = channelName;
      if (channelId) state.modal.extra.channelId = channelId;
      state.modal.type = type;
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
