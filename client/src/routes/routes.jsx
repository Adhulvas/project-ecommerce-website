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
import { UserLayout } from "../layout/userLayout";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ProfilePage } from "../pages/user/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
    errorElement: <ErrorPage/>,
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
        path: "contact",
        element: <Contact/>,
      },
      {
        path: "categories/:categoryName/:subcategoryName",
        element: <ProductListing/>,
      },
      {
        path: "productDetails/:productId",
        element: <ProductDetail/>,
      },
      {
        element:<ProtectedRoutes/>,
        path:'user',  
        children: [
          {
            path: "profile",
            element: <ProfilePage/>,
          },
          {
            path: "cart",
            element: <Cart/>,
          },
          {
            path: "wishlist",
            element: <Wishlist/>,
          },
        ]
      }
    ]
  },
]);