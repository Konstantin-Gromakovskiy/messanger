import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import { userApi } from './userApi.js';
import ui from './uiSlice.js';
import authSlice from './authSlice.js';

const store = configureStore({
  reducer: {
    ui,
    auth: authSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware)
    .concat(userApi.middleware),
});

export default store;
