import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/messages' }),
  endpoints(build) {
    return {
      getMessages: build.query({
        query: () => ({
          url: '',
          headers: { Authorization: `Bearer ${token}` },
        }),
      }),
      addTestMessage: build.mutation({
        query: () => ({
          url: '',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            body: 'test message',
            channelId: '1',
            username: 'test',
          },
        }),
      }),
    };
  },
});

export const { useGetMessagesQuery, useAddTestMessageMutation } = messagesApi;
