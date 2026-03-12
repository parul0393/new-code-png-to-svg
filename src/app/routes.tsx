import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/pricing',
    Component: PricingPage,
  },
  {
      path: "/dashboard",
      Component: DashboardPage
  }

]);
