import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import currentChannelId from './currentChannelId.js';
import authSlice from './authSlice.js';

export default configureStore({
  reducer: {
    ui: currentChannelId,
    auth: authSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});
