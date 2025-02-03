import { TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const productManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => params.append(item.name, item.value as string));
        }
        return { url: '/products', params };
      },
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: productData => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    getSingleProduct: builder.query({
      query: id => ({ url: `/products/${id}` }),
    }),
    updateProduct: builder.mutation({
      query: args => ({
        url: `/products/${args.id}`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
