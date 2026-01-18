import React from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-0 pb-16">
        {children}
      </main>
      <footer className="py-8 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tushar Ganotra.</p>
      </footer>
    </div>
  );
};