import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFoundPage from "./pages/not-found";
import Signup from "./pages/signup";
import BlogPage from "./pages/blog-page";
import BlogsPage from "./pages/blogs";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
