import type { Metadata } from 'next';
import ProjectsHeader from '@/sections/projects/ProjectsHeader';
import WebAppsSection from '@/sections/projects/WebAppsSection';
import AIUGCSection from '@/sections/projects/AIUGCSection';
import HardwareSection from '@/sections/projects/HardwareSection';

export const metadata: Metadata = {
  title: 'The Laboratory — Faiz Irfan',
  description:
    'Side projects showcasing web development, AI automation pipelines, hardware arbitrage, and paid acquisition marketing.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      <WebAppsSection />
      <AIUGCSection />
      <HardwareSection />
    </div>
  );
}
