import { useState, useEffect } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { Navbar } from './components/Navbar';
import { WorkSection } from './components/WorkSection';
import { ProjectDrawer } from './components/ProjectDrawer';
import { AboutJourneySection } from './components/AboutJourneySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  // Screen 1: 'landing' (First screen visitors see)
  // Screen 2: 'portfolio' (Work, About & Skills & Journey, Contact)
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'portfolio'>('landing');
  const [activeSection, setActiveSection] = useState<string>('work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Synchronize with URL hash on initial load and hash change
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.replace('#', '');
      const portfolioSections = ['work', 'about', 'journey', 'skills', 'contact', 'portfolio'];

      if (portfolioSections.includes(hash)) {
        setCurrentScreen('portfolio');
        // If hash was journey or skills, map to the combined about section
        const targetId = (hash === 'portfolio' || hash === 'journey' || hash === 'skills') 
          ? (hash === 'portfolio' ? 'work' : 'about') 
          : hash;
        setActiveSection(targetId);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === 'home' || hash === '') {
        setCurrentScreen('landing');
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Handler to navigate to Screen 2 (Portfolio) from "See my work ↓"
  const handleEnterPortfolio = (targetSection: string = 'work') => {
    setCurrentScreen('portfolio');
    setActiveSection(targetSection);
    window.history.pushState(null, '', `#${targetSection}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handler for navigation items inside Screen 2
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      // Returning to Screen 1: Landing Page
      setCurrentScreen('landing');
      window.history.pushState(null, '', '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveSection(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll observer on Screen 2 to highlight active section in Navbar (work, about, contact)
  useEffect(() => {
    if (currentScreen !== 'portfolio') return;

    const sections = ['work', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#EDE9E1] selection:bg-[#ceb573]/30 selection:text-[#F5F3EF] font-sans-editorial antialiased">
      {/* ========================================================= */}
      {/* SCREEN 1: LANDING PAGE                                    */}
      {/* Show ONLY: Name, Title, and "See my work ↓" button.       */}
      {/* No navigation bar, projects, or other sections here.      */}
      {/* ========================================================= */}
      {currentScreen === 'landing' && (
        <LandingScreen onEnterPortfolio={() => handleEnterPortfolio('work')} />
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: PORTFOLIO PAGE                                  */}
      {/* Separate screen with Navbar, Work, About+Skills+Journey,  */}
      {/* Contact, Footer, and Project Drawer                       */}
      {/* ========================================================= */}
      {currentScreen === 'portfolio' && (
        <div id="portfolio-screen" className="animate-in fade-in duration-300">
          {/* Top Sticky Navigation with Work | About | Contact centered */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          <main id="portfolio-main-content" className="relative pt-16 sm:pt-20">
            {/* 1. Work / Projects */}
            <WorkSection
              onSelectProject={(project) => setSelectedProject(project)}
              selectedProjectId={selectedProject?.id}
            />

            {/* 2. About + Skills (Left) and Journey (Right) side-by-side */}
            <AboutJourneySection />

            {/* 3. Contact */}
            <ContactSection />
          </main>

          {/* Project Case Study Right-Side Drawer (covering ~50% of desktop screen) */}
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
