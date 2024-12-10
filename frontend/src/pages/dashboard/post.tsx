import BlogPosts from "@/components/blog-posts";
import { useAppSelector } from "@/redux/hook";

const UserPostPage = () => {
  const userId = useAppSelector((state) => state.userState.user?.id);
  return (
    <main className="container mt-24">
      <BlogPosts userId={userId} />
    </main>
  );
};

export default UserPostPage;
