import IAccount from "@/types/account.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/users" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IAccount[], void>({
      query: () => ({ url: "/" })
    }),
  })
});

export const { useGetAllUsersQuery } = usersApi;