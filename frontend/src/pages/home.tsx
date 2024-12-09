import HeroSection from "@/components/hero-section";
import PostCard from "@/components/post-card";
import { Post } from "@/types/blog";

const posts: Post[] = [
  {
    id: 1,
    title: "How to create a blog post with zero knowledge!",
    content:
      "Welcome to my blog! and we are welcoming you to be a new hero of our life",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 2,
    title: "Hello, world!",
    content: "Welcome to my blog!",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 1,
    title: "Hello, world!",
    content:
      "Welcome to my blog! and we are welcoming you to be a new hero of our life",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 2,
    title: "Hello, world!",
    content: "Welcome to my blog!",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 1,
    title: "Hello, world!",
    content:
      "Welcome to my blog! and we are welcoming you to be a new hero of our life",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 2,
    title: "Hello, world!",
    content: "Welcome to my blog!",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 1,
    title: "Hello, world!",
    content:
      "Welcome to my blog! and we are welcoming you to be a new hero of our life",
    create_at: "2021-01-01",
    user_id: 1,
  },
  {
    id: 2,
    title: "Hello, world!",
    content: "Welcome to my blog!",
    create_at: "2021-01-01",
    user_id: 1,
  },
];

function Home() {
  return (
    <>
      <HeroSection />
      <main className="container max-w-screen-xl mx-auto my-8">
        <section className="mt-4">
          <h2 className="text-xl font-bold mt-6 mb-4">Recent Posts</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
