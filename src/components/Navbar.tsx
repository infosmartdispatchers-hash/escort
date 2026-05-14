import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Bell, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
      <nav className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-3xl italic text-primary">
            Aura
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/discover" 
              className={cn(
                "font-sans text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/discover' ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant"
              )}
            >
              Discover
            </Link>
            <Link 
              to="/bespoke" 
              className={cn(
                "font-sans text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/bespoke' ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant"
              )}
            >
              Experience
            </Link>
            <Link to="/admin" className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Concierge
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Heart size={20} />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <Link to="/profile/evelyn" className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all active:scale-95">
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
