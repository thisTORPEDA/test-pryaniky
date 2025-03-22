import { baseApi } from "../../shared/api/baseApi.ts";
import { TTableItem } from "../../shared/types.ts";

const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTableData: builder.query<{ data: TTableItem[] }, null>({
      query: () => ({
        url: "/ru/data/v3/testmethods/docs/userdocs/get",
        method: "GET",
        headers: {
          "x-auth": localStorage.getItem("token") || "",
        },
      }),
      providesTags: ["table"],
    }),
    addTableItem: builder.mutation<{ data: { token: string } }, TTableItem>({
      query: (data) => ({
        url: "/ru/data/v3/testmethods/docs/userdocs/create",
        method: "POST",
        body: data,
        headers: {
          "x-auth": localStorage.getItem("token") || "",
        },
      }),
      invalidatesTags: ["table"],
    }),
    editTableItem: builder.mutation<
      { data: { token: string } },
      { id: string; body: TTableItem }
    >({
      query: ({ id, body }) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        method: "POST",
        body,
        headers: {
          "x-auth": localStorage.getItem("token") || "",
        },
      }),
      invalidatesTags: ["table"],
    }),
    deleteTableItem: builder.mutation<{ data: { token: string } }, string>({
      query: (id) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        method: "POST",
        headers: {
          "x-auth": localStorage.getItem("token") || "",
        },
      }),
      invalidatesTags: ["table"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTableDataQuery,
  useAddTableItemMutation,
  useEditTableItemMutation,
  useDeleteTableItemMutation,
} = tableApi;
