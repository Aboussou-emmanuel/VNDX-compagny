export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position: string;
  age: number;
  level: string;
  nationality: string;
  bio: string;
  photo_url: string;
  video_url: string;
  stats: Record<string, string | number>;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  full_name: string;
  age: number;
  sport: string;
  level: string;
  position: string;
  nationality: string;
  video_url: string;
  bio: string;
  email: string;
  phone: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website: string;
  category: string;
  testimonial: string;
  contact_name: string;
  active: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin: string;
  order_index: number;
  active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string;
  sport: string;
  rating: number;
  featured: boolean;
  active: boolean;
  created_at: string;
}

export const SPORTS = ['Football', 'Basketball', 'Boxe', 'Karaté'] as const;
export const LEVELS = ['amateur', 'espoir', 'semi-pro', 'pro', 'elite'] as const;
export type Sport = typeof SPORTS[number];
export type Level = typeof LEVELS[number];

export const LEVEL_LABELS: Record<string, string> = {
  amateur: 'Amateur',
  espoir: 'Espoir',
  'semi-pro': 'Semi-Professionnel',
  pro: 'Professionnel',
  elite: 'Elite',
};
