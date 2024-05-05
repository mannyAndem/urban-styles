import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("withCredentials", "true");
      headers.set("Content-Type", "application/json");
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: () => "auth",
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
  }),
});

export const { useGetCustomerQuery, useLoginMutation, useSignupMutation } = api;
