import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", Component: HomePage },
      { path: "/pricing", Component: PricingPage },
      { path: "/dashboard", Component: DashboardPage },
    ],
  },
]);