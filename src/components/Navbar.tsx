import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { portfolioContent } from '../content';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#ceb573]/20 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#0B0B0D]/60 backdrop-blur-sm py-5 border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between relative">
        {/* Left: Name / Brand */}
        <button
          id="nav-logo-button"
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none z-10"
        >
          <span className="font-serif-editorial text-2xl sm:text-[1.65rem] font-normal tracking-tight text-[#F5F3EF] group-hover:text-[#ceb573] transition-colors duration-200">
            {portfolioContent.personal.name}
          </span>
        </button>

        {/* Center: Desktop Navigation Buttons (Work | About | Contact) */}
        <nav
          id="desktop-nav"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10 px-2 py-1 rounded-full bg-[#121215] border border-white/[0.08]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide font-sans-editorial transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#0B0B0D] bg-[#ceb573] font-medium shadow-[0_0_12px_rgba(203,178,121,0.25)]'
                    : 'text-[#A39E93] hover:text-[#F5F3EF] hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Resume Link */}
        <div className="hidden md:flex items-center z-10">
          <a
            id="nav-resume-link"
            href={portfolioContent.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-[#ceb573] border border-[#ceb573]/30 hover:border-[#ceb573] hover:bg-[#ceb573] hover:text-[#0B0B0D] transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#A39E93] hover:text-[#F5F3EF] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#0F0F12] border-b border-[#ceb573]/20 px-6 py-4 shadow-2xl animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-sans-editorial transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#ceb573]/15 text-[#ceb573] font-medium border border-[#ceb573]/30'
                    : 'text-[#A39E93] hover:bg-white/[0.04] hover:text-[#F5F3EF]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-white/[0.08]">
              <a
                id="mobile-nav-resume"
                href={portfolioContent.contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-xs font-mono tracking-wider uppercase border border-[#ceb573]/40 text-[#ceb573] hover:bg-[#ceb573] hover:text-[#0B0B0D] transition-all duration-200"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
