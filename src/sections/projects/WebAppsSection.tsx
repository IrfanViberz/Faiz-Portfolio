'use client';

import { useState } from 'react';
import { ExternalLink, GraduationCap, UtensilsCrossed, Flame, QrCode, Gauge, Server, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import LinkButton from '@/components/ui/LinkButton';
import { webProjects } from '@/lib/data';
import { useTranslations } from 'next-intl';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  UtensilsCrossed,
  Flame,
  QrCode,
  Gauge,
  Server,
};

export default function WebAppsSection() {
  const t = useTranslations('projects.webApps');
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? webProjects : webProjects.slice(0, 3);

  return (
    <Section title={t('title')} subtitle={t('subtitle')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="sync">
          {visibleProjects.map((project, i) => {
            const Icon = project.icon && iconMap[project.icon] ? iconMap[project.icon] : Server;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                className="group border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--bg-secondary)] flex flex-col transition-colors duration-500 hover:border-[var(--text-tertiary)]"
              >
                {/* Header banner / Image preview */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-48 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] transition-colors duration-500 relative overflow-hidden group/img"
                >
                  {project.statusTag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-mono tracking-wide border shadow-md backdrop-blur-md transition-colors ${
                          project.statusTag === 'Finished Project'
                            ? 'bg-cyan-500/90 text-black font-semibold border-cyan-300/40'
                            : 'bg-amber-500/90 text-black font-semibold border-amber-300/40'
                        }`}
                      >
                        {project.statusTag}
                      </span>
                    </div>
                  )}

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
                    {t('viewDemo')}
                  </LinkButton>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {webProjects.length > 3 && (
        <div className="mt-8 text-center relative z-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono font-medium rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>
              {showAll
                ? t('showLess')
                : t('showMore', { count: webProjects.length - 3 })}
            </span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-cyan-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>
      )}
    </Section>
  );
}
