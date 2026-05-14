import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, Star, CreditCard, Banknote, Bitcoin, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Companion } from '../types';
import { getCompanions } from '../lib/storage';

export default function Book() {
  const { id } = useParams();
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  useEffect(() => {
    const all = getCompanions();
    const found = all.find(c => c.id === id);
    if (found) {
      setCompanion(found);
      if (found.paymentMethods && found.paymentMethods.length > 0) {
        setSelectedPayment(found.paymentMethods[0]);
      }
    }
  }, [id]);

  if (!companion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl text-primary">Companion Not Found</h2>
          <Link to="/discover" className="text-secondary font-bold flex items-center gap-2 justify-center hover:underline">
            <ArrowLeft size={18} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-serif text-5xl text-primary">Select Your Experience</h1>
        <p className="text-on-surface-variant mt-4 max-w-2xl text-lg leading-relaxed">
          Curate your time with precision. Our companions are dedicated to providing a seamless, premium experience tailored to your schedule.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Selection Columns */}
        <div className="lg:col-span-2 space-y-12">
          {/* Duration Selection */}
          <section className="bg-surface-container-low/50 rounded-[40px] p-10 soft-shadow space-y-10">
            <h2 className="font-serif text-3xl text-on-surface">Duration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DurationOption label="Short Stay" duration="3 Hours" price="$450" active />
              <DurationOption label="Standard" duration="6 Hours" price="$800" />
              <DurationOption label="Immersive" duration="Full Time" price="$1,500" />
            </div>
          </section>

          {/* Date & Time Picker */}
          <section className="bg-surface-container-low/50 rounded-[40px] p-10 soft-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-3xl text-on-surface mb-8">Select Date</h2>
                <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-xl font-bold">December 2024</span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><ChevronLeft size={18} /></button>
                      <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><ChevronRight size={18} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                      <span key={d} className="text-[10px] font-bold text-on-surface-variant/60 uppercase">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(7)].map((_, i) => <div key={i} className="py-2.5 text-on-surface-variant/20 text-sm">2{4+i}</div>)}
                    {[...Array(14)].map((_, i) => (
                      <button 
                        key={i} 
                        className={cn(
                          "py-2.5 rounded-xl text-sm font-medium transition-all",
                          i + 1 === 12 ? "bg-primary text-on-primary font-bold" : "hover:bg-surface-container"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-3xl text-on-surface mb-8">Start Time</h2>
                <div className="grid grid-cols-2 gap-4">
                  <TimeOption time="10:00 AM" />
                  <TimeOption time="12:00 PM" />
                  <TimeOption time="02:00 PM" selected />
                  <TimeOption time="04:00 PM" />
                  <TimeOption time="06:00 PM" />
                  <TimeOption time="08:00 PM" />
                </div>
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-on-surface-variant mt-6 italic">Times shown in your local timezone (EST).</p>
              </div>
            </div>
          </section>
          {/* Payment Mode Selection */}
          <section className="bg-surface-container-low/50 rounded-[40px] p-10 soft-shadow space-y-10">
            <h2 className="font-serif text-3xl text-on-surface">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(companion.paymentMethods && companion.paymentMethods.length > 0 ? companion.paymentMethods : ['Online Transfer', 'Cash on Meeting']).map((method) => (
                <button 
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={cn(
                    "flex items-center gap-4 p-6 rounded-3xl border-2 transition-all text-left",
                    selectedPayment === method ? "border-primary bg-surface-container-lowest soft-shadow" : "border-outline-variant/30 hover:border-primary/40"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    selectedPayment === method ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
                  )}>
                    {method.toLowerCase().includes('card') && <CreditCard size={24} />}
                    {method.toLowerCase().includes('transfer') && <Banknote size={24} />}
                    {method.toLowerCase().includes('bank') && <Banknote size={24} />}
                    {method.toLowerCase().includes('crypto') && <Bitcoin size={24} />}
                    {!['card', 'transfer', 'bank', 'crypto'].some(k => method.toLowerCase().includes(k)) && <CreditCard size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{method}</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {method.toLowerCase().includes('transfer') ? 'Direct online bank transfer' : 'Secure payment method'}
                    </p>
                  </div>
                  {selectedPayment === method && <CheckCircle size={20} className="ml-auto text-primary" />}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Summary Sidebar */}
        <aside className="sticky top-32 space-y-8">
          <div className="bg-surface-container-high rounded-[40px] p-10 shadow-xl border border-surface-container-highest">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-20 h-20 rounded-[20px] overflow-hidden shadow-sm">
                <img src={companion.image} alt={companion.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-on-surface">{companion.name}</h3>
                <div className="flex items-center gap-1.5 text-primary mt-1">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold tracking-wider">4.9 Premier Find</span>
                </div>
              </div>
            </div>

            <div className="space-y-5 border-b border-outline-variant/30 pb-10 mb-10">
              <SummaryRow label="Duration" value="3 Hours" />
              <SummaryRow label="Date" value="Dec 12, 2024" />
              <SummaryRow label="Start Time" value="02:00 PM" />
              {selectedPayment && <SummaryRow label="Payment" value={selectedPayment} />}
            </div>

            <div className="space-y-5 mb-10">
              <SummaryRow label="Rate" value={`${companion.price}/hr`} />
              <SummaryRow label="Total (3 hrs)" value={`PKR ${parseInt(companion.price.replace(/[^0-9]/g, '')) * 3}`} />
              <SummaryRow label="Concierge Fee" value="PKR 5,000" />
              <div className="flex justify-between items-center py-2">
                <span className="font-serif text-2xl text-on-surface font-medium">Total Price</span>
                <span className="font-serif text-3xl text-primary font-bold">
                  PKR {parseInt(companion.price.replace(/[^0-9]/g, '')) * 3 + 5000}
                </span>
              </div>
            </div>

            <button className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-primary/20">
              Confirm Booking
            </button>
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-primary" />
              Secure payment & discretion guaranteed
            </div>
          </div>

          <div className="bg-secondary-container/10 border border-secondary-container/20 rounded-[32px] p-8 flex gap-5 items-start">
            <div className="p-3 bg-secondary-container/50 rounded-2xl text-secondary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-secondary-container">Aura Protection</h4>
              <p className="text-xs text-on-secondary-container/70 leading-relaxed mt-1.5">
                Full refund if cancelled within 24 hours of the engagement. Your safety is our priority.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DurationOption({ label, duration, price, active }: { label: string; duration: string; price: string; active?: boolean }) {
  return (
    <button className={cn(
      "relative flex flex-col p-8 rounded-[32px] border-2 text-left transition-all group",
      active ? "border-primary bg-surface-container-lowest soft-shadow" : "border-outline-variant/30 hover:border-primary/40"
    )}>
      <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-3", active ? "text-primary" : "text-on-surface-variant")}>{label}</span>
      <span className="font-serif text-2xl text-on-surface">{duration}</span>
      <span className="text-sm text-on-surface-variant font-medium mt-6">{price}</span>
      {active && (
        <div className="absolute top-6 right-6 text-primary">
          <CheckCircle size={20} fill="currentColor" className="text-primary-container" />
        </div>
      )}
    </button>
  );
}

function TimeOption({ time, selected }: { time: string; selected?: boolean }) {
  return (
    <button className={cn(
      "py-4 px-6 rounded-2xl border-2 text-sm font-bold font-sans transition-all text-left flex justify-between items-center group",
      selected ? "border-primary bg-surface-container-lowest" : "border-outline-variant/30 hover:border-primary/40 text-on-surface-variant"
    )}>
      {time}
      {selected && <CheckCircle size={14} className="text-primary" />}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      <span className="text-sm font-bold text-on-surface">{value}</span>
    </div>
  );
}
