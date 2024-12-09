import postService, { Post } from "@/services/post.services";
import PostCard from "./post-card";
import { useEffect, useState } from "react";

const BlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postService
      .getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default BlogPosts;