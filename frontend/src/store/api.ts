import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  Products,
  Customers,
  Transactions,
  TransactionProps,
  Geography,
  Sales,
  Admins,
  Performance,
  Dashboard,
} from "types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query<Products, void>({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query<Customers, void>({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query<Transactions, TransactionProps>({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query<Geography, void>({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query<Sales, void>({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query<Admins, void>({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query<Performance, string>({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query<Dashboard, void>({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
