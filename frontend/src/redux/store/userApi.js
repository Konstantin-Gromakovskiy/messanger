import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routs from '../../utils/routes.js';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: routs.serverUrl() }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
