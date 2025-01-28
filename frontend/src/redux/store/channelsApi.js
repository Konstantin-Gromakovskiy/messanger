import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/channels' }),
  endpoints(build) {
    return {
      getChannels: build.query({
        query: () => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: '',
            headers: { Authorization: `Bearer ${token}` },
          };
        },
      }),
    };
  },
});

export const { useGetChannelsQuery } = channelsApi;
