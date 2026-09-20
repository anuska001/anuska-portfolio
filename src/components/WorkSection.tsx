import { ArrowUpRight, FileText } from 'lucide-react';
import { Project } from '../types';
import { portfolioContent } from '../content';
import { RevealOnScroll } from './RevealOnScroll';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
  selectedProjectId?: string | null;
}

export function WorkSection({ onSelectProject, selectedProjectId }: WorkSectionProps) {
  const { projects } = portfolioContent;

  return (
    <section
      id="work"
      className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#ceb573]/15"
    >
      {/* Section Header */}
      <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ceb573] block mb-3">
            Selected Case Studies
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] font-normal tracking-tight">
            Featured Work
          </h2>
        </div>
        <p className="text-sm text-[#A39E93] max-w-md font-sans-editorial leading-relaxed">
          Product thinking, discovery frameworks, and scoped execution. Select any case study to explore the end-to-end breakdown.
        </p>
      </RevealOnScroll>

      {/* Projects Grid: 16px corners, near-black with subtle inner border highlight */}
      <RevealOnScroll delay={150} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          return (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className={`group relative flex flex-col justify-between p-7 rounded-[16px] bg-[#121215] border transition-all duration-200 cursor-pointer text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${
                isSelected
                  ? 'border-[#ceb573] ring-1 ring-[#ceb573]/40 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
                  : 'border-white/[0.08] hover:border-[#ceb573]/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Card Top */}
              <div>
                {/* Number & Status */}
                <div className="flex items-center justify-between text-xs font-mono text-[#736F68] mb-6 pb-3 border-b border-white/[0.06]">
                  <span className="font-medium text-[#ceb573]">
                    Case Study {project.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#18181D] text-[#A39E93] border border-white/[0.06] text-[11px]">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif-editorial text-2xl text-[#F5F3EF] font-normal tracking-tight mb-2 group-hover:text-[#ceb573] transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Subtitle / Tagline */}
                <p className="text-xs font-mono text-[#736F68] uppercase tracking-wider mb-4">
                  {project.role} • {project.timeline}
                </p>

                {/* Short Summary */}
                <p className="text-sm text-[#A39E93] leading-relaxed line-clamp-3 mb-6 font-sans-editorial">
                  {project.summary}
                </p>
              </div>

              {/* Card Bottom: Tags & Action */}
              <div className="pt-5 border-t border-white/[0.06] flex flex-col gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-[11px] font-sans-editorial text-[#A39E93] bg-[#18181D] border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interactive CTA */}
                <div className="flex items-center justify-between text-xs font-medium text-[#EDE9E1] pt-1 group-hover:text-[#ceb573] transition-colors duration-200">
                  <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
                    <FileText className="w-3.5 h-3.5 text-[#ceb573]" />
                    Read Case Study
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#ceb573] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          );
        })}
      </RevealOnScroll>
    </section>
  );
}
