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
      addChannel: build.mutation({
        query: (name) => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: '',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: { name },
          };
        },
      }),
      removeChannel: build.mutation({
        query: (id) => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: `/${id}`,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          };
        },
      }),
    };
  },
});

export const { useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation } = channelsApi;
