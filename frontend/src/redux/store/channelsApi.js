import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api/v1/channels` }),
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
      renameChannel: build.mutation({
        query: ({ id, name }) => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: `/${id}`,
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: { name },
          };
        },
      }),
    };
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation,
} = channelsApi;
