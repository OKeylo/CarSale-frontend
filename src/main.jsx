import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import MyAccount from './routes/MyAccount.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/me",
    element: <MyAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
