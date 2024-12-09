import { Post } from "@/services/post.services";
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
        <CardDescription className="text-xs -mb-2">
          {new Date(post.createdAt).toDateString()}
        </CardDescription>
        <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="line-clamp-2">{post.content}</CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant={"link"}>
          <Link to={`/blogs/${post.id}`}>
            Read more <ArrowRight className="inline" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
