import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import io from 'socket.io-client';

const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL);
const messageUrl = `${apiUrl}api/v1/messages`;
const socket = io(`${apiUrl}`);

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: messageUrl }),
  endpoints(build) {
    return {
      getMessages: build.query({
        query: () => {
          const storedUser = localStorage.getItem('user');
          const token = JSON.parse(storedUser)?.token;
          return { url: '', headers: { Authorization: `Bearer ${token}` } };
        },
        async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
          try {
            await cacheDataLoaded;
            socket.on('newMessage', (payload) => {
              updateCachedData((draft) => { draft.push(payload); });
            });
            socket.on('removeChannel', (payload) => {
              updateCachedData((draft) => draft.filter((item) => item.channelId !== payload.id));
            });
          } catch (error) {
            console.error('Socket connection error:', error);
          }
          await cacheEntryRemoved;
          socket.off('newMessage');
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

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
