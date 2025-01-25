import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');
console.log(token, 'token');

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/channels' }),
  endpoints(build) {
    return {
      getChannels: build.query({
        query: () => ({
          headers: { Authorization: `Bearer ${token}` },
        }),
      }),
    };
  },
});

export const { useGetChannelsQuery } = channelApi;
