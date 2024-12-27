import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { RouteProps } from '../types/route.type';

const GuestRoute: FC<RouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default GuestRoute;
