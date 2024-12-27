import { FC } from 'react';
import Layout from '../components/Layout';
import { RouteProps } from '../types/route.type';

const FrontendRoute: FC<RouteProps> = ({ component: Component }) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default FrontendRoute;
