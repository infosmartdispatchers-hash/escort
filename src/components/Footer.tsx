import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-16 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-lowest">
      <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
        <Link to="/" className="font-serif text-2xl text-primary italic">Aura</Link>
        <p className="font-sans text-sm text-on-surface-variant">© 2024 Aura Collective. Discretion Assured.</p>
      </div>
      <div className="flex gap-8">
        <Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
        <Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">FAQ</Link>
        <Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Support</Link>
      </div>
    </footer>
  );
}
