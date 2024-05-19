import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
    credentials: "include",
  }),
  tagTypes: ["cart", "customer"],
  endpoints: (builder) => ({
    // -- customer related endpoints --
    getCustomer: builder.query({
      query: () => "auth",
      providesTags: ["customer"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "customers",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth",
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    getRegions: builder.query({
      query: () => "regions",
      transformResponse: (res) => res.regions,
    }),
    // -- cart related endpoints
    getCart: builder.query({
      queryFn: async (_, __, ___, baseQuery) => {
        const cart_id = localStorage.getItem("cart_id");

        try {
          if (cart_id) {
            const res = await baseQuery({
              url: `carts/${cart_id}`,
            });

            return { data: res.data.cart };
          } else {
            const res = await baseQuery({
              url: "carts",
              method: "POST",
              body: JSON.stringify({
                region_id: localStorage.getItem("region_id"),
              }),
            });

            localStorage.setItem("cart_id", res.data.cart.id);

            return { data: res.data.cart };
          }
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      providesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: `carts/${localStorage.getItem("cart_id")}`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["cart"],
    }),
    addLineItem: builder.mutation({
      query: (variant_id) => ({
        url: `carts/${localStorage.getItem("cart_id")}/line-items`,
        method: "POST",
        body: JSON.stringify({
          variant_id,
          quantity: 1,
        }),
      }),

      invalidatesTags: ["cart"],
    }),
    updateLineItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `carts/${localStorage.getItem("cart_id")}/line-items/${id}`,
        method: "POST",
        body: JSON.stringify({ quantity }),
      }),
      invalidatesTags: ["cart"],
    }),
    deleteLineItem: builder.mutation({
      query: (id) => ({
        url: `carts/${localStorage.getItem("cart_id")}/line-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    getShippingOptions: builder.query({
      query: () => `shipping-options/${localStorage.getItem("cart_id")}`,
      transformResponse: (res) => res.shipping_options,
    }),
    addShippingMethod: builder.mutation({
      query: (option_id) => ({
        url: `carts/${localStorage.getItem("cart_id")}/shipping-methods`,
        method: "POST",
        body: JSON.stringify({ option_id }),
      }),
    }),
    createPaymentSessions: builder.mutation({
      query: () => ({
        url: `carts/${localStorage.getItem("cart_id")}/payment-sessions`,
        method: "POST",
        // TODO: CREATE PAYMENT SESSIONS
      }),
      transformResponse: (res) => res.cart,
      invalidatesTags: ["cart"],
    }),
    completeCart: builder.mutation({
      query: () => ({
        url: `carts/${localStorage.getItem("cart_id")}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["cart"],
    }),
    // -- products related enpoints --

    getProducts: builder.query({
      query: (page = 1) => ({
        url: "products",
        params: {
          order: "created_at",
          offset: 12 * (page - 1),
          limit: 12,
          region_id: localStorage.getItem("region_id") ?? undefined,
          cart_id: localStorage.getItem("cart_id") ?? undefined,
        },
      }),
    }),
    getProduct: builder.query({
      query: (handle) => ({
        url: "products",
        params: {
          region_id: localStorage.getItem("region_id") ?? undefined,
          cart_id: localStorage.getItem("cart_id") ?? undefined,
          handle,
        },
      }),
      transformResponse: (res) => res.products[0],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useLoginMutation,
  useSignupMutation,
  useGetProductsQuery,
  useGetRegionsQuery,
  useGetProductQuery,
  useCreateCartMutation,
  useGetCartQuery,
  useAddLineItemMutation,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
  useUpdateCartMutation,
  useGetShippingOptionsQuery,
  useAddShippingMethodMutation,
  useCreatePaymentSessionsMutation,
  useCompleteCartMutation,
  useLogoutMutation,
} = api;
