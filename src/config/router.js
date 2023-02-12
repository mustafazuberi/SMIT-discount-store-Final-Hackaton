import WelcomScreen from "../pages/Welcome";
import Signup from "./../pages/Signup";
import Login from "./../pages/Login";
import UserHome from "./../pages/UserHome";
import AdminHome from "./../pages/adminHome"

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
      path: "/adminHome",
      element: <AdminHome />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
