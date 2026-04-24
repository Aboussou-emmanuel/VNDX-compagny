import { Athlete, Testimonial, TeamMember, Partner, BlogPost } from '../types';

export const mockAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Lucas Martin',
    sport: 'Football',
    position: 'Attaquant',
    age: 19,
    level: 'espoir',
    nationality: 'France',
    bio: 'Jeune attaquant prometteur avec un excellent sens du but.',
    photo_url: 'https://images.unsplash.com/photo-1611003229189-200e17780e1f?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { buts: 15, passes: 8, matchs: 22 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Emma Dubois',
    sport: 'Basketball',
    position: 'Meneuse',
    age: 21,
    level: 'semi-pro',
    nationality: 'France',
    bio: 'Meneuse créative avec une excellente vision du jeu.',
    photo_url: 'https://images.unsplash.com/photo-1552673595-00e3fd4dba1e?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { points: 180, assists: 45, matchs: 20 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Antoine Leroy',
    sport: 'Boxe',
    position: 'Poids welters',
    age: 23,
    level: 'pro',
    nationality: 'France',
    bio: 'Boxeur technique avec 15 victoires en 20 combats.',
    photo_url: 'https://images.unsplash.com/photo-1581559744214-304a1e7d2cda?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { victoires: 15, ko: 8, combats: 20 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sara Benali',
    sport: 'Karaté',
    position: 'Ceinture noire',
    age: 20,
    level: 'elite',
    nationality: 'France',
    bio: 'Multiple médaillée nationale en kumité.',
    photo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { medailles: 12, tournois: 15 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Kevin Moreau',
    sport: 'Football',
    position: 'Milieu défensif',
    age: 20,
    level: 'semi-pro',
    nationality: 'France',
    bio: 'Milieu récupérateur puissant avec excellente lecture du jeu.',
    photo_url: 'https://images.unsplash.com/photo-1570549717069-33bed2ebafec?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { tacles: 85, passes: 120, matchs: 25 },
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Léa Bernard',
    sport: 'Basketball',
    position: 'Ailière',
    age: 22,
    level: 'pro',
    nationality: 'France',
    bio: 'Scoreuse complète, excellente en transition rapide.',
    photo_url: 'https://images.unsplash.com/photo-1605731977603-0e3b38ee3e6f?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { points: 220, rebonds: 65, matchs: 18 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Hugo Lambert',
    sport: 'Boxe',
    position: 'Poids lourds légers',
    age: 24,
    level: 'elite',
    nationality: 'France',
    bio: 'KO power, 18 victoires dont 14 avant la limite.',
    photo_url: 'https://images.unsplash.com/photo-1571019613674-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { victoires: 18, ko: 14, combats: 20 },
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Nina Roux',
    sport: 'Karaté',
    position: 'Kata & Kumité',
    age: 19,
    level: 'espoir',
    nationality: 'France',
    bio: 'Championne nationale junior, vise les JO 2028.',
    photo_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    stats: { medailles_or: 3, tournois: 12 },
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    content: 'VNDX a transformé ma carrière. En 6 mois, j\'ai signé avec un club pro grâce à leur réseau et leur stratégie.',
    name: 'Lucas Martin',
    role: 'Football Pro - Ligue 2',
    avatar_url: 'https://images.unsplash.com/photo-1611003229189-200e17780e1f?w=100&auto=format&fit=crop&q=80',
    sport: 'Football',
    rating: 5,
    featured: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    content: 'Leur expertise en personal branding m\'a permis de multiplier par 10 mon audience sur Instagram.',
    name: 'Emma Dubois',
    role: 'Basketball - Élite Féminine',
    avatar_url: 'https://images.unsplash.com/photo-1552673595-00e3fd4dba1e?w=100&auto=format&fit=crop&q=80',
    sport: 'Basketball',
    rating: 5,
    featured: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    content: 'Scouts VNDX m\'ont repéré lors d\'un tournoi régional. Aujourd\'hui je suis en centre de formation.',
    name: 'Antoine Leroy',
    role: 'Boxe - Espoirs',
    avatar_url: 'https://images.unsplash.com/photo-1581559744214-304a1e7d2cda?w=100&auto=format&fit=crop&q=80',
    sport: 'Boxe',
    rating: 5,
    featured: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    content: 'Accompagnement professionnel et humain. Ils ont cru en moi quand personne ne le faisait.',
    name: 'Sara Benali',
    role: 'Karaté - Kumité',
    avatar_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=80',
    sport: 'Karaté',
    rating: 5,
    featured: true,
    active: true,
    created_at: new Date().toISOString()
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alexandre Dupont',
    role: 'Fondateur & CEO',
    bio: '15 ans d\'expérience en scouting et management d\'athlètes. Spécialiste Football.',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop&crop=face',
    linkedin: 'https://linkedin.com/in/alexdupont',
    order_index: 0,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Marie Leroy',
    role: 'Directrice Communication',
    bio: 'Expertise en personal branding et réseaux sociaux. 200+ athlètes accompagnés.',
    photo_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&fit=crop&crop=face',
    linkedin: 'https://linkedin.com/in/marieleroy',
    order_index: 1,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Thomas Garnier',
    role: 'Scout Basketball & Combat',
    bio: 'Ancien joueur pro. Réseau étendu dans Basketball, Boxe et Karaté.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&crop=face',
    linkedin: 'https://linkedin.com/in/thomasgarnier',
    order_index: 2,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sophie Martin',
    role: 'Partenariats & Sponsoring',
    bio: 'Négociatrice de contrats. 50+ partenariats brands/clubs signés.',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&fit=crop&crop=face',
    linkedin: 'https://linkedin.com/in/sophiemartin',
    order_index: 3,
    active: true,
    created_at: new Date().toISOString()
  }
];

