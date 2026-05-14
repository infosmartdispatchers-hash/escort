import { Companion } from '../types';

const STORAGE_KEY = 'aura_companions';

const DEFAULT_COMPANIONS: Companion[] = [
  { 
    id: '0824-ZM', 
    name: 'Zoya Malik', 
    location: 'Lahore, Gulberg', 
    price: 'PKR 15,000', 
    featured: true, 
    specialty: 'Philanthropy',
    bodyType: 'Slender',
    breastSize: '34B',
    paymentMethods: ['Online Transfer', 'EasyPaisa', 'Cash'],
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1972&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582531393641-fc176597793d?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  { 
    id: '1102-AH', 
    name: 'Aizah Hussain', 
    location: 'Islamabad, F-7', 
    price: 'PKR 12,500', 
    featured: false, 
    specialty: 'Arts & Culture',
    bodyType: 'Athletic',
    breastSize: 'N/A',
    paymentMethods: ['Online Transfer', 'JazzCash'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2080&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529139570274-7f84c8d2c5e9?q=80&w=1974&auto=format&fit=crop'
    ]
  },
  { 
    id: '0519-SK', 
    name: 'Saira Khan', 
    location: 'Karachi, DHA', 
    price: 'PKR 18,000', 
    featured: true, 
    specialty: 'Linguistics',
    bodyType: 'Curvy',
    breastSize: '32D',
    paymentMethods: ['Online Transfer', 'Bank Wire'],
    image: 'https://images.unsplash.com/photo-1588516999521-4303007dca71?q=80&w=2040&auto=format&fit=crop',
    gallery: []
  }
];

export const getCompanions = (): Companion[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPANIONS));
    return DEFAULT_COMPANIONS;
  }
  return JSON.parse(stored);
};

export const saveCompanions = (companions: Companion[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companions));
};

export const addCompanion = (companion: Companion): void => {
  const current = getCompanions();
  saveCompanions([...current, companion]);
};

export const updateCompanion = (companion: Companion): void => {
  const current = getCompanions();
  saveCompanions(current.map(c => c.id === companion.id ? companion : c));
};

export const deleteCompanion = (id: string): void => {
  const current = getCompanions();
  saveCompanions(current.filter(c => c.id !== id));
};
