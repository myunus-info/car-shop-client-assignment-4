import { baseApi } from '../../api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: userInfo => ({
        url: '/orders',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query({
      query: () => ({ url: '/orders' }),
      providesTags: ['Orders'],
    }),
    getAllOrders: builder.query({
      query: () => ({ url: '/orders/all-orders' }),
      providesTags: ['Orders'],
    }),
    getSingleOrder: builder.query({
      query: id => ({ url: `/orders/${id}` }),
    }),
    updateOrderStatus: builder.mutation({
      query: args => ({
        url: `/orders/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['Orders'],
    }),
    verifyOrder: builder.query({
      query: order_id => ({
        url: '/orders/verify',
        method: 'POST',
        params: { order_id },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
  useVerifyOrderQuery,
  useGetSingleOrderQuery,
} = orderApi;
