import { ArrowUp } from 'lucide-react';
import { portfolioContent } from '../content';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#ceb573]/15 bg-[#0B0B0D] py-14 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#736F68] font-sans-editorial">
        <div>
          <p className="text-[#EDE9E1] font-medium tracking-wide">
            © {new Date().getFullYear()} {portfolioContent.personal.name}. All rights reserved.
          </p>
          <p className="text-[#736F68] mt-1 font-mono text-[11px]">
            Designed with quiet craftsmanship & product focus.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#A39E93] hover:text-[#ceb573] transition-colors duration-200 font-mono tracking-wider uppercase text-[11px] cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ceb573]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
