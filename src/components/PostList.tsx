//import { useGetssQuery } from "../state/posts/getsApiSlice";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../state/posts/postsApiSlice";

const PostsLists = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery({ limit: 5, offset: 0 });

  const [createPostMutation, { isLoading: isCreatingPost }] =
    useCreatePostMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <button
        onClick={() => {
          const post = { title: "my new post" };
          createPostMutation(post);
        }}
      >
        {isCreatingPost ? "loading" : "createpost"}
      </button>
      <ul>
        {posts?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default PostsLists;