export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'FC Olympique Lyon',
    logo_url: 'https://via.placeholder.com/120x60/004D98/FFFFFF?text=OL',
    website: 'ol.fr',
    category: 'football',
    testimonial: 'Partenaire privilégié depuis 2022. Qualité exceptionnelle des profils.',
    contact_name: 'Pierre Durand',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Paris Basketball',
    logo_url: 'https://via.placeholder.com/120x60/FF6B00/FFFFFF?text=PB',
    website: 'parisbasketball.com',
    category: 'basketball',
    testimonial: 'Talents parfaitement adaptés à notre académie.',
    contact_name: 'Julie Moreau',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Boxing Elite',
    logo_url: 'https://via.placeholder.com/120x60/DC143C/FFFFFF?text=BOXE',
    website: 'boxingelite.fr',
    category: 'boxe',
    testimonial: 'Recrutements réussis en 2024.',
    contact_name: 'Marc Lefèvre',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Karaté Federation',
    logo_url: 'https://via.placeholder.com/120x60/0000FF/FFFFFF?text=FFK',
    website: 'ffkarate.fr',
    category: 'karate',
    testimonial: 'Excellent réseau pour nos compétitions.',
    contact_name: 'Anne Dubois',
    active: true,
    created_at: new Date().toISOString()
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Comment booster votre personal branding en 2024',
    slug: 'personal-branding-2024',
    excerpt: '5 stratégies simples pour transformer votre image sur les réseaux sociaux et attirer sponsors et recruteurs.',
    content: 'Full article content here...',
    image_url: 'https://images.unsplash.com/photo-1516321310764-8a2380f891f8?w=1200&fit=crop',
    category: 'conseils',
    author: 'Alexandre Dupont',
    published: true,
    created_at: '2024-04-01T10:00:00Z',
    updated_at: '2024-04-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Le scouting à l\'ère digitale : IA vs expertise humaine',
    slug: 'scouting-ia-2024',
    excerpt: 'Analyse approfondie des nouvelles technologies et du rôle irremplaçable du scout terrain.',
    content: 'Full article content here...',
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca33e2?w=1200&fit=crop',
    category: 'actualite',
    author: 'Thomas Garnier',
    published: true,
    created_at: '2024-03-25T14:30:00Z',
    updated_at: '2024-03-25T14:30:00Z'
  },
  {
    id: '3',
    title: 'Lucas Martin signe pro à l\'OL : une success story VNDX',
    slug: 'lucas-martin-ol',
    excerpt: 'Du tournoi régional au contrat pro : retour sur le parcours fulgurant de notre talent vedette.',
    content: 'Full article content here...',
    image_url: 'https://images.unsplash.com/photo-1552673595-00e3fd4dba1e?w=1200&fit=crop',
    category: 'succes',
    author: 'Marie Leroy',
    published: true,
    created_at: '2024-03-20T09:15:00Z',
    updated_at: '2024-03-20T09:15:00Z'
  },
  {
    id: '4',
    title: 'Négociation de contrats : 7 clauses essentielles',
    slug: 'clauses-contrats-sportifs',
    excerpt: 'Ce que tout athlète doit savoir avant de signer son premier contrat professionnel.',
    content: 'Full article content here...',
    image_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&fit=crop',
    category: 'conseils',
    author: 'Sophie Martin',
    published: true,
    created_at: '2024-03-10T16:45:00Z',
    updated_at: '2024-03-10T16:45:00Z'
  }
];

