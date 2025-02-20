import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routs from '../../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routs.messagesUrl(),
    prepareHeaders: (headers) => {
      const storedUser = localStorage.getItem('user');
      const token = JSON.parse(storedUser)?.token;
      headers.set('Authorization', `Bearer ${token}`);
    },
  }),
  endpoints(build) {
    return {
      getMessages: build.query({
        query: () => ({ url: '' }),
      }),
      addMessage: build.mutation({
        query: (body) => ({
          url: '',
          method: 'POST',
          body,
        }),
      }),
    };
  },
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
