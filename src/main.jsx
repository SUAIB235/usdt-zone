import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layouts/Root";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import Checkout from "./Pages/Checkout";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import OrderManagment from "./Pages/OrderManagment";
import MessageManagement from "./Pages/MessageManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/orders",
    element: <Orders></Orders>,
  },
  {
    path: "/products",
    element: <Products></Products>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  },
  {
    path: "/ordermanagement",
    element: <OrderManagment></OrderManagment>,
  },
  {
    path: "/messagemanagement",
    element: <MessageManagement></MessageManagement>,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
