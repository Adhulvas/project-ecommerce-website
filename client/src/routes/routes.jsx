import {
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Cart } from "../pages/user/Cart";
import { Wishlist } from "../pages/user/Wishlist";
import { ProductDetail } from "../pages/user/ProductDetail";
import { ProductListing } from "../pages/user/productListing";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { UserAccount } from "../pages/user/UserAccount";
import { UserLayout } from "../layout/userLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "userAccount",
        element: <UserAccount/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "wishlist",
        element: <Wishlist/>,
      },
      {
        path: "productListing",
        element: <ProductListing/>,
      },
      {
        path: "productDetail/:id",
        element: <ProductDetail/>,
      },
    ]
  },
]);