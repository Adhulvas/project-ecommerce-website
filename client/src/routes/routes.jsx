import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Wishlist } from "../pages/user/Wishlist";
import { ProductDetail } from "../pages/user/ProductDetail";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Cart } from "../pages/user/Cart";
import { ProfilePage } from "../pages/user/ProfilePage";
import { SellerLayout } from "../layout/SellerLayout";
import { ListCategories } from "../pages/admin/ListCategories";
import { UserLayout } from "../layout/UserLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { SellerDashboard } from "../pages/seller/SellerDashBoard";
import { DashBoard } from "../pages/admin/DashBoard";
import { ProductListing } from "../pages/user/ProductListing";

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
            element: <ProfilePage/>
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
  {
    path: "seller",
    element: <SellerLayout/>,
    errorElement: <ErrorPage role="seller"/>,
    children: [
      {
        path: "dashboard",
        element: <SellerDashboard/>,
      },
      {
        path: "signup",
        element: <Signup role="seller"/>,
      },
      {
        path: "login",
        element: <Login role="seller"/>,
      },
    ]
  },
  {
    path: "admin",
    element: <AdminLayout/>,
    errorElement: <ErrorPage role="admin"/>,
    children: [
      {
        path: "dashboard",
        element: <DashBoard/>,
      },
      {
        path: "signup",
        element: <Signup role="admin"/>,
      },
      {
        path: "login",
        element: <Login role="admin"/>,
      },
      {
        path: "category/list",
        element: <ListCategories/>,
      }
    ]
  },
]);