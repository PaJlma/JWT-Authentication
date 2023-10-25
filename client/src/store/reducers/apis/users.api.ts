import IAccount from "@/types/account.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { RootState } from "@/store/store";
import accountSlice from "@/store/reducers/account.reducer";

const baseQuery = fetchBaseQuery({ 
  baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers, api) => {
    const { account } = api.getState() as RootState;

    headers.set("authorization", `Bearer ${account._id} ${localStorage.getItem("access")}`);

    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async(args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { account } = api.getState() as RootState;

    const refreshResponse = await baseQuery({ url: `/auth/refresh/${account._id}`, method: "PATCH", credentials: "include" }, api, extraOptions);

    if (refreshResponse.error?.data) {
      localStorage.setItem("access", refreshResponse.error.data as string);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(accountSlice.actions.logout());
      localStorage.setItem("access", "");
    }
  }

  return result;
}

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllUsers: builder.query<IAccount[], void>({
      query: () => ({ url: "/users/" }),
    }),
  })
});

export const { useGetAllUsersQuery } = usersApi;