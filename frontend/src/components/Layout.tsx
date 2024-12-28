import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mx-auto w-full mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
