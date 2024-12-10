import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFoundPage from "./pages/not-found";
import Signup from "./pages/signup";
import BlogPage from "./pages/blogs/id/blog-post";
import BlogsPage from "./pages/blogs/blog-home-page";
import Protected from "./components/auth-layout";
import NewBlog from "./pages/blogs/new-blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        //* already login user can't access login and signup page
        element: <Protected authentication={false} />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
        ],
      },
      {
        //* only login user can access this page
        element: <Protected authentication={true} />,
        children: [
          {
            path: "/blogs/new",
            element: <NewBlog />,
          },
        ],
      },
      {
        path: "/blogs",
        element: <BlogsPage />,
      },
      {
        path: "/blogs/:id",
        element: <BlogPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
