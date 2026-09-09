import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIGuide } from '../AIGuide';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-emerald-900 bg-sand overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <AIGuide />
      <Footer />
    </div>
  );
};
