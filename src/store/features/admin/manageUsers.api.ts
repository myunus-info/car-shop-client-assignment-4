import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: () => ({ url: '/users' }),
      providesTags: ['Users'],
    }),
    getSingleUser: builder.query({
      query: id => ({ url: `/users/${id}` }),
    }),
    updateUserStatus: builder.mutation({
      query: args => ({
        url: `/users/${args.id}`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userManagementApi;
