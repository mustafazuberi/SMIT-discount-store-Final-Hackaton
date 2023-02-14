import WelcomScreen from "../pages/Welcome";
import Signup from "./../pages/Signup";
import Login from "./../pages/Login";
import UserHome from "./../pages/UserHome";
import AdminProductUpload from "../pages/AdminProductUpload";
import AdminHome from "./../pages/AdminHome";
import AdminOrders from "../pages/AdminOrders";
import AccountSettings from "../pages/AccountSettings";
import UserSetting from "../pages/UserSetting/index"
import UserCart from "./../pages/UserCart"

import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Router = () => {



  const isAuthenticated = useSelector(state => state.isAuthLoggined)
  const isAdminLoggined = useSelector(state => state.isAdminLoggined)



  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomScreen />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/userHome",
      element: isAuthenticated ? <UserHome /> : <Login />,
    },
    {
      path: "/adminProductUpload",
      element: isAdminLoggined ? <AdminProductUpload /> : <Login />,
    },
    {
      path: "/adminHome",
      element: isAdminLoggined ? <AdminHome /> : <Login />,
    },
    {
      path: "/adminOrders",
      element: isAdminLoggined ? <AdminOrders /> : <Login />,
    },
    {
      path: "/adminAccountSettings",
      element: isAdminLoggined ? <AccountSettings /> : <Login />,
    },
    {
      path: "/userSetting",
      element: isAuthenticated ? <UserSetting /> : <Login />,
    },
    {
      path: "/userCart",
      element: isAuthenticated ? <UserCart /> : <Login />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
