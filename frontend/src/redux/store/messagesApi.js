import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/messages' }),
  endpoints(build) {
    return {
      getMessages: build.query({
        query: () => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: '',
            headers: { Authorization: `Bearer ${token}` },
          };
        },
      }),
      addMessage: build.mutation({
        query: (body) => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return {
            url: '',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body,
          };
        },
      }),
    };
  },
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
