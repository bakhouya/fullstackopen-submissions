import { createBrowserRouter } from "react-router-dom";

import Index from "../components/Index";
import Create from "../components/Create";
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../master/master";
import ProtectedRoute from "../master/ProtectedRoute";
import GuestRoute from "../master/GuestRoute";
import Users from "../components/User";
import UserItem from "../components/UserItem";
import BlogItem from "../components/BlogItem";

export const RouterUrl = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {path: "/", element: (<ProtectedRoute> <Index /> </ProtectedRoute>),},
      {path: "/blogs/:id", element: (<ProtectedRoute> <BlogItem /> </ProtectedRoute>),},
      {path: "/create", element: (<ProtectedRoute> <Create /> </ProtectedRoute>),},
      {path: "/users", element: (<ProtectedRoute> <Users /> </ProtectedRoute>),},
      {path: "/users/:id", element: (<ProtectedRoute> <UserItem /> </ProtectedRoute>),},

      {path: "/login", element: (<GuestRoute> <Login /> </GuestRoute>),},
      {path: "/register", element: (<GuestRoute> <Register /> </GuestRoute>),
      },
    ],
  },
]);

export default RouterUrl;
