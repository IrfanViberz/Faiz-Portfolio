import ProjectsHeader from '@/sections/projects/ProjectsHeader';
import WebAppsSection from '@/sections/projects/WebAppsSection';
import N8nWorkflowsSection from '@/sections/projects/N8nWorkflowsSection';
import AIUGCSection from '@/sections/projects/AIUGCSection';
import HardwareSection from '@/sections/projects/HardwareSection';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      <WebAppsSection />
      <N8nWorkflowsSection />
      <AIUGCSection />
      <HardwareSection />
    </div>
  );
}
