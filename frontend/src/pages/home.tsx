import BlogPosts from "@/components/blog-posts";
import HeroSection from "@/components/hero-section";

function Home() {
  return (
    <>
      <HeroSection />
      <main className="container max-w-screen-xl mx-auto my-8">
        <section className="mt-4">
          <h2 className="text-xl font-bold mt-6 mb-4">Recent Posts</h2>
          <BlogPosts />
        </section>
      </main>
    </>
  );
}

export default Home;
