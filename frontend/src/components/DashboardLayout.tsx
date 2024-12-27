import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Logout from './Logout';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mx-auto w-full px-6 py-8 mt-16 relative">
        <div className="absolute top-4 right-4">
          <Logout />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
