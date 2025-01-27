import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/channels' }),
  endpoints(build) {
    return {
      getChannels: build.query({
        query: () => ({
          url: '',
          headers: { Authorization: `Bearer ${token}` },
        }),
      }),
    };
  },
});

export const { useGetChannelsQuery } = channelsApi;
