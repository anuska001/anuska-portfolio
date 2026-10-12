import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronDown, ChevronUp, ExternalLink, Github, Figma, Play, Layers, FileText } from 'lucide-react';
import { Project, ProjectLink } from '../types';
import { PdfViewer } from './PdfViewer';
import { GoogleDriveEmbed } from './GoogleDriveEmbed';
import { getDirectOpenUrl } from '../utils/googleDrive';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activePresentationMode, setActivePresentationMode] = useState<'drive' | 'pdf'>('drive');

  useEffect(() => {
    if (project) {
      const initialOpen: Record<string, boolean> = {};
      project.sections.forEach((sec, idx) => {
        initialOpen[sec.id] = idx < 3;
      });
      setExpandedSections(initialOpen);

      const hasDriveLink = Boolean(project.driveUrl && project.driveUrl.trim() !== '');
      const hasPdfFile = Boolean(project.pdfUrl && project.pdfUrl.trim() !== '');

      // Default presentation mode: prioritize driveUrl if set, or explicit defaultPresentation
      if (project.defaultPresentation) {
        setActivePresentationMode(project.defaultPresentation);
      } else if (hasDriveLink) {
        setActivePresentationMode('drive');
      } else if (hasPdfFile) {
        setActivePresentationMode('pdf');
      }
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

  // Resolve PDF file path (located inside case-studies/ folder)
  const pdfFilename = project.pdfUrl;
  const cleanPdfName = pdfFilename ? pdfFilename.replace(/^case-studies\//, '').trim() : '';
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const pdfSrc = cleanPdfName ? `${baseUrl}case-studies/${encodeURIComponent(cleanPdfName)}` : '';
  const hasDrive = Boolean(project.driveUrl && project.driveUrl.trim() !== '');
  const hasPdf = Boolean(cleanPdfName);

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

        {/* Right-side Sliding Drawer: near-black (#0E0E11), 1px gold/subtle border, 60% width on desktop */}
        <motion.aside
          id="project-drawer-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-50 w-full md:w-[60%] lg:w-[60%] xl:w-[60%] h-full bg-[#0E0E11] text-[#EDE9E1] border-l border-[#ceb573]/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
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
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8 overscroll-contain scroll-smooth">
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
            {(Boolean(project.links && project.links.length > 0) || hasPdf || hasDrive) && (
              <div className="pt-2">
                <span className="block text-xs uppercase font-mono tracking-[0.15em] text-[#ceb573] mb-3">
                  Project Artifacts & Links
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.links?.map((link, idx) => (
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

                  {/* Direct Google Drive presentation link */}
                  {hasDrive && project.driveUrl && (
                    <a
                      href={getDirectOpenUrl(project.driveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#ceb573] bg-[#ceb573]/10 border border-[#ceb573]/30 hover:border-[#ceb573] hover:bg-[#ceb573]/20 transition-all duration-200 cursor-pointer shadow-sm"
                      title="Open Google Drive presentation in a new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Google Drive</span>
                    </a>
                  )}

                  {/* Moved Open in New Tab button up under Project Artifacts & Links */}
                  {hasPdf && (
                    <a
                      href={pdfSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#EDE9E1] bg-[#16161B] border border-white/[0.08] hover:border-[#ceb573]/50 hover:text-[#ceb573] transition-all duration-200 cursor-pointer"
                      title="Open PDF in a new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open PDF in New Tab</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Embedded Case Study Presentation Section (Google Drive Embed / PDF / Reserved Space) */}
            <div id="project-drawer-pdf-section" className="pt-2 space-y-3">
              {/* If both Drive URL and PDF are available, allow user to toggle between them */}
              {hasDrive && hasPdf && (
                <div className="flex items-center justify-between bg-[#16161B] border border-white/[0.08] p-1.5 rounded-lg">
                  <span className="text-xs font-mono text-[#8A857D] px-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ceb573]" />
                    Presentation View:
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setActivePresentationMode('drive')}
                      className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                        activePresentationMode === 'drive'
                          ? 'bg-[#ceb573] text-[#0E0E11] font-semibold shadow-sm'
                          : 'text-[#8A857D] hover:text-[#EDE9E1] hover:bg-white/[0.05]'
                      }`}
                    >
                      Google Drive (Live)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePresentationMode('pdf')}
                      className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                        activePresentationMode === 'pdf'
                          ? 'bg-[#ceb573] text-[#0E0E11] font-semibold shadow-sm'
                          : 'text-[#8A857D] hover:text-[#EDE9E1] hover:bg-white/[0.05]'
                      }`}
                    >
                      Archived PDF
                    </button>
                  </div>
                </div>
              )}

              {hasDrive && activePresentationMode === 'drive' && project.driveUrl ? (
                <GoogleDriveEmbed url={project.driveUrl} title={project.title} />
              ) : hasPdf && activePresentationMode === 'pdf' ? (
                /* Pure Canvas PDF Viewer (Brave & Chrome sandbox safe, responsive & scrollable) */
                <PdfViewer url={pdfSrc} title={project.title} />
              ) : hasDrive && project.driveUrl ? (
                <GoogleDriveEmbed url={project.driveUrl} title={project.title} />
              ) : hasPdf ? (
                <PdfViewer url={pdfSrc} title={project.title} />
              ) : (
                /* Reserved placeholder space for project case study presentation */
                <div className="relative border border-dashed border-[#ceb573]/25 hover:border-[#ceb573]/40 bg-[#16161B]/60 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center transition-all duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#ceb573]/10 border border-[#ceb573]/20 flex items-center justify-center text-[#ceb573] mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase font-mono tracking-[0.15em] text-[#ceb573] font-medium">
                    Case Study Presentation (Drive or PDF)
                  </span>
                  <h4 className="text-sm sm:text-base font-serif text-[#EDE9E1] mt-1 font-normal">
                    Presentation Space Reserved
                  </h4>
                  <p className="text-xs text-[#8A857D] max-w-md mt-1 leading-relaxed">
                    Provide a Google Drive / Slides link via{' '}
                    <code className="text-[#ceb573] bg-black/40 px-1.5 py-0.5 rounded font-mono text-[11px]">
                      driveUrl
                    </code>{' '}
                    or upload a PDF to{' '}
                    <code className="text-[#ceb573] bg-black/40 px-1.5 py-0.5 rounded font-mono text-[11px]">
                      case-studies/
                    </code>{' '}
                    and set{' '}
                    <code className="text-[#ceb573] bg-black/40 px-1.5 py-0.5 rounded font-mono text-[11px]">
                      pdfUrl
                    </code>{' '}
                    in{' '}
                    <code className="text-[#ceb573] bg-black/40 px-1.5 py-0.5 rounded font-mono text-[11px]">
                      content.ts
                    </code>{' '}
                    to showcase it here.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#8A857D] bg-white/[0.03] border border-white/[0.06]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ceb573]/60 animate-pulse" />
                      Awaiting Drive link or PDF upload
                    </span>
                  </div>
                </div>
              )}
            </div>

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
