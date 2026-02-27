import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/pricing',
    Component: PricingPage,
  },
 
]);
