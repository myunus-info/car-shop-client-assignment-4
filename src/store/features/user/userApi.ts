import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => ({ url: '/users/me' }),
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
