
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useLocation } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header username="Admin" />
      <div className="flex flex-1">
        <Sidebar activePath={currentPath} />
        <main className="flex-1 p-6 overflow-auto">
          <TooltipProvider>
            <div className="max-w-6xl mx-auto space-y-6">
              {children}
            </div>
          </TooltipProvider>
        </main>
      </div>
    </div>
  );
};

export default Layout;
