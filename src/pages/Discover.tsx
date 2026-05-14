import React, { useState, useEffect } from 'react';
import { MapPin, Grid, List as ListIcon, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { Companion } from '../types';
import { getCompanions } from '../lib/storage';

export default function Discover() {
  const [companions, setCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    setCompanions(getCompanions());
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-80 shrink-0 space-y-8">
        <div className="bg-surface-container-low rounded-2xl p-8 soft-shadow border border-outline-variant/10">
          <h2 className="font-serif text-2xl text-primary mb-8 text-center">Refine Search</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">City</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm appearance-none cursor-pointer">
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Karachi</option>
                <option>Faisalabad</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Height range</label>
              <div className="flex items-center gap-4">
                <input type="text" placeholder="Min" className="w-1/2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 text-center text-sm focus:ring-1 focus:ring-primary" />
                <span className="text-outline-variant">—</span>
                <input type="text" placeholder="Max" className="w-1/2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 text-center text-sm focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Hair Color</label>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary-container/20 text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">Black</button>
                <button className="bg-surface-container-lowest text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-outline-variant/20 hover:border-primary/40 transition-colors">Brunette</button>
                <button className="bg-surface-container-lowest text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-outline-variant/20 hover:border-primary/40 transition-colors">Auburn</button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Body Type</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm appearance-none cursor-pointer">
                <option>Any Type</option>
                <option>Slender</option>
                <option>Athletic</option>
                <option>Curvy</option>
                <option>Petite</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Breast Size</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm appearance-none cursor-pointer">
                <option>Any Size</option>
                <option>B-Cup</option>
                <option>C-Cup</option>
                <option>D-Cup</option>
                <option>D+ Cup</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Price Range (per hour)</label>
              <input type="range" min="5000" max="50000" className="w-full accent-primary h-1.5 bg-outline-variant/20 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-2">
                <span>PKR 5,000</span>
                <span>PKR 50,000+</span>
              </div>
            </div>

            <button className="w-full bg-primary text-on-primary font-bold text-sm py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-all active:scale-95 mt-4">
              Apply Filters
            </button>
          </div>
        </div>

        <div className="bg-secondary-container/10 rounded-2xl p-8 border border-secondary-container/20">
          <p className="text-xs font-bold text-secondary uppercase tracking-[0.15em] mb-3">Personalized Match</p>
          <p className="text-sm text-on-secondary-container leading-relaxed mb-6">Let our concierge hand-pick the perfect companion for your evening.</p>
          <Link to="/bespoke" className="text-secondary font-bold text-sm flex items-center gap-2 group underline-offset-4 hover:underline">
            Request Bespoke 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="font-serif text-5xl text-primary">Discover</h1>
            <p className="text-on-surface-variant mt-3 text-lg leading-relaxed">{companions.length} hand-selected companions available in your area</p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl">
            <button className="p-2.5 bg-surface-container-lowest rounded-xl shadow-sm text-primary">
              <Grid size={20} />
            </button>
            <button className="p-2.5 text-on-surface-variant hover:text-primary transition-colors">
              <ListIcon size={20} />
            </button>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {companions.map((c) => (
            <Link key={c.id} to={`/profile/${c.id}`} className="group block">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                className="space-y-4"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative soft-shadow bg-surface-container">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {c.featured && (
                    <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-primary font-bold uppercase tracking-widest">
                      Featured
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-serif text-2xl text-on-surface">{c.name}</h3>
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-medium mt-1">
                      <MapPin size={14} className="text-primary/60" />
                      {c.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mb-1">Starts at</span>
                    <span className="font-serif text-2xl text-primary">{c.price}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
