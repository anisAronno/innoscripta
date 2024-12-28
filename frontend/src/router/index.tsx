import { createBrowserRouter, RouteObject } from 'react-router-dom';

import Dashboard from '../pages/dashboard/Dashboard';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DashboardRoute from './DashboardRoute';
import FrontendRoute from './FrontendRoute';
import GuestRoute from './GuestRoute';
import Signup from '../pages/Signup';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <FrontendRoute component={Home} />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardRoute component={Dashboard} />,
  },
  {
    path: 'login',
    element: <GuestRoute component={Login} />,
  },
  {
    path: 'signup',
    element: <GuestRoute component={Signup} />,
  }
];

const router = createBrowserRouter(routes);

export default router;
