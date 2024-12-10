import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import postService from "@/services/post.services";
import { Post } from "@/types/blog";
import { Button } from "@ui/button";
import { SquarePen } from "lucide-react";
import { useAppSelector } from "@/redux/hook";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    try {
      const _id = parseInt(id!);

      if (isNaN(_id)) {
        throw new Error("Invalid ID");
      }

      postService.getPost(_id).then((data) => {
        console.log(data);
        setPost(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return (
    <div className="mt-12 pt-12">
      {post ? (
        <div className="container mx-auto p-6">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>

          <div className="flex justify-between">
            {/* Author and Date */}
            <div className="text-gray-600 mb-8">
              <p className="font-medium capitalize italic">
                By: {post.user.username}
              </p>
              <p className="text-xs">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            {user && user.id === post.user.id && (
              <Button asChild>
                <Link to={`/dashboard/posts/${post.id}`}>
                  <SquarePen />
                  Edit
                </Link>
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : (
        <div>Handler this</div>
      )}
    </div>
  );
};

export default BlogPage;
