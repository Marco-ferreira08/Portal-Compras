import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Cart } from "./pages/Cart/Cart";
import { NotFound } from "./pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/produto/:id", element: <ProductDetails /> },
      { path: "/carrinho", element: <Cart /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);