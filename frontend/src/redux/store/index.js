import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { channelsApi } from './channelsApi.js';
import currentChannelId from './currentChannelId.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: currentChannelId,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});
