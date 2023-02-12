import WelcomScreen from "../pages/Welcome";
import Signup from "./../pages/Signup";
import Login from "./../pages/Login";
import UserHome from "./../pages/UserHome";
import AdminProductUpload from "../pages/AdminProductUpload";
import AdminHome from "./../pages/AdminHome";
import AdminOrders from "../pages/AdminOrders";
import AccountSettings from "../pages/AccountSettings";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
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
      element: <UserHome />,
    },
    {
      path: "/adminProductUpload",
      element: <AdminProductUpload />,
    },
    {
      path: "/adminHome",
      element: <AdminHome />,
    },
    {
      path: "/adminOrders",
      element: <AdminOrders />,
    },
    {
      path: "/adminAccountSettings",
      element: <AccountSettings />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
