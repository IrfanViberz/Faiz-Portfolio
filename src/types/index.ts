export type Theme = 'dark' | 'light';

export interface ProjectExperience {
  title: string;
  role: string;
  description: string;
  impact: string;
  tags: string[];
}

export interface ExperienceItem {
  period: string;
  company: string;
  projects: ProjectExperience[];
}

export interface StackItem {
  iconName: 'Terminal' | 'Smartphone' | 'Database' | 'Activity';
  title: string;
  text: string;
}

export interface ValueItem {
  title: string;
  desc: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link: string;
  subtitle?: string;
  icon?: string;
  image?: string;
}

export interface N8nWorkflowItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  schedule: string;
  nodesUsed: string[];
  tags: string[];
  image?: string;
  jsonPath: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
