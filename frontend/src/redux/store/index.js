import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { channelApi } from './channelApi.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelApi.middleware),
});
