import { createBrowserRouter, RouteObject } from 'react-router-dom';

import Dashboard from '../pages/dashboard/Dashboard';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DashboardRoute from './DashboardRoute';
import FrontendRoute from './FrontendRoute';
import GuestRoute from './GuestRoute';

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
];

const router = createBrowserRouter(routes);

export default router;
