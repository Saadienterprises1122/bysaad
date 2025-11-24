import { Code, Palette, BarChart3 } from 'lucide-react';
import { ServiceItem } from './ServiceTypes';

export const SERVICES: ServiceItem[] = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building modern, responsive, and performant web applications using the latest technologies and best practices.',
    subServices: [
      'Custom Website Development',
      'Single Page Applications (SPA)',
      'Progressive Web Apps (PWA)',
      'Frontend Development with React',
      'Responsive UI/UX Implementation',
      'API Integration & Backend Connection'
    ],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Git', 'REST APIs']
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creating visually stunning designs that communicate your brand message effectively and leave a lasting impression.',
    subServices: [
      'Logo Design & Branding',
      'Social Media Graphics',
      'Marketing Materials (Flyers, Brochures)',
      'Business Card Design',
      'Poster & Banner Design',
      'Digital Illustrations'
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva', 'CorelDRAW']
  },
  {
    icon: BarChart3,
    title: 'Data Analysis',
    description: 'Transforming raw data into actionable insights through advanced analytics, visualization, and reporting.',
    subServices: [
      'Data Cleaning & Preparation',
      'Statistical Analysis',
      'Business Intelligence Dashboards',
      'Data Visualization',
      'Trend Analysis & Forecasting',
      'Custom Reports & Insights'
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'SQL', 'Power BI', 'Excel', 'Tableau']
  }
];
