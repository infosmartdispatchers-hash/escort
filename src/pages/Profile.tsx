import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Companion } from '../types';
import { getCompanions } from '../lib/storage';

export default function Profile() {
  const { id } = useParams();
  const [companion, setCompanion] = useState<Companion | null>(null);

  useEffect(() => {
    const all = getCompanions();
    const found = all.find(c => c.id === id);
    if (found) {
      setCompanion(found);
    }
  }, [id]);

  if (!companion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl text-primary">Profile Not Found</h2>
          <Link to="/discover" className="text-secondary font-bold flex items-center gap-2 justify-center hover:underline">
            <ArrowLeft size={18} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-12">
      {/* Bento Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20 h-auto md:h-[600px]">
        <div className="md:col-span-8 group relative overflow-hidden rounded-3xl shadow-xl h-[400px] md:h-full">
          <img 
            src={companion.image} 
            alt={companion.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 text-white space-y-2">
            <h1 className="font-serif text-6xl leading-none">{companion.name}</h1>
            <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-90">{companion.location}</p>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-6 h-full">
          {companion.gallery && companion.gallery.length > 0 ? (
            companion.gallery.slice(0, 2).map((img, idx) => (
              <div key={idx} className="flex-1 overflow-hidden rounded-3xl shadow-lg relative group h-[200px] md:h-initial">
                <img 
                  src={img} 
                  alt={`Detail ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))
          ) : (
            <>
              <div className="flex-1 overflow-hidden rounded-3xl shadow-lg relative group h-[200px] md:h-initial">
                <img 
                  src={companion.image} 
                  alt="Detail 1" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-3xl shadow-lg relative group h-[200px] md:h-initial bg-surface-container">
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-primary/5">
                  <p className="font-serif italic text-lg text-primary">"I believe the finest moments in life are those shared in quiet understanding."</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-20">
          {/* Bio */}
          <section className="space-y-8">
            <h2 className="font-serif text-4xl text-primary">About {companion.name}</h2>
            <div className="space-y-6">
              <p className="text-lg text-on-surface leading-loose">
                {companion.bio || `${companion.name} is a distinguished partner known for ${companion.specialty?.toLowerCase() || 'exceptional companionship'}. With a background in elite social circles, they bring a blend of elegance, wit, and genuine warmth to every encounter.`}
              </p>
            </div>
          </section>

          {/* Details Bento */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-10 rounded-[32px] shadow-sm space-y-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b border-outline-variant/30 pb-4">Professional Profile</h3>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Specialty</span><span className="font-bold">{companion.specialty}</span></li>
                <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Height</span><span className="font-bold">{companion.height || '175'} cm</span></li>
                {companion.bodyType && (
                  <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Body Type</span><span className="font-bold">{companion.bodyType}</span></li>
                )}
                {companion.breastSize && (
                  <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Breast Size</span><span className="font-bold">{companion.breastSize}</span></li>
                )}
                <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Eyes</span><span className="font-bold">{companion.eyeColor || 'Classic'}</span></li>
                <li className="flex justify-between text-sm"><span className="text-on-surface-variant font-medium">Location</span><span className="font-bold">{companion.location}</span></li>
                {companion.paymentMethods && companion.paymentMethods.length > 0 && (
                  <li className="flex justify-between text-sm pt-4 border-t border-outline-variant/10">
                    <span className="text-on-surface-variant font-medium">Payment</span>
                    <span className="font-bold text-right text-xs">{companion.paymentMethods.join(', ')}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[32px] shadow-sm space-y-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b border-outline-variant/30 pb-4">Interests</h3>
              <div className="flex flex-wrap gap-3">
                {(companion.tags || [companion.specialty || 'Travel', 'Arts', 'Gourmet']).map(tag => (
                  <span key={tag} className="px-5 py-2 bg-secondary-container/30 text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Boundaries */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-outline-variant/20 pt-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-secondary">
                <CheckCircle size={28} />
                <h3 className="font-serif text-3xl">Services Offered</h3>
              </div>
              <ul className="space-y-4 text-on-surface-variant leading-relaxed">
                <li className="flex items-start gap-4"><span className="text-secondary font-bold text-lg">•</span> Fine Dining & Social Events</li>
                <li className="flex items-start gap-4"><span className="text-secondary font-bold text-lg">•</span> Travel Companionship</li>
                <li className="flex items-start gap-4"><span className="text-secondary font-bold text-lg">•</span> Intellectual Discussion</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Inquiry Sidebar */}
        <aside className="sticky top-32 space-y-8">
          <div className="bg-surface-container-lowest p-10 rounded-[40px] soft-shadow border border-surface-container space-y-10">
            <h3 className="font-serif text-3xl text-primary text-center">Reserve</h3>
            
            <div className="space-y-4 text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Base Rate</p>
              <p className="font-serif text-5xl text-primary">{companion.price}<span className="text-sm italic"> / hr</span></p>
            </div>

            <Link to={`/book/${companion.id}`} className="block w-full bg-primary text-on-primary py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm text-center shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Request Booking
            </Link>

            <p className="text-center text-xs text-on-surface-variant italic px-8">
              All arrangements are subject to background verification and mutual discretion.
            </p>
          </div>

          <div className="bg-tertiary-container/10 p-8 rounded-[32px] border border-tertiary-container/20 space-y-3">
            <div className="flex items-center gap-3 text-tertiary">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Identity</span>
            </div>
            <p className="text-sm text-on-tertiary-container leading-relaxed font-medium">
              {companion.name} is a verified premier partner with Aura.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BookingTier({ label, duration, price, active }: { label: string; duration: string; price: string; active?: boolean }) {
  return (
    <div className={cn(
      "p-5 rounded-2xl flex justify-between items-center transition-all cursor-pointer group",
      active ? "bg-primary-container/20 border border-primary-container/40" : "bg-surface-container-low hover:bg-primary-container/30"
    )}>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-on-surface">{duration}</p>
      </div>
      <span className="font-serif text-2xl text-primary">{price}</span>
    </div>
  )
}
