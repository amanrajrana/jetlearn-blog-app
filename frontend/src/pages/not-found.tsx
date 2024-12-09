import { Button } from "@ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="flex h-svh items-center p-16 bg-muted">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-primary">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-400 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button asChild>
            <Link rel="noopener noreferrer" to="/">
              Back to homepage
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
