import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Companion } from '../types';
import { getCompanions } from '../lib/storage';

export default function Home() {
  const [featuredCompanions, setFeaturedCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    const all = getCompanions();
    setFeaturedCompanions(all.filter(c => c.featured).slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative px-6 md:px-16 pt-8 pb-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-start gap-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">The Aura Collective</span>
              <h1 className="font-serif text-5xl md:text-6xl text-on-surface leading-tight">
                Elegance in every encounter, curated for the <span className="italic text-primary">discerning.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                Discover professional companionship designed around trust, emotional intelligence, and shared sophistication.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl p-4 soft-shadow border border-outline-variant/10 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 flex flex-col gap-1 px-4 border-r border-outline-variant/30 w-full md:w-auto">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">City</label>
                <input 
                  type="text" 
                  placeholder="Lahore, Islamabad, Karachi" 
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-outline-variant/60"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 px-4 border-r border-outline-variant/30 w-full md:w-auto">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Height</label>
                <select className="bg-transparent border-none focus:ring-0 p-0 text-sm text-on-surface appearance-none cursor-pointer">
                  <option>Any Height</option>
                  <option>5'2" - 5'6"</option>
                  <option>5'7"+</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1 px-4 w-full md:w-auto">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Budget (PKR)</label>
                <input 
                  type="text" 
                  placeholder="Min. range" 
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-outline-variant/60"
                />
              </div>
              <button className="bg-primary text-on-primary w-full md:w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-90 transition-all active:scale-95">
                <Search size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden soft-shadow bg-surface-container">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" 
                alt="Elegance"
                className="w-full h-full object-cover grayscale-[10%] sepia-[5%]"
              />
            </div>
            {/* Decorative Blobs */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Featured Companions */}
      <section className="py-20 px-6 md:px-16 bg-surface-container-low/30">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="font-serif text-4xl text-on-surface">Featured Companions</h2>
              <p className="text-on-surface-variant">Hand-selected profiles for an unparalleled experience.</p>
            </div>
            <Link to="/discover" className="text-sm font-bold text-primary flex items-center gap-2 group hover:translate-x-1 transition-transform">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredCompanions.map((c, i) => (
              <Link key={c.id} to={`/profile/${c.id}`} className="block h-full">
                <CompanionCard 
                  name={c.name}
                  title={`${c.location} • ${c.specialty}`}
                  image={c.image}
                  tags={c.tags || [c.specialty || 'General']}
                  offset={i === 1}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-16 border-y border-outline-variant/10">
        <div className="max-w-[1400px] mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl text-on-surface">The Aura Experience</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Discretion and excellence are the cornerstones of our collective. Hear from our esteemed members.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                quote: "Aura provides a level of intellectual compatibility that is simply impossible to find elsewhere. Every encounter is a masterclass in grace.",
                author: "M. R., Venture Partner"
              },
              {
                quote: "The concierge team handled my complex travel itinerary across three continents with absolute precision and elegance. Invaluable.",
                author: "D. S., International Architect"
              },
              {
                quote: "Beyond companionship, it is a network of trust. The screening process ensures that every individual you meet is of the highest caliber.",
                author: "S. L., Creative Director"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <p className="font-serif text-xl italic text-on-surface leading-relaxed">"{t.quote}"</p>
                <div className="w-8 h-[1px] bg-primary/30 mx-auto" />
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">{t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto bg-primary-container/10 rounded-[40px] p-12 md:p-24 flex flex-col items-center text-center gap-8 border border-primary-container/20">
          <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl leading-tight">
            Ready to find your perfect <span className="italic">counterpart?</span>
          </h2>
          <p className="text-lg text-on-surface-variant max-w-xl">
            Our concierge team is available 24/7 to facilitate introductions and ensure your absolute discretion and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Book a Consultation
            </button>
            <button className="border border-outline-variant text-on-surface px-10 py-4 rounded-full font-bold text-sm hover:bg-surface-container transition-all">
              Explore Membership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompanionCard({ name, title, image, tags, offset }: { name: string; title: string; image: string; tags: string[]; offset?: boolean }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className={cn(
        "group bg-surface-container-lowest rounded-[32px] overflow-hidden soft-shadow card-lift",
        offset && "lg:translate-y-8"
      )}
    >
      <div className="aspect-[3/4] overflow-hidden bg-surface-container">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-2xl text-on-surface">{name}</h3>
            <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">{title}</p>
          </div>
          <span className="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Verified
          </span>
        </div>
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
