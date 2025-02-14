import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./fonts/JejuMyeongjo-Regular.ttf";
import Layout from "./components/Layout";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Events />,
      },
      {
        path: "/my-tickets",
        element: <MyTickets />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
