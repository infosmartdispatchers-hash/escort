import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit3, ShieldCheck, LayoutGrid, Users, Calendar, Wallet, Settings, Lock, ArrowRight, Trash2, X, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Companion } from '../types';
import { getCompanions, saveCompanions, addCompanion, updateCompanion, deleteCompanion } from '../lib/storage';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [editingCompanion, setEditingCompanion] = useState<Companion | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<{ id: string; show: boolean }>({ id: '', show: false });
  
  // New/Edit form state
  const [formData, setFormData] = useState<Partial<Companion>>({
    name: '',
    location: '',
    price: '',
    featured: false,
    specialty: '',
    image: '',
    gallery: [],
    id: '',
    height: '',
    bodyType: '',
    breastSize: '',
    paymentMethods: []
  });

  useEffect(() => {
    if (isAuthenticated) {
      setCompanions(getCompanions());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aura2024') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleEdit = (companion: Companion) => {
    setEditingCompanion(companion);
    setFormData(companion);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setIsConfirmOpen({ id, show: true });
  };

  const confirmDelete = () => {
    deleteCompanion(isConfirmOpen.id);
    setCompanions(getCompanions());
    setIsConfirmOpen({ id: '', show: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompanion) {
      updateCompanion(formData as Companion);
    } else {
      const newCompanion = {
        ...formData,
        id: formData.id || `C-${Math.floor(Math.random() * 10000)}`
      } as Companion;
      addCompanion(newCompanion);
    }
    setCompanions(getCompanions());
    setIsFormOpen(false);
    setEditingCompanion(null);
    setFormData({ name: '', location: '', price: '', featured: false, specialty: '', image: '', gallery: [], id: '', height: '', bodyType: '', breastSize: '', paymentMethods: [] });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12 space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-8 shadow-xl shadow-primary/5">
              <ShieldCheck size={40} />
            </div>
            <h1 className="font-serif text-4xl text-on-surface">Admin Access</h1>
            <p className="text-on-surface-variant text-sm font-medium uppercase tracking-[0.2em]">Management Identity Required</p>
          </div>

          <div className="bg-surface-container-low rounded-[40px] p-10 soft-shadow border border-outline-variant/10">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Master Password</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      "w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-5 pl-14 text-sm focus:ring-1 transition-all placeholder:text-on-surface-variant/20 shadow-inner",
                      error ? "ring-2 ring-error/50" : "focus:ring-primary"
                    )}
                  />
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={18} />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-error font-bold uppercase tracking-widest mt-2 ml-1"
                  >
                    Invalid authorization code
                  </motion.p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-95 active:scale-95 transition-all"
              >
                Authenticate
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-surface-container-low border-r border-outline-variant/30 p-8 fixed h-screen">
        <div className="mb-12">
          <h1 className="font-serif text-2xl text-primary font-medium italic">Aura Admin</h1>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Management Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem active label="Companions" icon={<Users size={18} />} />
          <NavItem label="Overview" icon={<LayoutGrid size={18} />} />
          <NavItem label="Bookings" icon={<Calendar size={18} />} />
          <NavItem label="Finances" icon={<Wallet size={18} />} />
          <NavItem label="Settings" icon={<Settings size={18} />} bottom />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-8 md:p-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-3">
            <h2 className="font-serif text-5xl text-on-surface">Companion Directory</h2>
            <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">Curate and manage your elite companion roster.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const data = JSON.stringify(getCompanions(), null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'aura_site_data.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-surface-container-low text-on-surface-variant font-bold text-[10px] uppercase tracking-widest px-6 py-4 rounded-full flex items-center gap-2 border border-outline-variant/30 hover:bg-surface-variant/20 transition-all"
              >
                <Download size={14} /> Export Site Data
              </button>
              <div className="relative group">
                <input 
                  type="file" 
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const fileResult = event.target?.result;
                          if (typeof fileResult !== 'string') return;
                          const data = JSON.parse(fileResult);
                          if (Array.isArray(data)) {
                            saveCompanions(data);
                            setCompanions(getCompanions());
                            alert('Site data uploaded successfully!');
                          }
                        } catch (err) {
                           alert('Invalid data format. Please upload a valid JSON backup.');
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <button className="bg-surface-container-low text-on-surface-variant font-bold text-[10px] uppercase tracking-widest px-6 py-4 rounded-full flex items-center gap-2 border border-outline-variant/30 hover:group-bg-surface-variant/20 transition-all">
                  <Upload size={14} /> Upload Site Data
                </button>
              </div>
            </div>
            <button 
              onClick={() => {
                setEditingCompanion(null);
                setFormData({ name: '', location: '', price: '', featured: false, specialty: '', image: '', gallery: [], id: '', height: '', bodyType: '', breastSize: '', paymentMethods: [] });
                setIsFormOpen(true);
              }}
              className="bg-primary text-on-primary font-bold text-sm px-8 py-4 rounded-full flex items-center gap-3 soft-shadow hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={20} />
              <span>Add New Entry</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 items-start">
          <section className="bg-surface-container-low rounded-[32px] soft-shadow overflow-hidden border border-outline-variant/10">
            <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Active Roster</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-high/30">
                  <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <th className="px-8 py-5">Profile</th>
                    <th className="px-8 py-5">Specialty</th>
                    <th className="px-8 py-5">Physical Details</th>
                    <th className="px-8 py-5 text-center">Featured</th>
                    <th className="px-8 py-5">Pricing</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {companions.map((companion) => (
                    <TableRow 
                      key={companion.id}
                      companion={companion}
                      onEdit={() => handleEdit(companion)}
                      onDelete={() => handleDelete(companion.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[40px] shadow-2xl p-10 border border-outline-variant/10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-8 right-8 text-on-surface-variant hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="font-serif text-3xl text-on-surface mb-2">
                {editingCompanion ? 'Edit Profile' : 'New Entry'}
              </h3>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                {editingCompanion ? 'Update the details for this companion.' : 'Initialize a new companion profile with core metrics.'}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup 
                    label="Full Name" 
                    placeholder="e.g. Zoya Malik" 
                    value={formData.name}
                    onChange={(val) => setFormData({...formData, name: val})}
                  />
                  <InputGroup 
                    label="Specialty" 
                    placeholder="e.g. Fine Arts" 
                    value={formData.specialty}
                    onChange={(val) => setFormData({...formData, specialty: val})}
                  />
                  <InputGroup 
                    label="Location" 
                    placeholder="e.g. Lahore, Gulberg" 
                    value={formData.location}
                    onChange={(val) => setFormData({...formData, location: val})}
                  />
                  <InputGroup 
                    label="Pricing" 
                    placeholder="e.g. PKR 1,200" 
                    value={formData.price}
                    onChange={(val) => setFormData({...formData, price: val})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup 
                      label="Height (cm)" 
                      placeholder="e.g. 175" 
                      value={formData.height}
                      onChange={(val) => setFormData({...formData, height: val})}
                    />
                    <InputGroup 
                      label="Body Type" 
                      placeholder="e.g. Slender" 
                      value={formData.bodyType}
                      onChange={(val) => setFormData({...formData, bodyType: val})}
                    />
                  </div>
                  <InputGroup 
                    label="Breast Size" 
                    placeholder="e.g. 34C" 
                    value={formData.breastSize}
                    onChange={(val) => setFormData({...formData, breastSize: val})}
                  />
                  <InputGroup 
                    label="Payment Modes (comma separated)" 
                    placeholder="e.g. EasyPaisa, JazzCash, Bank Transfer" 
                    value={formData.paymentMethods?.join(', ')}
                    onChange={(val) => setFormData({...formData, paymentMethods: val.split(',').map(s => s.trim()).filter(s => s !== '')})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUpload 
                      label="Main Profile Image" 
                      value={formData.image}
                      onChange={(val) => setFormData({...formData, image: val})}
                    />
                    <InputGroup 
                      label="Main Image URL (Alternative)" 
                      placeholder="https://..." 
                      value={formData.image}
                      onChange={(val) => setFormData({...formData, image: val})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Gallery Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.gallery?.map((img, i) => (
                        <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden shadow-sm">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, gallery: formData.gallery?.filter((_, index) => index !== i)})}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <div className="relative aspect-square">
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []) as File[];
                            files.forEach(file => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({
                                  ...prev,
                                  gallery: [...(prev.gallery || []), reader.result as string]
                                }));
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full h-full bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-colors">
                          <Plus className="text-on-surface-variant group-hover:text-primary transition-colors" size={20} />
                          <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest text-center px-2">Add to Gallery</p>
                        </div>
                      </div>
                    </div>
                    <InputGroup 
                      label="Gallery URLs (Comma separated)" 
                      placeholder="https://img1.jpg, https://img2.jpg" 
                      value={formData.gallery?.join(', ')}
                      onChange={(val) => setFormData({...formData, gallery: val.split(',').map(s => s.trim()).filter(s => s !== '')})}
                    />
                  </div>
                  <InputGroup 
                    label="Profile ID" 
                    placeholder="e.g. 0824-EV" 
                    disabled={!!editingCompanion}
                    value={formData.id}
                    onChange={(val) => setFormData({...formData, id: val})}
                  />
                </div>

                <div className="flex items-center gap-4 py-2">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Featured Profile</label>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, featured: !formData.featured})}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all",
                      formData.featured ? "bg-primary" : "bg-outline-variant/30"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                      formData.featured ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary text-on-primary font-bold text-sm py-5 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                  {editingCompanion ? 'Update Profile' : 'Save Profile Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmOpen.show && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmOpen({ id: '', show: false })}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-surface-container-lowest rounded-[32px] shadow-2xl p-8 border border-outline-variant/20 text-center"
            >
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mx-auto mb-6">
                <Trash2 size={28} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-3">Delete Profile?</h3>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                This action is irreversible. All data associated with this companion will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsConfirmOpen({ id: '', show: false })}
                  className="flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant/20 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-error text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-error/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImageUpload({ label, value, onChange }: { label: string; value?: string; onChange: (val: string) => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">{label}</label>
      <div className="flex gap-4 items-center">
        {value && (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-outline-variant/20">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button" 
              onClick={() => onChange('')}
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
        <div className="relative flex-1">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-full bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-2xl px-5 py-4 flex items-center justify-center gap-3 group hover:border-primary/50 transition-colors">
            <Plus className="text-on-surface-variant group-hover:text-primary transition-colors" size={20} />
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Upload Image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, icon, active, bottom }: { label: string; icon: React.ReactNode; active?: boolean; bottom?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm cursor-pointer transition-all hover:pl-8 group",
      active ? "bg-secondary-container text-on-secondary-container shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/30",
      bottom && "mt-auto pt-8 border-t border-outline-variant/20"
    )}>
      {icon}
      {label}
    </div>
  );
}

function TableRow({ companion, onEdit, onDelete }: { companion: Companion; onEdit: () => void; onDelete: () => void; key?: string | number }) {
  return (
    <tr className="hover:bg-surface-container/50 transition-colors group">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <img src={companion.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-surface-container-highest" />
          <div>
            <p className="text-sm font-bold text-on-surface">{companion.name}</p>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">ID: {companion.id}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <span className="px-4 py-1.5 bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full">
          {companion.specialty}
        </span>
      </td>
      <td className="px-8 py-5">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-on-surface uppercase tracking-wider">{companion.bodyType || 'N/A'}</p>
          <p className="text-[10px] text-on-surface-variant font-medium">Size: {companion.breastSize || 'N/A'}</p>
          <p className="text-[10px] text-on-surface-variant font-medium">Height: {companion.height || 'N/A'}cm</p>
        </div>
      </td>
      <td className="px-8 py-5 text-center">
        <div className={cn(
          "w-12 h-6 rounded-full relative transition-all mx-auto",
          companion.featured ? "bg-primary" : "bg-outline-variant/30"
        )}>
          <div className={cn(
            "w-3.5 h-3.5 bg-white rounded-full absolute top-1.5 transition-all",
            companion.featured ? "right-1.5" : "left-1.5"
          )} />
        </div>
      </td>
      <td className="px-8 py-5 text-sm font-bold text-on-surface">
        {companion.price} <span className="text-[10px] text-on-surface-variant font-medium">/ hr</span>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button 
            onClick={onEdit}
            className="text-on-surface-variant hover:text-primary transition-all p-2 bg-surface-container-high/30 rounded-lg"
          >
            <Edit3 size={16} />
          </button>
          <button 
            onClick={onDelete}
            className="text-on-surface-variant hover:text-error transition-all p-2 bg-surface-container-high/30 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function InputGroup({ label, placeholder, type = 'text', value, onChange, disabled }: { label: string; placeholder: string; type?: string; value?: string; onChange: (val: string) => void; disabled?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type} 
        value={value || ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} 
        className={cn(
          "w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
    </div>
  );
}
