import postService, { CreatePostDTO } from "@/services/post.services";
import { Label } from "@radix-ui/react-label";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Input } from "@ui/input";
import SubmitButton from "@ui/submit-button";
import { Textarea } from "@ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function NewBlog() {
  const [newPost, setNewPost] = useState<CreatePostDTO>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!newPost.title || !newPost.content) return;

    setLoading(true);
    try {
      const post = await postService.createPost(newPost);
      navigate(`/blogs/${post.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 py-20 container">
      <h1>New Blog</h1>
      <Card>
        <CardHeader>
          <Label>Title</Label>
          <Input
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            type="text"
            placeholder="Your blog title"
          />
        </CardHeader>
        <CardContent>
          <Label>Content</Label>
          <Textarea
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            placeholder="Your blog content"
            rows={25}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-x-2">
          <Button
            onClick={() => setNewPost({ title: "", content: "" })}
            variant={"outline"}
          >
            Clear
          </Button>
          <SubmitButton loading={loading} onClick={handleSubmit}>
            Publish
          </SubmitButton>
        </CardFooter>
      </Card>
    </div>
  );
}
