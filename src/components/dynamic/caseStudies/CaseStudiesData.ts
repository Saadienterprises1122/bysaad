import { CaseStudy } from './CaseStudiesTypes';
import { FitnessBoltHero, FitnessBoltDesktop, FitnessBoltSchedule } from '@/assets';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    client: 'Personal Portfolio V1',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    result: 'React & Tailwind',
    description: 'A personal portfolio website showcasing my skills and projects with modern UI/UX principles.',
    challenge:
      'To create a high-performance, visually engaging portfolio that effectively communicates diverse technical skills while maintaining a clean, modern aesthetic.',
    solution:
      'Developed a single-page application using React.js and Framer Motion for seamless transitions. Implemented a custom dark mode design system with Tailwind CSS.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    year: '2024',
    liveUrl: 'https://bysaad.com',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2426&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2426&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2426&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2426&auto=format&fit=crop'
    ],
  },
  {
    id: '2',
    client: 'Fitness Bolt – Gym Landing Page',
    category: 'Web Development',
    image: FitnessBoltHero,
    result: 'React & Tailwind',
    description:
      'A fully responsive, high-conversion gym landing page built to showcase fitness programs, training services, and an innovative AI-powered personal coach experience.',
    challenge:
      'To design and develop a modern, energetic gym website that not only highlights services and transformations but also integrates an intelligent AI fitness coach while maintaining seamless performance across all devices.',
    solution:
      'Built a feature-rich landing page using React.js and Tailwind CSS with a bold hero section, dynamic class listings, transformation gallery, testimonials, and a streamlined contact form. Added an embedded AI Fitness Coach built with conversational flow logic, offering users personalized workout guidance in real time. Ensured full mobile responsiveness, fast load performance, and engaging UI animations.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'AI API Integration'
    ],
    year: '2025',
    liveUrl: 'https://fitnesebolt.netlify.app/',
    gallery: [
      FitnessBoltHero,
      FitnessBoltDesktop,
      FitnessBoltSchedule,
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop'
    ],
  },
  {
    id: '3',
    client: 'Corporate Identity',
    category: 'Graphics Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?q=80&w=2670&auto=format&fit=crop',
    result: 'Brand Design',
    description: 'Designed a complete brand identity package including logo, business cards, and social media assets.',
    challenge:
      'A new corporate entity needed a distinct visual identity that conveyed trust and innovation, differentiating them from traditional competitors.',
    solution:
      'Conducted market research to establish color psychology. Designed a minimalist logo and comprehensive brand guidelines covering typography, color palette, and usage rules.',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Strategy'],
    year: '2023',
  },
];
