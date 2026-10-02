import { ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export interface NavItem {
  label: { en: string; ar: string };
  path: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: ReactNode;
  tooltip?: string;
}

export interface Testimonial {
  id: number | string;
  quote: string;
  author: string;
  role: string;
  image?: string;
}

// Interface for the Programs Listing Page
export interface ProgramSummary {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  cat: 'Sports' | 'Social' | 'Rehab';
  intensity: { en: string; ar: string };
  schedule: { en: string; ar: string };
  img: string;
}

// Interface for the Program Details Page
export interface ProgramDetail {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  equipment: { en: string; ar: string };
  instructor: { en: string; ar: string };
  schedule: { en: string; ar: string };
  location: { en: string; ar: string };
  image: string;
}

export interface EventItem {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'competition' | 'workshop' | 'community';
  image: string;
}

// --- Form Data Interfaces ---

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  message: string;
}

export interface MembershipFormData {
  name: string;
  dob: string;
  gender: string;
  guardian: string;
  phone: string;
  email: string;
  address: string;
  disabilityType: string;
  assistiveDevices: string;
  message: string;
}

export interface SponsorshipFormData {
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  interests: string[];
  message: string;
}