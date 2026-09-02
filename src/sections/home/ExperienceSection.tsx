'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  Award,
  FileCheck,
  Maximize2,
  X,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { useTranslations } from 'next-intl';
import { experienceItems } from '@/lib/data';
import type { ExperienceItem } from '@/types';

interface LightboxState {
  url: string;
  title: string;
  caption?: string;
}

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const [lightboxImage, setLightboxImage] = useState<LightboxState | null>(null);
  const translatedItems = t.raw('items') as ExperienceItem[] | undefined;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  return (
    <Section id="experience" title={t('title')}>
      <div className="space-y-10">
        {experienceItems.map((item, i) => {
          const transCompany = translatedItems?.[i]?.company || item.company;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="p-6 sm:p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--text-tertiary)] shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Timeline & Company Header */}
                <div className="md:col-span-4 pt-1 border-b md:border-b-0 md:border-r border-[var(--border-color)] pb-4 md:pb-0 md:pr-6">
                  <div className="inline-block px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)] mb-2 transition-colors duration-500">
                    {item.period}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] transition-colors duration-500 mt-1 leading-snug">
                    {transCompany}
                  </h3>

                  {item.referenceContact && (
                    <p className="text-xs font-mono text-amber-400 mt-3 transition-colors duration-500 font-normal">
                      *{t('referenceAvailable')}*
                    </p>
                  )}
                </div>

                {/* Projects List */}
                <div className="md:col-span-8 space-y-10">
                  {item.projects.map((proj, pIdx) => {
                    const transProj = translatedItems?.[i]?.projects?.[pIdx];
                    const displayTitle = transProj?.title || proj.title;
                    const displayRole = transProj?.role || proj.role;
                    const displayDesc = transProj?.description || proj.description;

                    return (
                      <div
                        key={pIdx}
                        className={pIdx > 0 ? 'pt-8 border-t border-[var(--border-color)]' : ''}
                      >
                        <div className="mb-3">
                          <h4 className="text-lg font-semibold text-[var(--text-primary)] transition-colors duration-500">
                            {displayTitle}
                          </h4>
                          <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-1 transition-colors duration-500">
                            {displayRole}
                          </p>
                        </div>

                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-5 transition-colors duration-500">
                          {displayDesc}
                        </p>

                        {/* Multi-Image Project Showcase (e.g., Figma Design & Production App) */}
                        {proj.images && proj.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {proj.images.map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-tertiary)] shadow-sm"
                              >
                                {/* Card Header with Expand Button */}
                                <div className="p-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between">
                                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                                    {img.label}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setLightboxImage({
                                        url: img.url,
                                        title: img.label,
                                        caption: img.caption,
                                      })
                                    }
                                    aria-label="Expand image"
                                    title="Expand image"
                                    className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-all duration-200 cursor-pointer"
                                  >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {/* Image Container with Full Height & Width Visibility */}
                                <div
                                  onClick={() =>
                                    setLightboxImage({
                                      url: img.url,
                                      title: img.label,
                                      caption: img.caption,
                                    })
                                  }
                                  className="relative w-full h-80 sm:h-96 p-2 bg-black/40 cursor-pointer overflow-hidden flex items-center justify-center group"
                                >
                                  <Image
                                    src={img.url}
                                    alt={img.label}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                  />
                                  {/* Hover Hint Overlay */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <div className="px-3 py-1.5 rounded-full bg-black/80 border border-[var(--border-color)] text-white text-xs font-mono flex items-center gap-1.5 shadow-lg">
                                      <Maximize2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                                      <span>Click to expand</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Caption */}
                                {img.caption && (
                                  <p className="p-3 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/60">
                                    {img.caption}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Single Project Showcase Image */}
                        {!proj.images && proj.image && (
                          <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-[var(--border-color)] mb-5 group bg-[var(--bg-tertiary)]">
                            <div
                              onClick={() =>
                                setLightboxImage({
                                  url: proj.image!,
                                  title: proj.title,
                                  caption: proj.role,
                                })
                              }
                              className="w-full h-full cursor-pointer relative"
                            >
                              <Image
                                src={proj.image}
                                alt={proj.title}
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 700px"
                              />
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-2 rounded bg-black/80 border border-[var(--border-color)] text-white text-xs font-mono flex items-center">
                                  <Maximize2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Business Impact callout (Only rendered if impact exists) */}
                        {proj.impact && (
                          <div className="p-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg mb-5 border-l-4 border-l-amber-500">
                            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block mb-1 transition-colors duration-500">
                              {t('impact')}:
                            </span>
                            <span className="text-sm text-[var(--text-secondary)] transition-colors duration-500">
                              {proj.impact}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-5">
                          {proj.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>

                        {/* Prominent PDF Docs Container (FYP Certificate / Paper) */}
                        {proj.docs && proj.docs.length > 0 && (
                          <div className="mt-6 pt-5 border-t border-[var(--border-color)]">
                            <div className="flex items-center gap-2 mb-3">
                              <FileCheck className="w-4 h-4 text-[var(--text-primary)]" />
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                                {t('docs')}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {proj.docs.map((doc, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] shadow-sm flex flex-col justify-between hover:border-[var(--text-tertiary)] transition-all duration-300 group"
                                >
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-7 h-7 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] shadow-xs">
                                        {dIdx === 0 ? (
                                          <Award className="w-3.5 h-3.5" />
                                        ) : (
                                          <FileText className="w-3.5 h-3.5" />
                                        )}
                                      </div>
                                      <h5 className="text-sm font-semibold text-[var(--text-primary)]">
                                        {doc.label}
                                      </h5>
                                    </div>
                                    {doc.description && (
                                      <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                                        {doc.description}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-color)]">
                                    <a
                                      href={doc.viewUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-all duration-200"
                                    >
                                      <ExternalLink className="w-3 h-3 shrink-0" />
                                      {t('viewDoc')}
                                    </a>
                                    <a
                                      href={doc.viewUrl}
                                      download={doc.downloadName}
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-85 shadow-sm transition-all duration-200"
                                    >
                                      <Download className="w-3 h-3 shrink-0" />
                                      {t('downloadDoc')}
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Site Link (Internship project) */}
                        {proj.siteLink && (
                          <div className="mt-4">
                            <a
                              href={proj.siteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-tertiary)] transition-all duration-300"
                            >
                              <ExternalLink className="w-4 h-4 shrink-0 text-[var(--text-secondary)]" />
                              {t('viewSite')}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-tertiary)]">
                <div>
                  <h4 className="text-base font-semibold text-[var(--text-primary)]">
                    {lightboxImage.title}
                  </h4>
                  {lightboxImage.caption && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {lightboxImage.caption}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-primary)] border border-[var(--border-color)] transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body with Full Size Image */}
              <div className="relative w-full h-[65vh] sm:h-[75vh] bg-black/90 p-4 flex items-center justify-center">
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
