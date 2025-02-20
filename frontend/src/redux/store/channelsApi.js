import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routs from '../../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routs.channelsUrl(),
    prepareHeaders: (headers) => {
      const storedUser = localStorage.getItem('user');
      const token = JSON.parse(storedUser)?.token;
      headers.set('Authorization', `Bearer ${token}`);
    },
  }),
  endpoints(build) {
    return {
      getChannels: build.query({
        query: () => ({ url: '' }),
      }),
      addChannel: build.mutation({
        query: (name) => ({
          url: '',
          method: 'POST',
          body: { name },
        }),
      }),
      removeChannel: build.mutation({
        query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
      }),
      renameChannel: build.mutation({
        query: ({ id, name }) => ({
          url: `/${id}`,
          method: 'PATCH',
          body: { name },
        }),
      }),
    };
  },
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation,
} = channelsApi;
