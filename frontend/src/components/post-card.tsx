import { Post } from "@/types/blog";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

function PostCard(post: Post) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardDescription className="text-xs -mb-2">{post.create_at}</CardDescription>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant={"link"}>
          <Link to={`/post/${post.id}`}>
            Read more <ArrowRight className="inline" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
