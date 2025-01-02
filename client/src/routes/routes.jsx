import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import { Wishlist } from "../pages/user/Wishlist";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Cart } from "../pages/user/Cart";
import { ProfilePage } from "../pages/user/MyAccount/ProfilePage";
import { SellerLayout } from "../layout/SellerLayout";
import { UserLayout } from "../layout/UserLayout";
import { ListCategories } from "../pages/admin/ListCategories";
import { AdminLayout } from "../layout/AdminLayout";
import { Address } from "../pages/user/MyAccount/Address";
import { AccountSettings } from "../pages/user/MyAccount/AccountSettings";
import { AccountOverview } from "../pages/user/MyAccount/AccountOverview";
import { Orders } from "../pages/user/MyAccount/Orders";
import { ProductDetail } from "../pages/user/ProductDetail";
import { CreateCategory } from "../pages/admin/CreateCategory";
import { AddProduct } from "../pages/seller/AddProduct";
import { UpdateProduct } from "../pages/seller/UpdateProduct";
import { ProductListing } from "../pages/user/ProductListing";
import { ProductList } from "../pages/admin/ProductList";
import { SellerProductList } from "../pages/seller/SellerProductList";
import { DetailedView } from "../pages/shared/DetailedView";
import { Success } from "../components/user/Success";
import { Cancel } from "../components/user/Cancel";
import { CheckoutPage } from "../pages/user/CheckoutPage";
import { RatingPage } from "../pages/user/RatingPage";
import { OrderManagement } from "../pages/seller/OrderManagement";
import { AdminDashBoard } from "../pages/admin/AdminDashBoard";
import { SellerDashBoard } from "../pages/seller/SellerDashboard";

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
            children: [
              {
                path: "overview",
                element : <AccountOverview/>
              },
              {
                path: "orders",
                element : <Orders/>
              },
              {
                path: "address",
                element : <Address/>
              },
              {
                path: "settings",
                element : <AccountSettings/>
              }
            ]
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
      },
      {
        path: "success",
        element: <Success/>,
      },
      {
        path: "cancel",
        element: <Cancel/>,
      },
      {
        path: "checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "rate-review/:productId",
        element: <RatingPage/>,
      },
    ]
  },
  {
    path: "seller",
    element: <SellerLayout/>,
    errorElement: <ErrorPage role="seller"/>,
    children: [
      {
        path: "dashboard",
        element: <SellerDashBoard/>
      },
      {
        path: "signup",
        element: <Signup role="seller"/>,
      },
      {
        path: "login",
        element: <Login role="seller"/>,
      },
      {
        path: "products/create",
        element: <AddProduct/>,
      },
      {
        path: "products/edit/:productId",
        element: <UpdateProduct/>,
      },
      {
        path: "products/view/:productId",
        element: <DetailedView/>,
      },
      {
        path: "products/list",
        element: <SellerProductList/>,
      },
      {
        path: "order-management",
        element: <OrderManagement/>,
      }
    ]
  },
  {
    path: "admin",
    element: <AdminLayout/>,
    errorElement: <ErrorPage role="admin"/>,
    children: [
      {
        path: "dashboard",
        element: <AdminDashBoard/>,
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
      },
      {
        path: "category/create",
        element: <CreateCategory/>,
      },
      {
        path: "products/list",
        element: <ProductList/>,
      },
      {
        path: "products/view/:productId",
        element: <DetailedView/>,
      },
      {
        path: "products/edit/:productId",
        element: <UpdateProduct/>,
      }
    ]
  },
]);