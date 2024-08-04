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

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchCustomerShippingAddresses: builder.query({
      query: () => 'customershippingaddress/',
    }),
    addCustomerShippingAddress: builder.mutation({
      query: (address) => ({
        url: 'customershippingaddress/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: address,
      }),
    }),
    updateCustomerShippingAddress: builder.mutation({
      query: ({ shipping_address_id, ...address }) => ({
        url: `customershippingaddress/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          shipping_address_id,
          ...address
        },
      }),
    }),
    deleteCustomerShippingAddress: builder.mutation({
      query: (shipping_address_id) => ({
        url: 'customershippingaddress/',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { shipping_address_id },
      }),
    }),
    fetchCustomerBillingAddresses: builder.query({
      query: () => 'customerbillingaddress/',
    }),
    addCustomerBillingAddress: builder.mutation({
      query: (address) => ({
        url: 'customerbillingaddress/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: address,
      }),
    }),
    updateCustomerBillingAddress: builder.mutation({
      query: ({ billing_address_id, ...address }) => ({
        url: `customerbillingaddress/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          billing_address_id,
          ...address
        },
      }),
    }),
    deleteCustomerBillingAddress: builder.mutation({
      query: (billing_address_id) => ({
        url: 'customerbillingaddress/',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { billing_address_id },
      }),
    }),
  }),
});

export const {
  useFetchCustomerShippingAddressesQuery,
  useAddCustomerShippingAddressMutation,
  useUpdateCustomerShippingAddressMutation,
  useFetchCustomerBillingAddressesQuery,
  useAddCustomerBillingAddressMutation,
  useDeleteCustomerShippingAddressMutation,
  useUpdateCustomerBillingAddressMutation,
  useDeleteCustomerBillingAddressMutation
} = addressApi;