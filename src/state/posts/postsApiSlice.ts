import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query<Post[], { limit: number; offset: number }>({
        query: ({ limit, offset }) =>
          `/posts?_limit=${limit}&_offset=${offset}`,
      }),
      createPost: builder.mutation<Post, Omit<Post, "id">>({
        query: (post) => ({
          url: "/posts",
          method: "POST",
          body: post,
        }),
      }),
    };
  },
});

export const { useGetPostsQuery, useCreatePostMutation } = postApiSlice;
