import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: userInfo => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: userInfo => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: passwordData => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwordData,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useUpdatePasswordMutation } = authApi;
