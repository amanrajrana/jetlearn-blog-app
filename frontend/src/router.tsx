import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFoundPage from "./pages/not-found";
import Signup from "./pages/signup";
import BlogPage from "./pages/blogs/id/blog-post";
import BlogsPage from "./pages/blogs";
import Protected from "./components/auth-layout";
import Dashboard from "./pages/dashboard";
import NewBlog from "./pages/dashboard/new-blog";
import EditPost from "./pages/dashboard/post-edit-page";
import UserPostPage from "./pages/dashboard/post";

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
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/posts",
            element: <UserPostPage />,
          },
          {
            path: "/dashboard/posts/new",
            element: <NewBlog />,
          },
          {
            path: "/dashboard/posts/:id",
            element: <EditPost />,
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
