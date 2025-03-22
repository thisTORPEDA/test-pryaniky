import { baseApi } from "../../shared/api/baseApi.ts";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { data: { token: string } },
      { username: string; password: string }
    >({
      query: (data) => ({
        url: "/ru/data/v3/testmethods/docs/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = userApi;
