import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFoundPage from "./pages/not-found";
import Signup from "./pages/signup";

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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
