import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronDown, ChevronUp, ExternalLink, Github, Figma, Play, Layers } from 'lucide-react';
import { Project, ProjectLink } from '../types';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (project) {
      const initialOpen: Record<string, boolean> = {};
      project.sections.forEach((sec, idx) => {
        initialOpen[sec.id] = idx < 3;
      });
      setExpandedSections(initialOpen);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    project.sections.forEach((sec) => {
      allOpen[sec.id] = true;
    });
    setExpandedSections(allOpen);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const getLinkIcon = (type?: ProjectLink['type']) => {
    switch (type) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'prototype':
      case 'figma':
        return <Figma className="w-3.5 h-3.5" />;
      case 'demo':
        return <Play className="w-3.5 h-3.5" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5" />;
    }
  };

  return (
    <AnimatePresence>
      <div id="project-drawer-root" className="fixed inset-0 z-50 flex justify-end">
        {/* Dark translucent backdrop - keeps Work page visible underneath */}
        <motion.div
          id="project-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-[3px] cursor-pointer"
          aria-label="Close project panel backdrop"
        />

        {/* Right-side Sliding Drawer: near-black (#0E0E11), 1px gold/subtle border, ~50% width on desktop */}
        <motion.aside
          id="project-drawer-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-50 w-full md:w-[54%] lg:w-[50%] xl:w-[48%] h-full bg-[#0E0E11] text-[#EDE9E1] border-l border-[#ceb573]/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-project-title"
        >
          {/* Top Bar: Project Meta & Close Button */}
          <div className="sticky top-0 z-20 bg-[#0E0E11]/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#736F68]">
              <span className="font-semibold text-[#ceb573]">Case Study {project.number}</span>
              <span>•</span>
              <span>{project.status}</span>
            </div>

            <button
              id="project-drawer-close-btn"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#A39E93] hover:text-[#F5F3EF] hover:bg-white/[0.06] border border-white/[0.08] transition-colors duration-200 cursor-pointer"
              aria-label="Close project panel"
            >
              <span className="hidden sm:inline font-mono">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Case Study Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8">
            {/* Title & Tagline */}
            <div>
              <h2
                id="drawer-project-title"
                className="font-serif-editorial text-3xl sm:text-4xl text-[#F5F3EF] font-normal tracking-tight mb-2"
              >
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#A39E93] font-sans-editorial">
                {project.tagline}
              </p>
            </div>

            {/* Meta Grid: Role, Timeline, Status */}
            <div className="p-4 rounded-[16px] bg-[#141418] border border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans-editorial shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
              <div>
                <span className="block text-[#736F68] uppercase font-mono tracking-wider text-[11px] mb-1">
                  My Role
                </span>
                <span className="font-medium text-[#EDE9E1]">{project.role}</span>
              </div>
              <div>
                <span className="block text-[#736F68] uppercase font-mono tracking-wider text-[11px] mb-1">
                  Timeline
                </span>
                <span className="font-medium text-[#EDE9E1]">{project.timeline}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[#736F68] uppercase font-mono tracking-wider text-[11px] mb-1">
                  Methodology
                </span>
                <span className="font-medium text-[#ceb573]">{project.status}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="border-l border-[#ceb573]/50 pl-4 py-1 text-sm sm:text-base text-[#B3ADA3] leading-relaxed font-sans-editorial">
              {project.summary}
            </div>

            {/* Project Artifacts & Links */}
            {project.links && project.links.length > 0 && (
              <div className="pt-2">
                <span className="block text-xs uppercase font-mono tracking-[0.15em] text-[#ceb573] mb-3">
                  Project Artifacts & Links
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#EDE9E1] bg-[#16161B] border border-white/[0.08] hover:border-[#ceb573]/50 hover:text-[#ceb573] transition-all duration-200"
                    >
                      {getLinkIcon(link.type)}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Case Study Sections Header & Expand All Toggle */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono tracking-wider uppercase text-[#ceb573] font-medium flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Product Case Study Breakdown
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-[#736F68] hover:text-[#ceb573] transition-colors duration-200 cursor-pointer"
                >
                  Expand all
                </button>
                <span className="text-[#3A3834]">|</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-[#736F68] hover:text-[#ceb573] transition-colors duration-200 cursor-pointer"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {/* The 9 Expandable Case Study Sections */}
            <div className="space-y-3 pb-8" id="case-study-sections-container">
              {project.sections.map((section, index) => {
                const isOpen = !!expandedSections[section.id];
                return (
                  <div
                    key={section.id}
                    id={`section-${section.id}`}
                    className="border border-white/[0.06] rounded-[16px] overflow-hidden bg-[#121216] transition-colors hover:border-white/[0.12]"
                  >
                    {/* Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-[#141418] hover:bg-[#18181E] transition-colors duration-200 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#ceb573] font-medium w-5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans-editorial font-medium text-sm text-[#F5F3EF] tracking-tight">
                          {section.title}
                        </span>
                      </div>
                      <div className="text-[#736F68]">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#ceb573]" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Section Body */}
                    {isOpen && (
                      <div className="px-5 py-4 border-t border-white/[0.05] bg-[#101014] text-sm space-y-3 animate-in fade-in duration-200">
                        {/* Content */}
                        <div className="text-[#A39E93] leading-relaxed whitespace-pre-line font-sans-editorial">
                          {section.content}
                        </div>

                        {/* Guiding Question Prompt */}
                        {section.guidingQuestions && (
                          <div className="p-3 rounded-lg bg-[#16161B] border border-white/[0.06] text-xs text-[#8C867D]">
                            <span className="font-mono uppercase font-semibold text-[10px] text-[#ceb573] block mb-1">
                              Guiding PM Questions:
                            </span>
                            <p className="italic text-[#8C867D]">
                              {section.guidingQuestions}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer with Quick Close */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0E0E11] flex items-center justify-between text-xs text-[#736F68] font-mono">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#1A1A20] text-[#A39E93] text-[10px]">Esc</kbd> to dismiss</span>
            <button
              onClick={onClose}
              className="text-[#ceb573] hover:underline cursor-pointer"
            >
              Back to Projects
            </button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
