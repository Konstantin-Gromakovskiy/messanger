import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import channelsSlice from './channelsSlice.js';
import messageSlice from './messageSlice.js';
import { channelsApi } from './channelsApi.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsSlice,
    messages: messageSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});
