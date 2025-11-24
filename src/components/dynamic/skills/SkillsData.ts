import {
  Code2,
  Globe,
  Server,
  Layout,
  Palette,
  Terminal,
  GitBranch,
  PenTool,
  Layers,
  Smartphone,
  Cpu,
  Wifi,
  Wrench,
  Monitor,
  Command,
  HardDrive,
  Shield,
  Database,
  FileSpreadsheet,
  BarChart3,
  PieChart,
  Filter,
  Code
} from 'lucide-react';
import { SkillItem } from './SkillsTypes';

export const SKILLS_DATA: SkillItem[] = [
  // Development
  { name: 'React.js', category: 'Development', icon: Code2 },
  { name: 'Next.js', category: 'Development', icon: Globe },
  { name: 'TypeScript', category: 'Development', icon: Code2 },
  { name: 'Node.js', category: 'Development', icon: Server },
  { name: 'JavaScript', category: 'Development', icon: Code2 },
  { name: 'HTML5', category: 'Development', icon: Layout },
  { name: 'CSS3', category: 'Development', icon: Palette },
  { name: 'Tailwind CSS', category: 'Development', icon: Palette },
  { name: 'Python', category: 'Development', icon: Terminal },
  { name: 'Git Version Control', category: 'Development', icon: GitBranch },
  
  // Design
  { name: 'Figma', category: 'Design', icon: PenTool },
  { name: 'Adobe Photoshop', category: 'Design', icon: Palette },
  { name: 'Adobe Illustrator', category: 'Design', icon: PenTool },
  { name: 'UI/UX Principles', category: 'Design', icon: Layout },
  { name: 'Canva', category: 'Design', icon: Layers },
  { name: 'Prototyping', category: 'Design', icon: Smartphone },
  
  // IT Support
  { name: 'Hardware Repair', category: 'IT Support', icon: Cpu },
  { name: 'Network Config', category: 'IT Support', icon: Wifi },
  { name: 'Troubleshooting', category: 'IT Support', icon: Wrench },
  { name: 'System Admin', category: 'IT Support', icon: Monitor },
  { name: 'Windows OS', category: 'IT Support', icon: Command },
  { name: 'Data Backup', category: 'IT Support', icon: HardDrive },
  { name: 'Cyber Security', category: 'IT Support', icon: Shield },
  
  // Data Analysis
  { name: 'SQL', category: 'Data Analysis', icon: Database },
  { name: 'Microsoft Excel', category: 'Data Analysis', icon: FileSpreadsheet },
  { name: 'Power BI', category: 'Data Analysis', icon: BarChart3 },
  { name: 'Tableau', category: 'Data Analysis', icon: PieChart },
  { name: 'Data Cleaning', category: 'Data Analysis', icon: Filter },
  { name: 'Report Generation', category: 'Data Analysis', icon: FileSpreadsheet },
  
  // Tools
  { name: 'VS Code', category: 'Tools', icon: Code },
  { name: 'Jira / Trello', category: 'Tools', icon: Layers },
  { name: 'Slack', category: 'Tools', icon: Globe },
  { name: 'Office 365', category: 'Tools', icon: FileSpreadsheet },
  { name: 'Postman', category: 'Tools', icon: Globe },
  { name: 'Command Line', category: 'Tools', icon: Terminal },
];
