export type Theme = 'dark' | 'light';

export interface ProjectExperience {
  title: string;
  role: string;
  description: string;
  impact?: string;
  tags: string[];
  image?: string;
  images?: { url: string; label: string; caption?: string }[];
  docs?: { label: string; viewUrl: string; downloadName: string; description?: string }[];
  siteLink?: string;
}

export interface ExperienceItem {
  period: string;
  company: string;
  referenceContact?: boolean;
  projects: ProjectExperience[];
}

export interface StackItem {
  iconName: 'Terminal' | 'Smartphone' | 'Database' | 'Activity' | 'Code' | 'Layout' | 'Layers';
  title: string;
  tagline?: string;
  skills?: string[];
  text?: string;
  accent?: string;
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
  statusTag?: 'Project Demo' | 'Finished Project' | string;
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
