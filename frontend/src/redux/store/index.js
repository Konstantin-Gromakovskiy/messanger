import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from './channelsApi.js';
import currentChannelId from './currentChannelId.js';
import { messagesApi } from './messagesApi.js';

console.log(messagesApi);

export default configureStore({
  reducer: {
    ui: currentChannelId,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});
