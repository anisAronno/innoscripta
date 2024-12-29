import { createBrowserRouter, RouteObject } from 'react-router-dom';
import ArticleDetailView from '../components/blog/ArticleDetailView';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DashboardRoute from './DashboardRoute';
import GuestRoute from './GuestRoute';
import Preferences from '../pages/PreferencesManager';
import Profile from '../pages/Profile';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardRoute component={Home} />,
      },
      {
        path: 'articles/:slug',
        element: <DashboardRoute component={ArticleDetailView} />,
      },
      {
        path: 'preferences',
        element: <DashboardRoute component={Preferences} />,
      },
      {
        path: 'profile',
        element: <DashboardRoute component={Profile} />,
      },
    ],
  },
  {
    path: 'login',
    element: <GuestRoute component={Login} />,
  },
  {
    path: 'signup',
    element: <GuestRoute component={Signup} />,
  },
];

const router = createBrowserRouter(routes);

export default router;
