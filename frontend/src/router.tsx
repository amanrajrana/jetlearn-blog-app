import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
]);
