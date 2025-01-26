import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }),
  endpoints(build) {
    return {
      getChannels: build.query({
        query: () => ({
          url: 'channels',
          headers: { Authorization: `Bearer ${token}` },
        }),
      }),
      getMessages: build.query({
        query: () => ({
          url: 'messages',
          headers: { Authorization: `Bearer ${token}` },
        }),
      }),
      addTestMessage: build.mutation({
        query: () => ({
          url: 'messages',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: { body: 'test message', channelId: '1', username: 'admin' },
        }),
      }),
    };
  },
});

export const { useGetChannelsQuery, useGetMessagesQuery, useAddTestMessageMutation } = channelsApi;
