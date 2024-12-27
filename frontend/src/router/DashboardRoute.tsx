import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Loading from '../components/common/Loading';
import { useAuth } from '../hooks/useAuth';
import { RouteProps } from '../types/route.type';

const DashboardRoute: FC<RouteProps> = ({ component: Component }) => {
  const { currentUser, loading } = useAuth(); // Add loading state

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
};

export default DashboardRoute;
