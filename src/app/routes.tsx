import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import { PrivacyPage } from "./components/Privacy";
import { TermsPage } from "./components/Terms";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", Component: HomePage },
      { path: "/pricing", Component: PricingPage },
      { path: "/dashboard", Component: DashboardPage },
      { path: "/privacy", Component: PrivacyPage },
      { path: "/terms", Component: TermsPage },
    ],
  },
]);