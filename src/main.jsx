import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./store/auth-state.jsx";

/* Components Import */
import Navbar from "./components/utils/Navbar.jsx";
import Footer from "./components/utils/Footer.jsx";
import Register from "./containers/auth/register.jsx";
import UserHome from "./components/UserHome/userHome.jsx";
import Contact from "./components/Contact/contact.jsx";
import Chat from "./components/Chat/Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<Navbar />, <Homepage />, <Footer />],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homepage",
    element: [<Navbar />, <UserHome />],
  },
  {
    path: "/contact",
    element: [<Contact />],
  },
  {
    path: "/chat/:otherUser",
    element: [<Navbar />, <Chat />, <Footer />],
  },
  {
    path: "*",
    element: [
      <Navbar />,
      <div className="h1">404 Page Not Found</div>,
      <Footer />,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
