import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioContent } from '../content';

interface LandingScreenProps {
  onEnterPortfolio: () => void;
}

export function LandingScreen({ onEnterPortfolio }: LandingScreenProps) {
  const { personal } = portfolioContent;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onEnterPortfolio();
    }, 200);
  };

  return (
    <div
      id="landing-screen"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0B0D] text-[#EDE9E1] px-6 sm:px-8 relative select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Name: Anuska Mukherjee in Playfair/Fraunces Serif */}
        <h1
          id="landing-name"
          className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F5F3EF] leading-[1.08]"
        >
          {personal.name}
        </h1>

        {/* Title: Aspiring Product Manager in Grotesque Sans with champagne accent */}
        <p
          id="landing-title"
          className="font-sans-editorial text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase font-medium text-[#ceb573] mt-6 sm:mt-8 mb-12 sm:mb-16"
        >
          {personal.role}
        </p>

        {/* Interactive "See my work" primary CTA - #0B0B0D rectangle with thin white border, color change on hover, arrow shoots diagonally up-right on hover and click */}
        <button
          type="button"
          id="landing-see-my-work-btn"
          onClick={handleClick}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-none bg-[#0B0B0D] text-[#F5F3EF] border border-white text-sm sm:text-base font-bold tracking-wide cursor-pointer transition-colors duration-200 hover:bg-[#ceb573] hover:text-[#0B0B0D] hover:border-[#ceb573] active:bg-[#ceb573] active:text-[#0B0B0D] active:border-[#ceb573] outline-none focus:outline-none focus:ring-0"
        >
          <span className="font-bold inline-block transition-transform duration-200 group-hover:scale-105 origin-center">
            See my work
          </span>
          <ArrowUpRight
            className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isClicked ? 'translate-x-1 -translate-y-1' : 'group-active:translate-x-1 group-active:-translate-y-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
