import { LucideIcon } from 'lucide-react';

export interface ContentTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ValidationErrors {
  topic?: string;
  industry?: string;
}

export interface AiStrategyProps {}
