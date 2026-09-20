import { ArrowDown, Sparkles } from 'lucide-react';
import { portfolioContent } from '../content';

interface HeroSectionProps {
  onSeeWorkClick: () => void;
}

export function HeroSection({ onSeeWorkClick }: HeroSectionProps) {
  const { personal } = portfolioContent;

  return (
    <section
      id="home"
      className="min-h-[88vh] flex flex-col justify-center pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto"
    >
      <div className="max-w-3xl">
        {/* Subtle Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200/80 text-stone-600 text-xs font-medium tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{personal.location}</span>
        </div>

        {/* Name: Anuska Mukherjee */}
        <h1
          id="hero-name"
          className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-stone-900 leading-[1.05] mb-4"
        >
          {personal.name}
        </h1>

        {/* Role: Aspiring Product Manager */}
        <p
          id="hero-role"
          className="font-sans-editorial text-xl sm:text-2xl md:text-3xl font-medium text-stone-700 tracking-tight mb-6"
        >
          {personal.role}
        </p>

        {/* Subtitle / Positioning Statement */}
        <p
          id="hero-subtitle"
          className="text-base sm:text-lg text-stone-600 font-sans-editorial leading-relaxed max-w-2xl mb-10 text-pretty"
        >
          {personal.heroSubtitle}
        </p>

        {/* Interactive "See my work ↓" Button */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            id="hero-see-my-work-btn"
            onClick={onSeeWorkClick}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-stone-900 text-[#faf9f6] text-sm font-medium hover:bg-stone-800 transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
          >
            <span>See my work</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <a
            id="hero-contact-shortcut"
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-stone-700 hover:text-stone-900 text-sm font-medium hover:bg-stone-200/60 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Editorial divider with subtle tagline */}
      <div className="mt-20 pt-8 border-t border-stone-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider uppercase text-stone-600 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-stone-600" />
          <span>Product Thinking • User Empathy • Scoping</span>
        </div>
        <span className="normal-case font-sans-editorial text-stone-600 tracking-normal">
          {personal.tagline}
        </span>
      </div>
    </section>
  );
}
