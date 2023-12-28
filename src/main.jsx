import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./components/error-page";
import Contact from "./routes/contact";
import Clients from "./routes/clients";
import Bookings from "./routes/bookings";

const router = createBrowserRouter([
  {
    path: "/",
    //establesco <root> como ruta raíz
    element: <Root />,
    //establesco el <ErrorPage> como el elemento en caso de errores de la ruta raiz
    errorElement: <ErrorPage />,
    children: [
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "clients",
        element: <Clients />
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
