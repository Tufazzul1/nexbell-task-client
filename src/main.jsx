import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './pages/Products/ProductDetails';
import Dashboard from './pages/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children : [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/products',
        element: <Products></Products>
      },
      {
        path: '/products/:id',
        element: <ProductDetails></ProductDetails>
      },

    ]
  },
  {
    path:"/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "products/add",
        element: <AddProduct></AddProduct>
      },
      {
        path: "products/edit",
        element: <EditProduct></EditProduct>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
