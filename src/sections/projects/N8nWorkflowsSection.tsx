'use client';

import { useState } from 'react';
import { Download, Code, X, Check, Copy, Workflow, Cpu, Clock, Layers, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { n8nWorkflows } from '@/lib/data';
import { useTranslations } from 'next-intl';

export default function N8nWorkflowsSection() {
  const t = useTranslations('projects.n8n');
  const [activeJson, setActiveJson] = useState<{ title: string; content: string } | null>(null);
  const [activeImage, setActiveImage] = useState<{ title: string; src: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleWorkflows = showAll ? n8nWorkflows : n8nWorkflows.slice(0, 1);

  const handleViewJson = async (jsonPath: string, title: string) => {
    setLoading(true);
    try {
      const res = await fetch(jsonPath);
      const data = await res.json();
      setActiveJson({
        title,
        content: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      console.error('Failed to load workflow JSON:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!activeJson) return;
    navigator.clipboard.writeText(activeJson.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <div className="grid grid-cols-1 gap-8 relative z-10">
        <AnimatePresence mode="sync">
          {visibleWorkflows.map((workflow, i) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
              className="group border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--bg-secondary)] flex flex-col md:flex-row transition-colors duration-500 hover:border-[var(--text-tertiary)]"
            >
              {/* Screenshot Preview with Click to Enlarge */}
              <div className="md:w-1/2 bg-[var(--bg-tertiary)] border-b md:border-b-0 md:border-r border-[var(--border-color)] p-4 flex flex-col items-center justify-center relative min-h-[260px]">
                {workflow.image ? (
                  <div
                    onClick={() => setActiveImage({ title: workflow.title, src: workflow.image! })}
                    className="relative w-full h-full group/img cursor-pointer overflow-hidden rounded border border-[var(--border-color)] shadow-sm flex items-center justify-center"
                  >
                    <img
                      src={workflow.image}
                      alt={workflow.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />

                    {/* Hover Full Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white text-xs font-medium">
                      <div className="p-2.5 rounded-full bg-black/70 border border-white/20 shadow-lg">
                        <Maximize2 className="w-5 h-5 text-amber-400" />
                      </div>
                      <span>{t('clickToView')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Workflow className="w-12 h-12 text-[var(--accent)] mb-3" />
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      n8n Visual Canvas Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Workflow Details */}
              <div className="p-6 md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--text-tertiary)]">
                    <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{workflow.subtitle}</span>
                  </div>

                  <h3 className="text-xl font-medium text-[var(--text-primary)] mb-3 leading-snug">
                    {workflow.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {workflow.description}
                  </p>

                  {/* Schedule & Nodes */}
                  <div className="space-y-2 mb-5 text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] p-3 rounded border border-[var(--border-color)]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
                      <span><strong className="text-[var(--text-primary)]">{t('trigger')}:</strong> {workflow.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
                      <span>
                        <strong className="text-[var(--text-primary)]">{t('coreNodes')}:</strong> {workflow.nodesUsed.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mb-6">
                    {workflow.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <a
                    href={workflow.jsonPath}
                    download={`${workflow.id}.json`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-colors duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t('downloadJson')}
                  </a>

                  <button
                    onClick={() => handleViewJson(workflow.jsonPath, workflow.title)}
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-90 transition-opacity duration-300"
                  >
                    <Code className="w-3.5 h-3.5" />
                    {t('viewJson')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Toggle Button */}
      {n8nWorkflows.length > 1 && (
        <div className="mt-8 text-center relative z-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono font-medium rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>
              {showAll
                ? t('showLess')
                : t('showMore', { count: n8nWorkflows.length - 1 })}
            </span>
            {showAll ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Lightbox Header */}
              <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-tertiary)]">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[var(--accent)]" />
                  <h4 className="text-sm font-medium text-[var(--text-primary)] truncate max-w-xl">
                    {activeImage.title} - Canvas Diagram
                  </h4>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-black/40">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  className="max-w-full max-h-[78vh] object-contain rounded border border-[var(--border-color)] shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* JSON Viewer Modal */}
      <AnimatePresence>
        {activeJson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-tertiary)]">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[var(--accent)]" />
                  <h4 className="text-sm font-medium text-[var(--text-primary)] truncate max-w-md">
                    {activeJson.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('copied') : t('copyCode')}</span>
                  </button>
                  <button
                    onClick={() => setActiveJson(null)}
                    className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Code Body */}
              <div className="p-5 overflow-auto flex-1 bg-[var(--bg-primary)]">
                <pre className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed whitespace-pre">
                  {activeJson.content}
                </pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
