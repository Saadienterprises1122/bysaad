import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  subServices: string[];
  tools: string[];
}

export interface ServiceProps {}
