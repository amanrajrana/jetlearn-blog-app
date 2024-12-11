import postService from "@/services/post.services";
import PostCard from "./post-card";
import { useEffect, useState } from "react";
import { Post } from "@/types/blog";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const BlogPosts = ({ userId }: { userId?: number }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    postService
      .getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err: Error) =>
        toast({ description: err.message, variant: "destructive" })
      )
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="w-full my-12 flex justify-center items-center">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => {
        if (userId && userId !== post.user.id) {
          return null;
        }
        return <PostCard key={post.id} {...post} />;
      })}
    </div>
  );
};

export default BlogPosts;
