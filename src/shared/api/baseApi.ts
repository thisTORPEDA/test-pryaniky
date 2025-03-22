import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://test.v5.pryaniky.com" }),
  tagTypes: ["table"],
  endpoints: () => ({}),
});
