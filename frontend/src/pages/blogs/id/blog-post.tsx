import { useEffect, useState } from "react";
import { useParams } from "react-router";
import postService, { Post } from "@/services/post.services";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

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

          {/* Author and Date */}
          <div className="text-gray-600 mb-8">
            <span className="font-medium">{post.userId}</span> ·{" "}
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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
