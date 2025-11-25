import { 
  Code2, 
  Database, 
  Palette, 
  Image,
  FileSearch,
  Users,
  FileText,
  TestTube,
  Webhook,
  type LucideIcon
} from 'lucide-react';

export interface ToolItem {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  placeholder: string;
}

export const AI_LAB_TOOLS: ToolItem[] = [
  { 
    id: 'code-refactor', 
    label: 'Code Optimizer', 
    icon: Code2, 
    desc: 'Clean, refactor, and optimize code.',
    placeholder: 'Paste your code here (JS, Python, etc.)...' 
  },
  { 
    id: 'image-generator', 
    label: 'AI Image Gen', 
    icon: Image, 
    desc: 'Generate images from text prompts.',
    placeholder: 'A futuristic city with neon lights, cyberpunk style...' 
  },
  { 
    id: 'resume-analyzer', 
    label: 'Resume Review', 
    icon: FileSearch, 
    desc: 'Analyze resume for keywords & format.',
    placeholder: 'Paste resume text here...' 
  },
  { 
    id: 'user-persona', 
    label: 'Persona Gen', 
    icon: Users, 
    desc: 'Create user personas from product info.',
    placeholder: 'Describe your product (e.g. A fitness app for busy moms)...' 
  },
  { 
    id: 'readme-generator', 
    label: 'Readme Gen', 
    icon: FileText, 
    desc: 'Generate GitHub README.md structure.',
    placeholder: 'Describe your project features and tech stack...' 
  },
  { 
    id: 'unit-test-writer', 
    label: 'Unit Tester', 
    icon: TestTube, 
    desc: 'Generate Jest/PyTest unit tests.',
    placeholder: 'Paste your function code here...' 
  },
  { 
    id: 'api-ideas', 
    label: 'API Integrations', 
    icon: Webhook, 
    desc: 'Suggest API integrations & workflows.',
    placeholder: 'Describe your application (e.g. An e-commerce store for handmade goods)...' 
  },
  { 
    id: 'sql-query', 
    label: 'Smart SQL', 
    icon: Database, 
    desc: 'Natural language to SQL queries.',
    placeholder: 'e.g., "Find users who signed up last month"' 
  },
  { 
    id: 'color-palette', 
    label: 'Palette Gen', 
    icon: Palette, 
    desc: 'Generate brand color schemes.',
    placeholder: 'e.g., "Cyberpunk neon city vibe"' 
  }
];
