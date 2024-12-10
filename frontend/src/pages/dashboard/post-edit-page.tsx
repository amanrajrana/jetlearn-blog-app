import { PostDeleteButton } from "@/components/post-delete-button";
import { toast } from "@/hooks/use-toast";
import postService from "@/services/post.services";
import { Post } from "@/types/blog";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Input } from "@ui/input";
import SubmitButton from "@ui/submit-button";
import { Textarea } from "@ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditPost() {
  const id = Number(useParams().id || "");
  const [post, setPost] = useState<Post>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(id)) return;
    postService.getPost(id).then((post) => setPost(post));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (!post || !post.title || !post.content) return;

    setLoading(true);
    postService
      .updatePost(post.id, post)
      .then(() => {
        navigate(`/blogs/${post.id}`);
      })
      .catch((error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-4 py-20 container">
      <h1>Edit</h1>
      {post && (
        <Card>
          <CardHeader>
            <Label>Title</Label>
            <Input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              type="text"
              placeholder="Your blog title"
            />
          </CardHeader>
          <CardContent>
            <Label>Content</Label>
            <Textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder="Your blog content"
              rows={25}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-x-2">
            <PostDeleteButton id={post.id} />
            <SubmitButton loading={loading} onClick={handleSubmit}>
              Update
            </SubmitButton>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
