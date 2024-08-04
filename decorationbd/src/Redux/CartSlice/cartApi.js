import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../UserAndAuthServices/LocalStorageService';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers) => {
    const { access_token } = getToken();
    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchCartItems: builder.query({
      query: () => 'cartitems/cartlist/',
    }),
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: 'cartitems/add_item/',
        method: 'POST',
        body: item,
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cartitems/update_item/${id}/`,
        method: 'PATCH',
        body: { quantity },
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `cartitems/cartitem_delete/${id}/`,
        method: 'DELETE',
      }),
    }),
    deleteAllCartItems: builder.mutation({
      query: () => ({
        url: 'cartitems/allcart_delete/',
        method: 'DELETE',
      }),
    }),
    addCoupon: builder.mutation({
      query: (couponCode) => ({
        url: 'cartitems/add_coupon/',
        method: 'POST',
        body: { coupon: couponCode },
      }),
    }),
  }),
});

export const {
  useFetchCartItemsQuery,
  useAddItemToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteAllCartItemsMutation,
  useAddCouponMutation,
} = cartApi;
