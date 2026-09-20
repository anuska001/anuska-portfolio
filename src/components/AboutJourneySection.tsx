import { useState } from 'react';
import { GraduationCap, Briefcase, ChevronDown, ChevronUp, CheckCircle2, Wrench } from 'lucide-react';
import { portfolioContent } from '../content';
import { RevealOnScroll } from './RevealOnScroll';

export function AboutJourneySection() {
  const { about, journey, skills } = portfolioContent;

  const [expandedJourneyItems, setExpandedJourneyItems] = useState<Record<string, boolean>>({
    'journey-01': true,
  });

  const toggleJourneyItem = (id: string) => {
    setExpandedJourneyItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#ceb573]/15 scroll-mt-20"
    >
      {/* Side-by-side on desktop (grid-cols-12), stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: ABOUT ME + SKILLS (lg:col-span-6)            */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-12">
          {/* --- 1. About Me --- */}
          <RevealOnScroll className="space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ceb573] block mb-3">
                Background & Philosophy
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] font-normal tracking-tight">
                {about.title}
              </h2>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-[#A39E93] text-base leading-relaxed font-sans-editorial">
              {about.bioParagraphs.map((para, idx) => (
                <p key={idx} className="text-pretty">
                  {para}
                </p>
              ))}
            </div>

            {/* PM Focus Areas */}
            <div className="pt-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#ceb573] font-medium mb-3">
                Core PM Focus Areas
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {about.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#EDE9E1]">
                    <CheckCircle2 className="w-4 h-4 text-[#ceb573] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Facts Card: 16px corners, near-black with inner highlight */}
            <div className="p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#ceb573] font-medium block">
                At a Glance
              </span>
              <div className="space-y-2 text-xs sm:text-sm font-sans-editorial">
                {about.quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-white/[0.05] last:border-none">
                    <span className="text-[#736F68]">{fact.label}</span>
                    <span className="font-medium text-[#EDE9E1] text-right">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* --- 2. Skills (On Left Side) --- */}
          <RevealOnScroll delay={100} id="skills-subgroup" className="pt-8 border-t border-white/[0.08] space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-3.5 h-3.5 text-[#ceb573]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ceb573]">
                  Toolkit & Competencies
                </span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F5F3EF] font-normal tracking-tight">
                Product Skills
              </h3>
              <p className="text-xs sm:text-sm text-[#736F68] mt-1 font-sans-editorial">
                Key methodologies, discovery frameworks, and analytical tools.
              </p>
            </div>

            {/* 2x2 Grid of Skill Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  id={`skill-category-${idx}`}
                  className="p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/30 transition-colors duration-200 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.05]">
                      <span className="font-mono text-xs text-[#ceb573] font-medium">
                        0{idx + 1}
                      </span>
                      <h4 className="font-sans-editorial font-medium text-xs sm:text-sm text-[#F5F3EF] tracking-tight">
                        {skillGroup.category}
                      </h4>
                    </div>

                    <ul className="space-y-1.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-xs text-[#A39E93] flex items-start gap-1.5 font-sans-editorial leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ceb573]/60 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: JOURNEY (lg:col-span-6)                    */}
        {/* ========================================================= */}
        <RevealOnScroll delay={150} id="journey-subgroup" className="lg:col-span-6">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ceb573] block mb-3">
              Timeline & Trajectory
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] font-normal tracking-tight">
              My Journey
            </h2>
            <p className="text-sm text-[#736F68] mt-2 font-sans-editorial">
              Chronological overview of my education and professional experiences.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-6 sm:space-y-8">
            {journey.map((item) => {
              const isExpanded = !!expandedJourneyItems[item.id];
              const isEducation = item.type === 'education';

              return (
                <div key={item.id} id={`journey-item-${item.id}`} className="relative group">
                  {/* Timeline Dot with Icon */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#121215] border border-[#ceb573]/60 group-hover:border-[#ceb573] flex items-center justify-center text-[#ceb573] transition-colors duration-200 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    {isEducation ? (
                      <GraduationCap className="w-3.5 h-3.5" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Item Content Card: 16px corners, near-black with inner highlight */}
                  <div className="p-5 sm:p-6 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/40 hover:-translate-y-0.5 transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                    {/* Header: Period & Category Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-medium text-[#ceb573]">
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide bg-[#18181E] text-[#A39E93] border border-white/[0.06]">
                        {isEducation ? 'Education' : 'Experience'}
                      </span>
                    </div>

                    {/* Role / Degree */}
                    <h3 className="font-serif-editorial text-lg sm:text-xl text-[#F5F3EF] font-normal tracking-tight mb-1">
                      {item.roleOrDegree}
                    </h3>

                    {/* Organization & Location */}
                    <div className="text-xs sm:text-sm font-sans-editorial text-[#736F68] mb-3 flex flex-wrap items-center gap-2">
                      <span className="font-medium text-[#EDE9E1]">{item.organization}</span>
                      {item.location && (
                        <>
                          <span className="text-[#3A3834]">•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>

                    {/* Short Summary */}
                    <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed font-sans-editorial mb-4">
                      {item.shortSummary}
                    </p>

                    {/* Expandable "View details" Toggle */}
                    <button
                      type="button"
                      id={`journey-toggle-${item.id}`}
                      onClick={() => toggleJourneyItem(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ceb573] hover:text-[#D8C18E] transition-colors duration-200 py-1 cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Hide details' : 'View details'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Expandable Details Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2 text-xs text-[#8C867D] animate-in fade-in duration-200 font-sans-editorial">
                        <ul className="space-y-1.5 list-disc list-inside marker:text-[#ceb573]">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
