'use client';

import { ExternalLink, GraduationCap, UtensilsCrossed, Flame, QrCode, Gauge, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import LinkButton from '@/components/ui/LinkButton';
import { webProjects } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  UtensilsCrossed,
  Flame,
  QrCode,
  Gauge,
  Server,
};

export default function WebAppsSection() {
  return (
    <Section title="01. Side Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {webProjects.map((project, i) => {
          const Icon = project.icon && iconMap[project.icon] ? iconMap[project.icon] : Server;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="group border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--bg-secondary)] flex flex-col transition-colors duration-500 hover:border-[var(--text-tertiary)]"
            >
              {/* Header banner / Image preview */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-48 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] transition-colors duration-500 relative overflow-hidden"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full p-4 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-2 mx-auto transition-colors duration-500">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    {project.subtitle && (
                      <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider transition-colors duration-500 line-clamp-1">
                        {project.subtitle}
                      </span>
                    )}
                  </div>
                )}
              </a>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5 flex-grow transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <LinkButton href={project.link} icon={ExternalLink} variant="accent">
                  View Project Demo
                </LinkButton>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
