import { useAppSelector } from "@/redux/hook";
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
import { ArrowRight, SquarePen } from "lucide-react";
import { Link } from "react-router";

function PostCard(post: Post) {
  const userId = useAppSelector((state) => state.userState.user?.id);
  return (
    <Card className="h-full flex flex-col">
      <div className="flex relative">
        <CardHeader className="w-11/12">
          <CardDescription className="text-xs -mb-2">
            {new Date(post.createdAt).toDateString()}
          </CardDescription>
          <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
        </CardHeader>
        {userId === post.user.id && (
          <Link
            className="absolute top-2 right-2 text-primary"
            to={`/dashboard/posts/${post.id}`}
          >
            <SquarePen size={16} />
          </Link>
        )}
      </div>
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
