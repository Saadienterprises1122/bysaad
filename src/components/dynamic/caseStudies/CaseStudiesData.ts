import { CaseStudy } from './CaseStudiesTypes';

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
    client: 'Business Data Dashboard',
    category: 'Data Analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    result: 'Python & SQL',
    description: 'Analyzed sales data to identify key trends, resulting in a 15% improvement in inventory management.',
    challenge:
      'The client struggled with fragmented sales data across multiple spreadsheets, making it difficult to track inventory turnover and identify best-selling products in real-time.',
    solution:
      'Built a centralized data pipeline using Python to clean and merge datasets. Created an interactive Power BI dashboard connected to a SQL database for real-time insights.',
    technologies: ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel'],
    year: '2023',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2670&auto=format&fit=crop'
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
