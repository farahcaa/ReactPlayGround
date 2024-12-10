import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getsApiSlice = createApi({
  reducerPath: "gets",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => {
    return {
      getss: builder.query({
        query: () => "/posts",
      }),
    };
  },
});

export const { useGetssQuery } = getsApiSlice;
