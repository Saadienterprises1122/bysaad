export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  image: string;
  result: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface CaseStudiesProps {
  className?: string;
}

export type SharePlatform = 'twitter' | 'linkedin' | 'facebook';
