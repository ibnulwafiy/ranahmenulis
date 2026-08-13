import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F8] flex">
      {/* Desktop Navigation: Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header (visible on mobile, minimal on desktop) */}
        <Header />

        {/* Page Body */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-12 animate-fade-in">
          {children || <Outlet />}
        </main>

        {/* Mobile Navigation: Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};
