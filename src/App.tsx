/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Book from './pages/Book';
import Bespoke from './pages/Bespoke';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-surface">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/bespoke" element={<Bespoke />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
